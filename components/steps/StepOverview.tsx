import React from 'react';
import type { Brief, ProjectType } from '../../types.ts';
import Input from '../ui/Input.tsx';
import Textarea from '../ui/Textarea.tsx';
import { PROJECT_TYPES, STAKEHOLDERS } from '../../constants.ts';
import PersonSelector from '../ui/StakeholderSelector.tsx';
import Tooltip from '../ui/Tooltip.tsx';

interface StepOverviewProps {
  data: Brief;
  onUpdate: (updates: Partial<Brief>) => void;
  onChangeProjectType: (type: ProjectType) => void;
}

const ProjectTypeSelector: React.FC<{ data: Brief, onUpdate: (updates: Partial<Brief>) => void, onSelect: (type: ProjectType) => void }> = ({ data, onUpdate, onSelect }) => {
    const selectedProjectConfig = PROJECT_TYPES.find(p => p.id === data.projectType);

    const handleSubtypeToggle = (subtype: string) => {
        const newSubtypes = data.projectSubtypes.includes(subtype)
            ? data.projectSubtypes.filter(s => s !== subtype)
            : [...data.projectSubtypes, subtype];
        onUpdate({ projectSubtypes: newSubtypes });
    };

    return (
        <div>
            <div className="flex items-center mb-sm">
                <label className="block text-body font-medium text-text-primary">
                Project Type
                </label>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-md">
                {PROJECT_TYPES.map(({ id, name, description, icon: Icon }) => (
                    <Tooltip key={id} content={description} delay={2000}>
                        <button
                            onClick={() => onSelect(id)}
                            className={`group w-full flex flex-col items-center justify-center text-center p-md h-32 bg-white border rounded-xl transition-all duration-normal shadow-sm cursor-pointer hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary/50
                            ${data.projectType === id 
                            ? 'border-primary ring-2 ring-primary/30' 
                            : 'border-border hover:border-primary hover:ring-2 hover:ring-primary/30'
                            }`}
                        >
                            <Icon className="w-8 h-8 mb-sm text-primary" />
                            <span className="text-caption font-semibold text-text-primary px-1 h-11 flex items-center justify-center">{name}</span>
                        </button>
                    </Tooltip>
                ))}
            </div>
            {selectedProjectConfig && selectedProjectConfig.subtypes && (
                <div className="mt-lg pt-lg border-t border-border">
                    <h3 className="text-body font-medium text-text-primary mb-md">
                        Specify <span className="font-bold">{selectedProjectConfig.name}</span> Subtype(s) (optional)
                    </h3>
                    <div className="flex flex-wrap gap-sm">
                        {selectedProjectConfig.subtypes.map(subtype => (
                            <button
                                key={subtype}
                                onClick={() => handleSubtypeToggle(subtype)}
                                className={`px-md py-sm rounded-full border text-caption font-medium transition-colors ${data.projectSubtypes.includes(subtype) ? 'bg-primary text-white border-primary' : 'bg-surface border-border hover:border-slate'}`}
                            >
                                {data.projectSubtypes.includes(subtype) ? '✓ ' : '+ '}{subtype}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

const StepOverview: React.FC<StepOverviewProps> = ({ data, onUpdate, onChangeProjectType }) => {
  const agencyStakeholders = STAKEHOLDERS.filter(s => s.type === 'agency');
  return (
    <div className="space-y-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-xl">
        <div className="md:col-span-2">
           <ProjectTypeSelector data={data} onUpdate={onUpdate} onSelect={onChangeProjectType} />
        </div>
        <div className="md:col-span-2">
          <Input 
            label="Project Name" 
            id="projectName"
            value={data.projectName}
            onChange={(e) => onUpdate({ projectName: e.target.value })}
            placeholder="e.g., Website Redesign – Spring 2026 Launch"
          />
        </div>
        <div className="md:col-span-2">
          <Textarea 
            label="Project Description"
            id="description"
            value={data.description}
            onChange={(e) => onUpdate({ description: e.target.value })}
            placeholder="Summarize what this project is about and what success looks like."
          />
        </div>
        
        <Input 
          label="Budget Range"
          id="budgetRange"
          value={data.budgetRange}
          onChange={(e) => onUpdate({ budgetRange: e.target.value })}
          placeholder="Estimated range or target spend."
        />
        <Input
          label="Launch Date / Key Milestone"
          id="launchDate"
          value={data.launchDate}
          onChange={(e) => onUpdate({ launchDate: e.target.value })}
          placeholder="When does this need to go live or deliver impact?"
        />
        <PersonSelector
          label="Project Owner(s)"
          placeholder="Who’s leading the charge?"
          peoplePool={agencyStakeholders}
          selectedPeople={data.owners}
          onUpdate={(people) => onUpdate({ owners: people })}
        />
        <PersonSelector
          label="Key Stakeholders"
          placeholder="Select collaborators and reviewers..."
          peoplePool={STAKEHOLDERS}
          selectedPeople={data.stakeholders}
          onUpdate={(people) => onUpdate({ stakeholders: people })}
          showGroups
        />
      </div>
    </div>
  );
};

export default StepOverview;