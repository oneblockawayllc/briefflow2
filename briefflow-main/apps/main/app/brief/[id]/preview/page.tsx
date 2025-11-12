import { prisma } from '@/lib/db';
import { briefToMarkdown } from '@/lib/template';

export default async function PreviewPage({ params }: { params: { id: string } }) {
  const brief = await prisma.brief.findUnique({ where: { id: params.id }, include: { project: true } });
  if (!brief) return <div className="text-red-600">Not found</div>;
  const md = briefToMarkdown(JSON.parse(brief.content as unknown as string));
  return (
    <main className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium">Preview: {brief.project.name}</h2>
        <a className="rounded border px-3 py-2" href={`/api/briefs/${brief.id}/markdown`}>Download Markdown</a>
      </div>
      <article className="whitespace-pre-wrap rounded-md border bg-white p-6 text-sm">{md}</article>
    </main>
  );
}
