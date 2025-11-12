import { GoogleGenAI, Type } from "@google/genai";
import type { Brief, BrandDocument } from '../types.ts';

class GeminiResponseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'GeminiResponseError';
  }
}


class GeminiEmptyResponseError extends GeminiResponseError {
  constructor(context: string) {
    super(`${context} failed because the Gemini API returned an empty response.\n\nCommon causes include:\n• The Gemini API key is missing, invalid, or lacks permission.\n• The request was blocked by Gemini content safety filters.\n• The Gemini API service is temporarily unavailable.\n\nPlease verify your Gemini API configuration, review the brief for sensitive content, and try again.`);
    this.name = 'GeminiEmptyResponseError';
  }
}

const getConfiguredApiKey = (): string | null => {
  const candidates = [process.env.API_KEY, process.env.GEMINI_API_KEY];

  for (const candidate of candidates) {
    if (typeof candidate === 'string') {
      const trimmed = candidate.trim();
      if (trimmed && trimmed !== 'undefined' && trimmed !== 'null') {
        return trimmed;
      }
    }
  }

  return null;
};

let cachedClient: GoogleGenAI | null = null;
let cachedApiKey: string | null = null;

const getGeminiClient = (context: string): GoogleGenAI => {
  const apiKey = getConfiguredApiKey();

  if (!apiKey) {
    throw new GeminiResponseError(`${context} failed because the Gemini API key is not configured.\n\nSet the GEMINI_API_KEY environment variable (or API_KEY) before trying again.`);
  }

  if (!cachedClient || cachedApiKey !== apiKey) {
    cachedApiKey = apiKey;
    cachedClient = new GoogleGenAI({ apiKey });
  }

  return cachedClient;
};

function ensureResponseText(response: { text?: string | null }, context: string): string {
  const text = response?.text;
  if (typeof text === 'string' && text.trim().length > 0) {
    return text;
  }
  console.error(`Gemini API returned an empty response while ${context.toLowerCase()}.`, response);
  throw new GeminiEmptyResponseError(context);
}

function toGeminiError(context: string, error: unknown): GeminiResponseError {
  if (error instanceof GeminiResponseError) {
    return error;
  }
  console.error(`Gemini API error (${context}):`, error);
  const message = error instanceof Error ? error.message : String(error);
  return new GeminiResponseError(`${context} failed because the Gemini API returned an error: ${message}\n\nPlease verify your Gemini API key, network connection, and account quota, then try again.`);
}


function formatBriefForPrompt(brief: Brief): string {
    let deliverablesText = '';
    const isOrganicSocial = brief.projectType === 'Campaign' && brief.projectSubtypes.includes('Organic Social') && !brief.projectSubtypes.includes('Paid Media');

    if (isOrganicSocial && brief.socialCampaign?.platforms.length > 0) {
        deliverablesText = `**Social Campaign Scope:**\n` + brief.socialCampaign.platforms.map(p => {
            const selectedFormats = p.formats.filter(f => f.selected);
            if (selectedFormats.length === 0) return '';
            return `* **${p.name}:**\n` + selectedFormats.map(f => `  - ${f.name} (${f.spec})`).join('\n');
        }).filter(Boolean).join('\n');
    } else if (brief.projectType === 'Website') {
        const uxText = brief.uxDeliverables.map(d => `- (UX) ${d.name}: ${d.spec || 'No spec'}`).join('\n');
        const creativeText = brief.creativeDeliverables.map(d => `- (Creative) ${d.name}: Format: ${d.format}, Focus: ${d.responsiveFocus}`).join('\n');
        const functionalityText = Object.entries(brief.functionality).map(([category, items]) => 
            items.length > 0 ? `**${category.charAt(0).toUpperCase() + category.slice(1)}:** ${items.join(', ')}` : ''
        ).filter(Boolean).join('\n');
        deliverablesText = [uxText, creativeText, functionalityText].filter(Boolean).join('\n\n');
    } else {
        deliverablesText = '**Deliverables:**\n' + brief.deliverables.map(d => `- ${d.type}: ${d.spec}`).join('\n');
    }

    const brandDocsText = brief.brandGuidelines.map(b => b.name).join(', ');
    const audienceDocsText = brief.audienceDocuments.map(d => d.name).join(', ');
    const industryDocsText = brief.industryResearchDocuments.map(d => d.name).join(', ');
    const stakeholdersText = brief.stakeholders.map(s => s.name).join(', ');
    const ownersText = brief.owners.map(s => s.name).join(', ');

    return `
    **Project Type:** ${brief.projectType}
    **Project Name:** ${brief.projectName}
    **Description:** ${brief.description}
    **Budget Range:** ${brief.budgetRange}
    **Launch Date / Milestone:** ${brief.launchDate}
    **Project Owner(s):** ${ownersText || 'None'}
    **Key Stakeholders:** ${stakeholdersText || 'None'}

    **Primary Objective:** ${brief.primaryObjective}
    **Secondary Objective:** ${brief.secondaryObjective || 'None'}
    **Key Performance Indicator (KPI):** ${brief.kpiTemplate}

    **Target Audience Description:** ${brief.targetAudience}
    **Uploaded Audience Persona Documents:** ${audienceDocsText || 'None'}
    **Key Audience Tension/Insight:** ${brief.keyTension}
    **Key Messaging:** ${brief.keyMessaging || 'None'}
    **Industry/Category Insights:** ${brief.industryInsights || 'None'}
    **Uploaded Industry Research:** ${industryDocsText || 'None'}
    **Proof Points to Support Our Message:** ${brief.proofPoints}

    **Brand Identity & Voice:** ${brief.brandIdentityText || 'Not specified'}
    **Uploaded Brand Documents:** ${brandDocsText || 'None'}

    ${deliverablesText || '**Deliverables:**\nNone specified'}
    
    **Brand Tone (Legacy):**
    - Formality: ${brief.tone.formalPlayful > 50 ? 'More Playful' : 'More Formal'} (${brief.tone.formalPlayful}/100)
    - Expression: ${brief.tone.minimalExpressive > 50 ? 'More Expressive' : 'More Minimal'} (${brief.tone.minimalExpressive}/100)
    `;
}

