import React, { useState, useRef, useEffect, useCallback } from 'react';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  delay?: number; // in ms
}

const Tooltip: React.FC<TooltipProps> = ({ content, children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [positionClasses, setPositionClasses] = useState('bottom-full mb-sm');
  const [transformClasses, setTransformClasses] = useState('left-1/2 -translate-x-1/2');

  const wrapperRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number | null>(null);

  const clearTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const showTooltip = useCallback(() => {
    clearTimer();
    timeoutRef.current = window.setTimeout(() => {
      setIsVisible(true);
    }, delay);
  }, [delay, clearTimer]);

  const hideTooltip = useCallback(() => {
    clearTimer();
    setIsVisible(false);
  }, [clearTimer]);

  useEffect(() => {
    if (isVisible && tooltipRef.current && wrapperRef.current) {
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const wrapperRect = wrapperRef.current.getBoundingClientRect();
      const PADDING = 8;

      // Vertical positioning
      if (wrapperRect.top - tooltipRect.height - PADDING < 0) {
        setPositionClasses('top-full mt-sm'); // Flip to bottom
      } else {
        setPositionClasses('bottom-full mb-sm'); // Default top
      }

      // Horizontal positioning
      const centerPos = wrapperRect.left + wrapperRect.width / 2;
      const tooltipWidth = tooltipRect.width;

      if (centerPos - tooltipWidth / 2 < PADDING) {
        setTransformClasses('left-0 translate-x-0');
      } else if (centerPos + tooltipWidth / 2 > window.innerWidth - PADDING) {
        setTransformClasses('right-0 translate-x-0');
      } else {
        setTransformClasses('left-1/2 -translate-x-1/2');
      }
    }
  }, [isVisible]);

  useEffect(() => () => clearTimer(), [clearTimer]);
  
  return (
    <div 
        ref={wrapperRef} 
        className="relative inline-block"
        onMouseEnter={showTooltip} 
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
    >
      {children}
      <div
        ref={tooltipRef}
        className={`absolute w-max max-w-xs px-md py-sm font-medium text-caption rounded-base transition-all duration-200 ease-in-out pointer-events-none z-20 bg-surface border border-border text-deep-green shadow-tooltip
        ${positionClasses} ${transformClasses}
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}`}
        role="tooltip"
      >
        {content}
      </div>
    </div>
  );
};

export default Tooltip;