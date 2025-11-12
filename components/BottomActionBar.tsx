import React, { useState, useEffect } from 'react';
import { STEPS } from '../constants.ts';
import { Brief } from '../types.ts';
import Button from './ui/Button.tsx';
import { ChevronRightIcon } from './icons/ChevronRightIcon.tsx';
import HealthIndicator from './HealthIndicatorVariations.tsx';

interface BottomActionBarProps {
  onNext: () => void;
  onPrev: () => void;
  onGenerate: () => void;
  currentStepIndex: number;
  completionPercentage: number;
  brief: Brief;
  health: {
    clarityScore: number;
    brandMatchScore: number;
  };
}

const BottomActionBar: React.FC<BottomActionBarProps> = ({ 
  onNext, onPrev, onGenerate, currentStepIndex, health, brief
}) => {
  const [showAutosave, setShowAutosave] = useState(false);

  useEffect(() => {
    setShowAutosave(true);
    const timer = setTimeout(() => {
      setShowAutosave(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, [brief]);

  const isLastStep = currentStepIndex === STEPS.length - 1;
  const nextStepTitle = STEPS[currentStepIndex + 1]?.tabTitle;

  return (
    <footer className="sticky bottom-0 w-full bg-background/80 backdrop-blur-md border-t border-border z-10">
      <div className="max-w-[1400px] mx-auto px-lg py-md flex justify-between items-center">
        <div className="w-1/3">
          <HealthIndicator brief={brief} score={health.clarityScore} />
        </div>

        <div className="w-1/3 flex justify-center items-center">
            <div className={`transition-opacity duration-slow ${showAutosave ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
              <p className="text-caption text-primary">Saved — clarity’s catching up with you.</p>
            </div>
        </div>
        
        <div className="w-1/3 flex justify-end items-center gap-sm">
          {currentStepIndex > 0 && (
            <Button onClick={onPrev} variant="tertiary" size="default">
              Go Back
            </Button>
          )}

          {isLastStep ? (
            <Button onClick={onGenerate} variant="primary" size="default">
              Generate My Brief
            </Button>
          ) : (
            <Button onClick={onNext} variant="primary" size="default">
              {currentStepIndex === STEPS.length - 2 ? 'Review My Brief' : `Continue to ${nextStepTitle}`}
              <ChevronRightIcon className="w-4 h-4 ml-1" />
            </Button>
          )}
        </div>
      </div>
    </footer>
  );
};

export default BottomActionBar;