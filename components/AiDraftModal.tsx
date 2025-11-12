import React from 'react';
import Button from './ui/Button.tsx';

interface AiDraftModalProps {
  draft: string | null;
  isLoading: boolean;
  onClose: () => void;
}

const AiDraftModal: React.FC<AiDraftModalProps> = ({ draft, isLoading, onClose }) => {
  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-lg"
      onClick={onClose}
    >
      <div 
        className="bg-background rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] flex flex-col border border-border"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-lg border-b border-border flex justify-between items-center">
          <h2 className="text-h3 text-text-primary">AI-Generated Draft Summary</h2>
          <button onClick={onClose} className="text-text-secondary hover:text-text-primary transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-xl overflow-y-auto">
          {isLoading && (
            <div className="flex flex-col items-center justify-center text-center text-text-secondary min-h-[200px]">
              <svg className="animate-spin h-8 w-8 text-primary mb-md" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="font-medium text-text-primary">Synthesizing your brief...</p>
              <p className="text-caption mt-xs">turning strategy into structure.</p>
            </div>
          )}
          {draft && (
            <div className="prose prose-sm max-w-none text-text-primary" dangerouslySetInnerHTML={{ __html: draft }}></div>
          )}
        </div>
        <div className="p-md bg-surface border-t border-border flex justify-end gap-sm">
          <Button onClick={onClose} variant="tertiary">
            Close
          </Button>
          <Button variant="secondary">
            Copy to Clipboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AiDraftModal;