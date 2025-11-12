import React from 'react';

export const InstagramIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect width="20" height="20" x="2" y="2" stroke="currentColor" strokeWidth="2" rx="6"></rect>
        <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2"></circle>
        <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"></circle>
    </svg>
);