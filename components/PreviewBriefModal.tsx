import React, { useState } from 'react';
import type { Brief } from '../types.ts';
import SnapshotSummary from './SnapshotSummary.tsx';
import { DownloadIcon } from './icons/DownloadIcon.tsx';
import { ClipboardIcon } from './icons/ClipboardIcon.tsx';
import { CheckIcon } from './icons/CheckIcon.tsx';
import Button from './ui/Button.tsx';

interface PreviewBriefModalProps {
  brief: Brief;
  health: {
    clarityScore: number;
    brandMatchScore: number;
  };
  onClose: () => void;
  onJumpToStep: (index: number) => void;
}

const PreviewBriefModal: React.FC<PreviewBriefModalProps> = ({ brief, health, onClose, onJumpToStep }) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopySummary = () => {
    let deliverablesSummary = '';
    const isOrganicSocial = brief.projectType === 'Campaign' && brief.projectSubtypes.includes('Organic Social') && !brief.projectSubtypes.includes('Paid Media');

    if (isOrganicSocial) {
      deliverablesSummary = brief.socialCampaign.platforms.map(p => {
        const selectedFormats = p.formats.filter(f => f.selected);
        if (selectedFormats.length === 0) return '';
        return `* ${p.name}:\n` + selectedFormats.map(f => `  - ${f.name} (${f.spec})`).join('\n');
      }).filter(Boolean).join('\n') || 'None specified';
    } else if (brief.projectType === 'Website') {
        const ux = brief.uxDeliverables.map(d => `- UX: ${d.name} (${d.spec || 'no spec'})`).join('\n');
        const creative = brief.creativeDeliverables.map(d => `- Creative: ${d.name}`).join('\n');
        // FIX: Add Array.isArray check to safely access properties on `value`.
        const functionality = Object.entries(brief.functionality).map(([key, value]) => 
            Array.isArray(value) && value.length > 0 ? `- ${key.charAt(0).toUpperCase() + key.slice(1)}: ${value.join(', ')}` : null
        ).filter(Boolean).join('\n');
        deliverablesSummary = [ux, creative, functionality].filter(Boolean).join('\n');
    } else {
        deliverablesSummary = brief.deliverables.filter(d => d.type).map(d => `- ${d.type}: ${d.spec || 'N/A'}`).join('\n') || 'None specified';
    }

    const summaryText = `
Project Type: ${brief.projectType || 'N/A'}
Project: ${brief.projectName || 'N/A'}
Description: ${brief.description || 'N/A'}

Primary Objective: ${brief.primaryObjective || 'N/A'}
KPI: ${brief.kpiTemplate || 'N/A'}

Target Audience: ${brief.targetAudience || 'N/A'}
Audience Documents: ${brief.audienceDocuments.map(d => d.name).join(', ') || 'None'}
Key Tension: ${brief.keyTension || 'N/A'}
Key Messaging: ${brief.keyMessaging || 'N/A'}
Industry Insights: ${brief.industryInsights || 'N/A'}
Industry Research: ${brief.industryResearchDocuments.map(d => d.name).join(', ') || 'None'}
Proof Points: ${brief.proofPoints || 'N/A'}

Brand Voice: ${brief.brandIdentityText || 'N/A'}
Brand Documents: ${brief.brandGuidelines.map(d => d.name).join(', ') || 'None'}

Deliverables:
${deliverablesSummary}
    `.trim().replace(/    /g, '');
      
    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const modalTitle = brief.projectType ? `${brief.projectType} Brief Preview` : 'Brief Preview';

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-lg"
      onClick={onClose}
    >
      <div 
        className="bg-background rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] flex flex-col border border-border"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-lg border-b border-border flex justify-between items-center">
          <div>
            <h2 className="text-h3 text-text-primary">{modalTitle}</h2>
            <p className="text-body text-text-secondary">A presentation-ready summary of your brief.</p>
          </div>
          <div className="flex items-center gap-lg">
            <div className="text-center">
                <p className="text-caption text-text-secondary">Clarity</p>
                <p className="text-h2 text-primary">{health.clarityScore}</p>
            </div>
             <div className="text-center">
                <p className="text-caption text-text-secondary">Brand Match</p>
                <p className="text-h2 text-info">{health.brandMatchScore}</p>
            </div>
          </div>
        </div>
        <div className="p-xl overflow-y-auto bg-surface">
          <SnapshotSummary brief={brief} onEdit={onJumpToStep} isPreviewMode={true} />
        </div>
        <div className="p-md bg-surface border-t border-border flex justify-between items-center">
           <div className="flex gap-sm">
            <Button
              onClick={handleCopySummary}
              variant="secondary"
              size="small"
              className="w-36 justify-center"
            >
              {copied ? (
                <>
                  <CheckIcon className="w-4 h-4 text-success"/>
                  Copied!
                </>
              ) : (
                <>
                  <ClipboardIcon className="w-4 h-4"/>
                  Copy Summary
                </>
              )}
            </Button>
             <Button variant="secondary" size="small">
              <DownloadIcon className="w-4 h-4"/>
              Download PDF
            </Button>
          </div>
          <Button onClick={onClose} variant="primary">
            Close Preview
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PreviewBriefModal;