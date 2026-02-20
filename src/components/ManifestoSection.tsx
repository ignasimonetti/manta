import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

import ScribbleText from './ScribbleText';

const ManifestoSection: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Parallax effects
    const scribbleRotate = useTransform(scrollYProgress, [0, 1], [0, 45]);
    const textY = useTransform(scrollYProgress, [0, 1], [100, -100]);

    // Custom Underline Paths
    const humanPath = "M 5,15 Q 45,10 90,15 T 180,15 T 295,15"; // Shaky-ish
    const liquidPath = "M 5,12 C 50,22 100,2 150,12 C 200,22 250,2 295,12"; // Sine wave

    return (
        <section ref={containerRef} id="enfoque" className="relative min-h-screen py-32 overflow-hidden bg-cloud-dancer flex flex-col items-center justify-center">

            {/* Background Layer: Rotating Scribble */}
            <motion.div
                className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none"
                style={{ rotate: scribbleRotate }}
            >
                <svg viewBox="0 0 100 100" className="w-[120vw] h-[120vw] stroke-deep-charcoal fill-none stroke-[0.5]">
                    <path d="M10,50 Q25,25 40,50 T70,50 T90,50" />
                    <path d="M10,30 Q30,60 50,30 T90,30" style={{ transform: 'rotate(15deg)', transformOrigin: 'center' }} />
                    <path d="M15,70 Q40,40 60,70 T85,70" style={{ transform: 'rotate(-10deg)', transformOrigin: 'center' }} />
                    {/* Add more random paths for a 'messy' scribble look */}
                    <circle cx="50" cy="50" r="30" strokeDasharray="4 4" />
                    <path d="M20,20 C40,10 60,90 80,80" />
                </svg>
            </motion.div>

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 items-center"
                    style={{ y: textY }}
                >
                    {/* Column 1: Human Scribble */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-right md:text-right space-y-6"
                    >
                        <h2 className="font-display text-4xl md:text-6xl font-bold text-deep-charcoal relative inline-block">
                            <ScribbleText
                                text="Garabato Humano"
                                path={humanPath}
                                color="rgba(255, 0, 255, 0.4)"
                                underlineClassName="crayon-effect opacity-80"
                                delay={0.8}
                            />
                        </h2>
                        <p className="font-sans text-lg md:text-xl text-deep-charcoal/70 leading-relaxed max-w-md ml-auto">
                            Creemos en la belleza cruda y desordenada de la mano humana. La chispa inicial, el boceto rápido, el accidente feliz. Es donde reside el alma: imperfecta, única y profundamente personal.
                        </p>
                    </motion.div>

                    {/* Divider Line (Mobile: Horizontal, Desktop: Vertical) */}
                    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-deep-charcoal/10" />

                    {/* Column 2: Liquid Flow */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        className="text-left space-y-6"
                    >
                        <h2 className="font-display text-4xl md:text-6xl font-bold text-deep-charcoal relative inline-block">
                            <ScribbleText
                                text="Fluidez Líquida"
                                path={liquidPath}
                                color="rgba(96, 165, 250, 0.4)"
                                underlineClassName="blur-[0.5px]"
                                delay={1.1}
                            />
                        </h2>
                        <p className="font-sans text-lg md:text-xl text-deep-charcoal/70 leading-relaxed max-w-md mr-auto">
                            Aprovechamos la precisión del código para dar forma al caos. Transiciones suaves, grillas responsivas e ingeniería impecable. Es donde vive la fiabilidad: escalable, rápida y ejecutada a la perfección.
                        </p>
                    </motion.div>

                </motion.div>
            </div>
        </section>
    );
};

export default ManifestoSection;
