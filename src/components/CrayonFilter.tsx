import React from 'react';

export const CrayonFilter: React.FC<{ id?: string }> = ({ id = "crayon-filter" }) => (
    <svg width="0" height="0" className="absolute pointer-events-none">
        <filter id={id} x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" xChannelSelector="R" yChannelSelector="G" />
        </filter>
    </svg>
);
