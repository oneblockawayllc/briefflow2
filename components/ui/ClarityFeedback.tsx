import React, { useMemo } from 'react';
import { CheckIcon } from '../icons/CheckIcon.tsx';
import { AlertCircleIcon } from '../icons/AlertCircleIcon.tsx';

interface ClarityFeedbackProps {
    text: string;
    hasKpi: boolean;
}

const ClarityFeedback: React.FC<ClarityFeedbackProps> = ({ text, hasKpi }) => {
    const feedback = useMemo(() => {
        if (!text || text.trim().length < 5) {
            return null;
        }

        let score = 0;
        let message = '';
        
        // Basic length check
        if (text.length > 10) score += 20;
        if (text.length > 30) score += 20;
        
        // Check for measurability (number or specific KPI)
        const isMeasurable = /\d/.test(text) || hasKpi;
        if (isMeasurable) score += 60;

        score = Math.min(100, score);
        
        const isSuccess = score >= 80;

        if (isSuccess) {
            message = 'This is a clear, measurable objective.';
        } else if (score >= 40) {
            message = isMeasurable ? 'Good start. Add more descriptive detail.' : 'Getting there. Add a measurable outcome.';
        } else {
            message = 'Objective could be more specific.';
        }
        
        const color = isSuccess ? 'bg-success' : 'bg-amber-DEFAULT';
        const icon = isSuccess ? <CheckIcon className="w-4 h-4 text-success" /> : <AlertCircleIcon className="w-4 h-4 text-amber-DEFAULT" />;

        return { score, message, color, icon };
    }, [text, hasKpi]);

    if (!feedback) return null;

    return (
        <div className="bg-surface border border-border p-sm rounded-md">
            <div className="flex items-center gap-sm text-caption text-text-secondary">
                {feedback.icon}
                <div className="flex-1">
                    <div className={`h-1 rounded-full ${feedback.color} transition-all duration-300`} style={{ width: `${feedback.score}%`}}></div>
                </div>
                <span className="w-48 text-right">{feedback.message}</span>
            </div>
        </div>
    );
};

export default ClarityFeedback;