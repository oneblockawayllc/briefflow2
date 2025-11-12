import { prisma } from '@/lib/db';
import { briefToMarkdown } from '@/lib/template';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const brief = await prisma.brief.findUnique({ where: { id: params.id }, include: { project: true } });
  if (!brief) return new Response('Not found', { status: 404 });
  const md = briefToMarkdown(JSON.parse(brief.content as unknown as string));
  return new Response(md, { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
}
