import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { rewriteSection, BriefDraft } from '@/lib/llm';

const ALLOWED: (keyof BriefDraft)[] = [
  'executive_summary',
  'objectives',
  'target_audience',
  'timeline',
  'budget',
  'key_messaging',
  'tone_style',
  'mandatories',
  'success_metrics',
  'approvals',
  'gaps',
];

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { section, instruction } = await req.json();
    if (!ALLOWED.includes(section)) return new Response('Unsupported section', { status: 400 });

    const brief = await prisma.brief.findUnique({ where: { id: params.id } });
    if (!brief) return new Response('Not found', { status: 404 });
    const content = JSON.parse(brief.content as unknown as string) as BriefDraft;

    const rewritten = await rewriteSection(content, section, instruction);
    const nextContent: any = { ...content, [section]: rewritten };

    const nextVersion = (brief.version ?? 1) + 1;
    await prisma.brief.update({
      where: { id: brief.id },
      data: {
        version: nextVersion,
        content: JSON.stringify(nextContent),
        versions: { create: [{ version: nextVersion, content: JSON.stringify(nextContent) }] },
      },
    });

    return Response.json({ section, value: rewritten, version: nextVersion });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e?.message || 'Failed to regenerate' }), { status: 500 });
  }
}
