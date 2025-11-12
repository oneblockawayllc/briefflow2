"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function IntakePage() {
  const r = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    projectName: '',
    objective1: '',
    objective2: '',
    audience: 'Gen Z, 18–24, mobile-first',
    deliverableType: 'Video',
    deliverableChannel: 'TikTok',
    deliverableSpecs: '15s, 9:16',
    timeline: 'Launch June 2026',
    budget: '$30k–40k',
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const intake = {
      project: { name: form.projectName, category: 'Campaign', owner: 'me@example.com' },
      objectives: [form.objective1, form.objective2].filter(Boolean),
      audience: { primary: form.audience, insights: [] },
      deliverables: [{ type: form.deliverableType, channel: form.deliverableChannel, specs: form.deliverableSpecs }],
      timeline: form.timeline,
      budget: form.budget,
    };
    const res = await fetch('/api/briefs', { method: 'POST', body: JSON.stringify(intake) });
    if (res.ok) {
      const json = await res.json();
      r.push(`/brief/${json.id}/edit`);
    } else {
      alert('Failed to generate draft');
    }
    setLoading(false);
  }

  return (
    <main className="space-y-6">
      <form onSubmit={onSubmit} className="space-y-4 rounded-md border bg-white p-6">
        <h2 className="text-xl font-medium">Intake</h2>
        <div>
          <label className="block text-sm font-medium">Project Name</label>
          <input className="mt-1 w-full rounded border p-2" name="projectName" value={form.projectName} onChange={onChange} required />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium">Objective 1</label>
            <input className="mt-1 w-full rounded border p-2" name="objective1" value={form.objective1} onChange={onChange} />
          </div>
          <div>
            <label className="block text-sm font-medium">Objective 2</label>
            <input className="mt-1 w-full rounded border p-2" name="objective2" value={form.objective2} onChange={onChange} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium">Audience</label>
          <input className="mt-1 w-full rounded border p-2" name="audience" value={form.audience} onChange={onChange} />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <label className="block text-sm font-medium">Deliverable Type</label>
            <input className="mt-1 w-full rounded border p-2" name="deliverableType" value={form.deliverableType} onChange={onChange} />
          </div>
          <div>
            <label className="block text-sm font-medium">Channel</label>
            <input className="mt-1 w-full rounded border p-2" name="deliverableChannel" value={form.deliverableChannel} onChange={onChange} />
          </div>
          <div>
            <label className="block text-sm font-medium">Specs</label>
            <input className="mt-1 w-full rounded border p-2" name="deliverableSpecs" value={form.deliverableSpecs} onChange={onChange} />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium">Timeline</label>
            <input className="mt-1 w-full rounded border p-2" name="timeline" value={form.timeline} onChange={onChange} />
          </div>
          <div>
            <label className="block text-sm font-medium">Budget</label>
            <input className="mt-1 w-full rounded border p-2" name="budget" value={form.budget} onChange={onChange} />
          </div>
        </div>
        <button disabled={loading} className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-60">
          {loading ? 'Generating…' : 'Generate AI Draft'}
        </button>
      </form>
    </main>
  );
}

