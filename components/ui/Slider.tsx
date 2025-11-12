import React from 'react';

interface SliderProps {
  label: string;
  leftLabel: string;
  rightLabel: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Slider: React.FC<SliderProps> = ({ label, leftLabel, rightLabel, value, onChange }) => {
  // A helper to style the range input track and thumb consistently across browsers
  const rangeInputStyle = `
    w-full h-1 bg-border rounded-lg appearance-none cursor-pointer
    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary
    [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:border-none
  `;
  
  return (
    <div>
      <label className="block text-body font-medium text-text-primary mb-sm">{label}</label>
      <div className="flex items-center gap-md">
        <span className="text-caption text-text-secondary w-20 text-right">{leftLabel}</span>
        <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={onChange}
          className={rangeInputStyle}
        />
        <span className="text-caption text-text-secondary w-20">{rightLabel}</span>
      </div>
    </div>
  );
};

export default Slider;