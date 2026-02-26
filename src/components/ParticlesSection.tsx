import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Slogan from './Slogan';

const ParticlesSection: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });
    const dotOpacity = useTransform(scrollYProgress, [0.6, 0.7, 0.78, 0.85], [0, 1, 1, 0]);
    const dotScale = useTransform(scrollYProgress, [0.6, 0.7], [0.8, 1]);

    return (
        <section
            ref={containerRef}
            className="relative h-[500vh] w-full bg-paper-light"
        >
            {/* Sticky Container - Holds everything fixed while user scrolls through 500vh */}
            <div className="sticky top-0 h-screen w-full overflow-hidden bg-paper-light">
                {/* ═══════════ Slogan Content ═══════════ */}
                <div className="relative z-10 flex h-full items-center justify-center px-8 md:px-24">
                    <div className="max-w-4xl w-full flex flex-col items-center">
                        <motion.div
                            className="w-full flex justify-center"
                        >
                            <Slogan progress={scrollYProgress} />
                        </motion.div>

                        {/* Interactive Dot — visible during mid-section */}
                        <motion.div
                            className="mt-16"
                            style={{
                                opacity: dotOpacity,
                                scale: dotScale
                            }}
                        >
                            <div className="w-16 h-16 rounded-full border border-black/10 flex items-center justify-center group cursor-pointer hover:bg-black hover:border-black hover:text-white transition-all duration-700">
                                <div className="w-2 h-2 rounded-full bg-primary group-hover:scale-[8] transition-transform duration-500" />
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute bottom-12 left-12 font-mono text-[10px] text-black/20 uppercase tracking-[0.5em]">
                    Motion / State / Interaction
                </div>
            </div>
        </section>
    );
};

export default ParticlesSection;
