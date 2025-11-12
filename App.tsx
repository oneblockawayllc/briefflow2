import React, { useState, useMemo, useEffect } from 'react';
import MarkdownIt from 'markdown-it';
import { Brief, ProjectType, StepConfig } from './types.ts';
import { STEPS, CONTEXTUAL_CONFIG } from './constants.ts';
import ProgressBar from './components/ProgressBar.tsx';
import BottomActionBar from './components/BottomActionBar.tsx';
import AiDraftModal from './components/AiDraftModal.tsx';
import PreviewBriefModal from './components/PreviewBriefModal.tsx';
import ChangeTypeConfirmationModal from './components/ChangeTypeConfirmationModal.tsx';
import StepOverview from './components/steps/StepOverview.tsx';
import StepObjectives from './components/steps/StepObjectives.tsx';
import StepAudience from './components/steps/StepAudience.tsx';
import StepBrandIdentity from './components/steps/StepBrandIdentity.tsx';
import StepDeliverables from './components/steps/StepDeliverables.tsx';
import StepReview from './components/steps/StepReview.tsx';
import { generateBriefSummary } from './services/geminiService.ts';
import { InfoIcon } from './components/icons/InfoIcon.tsx';
import SnapshotSummary from './components/SnapshotSummary.tsx';
import StepWebsiteDeliverables from './components/steps/StepWebsiteDeliverables.tsx';
import StepSocialCampaign from './components/steps/StepSocialCampaign.tsx';

const initialBrief: Brief = {
  projectType: '',
  projectSubtypes: [],
  projectName: '',
  description: '',
  budgetRange: '',
  launchDate: '',
  owners: [],
  stakeholders: [],
  primaryObjective: '',
  secondaryObjective: '',
  kpiTemplate: '',
  targetAudience: '',
  audienceDocuments: [],
  keyTension: '',
  keyMessaging: '',
  industryInsights: '',
  industryResearchDocuments: [],
  proofPoints: '',
  brandIdentityText: '',
  brandGuidelines: [],
  deliverables: [{ id: '1', type: '', spec: '' }],
  tone: {
    formalPlayful: 50,
    minimalExpressive: 50,
  },
  uxDeliverables: [],
  creativeDeliverables: [],
  functionality: {
    functionality: [],
    integrations: [],
    accessibility: [],
    pages: [],
  },
  socialCampaign: {
    platforms: [],
  }
};

const DEFAULT_GENERATION_ERROR_MESSAGE = `We couldn’t generate your brief because the Gemini API did not return usable content.\n\nCommon fixes:\n• Confirm that your Gemini API key is set correctly.\n• Remove or rephrase sensitive content that may trigger Gemini safety filters.\n• Try again in a few minutes in case the Gemini service is temporarily unavailable.`;

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const buildGenerationErrorHtml = (message?: string): string => {
  const messageToUse = message && message.trim().length > 0
    ? message.trim()
    : DEFAULT_GENERATION_ERROR_MESSAGE;
  const paragraphs = messageToUse.split(/\n{2,}/).map(section => {
    const escaped = escapeHtml(section);
    const withLineBreaks = escaped.replace(/\n/g, '<br />');
    return `<p class="text-body text-text-secondary">${withLineBreaks}</p>`;
  });

  return `<div class="space-y-md"><h3 class="text-h3 font-semibold text-text-primary">We couldn't generate your brief</h3>${paragraphs.join('')}</div>`;
};

