import React from 'react';
import { StepConfig } from '../types.ts';

interface ProgressBarProps {
  steps: StepConfig[];
  currentStepIndex: number;
  onJumpToStep: (index: number) => void;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ steps, currentStepIndex, onJumpToStep }) => {
  // Progress is calculated based on the number of steps completed.
  // currentStepIndex is 0-based, so we add 1.
  const progressPercentage = ((currentStepIndex + 1) / steps.length) * 100;

  return (
    // A relative container is used to position the progress track underneath the tabs.
    <div className="relative">
      {/* The nav is now a grid with 6 equal columns to ensure even distribution and proportionality. */}
      <nav className="grid grid-cols-6 text-center" aria-label="Tabs">
        {steps.map((step, index) => {
          const isCompleted = index < currentStepIndex;
          const isActive = index === currentStepIndex;
          const isEnabled = isCompleted || isActive;

          return (
            <button
              key={step.tabTitle}
              onClick={() => isEnabled && onJumpToStep(index)}
              // The bottom border is removed from the buttons; state is shown via text color.
              className={`whitespace-nowrap py-4 px-1 font-medium text-sm transition-colors duration-fast focus:outline-none focus:ring-2 focus:ring-primary/50
                ${isActive
                  ? 'text-primary'
                  : isCompleted
                  ? 'text-text-secondary hover:text-text-primary'
                  : 'text-text-secondary cursor-not-allowed opacity-60'
                }
                ${isEnabled && !isActive ? 'cursor-pointer' : ''}
              `}
              aria-current={isActive ? 'step' : undefined}
              disabled={!isEnabled}
            >
              {step.tabTitle}
            </button>
          );
        })}
      </nav>
      
      {/* This container holds the progress bar, positioned at the bottom of the relative parent. */}
      <div className="absolute bottom-0 left-0 w-full h-[3px]">
        {/* The unfilled portion of the track, providing a background for the progress. */}
        <div className="absolute w-full h-full bg-border/60 rounded-full"></div>
        {/* The filled portion of the track, which animates its width based on progress. */}
        <div
          className="absolute h-full bg-primary rounded-full transition-all duration-slow ease-out"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;