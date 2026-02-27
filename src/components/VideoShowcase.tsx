import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

import { TextShimmerWave } from './TextShimmerWave';

const VideoShowcase: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);
    const rotate = useTransform(scrollYProgress, [0, 1], [-2, 2]);

    return (
        <section
            ref={containerRef}
            className="relative w-full min-h-screen bg-paper-light overflow-hidden flex flex-col items-center justify-center py-32 px-6 md:px-12 font-sans border-t border-black/10"
        >
            {/* Header / Stamp */}
            <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
                <div className="flex flex-col gap-4">
                    <div className="inline-flex items-center border border-black px-4 py-2 bg-paper-light hatch-shadow-sm">
                        <TextShimmerWave className="font-mono text-[10px] uppercase tracking-[0.4em] text-black font-bold">
                            Showcase / 001
                        </TextShimmerWave>
                    </div>
                    <h2 className="font-display text-5xl md:text-7xl lg:text-8xl text-black font-bold tracking-tight uppercase leading-none">
                        Estética<br />
                        <span className="italic font-normal">en Movimiento</span>
                    </h2>
                </div>

                <div className="md:max-w-xs font-mono text-[10px] uppercase tracking-[0.2em] text-black/40 leading-relaxed text-left md:text-right border-l-2 md:border-l-0 md:border-r-2 border-primary pl-4 md:pl-0 md:pr-4">
                    Capturando la esencia orgánica en formatos digitales rígidos. Un manifiesto visual.
                </div>
            </div>

            {/* Video Frame - The "Printed Photo" */}
            <motion.div
                className="relative w-full max-w-7xl aspect-[16/9] md:aspect-[21/9] bg-black border-2 border-black hatch-shadow z-10"
                style={{ scale, rotate }}
            >
                {/* The Video */}
                <video
                    autoPlay={true}
                    loop={true}
                    muted={true}
                    playsInline={true}
                    disablePictureInPicture={true}
                    controlsList="nodownload nofullscreen noremoteplayback"
                    poster="/videos/manta-showcase-poster.jpg"
                    className="absolute inset-0 w-full h-full object-cover grayscale opacity-90 contrast-125"
                >
                    <source src="/videos/manta-showcase.mp4" type="video/mp4" />
                </video>

                {/* Optional: Static Noise Overlay to make it feel printed */}
                <div className="absolute inset-0 noise-bg opacity-40 mix-blend-overlay pointer-events-none" />

                {/* Inner Border for framing */}
                <div className="absolute inset-4 border border-white/20 pointer-events-none" />
            </motion.div>

            {/* Decorative background elements */}
            <div className="absolute top-1/2 left-0 w-full h-px bg-black/5 -z-10" />
            <div className="absolute top-0 left-1/4 w-px h-full bg-black/5 -z-10" />

        </section>
    );
};

export default VideoShowcase;
