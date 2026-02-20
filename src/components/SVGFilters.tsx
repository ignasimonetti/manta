import React from 'react';

const SVGFilters: React.FC = () => {
    return (
        <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
            <defs>
                {/* Crayon Effect Filter: Creates a rough, textured edge for strokes */}
                <filter id="crayon-filter" x="-20%" y="-20%" width="140%" height="140%">
                    <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" stitchTiles="stitch" result="noise" />
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" xChannelSelector="R" yChannelSelector="G" />
                </filter>

                {/* Glassmorphism Noise Filter (Optional, can be used if CSS data-uri approach fails or for more complex noise) */}
                <filter id="noise-filter">
                    <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                </filter>
            </defs>
        </svg>
    );
};

export default SVGFilters;
