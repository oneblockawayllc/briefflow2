
import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon.tsx';
import { InfoIcon } from './icons/InfoIcon.tsx';
import Button from './ui/Button.tsx';

interface InsightSuggestionModalProps {
  isLoading: boolean;
  insights: string[];
  onClose: () => void;
  onSelect: (insight: string) => void;
}

const InsightCard: React.FC<{ text: string; onSelect: () => void }> = ({ text, onSelect }) => (
    <button
        onClick={onSelect}
        className="w-full p-md text-left bg-surface border border-border rounded-md hover:bg-primary/10 hover:border-primary transition-all duration-normal group"
    >
        <p className="text-body text-text-primary group-hover:text-primary">{text}</p>
    </button>
)

const InsightSuggestionModal: React.FC<InsightSuggestionModalProps> = ({ isLoading, insights, onClose, onSelect }) => {
  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-lg"
      onClick={onClose}
    >
      <div 
        className="bg-background rounded-lg shadow-lg w-full max-w-lg border border-border"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-lg border-b border-border">
          <h2 className="flex items-center text-h3 text-text-primary">
            <SparklesIcon className="w-6 h-6 mr-sm text-primary"/>
            AI-Generated Insight Suggestions
          </h2>
        </div>
        <div className="p-lg">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center text-center text-text-secondary min-h-[200px]">
                <svg className="animate-spin h-8 w-8 text-primary mb-md" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p>One sec… brewing insights.</p>
            </div>
          ) : (
            <div className="space-y-sm">
                {insights.length > 0 ? (
                    insights.map((insight, i) => (
                        <InsightCard key={i} text={insight} onSelect={() => onSelect(insight)} />
                    ))
                ) : (
                    <p className="text-caption text-center text-text-secondary">No suggestions could be generated. Try refining your objective or audience.</p>
                )}
            </div>
          )}
           <div className="group relative mt-md">
                <p className="flex items-center justify-center text-caption text-text-secondary cursor-pointer">
                    <InfoIcon className="w-3 h-3 mr-xs" />
                    AI Source Info
                </p>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-sm w-max p-sm text-caption text-white bg-text-primary rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    Insights are generated based on anonymized trend data and creative strategy patterns.
                </div>
            </div>
        </div>
        <div className="p-md bg-surface border-t border-border flex justify-end">
          <Button onClick={onClose} variant="tertiary">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InsightSuggestionModal;