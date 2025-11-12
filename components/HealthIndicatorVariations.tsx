import React, { useState, useMemo } from 'react';
import { Brief } from '../types.ts';
import { SparklesIcon } from './icons/SparklesIcon.tsx';
import { GoalsIcon } from './icons/GoalsIcon.tsx';
import { AudienceIcon } from './icons/AudienceIcon.tsx';
import { ToneIcon } from './icons/ToneIcon.tsx';
import { CheckCircleIcon } from './icons/CheckCircleIcon.tsx';
import { WarningTriangleIcon } from './icons/WarningTriangleIcon.tsx';


interface HealthIndicatorProps {
  score: number;
  brief: Brief;
}

const HealthIndicator: React.FC<HealthIndicatorProps> = ({ score, brief }) => {
  const [isHovered, setIsHovered] = useState(false);

  const { label, microcopy, gradient, textColor, badgeBg } = useMemo(() => {
    if (score <= 40) return { 
      label: 'Needs Focus', 
      microcopy: 'Add more detail to sharpen intent.',
      gradient: 'from-amber-DEFAULT to-amber-to',
      textColor: 'text-amber-to',
      badgeBg: 'bg-amber-DEFAULT/10',
    };
    if (score <= 70) return { 
      label: 'Taking Shape', 
      microcopy: 'Solid foundation — tighten focus.',
      gradient: 'from-secondary-DEFAULT to-secondary-to',
      textColor: 'text-secondary-to',
      badgeBg: 'bg-secondary-DEFAULT/10',
    };
    if (score <= 90) return { 
      label: 'Strong Alignment', 
      microcopy: 'Aligned and actionable.',
      gradient: 'from-primary to-primary-highlight',
      textColor: 'text-primary',
      badgeBg: 'bg-primary/10',
    };
    return { 
      label: 'Crystal Clear', 
      microcopy: 'Clarity achieved — ready to brief.',
      gradient: 'from-primary to-primary-glow',
      textColor: 'text-primary',
      badgeBg: 'bg-primary/10',
    };
  }, [score]);

  const diagnostics = useMemo(() => {
    const checks = [];
    // Goals Check
    const objectiveLength = brief.primaryObjective.trim().length;
    const hasKpi = brief.kpiTemplate.trim().length > 5;
    if (objectiveLength > 20 && hasKpi) {
      checks.push({ icon: GoalsIcon, label: 'Objectives are clear and measurable.', status: 'good' });
    } else if (objectiveLength > 10) {
      checks.push({ icon: GoalsIcon, label: 'Goals need a more specific KPI.', status: 'warn' });
    } else {
       checks.push({ icon: GoalsIcon, label: 'Objectives need more detail.', status: 'warn' });
    }

    // Audience Check
    const audienceLength = brief.targetAudience.trim().length;
    const tensionLength = brief.keyTension.trim().length;
    if (audienceLength > 30 && tensionLength > 15) {
      checks.push({ icon: AudienceIcon, label: 'Audience definition is specific.', status: 'good' });
    } else {
      checks.push({ icon: AudienceIcon, label: 'Audience lacks specificity.', status: 'warn' });
    }
    
    // Tone Check (example logic)
    if (Math.abs(brief.tone.formalPlayful - 50) < 20 && Math.abs(brief.tone.minimalExpressive - 50) < 20) {
      checks.push({ icon: ToneIcon, label: 'Tone has good alignment.', status: 'good' });
    } else {
      checks.push({ icon: ToneIcon, label: 'Tone seems misaligned for a general audience.', status: 'warn' });
    }

    return checks;
  }, [brief]);

  return (
    <div 
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`absolute bottom-full left-0 mb-sm w-[320px] bg-surface border border-border rounded-xl shadow-lg transition-all duration-300 ease-in-out ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
        <div className={`h-1.5 bg-gradient-to-r ${gradient} rounded-t-xl`}></div>
        <div className="p-md space-y-sm">
          {diagnostics.map((diag, index) => (
            <div key={index} className="flex items-start">
              <diag.icon className={`w-4 h-4 mr-sm mt-0.5 ${diag.status === 'good' ? 'text-primary' : 'text-amber-DEFAULT'}`} />
              <p className="text-caption text-text-secondary">{diag.label}</p>
              <div className="ml-auto pl-sm">
                {diag.status === 'good' ? <CheckCircleIcon className="w-5 h-5 text-primary" /> : <WarningTriangleIcon className="w-5 h-5 text-amber-DEFAULT" />}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-sm p-1 pr-md bg-surface rounded-full border border-border shadow-sm w-fit">
          <div className="flex items-center">
            <SparklesIcon className="w-5 h-5 text-primary ml-sm mr-xs" />
            <span className="text-sm font-medium text-text-primary">Brief Health</span>
          </div>
          <div className={`w-14 h-6 ${badgeBg} rounded-full flex items-center justify-center`}>
            <span className={`text-base font-semibold ${textColor}`}>{score}</span>
          </div>
          <span className={`text-sm italic ${textColor}`}>{label}</span>
        </div>
        <p className="text-caption text-text-secondary mt-xs ml-sm">{microcopy}</p>
      </div>
    </div>
  );
};

export default HealthIndicator;
