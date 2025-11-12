import React from 'react';
import ScoreMeter from './ui/ScoreMeter.tsx';
import { CheckIcon } from './icons/CheckIcon.tsx';
import { AlertCircleIcon } from './icons/AlertCircleIcon.tsx';
import { InfoIcon } from './icons/InfoIcon.tsx';
import { ArrowUpIcon } from './icons/ArrowUpIcon.tsx';
import Tooltip from './ui/Tooltip.tsx';
import { ProjectType } from '../types.ts';

interface BriefHealthWidgetProps {
  health: {
    clarityScore: number;
    brandMatchScore: number;
    subMetrics: { label: string; score: number }[];
    strategyLogicCheck: boolean;
  };
  projectType: ProjectType;
}

const SubMetric: React.FC<{ label: string; score: number }> = ({ label, score }) => {
  const scoreColor = score < 75 ? 'bg-amber-DEFAULT' : 'bg-success';
  return (
    <div>
      <div className="flex justify-between items-center mb-xs">
        <p className="text-caption text-text-secondary font-medium">{label}</p>
        <p className="text-caption text-text-primary font-semibold">{score}</p>
      </div>
      <div className="w-full bg-border rounded-full h-1">
        <div 
          className={`h-1 rounded-full ${scoreColor} transition-all duration-500`} 
          style={{ width: `${score}%` }}
        ></div>
      </div>
    </div>
  );
};

const getScoreDescriptor = (score: number): string => {
    if (score < 40) return 'Needs focus';
    if (score < 75) return 'Good start';
    return 'Very clear';
};

const getBrandMatchDescriptor = (score: number): string => {
    if (score < 50) return 'Needs alignment';
    if (score < 80) return 'Good alignment';
    return 'Strong alignment';
}

const BriefHealthWidget: React.FC<BriefHealthWidgetProps> = ({ health, projectType }) => {
  return (
    <div className="space-y-lg">
      <div className="bg-gradient-to-b from-background to-surface border border-border rounded-xl p-lg shadow-md">
        <div className="flex justify-between items-start mb-sm">
            <h3 className="text-h3 text-text-primary font-bold">Brief Health</h3>
            <Tooltip content="This AI-powered score analyzes your brief for clarity, completeness, and strategic alignment.">
                <InfoIcon className="w-5 h-5 text-text-secondary cursor-help" />
            </Tooltip>
        </div>
        {projectType && (
            <div className="mb-md text-center text-caption text-text-secondary bg-surface px-sm py-xs rounded-full w-fit mx-auto border border-border">
              Scoring calibrated for: <strong className="text-text-primary">{projectType}</strong>
            </div>
        )}
        
        <div className="grid grid-cols-2 gap-md">
            <ScoreMeter 
              score={health.clarityScore} 
              label="Clarity Score" 
              color="text-success"
              descriptor={getScoreDescriptor(health.clarityScore)}
              tooltip="Measures how clear and actionable your objectives, audience, and deliverables are."
            />
            <ScoreMeter 
              score={health.brandMatchScore} 
              label="Brand Match" 
              color="text-info"
              descriptor={getBrandMatchDescriptor(health.brandMatchScore)}
              tooltip="Measures alignment with your brand's specified tone of voice."
            />
        </div>

        {projectType && health.subMetrics.length > 0 && (
          <>
            <div className="mt-lg pt-lg border-t border-border space-y-md">
                {health.subMetrics.map(metric => (
                  <SubMetric key={metric.label} label={metric.label} score={metric.score} />
                ))}
            </div>
            
            <div className="mt-lg pt-lg border-t border-border">
                <div className="flex items-center mb-sm">
                  <h4 className="text-body font-semibold text-text-primary">Strategy Logic Check</h4>
                  <Tooltip content="Assesses the link between your objective, audience insight, and proof points.">
                      <InfoIcon className="w-4 h-4 ml-sm text-text-secondary cursor-help" />
                  </Tooltip>
                </div>
                {health.strategyLogicCheck ? (
                    <div className="flex items-center text-caption text-success bg-success/10 p-sm rounded-lg">
                        <CheckIcon className="w-5 h-5 mr-sm" />
                        <p>Objective → Insight → Proof Point chain is logically sound.</p>
                    </div>
                ) : (
                    <div className="flex items-center text-caption text-amber-DEFAULT bg-amber-DEFAULT/10 p-sm rounded-lg">
                        <AlertCircleIcon className="w-5 h-5 mr-sm" />
                        <p>Strengthen the link between your objective, insight, and proof points.</p>
                    </div>
                )}
            </div>
          </>
        )}
      </div>

      <div className="bg-background border border-border rounded-xl p-md shadow-sm">
        <h3 className="font-medium text-body text-text-primary">Performance Tracker</h3>
        <div className="mt-sm text-caption text-text-secondary space-y-xs">
            <div className="flex justify-between items-center">
                <span>Avg. Clarity Improvement</span>
                <span className="flex items-center font-medium text-success">
                    <ArrowUpIcon className="w-3 h-3 mr-xs"/>
                    +18%
                </span>
            </div>
            <div className="flex justify-between items-center">
                <span>Rebrief Reduction</span>
                <span className="flex items-center font-medium text-success">
                    <ArrowUpIcon className="w-3 h-3 mr-xs"/>
                    -25%
                </span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default BriefHealthWidget;