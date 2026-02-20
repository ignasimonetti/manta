import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

import { TextShimmerWave } from './TextShimmerWave';

const VideoShowcase: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
    const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

    return (
        <section
            ref={containerRef}
            className="relative w-full h-[80vh] md:h-screen bg-black overflow-hidden flex items-center justify-center p-4 md:p-12 font-sans"
        >
            {/* Background Video with Grain and Overlay */}
            <motion.div
                className="relative w-full h-full rounded-[2rem] md:rounded-[4rem] overflow-hidden shadow-2xl"
                style={{ scale, opacity }}
            >
                {/* The Video */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                >
                    <source src="/videos/manta-showcase.mp4" type="video/mp4" />
                </video>

                {/* Dark Vignette / Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 pointer-events-none" />

                {/* Noise/Grain Texture */}
                <div className="noise-bg opacity-30 pointer-events-none" />

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="max-w-xl space-y-4"
                    >
                        <div className="inline-flex items-center backdrop-blur-md bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                            <TextShimmerWave className="font-mono text-[9px] uppercase tracking-[0.4em]">
                                Showcase / 001
                            </TextShimmerWave>
                        </div>

                        <h2 className="font-display text-4xl md:text-6xl text-white font-bold tracking-tight">
                            Estética en <br />
                            <span className="text-white/90 italic font-light">Movimiento</span>
                        </h2>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
};

export default VideoShowcase;
