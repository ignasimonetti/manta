import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import ScrollDrawing from './ScrollDrawing';

const Hero: React.FC = () => {
    const { scrollY } = useScroll();
    const [vh, setVh] = React.useState(typeof window !== 'undefined' ? window.innerHeight : 800);

    const [targets, setTargets] = React.useState({ x: 0, y: 0 });

    React.useEffect(() => {
        const updateTargets = () => {
            setVh(window.innerHeight);
            const isMobile = window.innerWidth < 768;
            const padding = isMobile ? 24 : 48;
            const containerMax = 1280;

            const leftEdge = Math.max(padding, (window.innerWidth - containerMax) / 2);
            const navbarLogoOffset = isMobile ? -32 : -32;
            const navbarLogoWidth = isMobile ? 192 : 288;
            const targetX = (leftEdge + navbarLogoOffset + (navbarLogoWidth / 2)) - (window.innerWidth / 2);

            const navbarPadding = 12;
            const navbarHeight = isMobile ? 64 : 96;
            const targetY = (navbarPadding + (navbarHeight / 2)) - (window.innerHeight / 2);

            setTargets({ x: targetX, y: targetY });
        };

        updateTargets();
        window.addEventListener('resize', updateTargets);
        return () => window.removeEventListener('resize', updateTargets);
    }, []);

    // Animation phases — 3-Act Choreography
    // Act I: Drawing (0 -> 1.5vh) handled inside ScrollDrawing
    // Act II: Ascent (1.5vh -> 2.5vh)
    const logoY = useTransform(scrollY, [vh * 1.5, vh * 2.5], [0, targets.y]);
    const logoX = useTransform(scrollY, [vh * 1.5, vh * 2.5], [0, targets.x]);
    const logoScale = useTransform(scrollY, [vh * 1.5, vh * 2.5], [1, 0.60]);

    // Act III: Landing / Cross-fade (2.5vh -> 2.8vh)
    const logoOpacity = useTransform(scrollY, [vh * 2.5, vh * 2.7], [1, 0]);

    const flightSpring = { stiffness: 45, damping: 30, restDelta: 0.001 };
    const smoothLogoY = useSpring(logoY, flightSpring);
    const smoothLogoX = useSpring(logoX, flightSpring);
    const smoothLogoScale = useSpring(logoScale, flightSpring);

    return (
        <section className="relative w-full h-[300vh]">
            <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center z-10 overflow-hidden">
                <div className="relative w-full h-full flex justify-center items-center">
                    {/* The Drawing Core + Flight Animation — Pure cinematic stage */}
                    <motion.div
                        className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
                        style={{
                            y: smoothLogoY,
                            x: smoothLogoX,
                            scale: smoothLogoScale,
                            opacity: logoOpacity
                        }}
                    >
                        <ScrollDrawing />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
