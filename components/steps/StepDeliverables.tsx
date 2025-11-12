import React from 'react';
import type { Brief, Deliverable } from '../../types.ts';
import Input from '../ui/Input.tsx';
import Button from '../ui/Button.tsx';

interface StepDeliverablesProps {
  data: Brief;
  onUpdate: (updates: Partial<Brief>) => void;
}

const StepDeliverables: React.FC<StepDeliverablesProps> = ({ data, onUpdate }) => {
  
  const handleDeliverableChange = (id: string, field: keyof Omit<Deliverable, 'id'>, value: string) => {
    const newDeliverables = data.deliverables.map(d => 
      d.id === id ? { ...d, [field]: value } : d
    );
    onUpdate({ deliverables: newDeliverables });
  };
  
  const addDeliverable = () => {
    const newDeliverable = { id: Date.now().toString(), type: '', spec: '' };
    onUpdate({ deliverables: [...data.deliverables, newDeliverable] });
  };
  
  const removeDeliverable = (id: string) => {
    onUpdate({ deliverables: data.deliverables.filter(d => d.id !== id) });
  };
  
  return (
    <div className="space-y-2xl">
      <div>
        <h3 className="text-h3 text-text-primary mb-xl">Deliverables</h3>
        <div className="space-y-md">
          {data.deliverables.map((deliverable, index) => (
            <div key={deliverable.id} className="grid grid-cols-1 md:grid-cols-[1fr,1fr,auto] gap-sm items-start">
              <Input 
                label={index === 0 ? "Type" : ""} 
                id={`type-${deliverable.id}`} 
                value={deliverable.type} 
                onChange={e => handleDeliverableChange(deliverable.id, 'type', e.target.value)} 
                placeholder="e.g., Homepage Redesign, Podcast Script"
                tooltip={index === 0 ? "Options shown here reflect the typical outputs for your selected project type." : undefined}
              />
              <Input 
                label={index === 0 ? "Spec/Format" : ""} 
                id={`spec-${deliverable.id}`} 
                value={deliverable.spec} 
                onChange={e => handleDeliverableChange(deliverable.id, 'spec', e.target.value)} 
                placeholder="e.g., 90s video, 1440px hero image"
              />
              <div className="flex items-end h-full">
                 <button onClick={() => removeDeliverable(deliverable.id)} className={`text-text-secondary hover:text-error p-2 ${index === 0 ? 'mt-9' : 'mt-1'} h-10 w-10 transition-colors font-bold text-xl`} aria-label="Remove deliverable">
                  &times;
                </button>
              </div>
            </div>
          ))}
          <Button onClick={addDeliverable} variant="secondary" size="small">
            + Add Deliverable
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StepDeliverables;