const calculateBriefHealth = (brief: Brief) => {
    let clarityScore = 0;
    const fields = [
      brief.projectName, brief.description, brief.primaryObjective,
      brief.targetAudience, brief.keyTension, brief.proofPoints,
      brief.brandIdentityText, brief.keyMessaging, brief.industryInsights
    ];
    const filledCount = fields.filter(f => f && f.trim().length > 5).length;
    clarityScore += (filledCount / fields.length) * 50;
    
    if (brief.audienceDocuments.length > 0) clarityScore += 2;
    if (brief.industryResearchDocuments.length > 0) clarityScore += 2;

    const subMetrics = CONTEXTUAL_CONFIG[brief.projectType || 'Other'].subMetrics(brief);
    const avgSubMetricScore = subMetrics.length > 0 ? subMetrics.reduce((acc, curr) => acc + curr.score, 0) / subMetrics.length : 0;
    clarityScore += avgSubMetricScore * 0.5;

    const brandMatchScore = 100 - Math.abs(brief.tone.formalPlayful - 40) - Math.abs(brief.tone.minimalExpressive - 60);

    return {
        clarityScore: Math.min(100, Math.round(clarityScore)),
        brandMatchScore: Math.round(brandMatchScore),
    };
};

const GuidancePanel: React.FC<{ title: string; body: string; tip: string; }> = ({ title, body, tip }) => (
    <div className="bg-surface border border-border rounded-xl p-lg shadow-sm space-y-md">
      <div>
        <div className="flex items-center mb-sm">
          <InfoIcon className="w-5 h-5 text-primary mr-sm" />
          <h3 className="text-body font-semibold text-text-primary">Guidance</h3>
        </div>
        <h4 className="font-semibold text-body text-text-primary">{title}</h4>
      </div>
      <p className="text-body text-text-secondary">{body}</p>
      <div className="bg-background border border-border rounded-md p-sm">
        <p className="text-caption text-text-secondary"><strong className="font-medium text-text-primary">Tip:</strong> {tip}</p>
      </div>
    </div>
);

