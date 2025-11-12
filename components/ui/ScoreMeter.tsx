import React from 'react';
import Tooltip from './Tooltip.tsx';
import { InfoIcon } from '../icons/InfoIcon.tsx';

interface ScoreMeterProps {
  score: number;
  label: string;
  color: string;
  descriptor: string;
  tooltip?: string;
}

const ScoreMeter: React.FC<ScoreMeterProps> = ({ score, label, color, descriptor, tooltip }) => {
  const circumference = 2 * Math.PI * 20; // 2 * pi * radius
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="text-center">
      <div className="relative w-24 h-24 mx-auto">
        <svg className="w-full h-full" viewBox="0 0 50 50">
          <circle
            className="text-border"
            strokeWidth="5"
            stroke="currentColor"
            fill="transparent"
            r="20"
            cx="25"
            cy="25"
          />
          <circle
            className={color}
            strokeWidth="5"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="20"
            cx="25"
            cy="25"
            style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%', transition: 'stroke-dashoffset 0.5s ease-out' }}
          />
        </svg>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <span className="text-h2 text-text-primary font-bold">{score}</span>
        </div>
      </div>
       <div className="flex justify-center items-center mt-sm">
        <p className="text-caption font-semibold text-text-secondary">{label}</p>
        {tooltip && (
          <Tooltip content={tooltip}>
            <InfoIcon className="w-3.5 h-3.5 ml-xs text-text-secondary/70 cursor-help" />
          </Tooltip>
        )}
      </div>
      <p className={`text-caption font-medium ${color}`}>{descriptor}</p>
    </div>
  );
};

export default ScoreMeter;