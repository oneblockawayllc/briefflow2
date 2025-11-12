import React from 'react';

export const StrategyIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 2a6 6 0 00-6 6c0 2.4 1.44 4.47 3.5 5.42V17h5v-3.58c2.06-.95 3.5-3.02 3.5-5.42a6 6 0 00-6-6z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8.5 17h7m-7 2h7m-5 2h3"
    />
  </svg>
);