const App: React.FC = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [brief, setBrief] = useState<Brief>(initialBrief);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedDraft, setGeneratedDraft] = useState<string | null>(null);
  const [isAiDraftModalOpen, setIsAiDraftModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [isChangeTypeModalOpen, setIsChangeTypeModalOpen] = useState(false);
  const [pendingProjectType, setPendingProjectType] = useState<ProjectType | null>(null);
  const [dynamicGuidance, setDynamicGuidance] = useState<Partial<StepConfig> | null>(null);

  useEffect(() => {
    setDynamicGuidance(null);
  }, [currentStepIndex]);

  const briefHealth = useMemo(() => calculateBriefHealth(brief), [brief]);

  const isBriefPristine = useMemo(() => {
    return !brief.projectType && !brief.projectName && !brief.description && brief.projectSubtypes.length === 0;
  }, [brief]);

  const handleUpdate = (updates: Partial<Brief>) => {
    setBrief(prev => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    if (currentStepIndex < STEPS.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
      window.scrollTo(0, 0);
    }
  };
  
  const handleJumpToStep = (index: number) => {
    if(index >= 0 && index < STEPS.length) {
      setCurrentStepIndex(index);
      window.scrollTo(0, 0);
    }
  }

  const handleChangeProjectType = (newType: ProjectType) => {
    if (brief.projectType && brief.projectType !== newType && !isBriefPristine) {
      setPendingProjectType(newType);
      setIsChangeTypeModalOpen(true);
    } else {
      handleUpdate({ projectType: newType, projectSubtypes: [] });
    }
  };

  const handleConfirmChangeType = () => {
    if (pendingProjectType) {
      handleUpdate({ projectType: pendingProjectType, projectSubtypes: [] });
    }
    setIsChangeTypeModalOpen(false);
    setPendingProjectType(null);
  };
  
  const runPreflightCheck = (): boolean => {
    const errors: string[] = [];
    if (!brief.projectType) errors.push('Project Type must be selected.');
    if (!brief.projectName) errors.push('Project Name is missing.');
    if (!brief.description) errors.push('Description is missing.');
    if (!brief.primaryObjective) errors.push('Primary Objective is missing.');
    if (!brief.targetAudience) errors.push('Target Audience is missing.');
    
    const isOrganicSocial = brief.projectType === 'Campaign' && brief.projectSubtypes.includes('Organic Social') && !brief.projectSubtypes.includes('Paid Media');

    if (isOrganicSocial) {
      if (brief.socialCampaign.platforms.length === 0 || !brief.socialCampaign.platforms.some(p => p.formats.some(f => f.selected))) {
        errors.push('At least one platform and one format must be selected for a social campaign.');
      }
    } else if (brief.projectType === 'Website') {
        if (brief.uxDeliverables.length === 0 && brief.creativeDeliverables.length === 0 && brief.functionality.pages.length === 0) {
            errors.push('At least one deliverable is required for a website project.')
        }
    } else {
        if (brief.deliverables.filter(d => d.type).length === 0) errors.push('At least one Deliverable type is required.');
    }
    
    // Silently return status, UI for errors is handled by Preview modal for now.
    return errors.length === 0;
  };

  const handleGenerate = async () => {
    if(runPreflightCheck()) {
        setIsGenerating(true);
        setIsAiDraftModalOpen(true);
        setGeneratedDraft(null);
        try {
            const summary = await generateBriefSummary(brief);
            if (summary && summary.trim().length > 0) {
                const md = new MarkdownIt();
                setGeneratedDraft(md.render(summary));
            } else {
                setGeneratedDraft(buildGenerationErrorHtml());
            }
        } catch (error) {
            console.error(error);
            const message = error instanceof Error ? error.message : undefined;
            setGeneratedDraft(buildGenerationErrorHtml(message));
        } finally {
            setIsGenerating(false);
        }
    } else {
        alert("Please fill in all required fields before finishing.");
    }
  };
  
  const handlePreview = () => {
      setIsPreviewModalOpen(true);
  }

  const handleReset = () => {
    setCurrentStepIndex(0);
    setBrief(initialBrief);
    setGeneratedDraft(null);
    setIsAiDraftModalOpen(false);
    setIsPreviewModalOpen(false);
    setIsChangeTypeModalOpen(false);
    setPendingProjectType(null);
  };

  const completionPercentage = useMemo(() => {
    const fields = [
      brief.projectType, brief.projectName, brief.description, brief.budgetRange, brief.launchDate,
      brief.primaryObjective, brief.kpiTemplate,
      brief.targetAudience, brief.keyTension, brief.keyMessaging, brief.industryInsights, brief.proofPoints, brief.brandIdentityText,
    ];
    let filledFields = fields.filter(f => typeof f === 'string' && f.trim() !== '').length;
    if (brief.owners.length > 0) filledFields++;
    if (brief.stakeholders.length > 0) filledFields++;
    if (brief.audienceDocuments.length > 0) filledFields++;
    if (brief.industryResearchDocuments.length > 0) filledFields++;
    if (brief.brandGuidelines.length > 0) filledFields++;

    const isOrganicSocial = brief.projectType === 'Campaign' && brief.projectSubtypes.includes('Organic Social') && !brief.projectSubtypes.includes('Paid Media');

    if (isOrganicSocial) {
      if (brief.socialCampaign.platforms.length > 0) filledFields++;
      if (brief.socialCampaign.platforms.some(p => p.formats.some(f => f.selected))) filledFields++;
    } else if (brief.projectType === 'Website') {
      if (brief.uxDeliverables.length > 0 || brief.creativeDeliverables.length > 0 || brief.functionality.pages.length > 0) filledFields += 2;
    } else {
      if (brief.deliverables[0]?.type) filledFields++;
      if (brief.deliverables[0]?.spec) filledFields++;
    }

    const totalFields = fields.length + 7;
    return Math.min(100, Math.round((filledFields / totalFields) * 100));
  }, [brief]);

  const renderProjectScopeStep = () => {
    const isWebsite = brief.projectType === 'Website';
    const isOrganicSocial = brief.projectType === 'Campaign' && brief.projectSubtypes.includes('Organic Social') && !brief.projectSubtypes.includes('Paid Media');

    if (isOrganicSocial) {
        return <StepSocialCampaign data={brief} onUpdate={handleUpdate} />;
    }
    if (isWebsite) {
        return <StepWebsiteDeliverables data={brief} onUpdate={handleUpdate} onSetGuidance={setDynamicGuidance} />;
    }
    return <StepDeliverables data={brief} onUpdate={handleUpdate} />;
  };

  const stepComponents = [
    <StepOverview data={brief} onUpdate={handleUpdate} onChangeProjectType={handleChangeProjectType} />,
    <StepObjectives data={brief} onUpdate={handleUpdate} />,
    <StepAudience data={brief} onUpdate={handleUpdate} />,
    <StepBrandIdentity data={brief} onUpdate={handleUpdate} />,
    renderProjectScopeStep(),
    <StepReview data={brief} onJumpToStep={handleJumpToStep} />
  ];

  const baseStepInfo = brief.projectType === 'Website' && currentStepIndex === 4
    ? CONTEXTUAL_CONFIG.Website.step_deliverables_guidance
    : STEPS[currentStepIndex];
    
  const currentStepInfo = {
      ...baseStepInfo,
      ...dynamicGuidance
  };

  return (
    <div className="min-h-screen font-sans flex flex-col">
      <main className="flex-grow max-w-[1400px] w-full mx-auto py-xl px-lg relative">
        <div className="mb-xl">
          <div 
            onClick={handleReset} 
            className="text-xl font-semibold text-text-primary cursor-pointer w-fit mb-lg transition-colors hover:text-primary"
            title="Reset and start a new brief"
          >
            BriefFlow
          </div>

          <header>
            <h1 className="text-h1 text-text-primary">Create a New Brief</h1>
            <p className="text-body text-text-secondary mt-1">Fill in the details below to generate a comprehensive project brief.</p>
          </header>
        </div>


        <ProgressBar steps={STEPS} currentStepIndex={currentStepIndex} onJumpToStep={handleJumpToStep} />

        <div className="mt-xl grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-2xl items-start">
          <div className="bg-white border border-border rounded-xl shadow-sm relative transition-colors duration-slow">
            <div className="p-xl">
              <h2 className="text-h2 text-text-primary">{currentStepInfo.header}</h2>
              <p className="text-body text-text-secondary mt-1 mb-xl">{currentStepInfo.subHeader}</p>
              {stepComponents[currentStepIndex]}
            </div>
          </div>
          <div className="space-y-lg self-start sticky top-24">
            <GuidancePanel 
              title={currentStepInfo.guidanceTitle} 
              body={currentStepInfo.guidanceBody} 
              tip={currentStepInfo.guidanceTip} 
            />
            {isBriefPristine ? (
                <div className="bg-surface border border-border rounded-xl p-lg shadow-sm">
                  <h3 className="text-body font-semibold text-text-primary">Brief Snapshot</h3>
                  <p className="text-caption text-text-secondary mt-md">Fill out the brief to see a summary.</p>
                </div>
              ) : (
                <SnapshotSummary 
                  brief={brief} 
                  onEdit={handleJumpToStep} 
                  onPreview={handlePreview} 
                  variant="embedded" 
                />
              )}
          </div>
        </div>
      </main>
      <BottomActionBar 
        onNext={handleNext}
        onPrev={handlePrev}
        onGenerate={handleGenerate}
        currentStepIndex={currentStepIndex}
        completionPercentage={completionPercentage}
        brief={brief}
        health={briefHealth}
      />
      {isAiDraftModalOpen && (
        <AiDraftModal 
          draft={generatedDraft}
          isLoading={isGenerating}
          onClose={() => setIsAiDraftModalOpen(false)}
        />
      )}
      {isPreviewModalOpen && (
        <PreviewBriefModal
          brief={brief}
          health={briefHealth}
          onClose={() => setIsPreviewModalOpen(false)}
          onJumpToStep={handleJumpToStep}
        />
      )}
      {isChangeTypeModalOpen && (
        <ChangeTypeConfirmationModal
          onClose={() => setIsChangeTypeModalOpen(false)}
          onConfirm={handleConfirmChangeType}
        />
      )}
    </div>
  );
};

export default App;