import React from 'react';
import type { Brief } from '../../types.ts';
import SnapshotSummary from '../SnapshotSummary.tsx';

interface StepReviewProps {
  data: Brief;
  onJumpToStep: (stepIndex: number) => void;
}

const StepReview: React.FC<StepReviewProps> = ({ data, onJumpToStep }) => {
  return (
    <div className="space-y-xl">
      <SnapshotSummary brief={data} onEdit={onJumpToStep} />
    </div>
  );
};

export default StepReview;