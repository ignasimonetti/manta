import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TextGenerateEffect } from './TextGenerateEffect';
import { MouseTilt } from './MouseTilt';

const VideoLight: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const scale = useTransform(scrollYProgress, [0, 0.4], [0.8, 1]);
    const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
    const y = useTransform(scrollYProgress, [0, 0.4], [100, 0]);

    return (
        <section ref={containerRef} className="relative w-full min-h-[70vh] py-20 px-4 md:px-8 overflow-hidden bg-white">
            <motion.div
                style={{ scale, opacity, y }}
                className="relative w-full h-[60vh] md:h-[80vh] rounded-[40px] overflow-hidden shadow-2xl"
            >
                {/* Background Video */}
                <video
                    autoPlay={true}
                    loop={true}
                    muted={true}
                    playsInline={true}
                    disablePictureInPicture={true}
                    controlsList="nodownload nofullscreen noremoteplayback"
                    className="absolute inset-0 w-full h-full object-cover"
                >
                    <source src="/videos/manta-showcase-light.mp4" type="video/mp4" />
                </video>

                {/* Light Overlay - Glassmorphism Effect */}
                <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px] mix-blend-soft-light" />
                <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/40" />

                {/* Grain Texture (Subtle for light mode) */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="space-y-4"
                    >
                        <span className="inline-block px-4 py-1 rounded-full border border-deep-charcoal/20 text-deep-charcoal text-[10px] tracking-[0.3em] uppercase font-medium bg-white/50 backdrop-blur-sm">
                            Claridad y Propósito
                        </span>
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-deep-charcoal tracking-tighter leading-none">
                            Línea <span className="italic font-light text-primary">Clara</span> en <br /> Ejecución Digital
                        </h2>

                        <MouseTilt strength={8} className="mt-8">
                            <TextGenerateEffect
                                words="Transparencia radical en cada proceso. Convertimos la complejidad en soluciones visualmente puras y funcionalmente impecables."
                                className="text-deep-charcoal font-sans text-sm md:text-base max-w-lg mx-auto tracking-wide opacity-90"
                                delay={0.8}
                            />
                        </MouseTilt>
                    </motion.div>
                </div>

                {/* Bottom Branding */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 opacity-40">
                    <div className="w-8 h-[1px] bg-deep-charcoal" />
                    <span className="text-[9px] uppercase tracking-[0.4em] text-deep-charcoal font-normal font-montserrat">MANTA STUDIO</span>
                    <div className="w-8 h-[1px] bg-deep-charcoal" />
                </div>
            </motion.div>
        </section>
    );
};

export default VideoLight;
