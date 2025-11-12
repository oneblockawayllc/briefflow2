import React from 'react';
import type { Brief, WebsiteFunctionality } from '../types.ts';
import { SparklesIcon } from './icons/SparklesIcon.tsx';
import Button from './ui/Button.tsx';
import { EyeIcon } from './icons/EyeIcon.tsx';


interface SnapshotSummaryProps {
  brief: Brief;
  onEdit: (stepIndex: number) => void;
  onPreview?: () => void;
  isPreviewMode?: boolean;
  variant?: 'standalone' | 'embedded';
}

const Section: React.FC<{ title: string; stepIndex: number; onEdit: (stepIndex: number) => void; isPreviewMode?: boolean; variant: 'standalone' | 'embedded', children: React.ReactNode }> = ({ title, stepIndex, onEdit, isPreviewMode, variant, children }) => {
  const isStandalone = variant === 'standalone';

  return (
    <div className={isPreviewMode ? 'py-lg' : (isStandalone ? 'bg-white p-md rounded-lg border border-border' : '')}>
      <div className="flex justify-between items-center mb-md">
        <h3 className={`font-semibold ${isPreviewMode ? 'text-h3 text-text-primary' : 'text-text-primary'}`}>{title}</h3>
        {!isPreviewMode && <button onClick={() => onEdit(stepIndex)} className="text-sm font-medium text-primary hover:underline">Edit</button>}
      </div>
      <div className="text-body text-text-secondary space-y-sm prose prose-sm max-w-none">{children}</div>
    </div>
  );
};

const renderFunctionality = (func: WebsiteFunctionality, emptyState: React.ReactNode) => {
    const allItems = [
        ...func.functionality, 
        ...func.integrations, 
        ...func.accessibility, 
        ...func.pages
    ];

    if (allItems.length === 0) return emptyState;

    return (
        <ul className="list-disc list-inside pl-1">
            {func.pages.length > 0 && <li><strong className="text-text-primary">Pages:</strong> {func.pages.join(', ')}</li>}
            {func.functionality.length > 0 && <li><strong className="text-text-primary">Functionality:</strong> {func.functionality.join(', ')}</li>}
            {func.integrations.length > 0 && <li><strong className="text-text-primary">Integrations:</strong> {func.integrations.join(', ')}</li>}
            {func.accessibility.length > 0 && <li><strong className="text-text-primary">Accessibility:</strong> {func.accessibility.join(', ')}</li>}
        </ul>
    );
};

const renderSocialCampaign = (brief: Brief, emptyState: React.ReactNode) => {
    const { socialCampaign } = brief;
    if (!socialCampaign || socialCampaign.platforms.length === 0) return emptyState;

    const platformsWithFormats = socialCampaign.platforms
        .map(p => ({
            ...p,
            selectedFormats: p.formats.filter(f => f.selected)
        }))
        .filter(p => p.selectedFormats.length > 0);
    
    if (platformsWithFormats.length === 0) return emptyState;

    return (
        <ul className="list-none pl-1 space-y-xs">
            {platformsWithFormats.map(platform => (
                <li key={platform.id}>
                    <strong className="text-text-primary">{platform.name}:</strong>
                    <ul className="list-disc list-inside pl-md">
                        {platform.selectedFormats.map(format => (
                            <li key={format.id}>{format.name}</li>
                        ))}
                    </ul>
                </li>
            ))}
        </ul>
    );
};


