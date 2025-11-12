import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { generateBriefFromIntake, BriefDraft } from '@/lib/llm';

export async function POST(req: NextRequest) {
  try {
    const intake = await req.json();
    const draft: BriefDraft = await generateBriefFromIntake(intake);

    const project = await prisma.project.create({
      data: { name: draft.project?.name || intake?.project?.name || 'Untitled' },
    });

    const created = await prisma.brief.create({
      data: {
        projectId: project.id,
        version: 1,
        content: JSON.stringify(draft),
        versions: {
          create: [{ version: 1, content: JSON.stringify(draft) }],
        },
      },
      include: { project: true },
    });

    return Response.json({ id: created.id, projectId: project.id });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e?.message || 'Failed to create brief' }), { status: 500 });
  }
}

export async function GET() {
  const briefs = await prisma.brief.findMany({ include: { project: true }, orderBy: { createdAt: 'desc' } });
  return Response.json(briefs.map(b => ({ id: b.id, project: b.project.name, updatedAt: b.updatedAt })));
}
