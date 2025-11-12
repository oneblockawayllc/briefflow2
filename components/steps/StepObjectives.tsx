import React from 'react';
import type { Brief } from '../../types.ts';
import Input from '../ui/Input.tsx';
import Textarea from '../ui/Textarea.tsx';
import { CONTEXTUAL_CONFIG } from '../../constants.ts';

interface StepObjectivesProps {
  data: Brief;
  onUpdate: (updates: Partial<Brief>) => void;
}

const StepObjectives: React.FC<StepObjectivesProps> = ({ data, onUpdate }) => {
  const config = CONTEXTUAL_CONFIG[data.projectType || 'Other'];
  
  return (
    <div className="space-y-xl">
      <div className="grid grid-cols-1 gap-xl">
        <Textarea 
          label="Primary Objective"
          id="primaryObjective"
          value={data.primaryObjective}
          onChange={(e) => onUpdate({ primaryObjective: e.target.value })}
          placeholder="What’s the single most important thing this project needs to achieve?"
        />
        <Textarea 
            label="Secondary Objective"
            id="secondaryObjective"
            value={data.secondaryObjective}
            onChange={(e) => onUpdate({ secondaryObjective: e.target.value })}
            placeholder="Any nice-to-have outcomes or supporting goals?"
        />
        <Input 
            label="Key Performance Indicator (KPI)"
            id="kpiTemplate"
            value={data.kpiTemplate}
            onChange={(e) => onUpdate({ kpiTemplate: e.target.value })}
            placeholder="How will you know you’ve succeeded? (e.g., conversion rate, engagement lift, brand recall)."
            tooltip="Your project type influences which KPIs are most relevant."
        />
      </div>
    </div>
  );
};

export default StepObjectives;