const SnapshotSummary: React.FC<SnapshotSummaryProps> = ({ brief, onEdit, onPreview, isPreviewMode = false, variant = 'standalone' }) => {
  const itemStyle = isPreviewMode ? 'py-xs' : '';
  const emptyState = <span className="text-text-secondary/60">None</span>;
  const isOrganicSocial = brief.projectType === 'Campaign' && brief.projectSubtypes.includes('Organic Social') && !brief.projectSubtypes.includes('Paid Media');

  const summaryContent = (
    <>
      <Section title="Project Details" stepIndex={0} onEdit={onEdit} isPreviewMode={isPreviewMode} variant={variant}>
        <p className={itemStyle}><strong className="text-text-primary">Project Type:</strong> {brief.projectType || emptyState}</p>
        {brief.projectSubtypes.length > 0 && (
          <p className={itemStyle}><strong className="text-text-primary">Subtypes:</strong> {brief.projectSubtypes.join(', ')}</p>
        )}
        <p className={itemStyle}><strong className="text-text-primary">Name:</strong> {brief.projectName || emptyState}</p>
        <p className={itemStyle}><strong className="text-text-primary">Description:</strong> {brief.description || emptyState}</p>
        <p className={itemStyle}><strong className="text-text-primary">Owner(s):</strong> {brief.owners.length > 0 ? brief.owners.map(s => s.name).join(', ') : emptyState}</p>
        <p className={itemStyle}><strong className="text-text-primary">Stakeholders:</strong> {brief.stakeholders.length > 0 ? brief.stakeholders.map(s => s.name).join(', ') : emptyState}</p>
        <p className={itemStyle}><strong className="text-text-primary">Launch Date:</strong> {brief.launchDate || emptyState}</p>
      </Section>
      <Section title="Goals & KPIs" stepIndex={1} onEdit={onEdit} isPreviewMode={isPreviewMode} variant={variant}>
        <p className={itemStyle}><strong className="text-text-primary">Primary Objective:</strong> {brief.primaryObjective || emptyState}</p>
        <p className={itemStyle}><strong className="text-text-primary">KPI:</strong> {brief.kpiTemplate || emptyState}</p>
      </Section>
      <Section title="Audience & Key Insight" stepIndex={2} onEdit={onEdit} isPreviewMode={isPreviewMode} variant={variant}>
        <p className={itemStyle}><strong className="text-text-primary">Audience Description:</strong> {brief.targetAudience || emptyState}</p>
         <div className={itemStyle}><strong className="text-text-primary">Persona Documents:</strong> {brief.audienceDocuments.length > 0 ? (
          <ul className="list-disc list-inside pl-1">
            {brief.audienceDocuments.map(d => d.name && <li key={d.id}>{d.name}</li>)}
          </ul>
        ) : emptyState}
        </div>
        <p className={itemStyle}><strong className="text-text-primary">Key Tension:</strong> {brief.keyTension || emptyState}</p>
        <p className={itemStyle}><strong className="text-text-primary">Key Messaging:</strong> {brief.keyMessaging || emptyState}</p>
        <p className={itemStyle}><strong className="text-text-primary">Industry Insights:</strong> {brief.industryInsights || emptyState}</p>
        <div className={itemStyle}><strong className="text-text-primary">Industry Research:</strong> {brief.industryResearchDocuments.length > 0 ? (
          <ul className="list-disc list-inside pl-1">
            {brief.industryResearchDocuments.map(d => d.name && <li key={d.id}>{d.name}</li>)}
          </ul>
        ) : emptyState}
        </div>
        <p className={itemStyle}><strong className="text-text-primary">Proof Points:</strong> {brief.proofPoints || emptyState}</p>
      </Section>
      <Section title="Brand Identity" stepIndex={3} onEdit={onEdit} isPreviewMode={isPreviewMode} variant={variant}>
        <p className={itemStyle}><strong className="text-text-primary">Brand Voice:</strong> {brief.brandIdentityText || emptyState}</p>
        <div className={itemStyle}><strong className="text-text-primary">Brand Documents:</strong> {brief.brandGuidelines.length > 0 ? (
          <ul className="list-disc list-inside pl-1">
            {brief.brandGuidelines.map(d => d.name && <li key={d.id}>{d.name}</li>)}
          </ul>
        ) : emptyState}
        </div>
      </Section>
      <Section title="Deliverables" stepIndex={4} onEdit={onEdit} isPreviewMode={isPreviewMode} variant={variant}>
        {isOrganicSocial ? (
           <div className={itemStyle}>{renderSocialCampaign(brief, emptyState)}</div>
        ) : brief.projectType === 'Website' ? (
          <>
            <div className={itemStyle}><strong className="text-text-primary">UX Deliverables:</strong> {brief.uxDeliverables.length > 0 ? (
              <ul className="list-disc list-inside pl-1">
                {brief.uxDeliverables.map(d => <li key={d.id}>{d.name}</li>)}
              </ul>
            ) : emptyState}</div>
            <div className={itemStyle}><strong className="text-text-primary">Creative Deliverables:</strong> {brief.creativeDeliverables.length > 0 ? (
              <ul className="list-disc list-inside pl-1">
                {brief.creativeDeliverables.map(d => <li key={d.id}>{d.name}</li>)}
              </ul>
            ) : emptyState}</div>
             <div className={itemStyle}><strong className="text-text-primary">Functionality & Pages:</strong> {renderFunctionality(brief.functionality, emptyState)}</div>
          </>
        ) : (
          <div className={itemStyle}><strong className="text-text-primary">Deliverables:</strong> {brief.deliverables.filter(d => d.type).length > 0 ? (
            <ul className="list-disc list-inside pl-1">
              {brief.deliverables.map(d => d.type && <li key={d.id}><strong className="text-text-primary">{d.type}:</strong> {d.spec}</li>)}
            </ul>
          ) : emptyState}
          </div>
        )}
      </Section>
    </>
  );

  if (variant === 'embedded') {
    return (
      <div className="bg-surface border border-border rounded-xl shadow-sm flex flex-col overflow-hidden" style={{ height: '350px' }}>
        <div className="p-lg pb-0 flex-shrink-0">
          <div className="flex justify-between items-center mb-md">
            <h3 className="text-body font-semibold text-text-primary">Brief Snapshot</h3>
            <SparklesIcon className="w-5 h-5 text-primary" />
          </div>
        </div>

        <div className="flex-grow overflow-y-auto px-lg">
          <div className="space-y-md">
            {summaryContent}
          </div>
        </div>
        
        <div className="flex-shrink-0">
          <div className="h-lg bg-gradient-to-t from-surface to-transparent pointer-events-none -mb-lg"></div>
          <div className="p-lg pt-md bg-surface border-t border-border">
            <Button 
                onClick={onPreview} 
                variant="secondary" 
                className="w-full justify-center !border-completed/20 !text-completed hover:!bg-completed/10 hover:!border-completed/40" 
                aria-label="Preview my brief summary"
            >
                <EyeIcon className="w-4 h-4 mr-sm" />
                Preview My Brief
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-md ${isPreviewMode ? 'divide-y divide-border' : ''}`}>
      {summaryContent}
    </div>
  );
};

export default SnapshotSummary;