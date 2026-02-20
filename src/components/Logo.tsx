import React from 'react';

interface LogoProps {
    className?: string;
    variant?: 'dark' | 'light';
    style?: React.CSSProperties;
}

/**
 * Manta Logo Component - Dual Image Strategy
 * Uses two distinct SVG files based on the background context.
 * 
 * - variant="dark": Used on light backgrounds. Displays the colored/dark version.
 *   Source: /public/logo-color-vector.svg
 * - variant="light": Used on dark backgrounds. Displays the white/inverted version.
 *   Source: /public/logo-white-vector.svg
 */
export const Logo: React.FC<LogoProps> = ({ className = "h-8 w-auto", variant = "dark", style }) => {
    // Swapped per user request:
    // variant 'dark' (Light BG context) -> White Logo
    // variant 'light' (Dark BG context) -> Color Logo
    const src = variant === 'dark' ? '/logo-white-vector.svg' : '/logo-color-vector.svg';

    return (
        <img
            src={src}
            alt="Manta Logo"
            className={className}
            style={{
                objectFit: 'contain',
                ...style // Allow style overrides if necessary
            }}
            draggable={false}
        />
    );
};
