import React from 'react';

interface MantaLogoProps {
    className?: string;
    variant?: 'dark' | 'white';
}

const MantaLogo: React.FC<MantaLogoProps> = ({ className, variant = 'dark' }) => {
    // Usamos el logo vectorizado disponible para mejor integración
    const src = variant === 'dark' ? '/logo-color-vector.svg' : '/logo-white-vector.svg';

    return (
        <div className={`flex items-center justify-center ${className || ''}`}>
            <img
                src={src}
                alt="Manta Logo"
                className="w-full h-full object-contain"
                onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                }}
            />
        </div>
    );
};

export default MantaLogo;
