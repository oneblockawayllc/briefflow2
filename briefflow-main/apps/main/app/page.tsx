export default function HomePage() {
  return (
    <main className="space-y-6">
      <section className="rounded-md border bg-white p-6">
        <h2 className="mb-2 text-xl font-medium">Start a new brief</h2>
        <p className="mb-4 text-sm text-gray-600">Use the intake form to generate a first draft with Qwen 14B, then iterate with fast Mistral regenerations.</p>
        <a className="inline-block rounded bg-blue-600 px-4 py-2 text-white" href="/intake">Open Intake Wizard</a>
      </section>
    </main>
  );
}

