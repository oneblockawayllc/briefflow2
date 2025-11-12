import OpenAI from 'openai';

export interface Deliverable { type: string; channel: string; specs: string }
export interface BriefDraft {
  project: { name: string };
  executive_summary: string;
  objectives: string[];
  target_audience: string;
  deliverables: Deliverable[];
  timeline: string;
  budget: string;
  key_messaging: string;
  tone_style: string;
  mandatories: string[];
  success_metrics: string[];
  approvals: string;
  gaps: string[];
}

const client = new OpenAI({
  baseURL: process.env.OPENAI_BASE_URL || 'http://localhost:11434/v1',
  apiKey: process.env.OPENAI_API_KEY || 'ollama',
});

const temperature = Number(process.env.LLM_TEMPERATURE ?? 0.2);

function extractFirstJson(text: string): any {
  const fence = /```json\s*([\s\S]*?)```/i.exec(text);
  const candidate = fence ? fence[1] : text;
  try { return JSON.parse(candidate); } catch {}
  // fallback: try bracket slice
  const first = candidate.indexOf('{');
  const last = candidate.lastIndexOf('}');
  if (first !== -1 && last !== -1 && last > first) {
    const sliced = candidate.slice(first, last + 1);
    return JSON.parse(sliced);
  }
  throw new Error('Failed to parse JSON from model output');
}

async function chat(messages: OpenAI.Chat.ChatCompletionMessageParam[], { fast = false } = {}) {
  const model = fast ? (process.env.LLM_MODEL_FAST as string) : (process.env.LLM_MODEL_PRIMARY as string) || (process.env.LLM_MODEL as string);
  return client.chat.completions.create({ model, messages, temperature });
}

export async function generateBriefFromIntake(intake: any): Promise<BriefDraft> {
  const system = `You are an expert creative brief writer. Use PRD canon. Return ONLY fenced JSON with keys: project, executive_summary, objectives, target_audience, deliverables, timeline, budget, key_messaging, tone_style, mandatories, success_metrics, approvals, gaps.`;
  const user = `Generate a client-ready brief from this intake JSON:\n\n${JSON.stringify(intake)}\n\nEnsure deliverables are objects with type/channel/specs. If unknown, use \"TBD\". No text outside fenced JSON.`;

  try {
    const res = await chat([
      { role: 'system', content: system },
      { role: 'user', content: user },
    ], { fast: false });
    const content = res.choices[0]?.message?.content || '';
    return extractFirstJson(content) as BriefDraft;
  } catch (e) {
    // Fallback to fast model
    const res = await chat([
      { role: 'system', content: system },
      { role: 'user', content: user },
    ], { fast: true });
    const content = res.choices[0]?.message?.content || '';
    return extractFirstJson(content) as BriefDraft;
  }
}

const arraySections = new Set(['objectives', 'mandatories', 'success_metrics', 'gaps']);

export async function rewriteSection(
  brief: BriefDraft,
  section: keyof BriefDraft,
  instruction?: string
): Promise<string | string[]> {
  const isArray = arraySections.has(section as string);
  const sys = `You are an expert creative brief writer. Rewrite ONLY the section named "${section}". ` +
    (isArray
      ? 'Return ONLY a JSON array (no extra text).'
      : 'Return ONLY the rewritten text (no JSON, no quotes).');
  const ctx = {
    project: brief.project,
    objectives: brief.objectives,
    key_messaging: brief.key_messaging,
    tone_style: brief.tone_style,
  };
  const cur = (brief as any)[section];
  const user = `Context: ${JSON.stringify(ctx)}\n\nCurrent ${section}: ${JSON.stringify(cur)}\n\n` +
    (instruction ? `Instructions: ${instruction}\n` : '') +
    `Rewrite now.`;
  const res = await chat([
    { role: 'system', content: sys },
    { role: 'user', content: user },
  ], { fast: true });
  const content = res.choices[0]?.message?.content || '';
  if (isArray) {
    // try to parse array from fenced or raw
    const fence = /```(?:json)?\s*([\s\S]*?)```/i.exec(content);
    const candidate = fence ? fence[1] : content;
    const first = candidate.indexOf('[');
    const last = candidate.lastIndexOf(']');
    if (first !== -1 && last !== -1 && last > first) {
      const sliced = candidate.slice(first, last + 1);
      return JSON.parse(sliced);
    }
    throw new Error('Expected JSON array in rewrite output');
  }
  // return plain text
  return content.trim().replace(/^```[\s\S]*?```$/g, '').trim();
}
