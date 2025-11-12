"use client";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

type Deliverable = { type: string; channel: string; specs: string };
type BriefDraft = {
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
};

export default function EditBriefPage() {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [brief, setBrief] = useState<BriefDraft | null>(null);

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/briefs/${id}`);
      const json = await res.json();
      setBrief(json.content);
      setLoading(false);
    })();
  }, [id]);

  async function save() {
    setSaving(true);
    await fetch(`/api/briefs/${id}`, { method: 'PUT', body: JSON.stringify({ content: brief }) });
    setSaving(false);
  }

  async function regen(section: keyof BriefDraft) {
    const res = await fetch(`/api/briefs/${id}/regenerate`, {
      method: 'POST',
      body: JSON.stringify({ section }),
    });
    if (res.ok) {
      const { value } = await res.json();
      setBrief((b) => (b ? { ...b, [section]: value } as BriefDraft : b));
    } else {
      alert('Failed to regenerate section');
    }
  }

  if (loading || !brief) return <div>Loading…</div>;

  return (
    <main className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium">Editing: {brief.project?.name ?? 'Untitled'}</h2>
        <div className="space-x-2">
          <button onClick={save} disabled={saving} className="rounded bg-blue-600 px-3 py-2 text-white disabled:opacity-60">{saving ? 'Saving…' : 'Save Version'}</button>
          <a href={`/api/briefs/${id}`} className="rounded border px-3 py-2">Raw JSON</a>
        </div>
      </div>

      <Section label="Executive Summary" regen={() => regen('executive_summary')}>
        <textarea className="mt-2 w-full rounded border p-2" rows={6} value={brief.executive_summary} onChange={(e) => setBrief({ ...brief, executive_summary: e.target.value })} />
      </Section>

      <Section label="Objectives" regen={() => regen('objectives')}>
        <textarea className="mt-2 w-full rounded border p-2" rows={4} value={brief.objectives.join('\n')} onChange={(e) => setBrief({ ...brief, objectives: e.target.value.split('\n').filter(Boolean) })} />
      </Section>

      <Section label="Target Audience" regen={() => regen('target_audience')}>
        <textarea className="mt-2 w-full rounded border p-2" rows={4} value={brief.target_audience} onChange={(e) => setBrief({ ...brief, target_audience: e.target.value })} />
      </Section>

      <Section label="Timeline" regen={() => regen('timeline')}>
        <input className="mt-2 w-full rounded border p-2" value={brief.timeline} onChange={(e) => setBrief({ ...brief, timeline: e.target.value })} />
      </Section>

      <Section label="Budget" regen={() => regen('budget')}>
        <input className="mt-2 w-full rounded border p-2" value={brief.budget} onChange={(e) => setBrief({ ...brief, budget: e.target.value })} />
      </Section>

      <Section label="Key Messaging" regen={() => regen('key_messaging')}>
        <textarea className="mt-2 w-full rounded border p-2" rows={4} value={brief.key_messaging} onChange={(e) => setBrief({ ...brief, key_messaging: e.target.value })} />
      </Section>

      <Section label="Tone & Style" regen={() => regen('tone_style')}>
        <input className="mt-2 w-full rounded border p-2" value={brief.tone_style} onChange={(e) => setBrief({ ...brief, tone_style: e.target.value })} />
      </Section>

      <Section label="Mandatories" regen={() => regen('mandatories')}>
        <textarea className="mt-2 w-full rounded border p-2" rows={4} value={brief.mandatories.join('\n')} onChange={(e) => setBrief({ ...brief, mandatories: e.target.value.split('\n').filter(Boolean) })} />
      </Section>

      <Section label="Success Criteria" regen={() => regen('success_metrics')}>
        <textarea className="mt-2 w-full rounded border p-2" rows={4} value={brief.success_metrics.join('\n')} onChange={(e) => setBrief({ ...brief, success_metrics: e.target.value.split('\n').filter(Boolean) })} />
      </Section>

      <Section label="Approvals" regen={() => regen('approvals')}>
        <textarea className="mt-2 w-full rounded border p-2" rows={3} value={brief.approvals} onChange={(e) => setBrief({ ...brief, approvals: e.target.value })} />
      </Section>

      <Section label="Gaps & Next Questions" regen={() => regen('gaps')}>
        <textarea className="mt-2 w-full rounded border p-2" rows={4} value={brief.gaps.join('\n')} onChange={(e) => setBrief({ ...brief, gaps: e.target.value.split('\n').filter(Boolean) })} />
      </Section>

      <div className="rounded-md border bg-white p-4">
        <a className="rounded bg-gray-900 px-4 py-2 text-white" href={`/brief/${id}/preview`}>Preview & Export</a>
      </div>
    </main>
  );
}

function Section({ label, regen, children }: { label: string; regen: () => void; children: React.ReactNode }) {
  return (
    <section className="rounded-md border bg-white p-4">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="font-medium">{label}</h3>
        <button onClick={regen} className="rounded border px-2 py-1 text-sm">Regenerate</button>
      </div>
      {children}
    </section>
  );
}

