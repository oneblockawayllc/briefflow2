import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const brief = await prisma.brief.findUnique({ where: { id: params.id }, include: { project: true } });
  if (!brief) return new Response('Not found', { status: 404 });
  const content = JSON.parse(brief.content as unknown as string);
  return Response.json({ id: brief.id, project: brief.project.name, version: brief.version, content });
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const update = await req.json();
    const brief = await prisma.brief.findUnique({ where: { id: params.id } });
    if (!brief) return new Response('Not found', { status: 404 });
    const newVersion = (brief.version ?? 1) + 1;
    const contentObj = update?.content ?? JSON.parse(brief.content as unknown as string);
    const content = JSON.stringify(contentObj);
    const updated = await prisma.brief.update({
      where: { id: params.id },
      data: {
        version: newVersion,
        content,
        versions: { create: [{ version: newVersion, content }] },
      },
    });
    return Response.json({ id: updated.id, version: updated.version });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e?.message || 'Failed to update brief' }), { status: 500 });
  }
}
