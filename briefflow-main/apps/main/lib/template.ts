import { BriefDraft } from './llm';

export function briefToMarkdown(b: BriefDraft): string {
  const dl = (d: any[]) => (d && d.length ? d.map((x) => `- ${x}`).join('\n') : '- TBD');
  const delivs = (b.deliverables || [])
    .map((d) => `- **${d.type} / ${d.channel}** — ${d.specs}`)
    .join('\n');
  return `# ${b.project?.name ?? 'Untitled Project'} — Creative Brief\n\n` +
    `## Executive Summary\n${b.executive_summary || 'TBD'}\n\n` +
    `## Objectives\n${dl(b.objectives)}\n\n` +
    `## Target Audience\n${b.target_audience || 'TBD'}\n\n` +
    `## Deliverables\n${delivs || '- TBD'}\n\n` +
    `## Timeline\n${b.timeline || 'TBD'}\n\n` +
    `## Budget\n${b.budget || 'TBD'}\n\n` +
    `## Key Messaging\n${b.key_messaging || 'TBD'}\n\n` +
    `## Tone & Style\n${b.tone_style || 'TBD'}\n\n` +
    `## Mandatories & Constraints\n${dl(b.mandatories)}\n\n` +
    `## Success Criteria\n${dl(b.success_metrics)}\n\n` +
    `## Approvals\n${b.approvals || 'TBD'}\n\n` +
    `## Gaps & Next Questions\n${dl(b.gaps)}\n`;
}