export async function generateBriefSummary(brief: Brief): Promise<string> {
  const model = 'gemini-2.5-flash';
  const formattedBrief = formatBriefForPrompt(brief);
  const prompt = `
    Based on the following project details, write a concise, professional, and well-structured project brief summary.
    The summary should be easily digestible for a creative team and key stakeholders.
    Organize it into logical sections (e.g., Background, Objectives, Audience, Brand, Deliverables).
    Use clear headings with markdown. Be professional but engaging.
    IMPORTANT: The Project Type is "${brief.projectType}". Tailor the language and emphasis of the summary to be highly relevant for this type of project.

    Project Details:
    ---
    ${formattedBrief}
    ---
  `;

  try {
    const client = getGeminiClient('Generating the brief summary');
    const response = await client.models.generateContent({
      model: model,
      contents: prompt,
    });
    return ensureResponseText(response, 'Generating the brief summary');
  } catch (error) {
    throw toGeminiError('Generating the brief summary', error);
  }
}

export async function generateBriefPreview(brief: Brief): Promise<string> {
  if (!brief.primaryObjective) {
    return "Please fill out the core brief details to generate a preview.";
  }
  const model = 'gemini-2.5-flash';
  const formattedBrief = formatBriefForPrompt(brief);
  const prompt = `
    Based on the following project details, write a very short, 2-3 paragraph preview summary of the project brief. Focus on the core objective and audience insight. The project type is "${brief.projectType}", so ensure the summary is relevant to that.

    Project Details:
    ---
    ${formattedBrief}
    ---
  `;
  try {
    const client = getGeminiClient('Generating the brief preview');
    const response = await client.models.generateContent({ model, contents: prompt });
    return ensureResponseText(response, 'Generating the brief preview');
  } catch (error) {
    const geminiError = toGeminiError('Generating the brief preview', error);
    return `Error generating preview: ${geminiError.message}`;
  }
}


export async function suggestInsight(objective: string, audienceText: string, audienceDocs: BrandDocument[], projectType: string): Promise<string[]> {
  const model = 'gemini-2.5-flash';
  const audienceDocsText = audienceDocs.map(d => d.name).join(', ');
  const prompt = `
    Given a project objective, target audience, and project type, suggest three distinct and compelling "key tension" insights.
    A key tension is the conflict or unmet need in the audience's life that our project or product can resolve.
    Each insight should be a short, powerful statement relevant to the project type.

    **Project Type:** "${projectType}"
    **Project Objective:** "${objective}"
    **Target Audience Description:** "${audienceText}"
    **Uploaded Audience Persona Documents:** "${audienceDocsText || 'None'}"

    Return the insights as a JSON array of strings. For example: ["Insight one.", "Insight two.", "Insight three."].
  `;

  try {
    const client = getGeminiClient('Requesting insight suggestions');
    const response = await client.models.generateContent({
        model,
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        }
    });
    const jsonText = ensureResponseText(response, 'Requesting insight suggestions');
    const parsed = JSON.parse(jsonText.trim());
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    const geminiError = toGeminiError('Requesting insight suggestions', error);
    console.error("Gemini API error while suggesting insight:", geminiError);
    return [];
  }
}
