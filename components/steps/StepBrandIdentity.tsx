import React from 'react';
import type { Brief, BrandDocument, Tone } from '../../types.ts';
import Textarea from '../ui/Textarea.tsx';
import Input from '../ui/Input.tsx';
import Button from '../ui/Button.tsx';
import Slider from '../ui/Slider.tsx';

interface StepBrandIdentityProps {
  data: Brief;
  onUpdate: (updates: Partial<Brief>) => void;
}

const StepBrandIdentity: React.FC<StepBrandIdentityProps> = ({ data, onUpdate }) => {
  const handleDocChange = (id: string, value: string) => {
    const newDocs = data.brandGuidelines.map(doc => 
      doc.id === id ? { ...doc, name: value } : doc
    );
    onUpdate({ brandGuidelines: newDocs });
  };

  const addDoc = () => {
    const newDoc: BrandDocument = { id: Date.now().toString(), name: '', type: 'LINK' };
    onUpdate({ brandGuidelines: [...data.brandGuidelines, newDoc] });
  };

  const removeDoc = (id: string) => {
    onUpdate({ brandGuidelines: data.brandGuidelines.filter(d => d.id !== id) });
  };
  
  const handleToneChange = (field: keyof Tone, value: number) => {
    onUpdate({ tone: { ...data.tone, [field]: value } });
  };

  return (
    <div className="space-y-2xl">
      <Textarea 
        label="Brand Voice & Personality"
        id="brandIdentityText"
        value={data.brandIdentityText}
        onChange={(e) => onUpdate({ brandIdentityText: e.target.value })}
        placeholder="Describe the brand’s character. Is it witty, authoritative, friendly, or something else? What are the do's and don'ts?"
        className="min-h-[160px]"
      />
      <div>
        <h3 className="text-body font-medium text-text-primary mb-sm">Brand Documents</h3>
        <div className="space-y-md">
          {data.brandGuidelines.map((doc, index) => (
            <div key={doc.id} className="grid grid-cols-1 md:grid-cols-[1fr,auto] gap-sm items-start">
              <Input 
                label={index === 0 ? "Document Name or Link" : ""} 
                id={`doc-name-${doc.id}`} 
                value={doc.name} 
                onChange={e => handleDocChange(doc.id, e.target.value)} 
                placeholder="e.g., Brand Guidelines PDF, Style Guide URL"
              />
              <div className="flex items-end h-full">
                 <button onClick={() => removeDoc(doc.id)} className={`text-text-secondary hover:text-error p-2 ${index === 0 ? 'mt-9' : 'mt-1'} h-10 w-10 transition-colors font-bold text-xl`} aria-label="Remove document">
                  &times;
                </button>
              </div>
            </div>
          ))}
          <Button onClick={addDoc} variant="secondary" size="small">
            + Add Document
          </Button>
        </div>
      </div>
       <div>
        <h3 className="text-body font-medium text-text-primary mb-sm">Brand Tone</h3>
        <div className="space-y-lg bg-surface p-lg rounded-lg border border-border">
          <Slider
            label="Formal vs. Playful"
            leftLabel="Formal"
            rightLabel="Playful"
            value={data.tone.formalPlayful}
            onChange={(e) => handleToneChange('formalPlayful', parseInt(e.target.value, 10))}
          />
          <Slider
            label="Minimal vs. Expressive"
            leftLabel="Minimal"
            rightLabel="Expressive"
            value={data.tone.minimalExpressive}
            onChange={(e) => handleToneChange('minimalExpressive', parseInt(e.target.value, 10))}
          />
        </div>
      </div>
    </div>
  );
};

export default StepBrandIdentity;