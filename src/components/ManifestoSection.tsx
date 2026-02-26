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
    const inkRotate = useTransform(scrollYProgress, [0, 1], [-10, 20]);
    const textY = useTransform(scrollYProgress, [0, 1], [80, -80]);

    // Custom Underline Paths - Hand Drawn Woodblock feel
    const humanPath = "M 5,18 Q 50,8 100,18 T 200,12 T 295,18";
    const liquidPath = "M 5,15 H 295"; // Technical Straight line

    return (
        <section ref={containerRef} id="enfoque" className="relative min-h-screen py-32 overflow-hidden bg-paper-light flex flex-col items-center justify-center">

            {/* Background Layer: Large Ink Splatters */}
            <motion.div
                className="absolute inset-0 pointer-events-none opacity-20"
                style={{ rotate: inkRotate, scale: 1.2 }}
            >
                <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] ink-wash opacity-30 rotate-12" />
                <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] ink-wash opacity-20 -rotate-12" />

                {/* Technical Blueprint elements cross-pollinating */}
                <div className="absolute inset-0 opacity-5" style={{
                    backgroundImage: 'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)',
                    backgroundSize: '100px 100px'
                }} />
            </motion.div>

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-0 items-center relative"
                    style={{ y: textY }}
                >

                    {/* Vertical Divider — Desktop Only */}
                    <div className="hidden md:block absolute left-1/2 top-[10%] bottom-[15%] w-px bg-gradient-to-b from-transparent via-black/10 to-transparent -translate-x-1/2 z-0" />
                    <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 border border-black/20 rotate-45 bg-paper-light z-10" />

                    {/* Column 1: The Stamp (Human Side) — Right-aligned */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-right space-y-8 pr-0 md:pr-16"
                    >
                        <div className="flex flex-col items-end">
                            {/* Label Mono */}
                            <div className="mb-4 flex items-center gap-3 justify-end">
                                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary">El Sello</span>
                                <span className="text-[10px] text-black/20">/</span>
                                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary">Gesto</span>
                            </div>

                            <h2 className="font-display text-5xl lg:text-7xl font-bold text-black relative inline-block leading-tight">
                                <ScribbleText
                                    text="Garabato"
                                    path={humanPath}
                                    color="#D9026D"
                                    underlineClassName="opacity-50"
                                    delay={0.5}
                                />
                                <br />
                                <span>Humano</span>
                            </h2>
                        </div>

                        {/* Organic SVG Illustration */}
                        <div className="flex justify-end">
                            <motion.div
                                className="w-32 h-32 relative opacity-70"
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 0.7, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.2, delay: 0.3 }}
                            >
                                <svg className="w-full h-full text-black" fill="none" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                                    <motion.path
                                        d="M40 100C40 100 60 40 100 60C140 80 160 140 100 160C60 180 20 120 60 80C90 50 150 40 170 90"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="3"
                                        initial={{ pathLength: 0 }}
                                        whileInView={{ pathLength: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 2, delay: 0.6, ease: [0.45, 0, 0.55, 1] }}
                                    />
                                    <motion.path
                                        d="M50 150C70 140 90 130 110 150"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeWidth="2"
                                        initial={{ pathLength: 0 }}
                                        whileInView={{ pathLength: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1, delay: 1.8, ease: "easeOut" }}
                                    />
                                    <motion.circle
                                        cx="140" cy="50" r="4"
                                        fill="currentColor"
                                        initial={{ opacity: 0, scale: 0 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: 2.2 }}
                                    />
                                    <motion.path
                                        d="M120 120L150 140"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeWidth="3"
                                        initial={{ pathLength: 0 }}
                                        whileInView={{ pathLength: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8, delay: 2.5 }}
                                    />
                                </svg>
                            </motion.div>
                        </div>

                        <p className="font-sans text-lg lg:text-xl text-black/60 leading-relaxed max-w-md ml-auto font-normal">
                            Creemos en la belleza cruda y desordenada de la mano humana. El <span className="italic font-semibold text-black">boceto rápido</span>, el accidente feliz. Es donde reside el alma: imperfecta y única.
                        </p>
                    </motion.div>

                    {/* Column 2: The Ink (Technical Side) — Left-aligned */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                        className="text-left space-y-8 pl-0 md:pl-16 mt-12 md:mt-0"
                    >
                        <div className="flex flex-col items-start">
                            {/* Label Mono */}
                            <div className="mb-4 flex items-center gap-3">
                                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-black/40">El Código</span>
                                <span className="text-[10px] text-black/20">/</span>
                                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-black/40">Fluidez</span>
                            </div>

                            <h2 className="font-display text-5xl lg:text-7xl font-bold text-black relative inline-block leading-tight">
                                <span>Fluidez</span>
                                <br />
                                <ScribbleText
                                    text="Líquida"
                                    path={liquidPath}
                                    color="#000"
                                    underlineClassName="opacity-20"
                                    delay={0.8}
                                />
                            </h2>
                        </div>

                        {/* Geometric SVG Illustration */}
                        <div className="flex justify-start">
                            <motion.div
                                className="w-32 h-32 relative opacity-70"
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 0.7, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.2, delay: 0.5 }}
                            >
                                <svg className="w-full h-full text-black" fill="none" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                                    <motion.circle
                                        cx="100" cy="100" r="60"
                                        stroke="currentColor"
                                        strokeWidth="1"
                                        initial={{ pathLength: 0 }}
                                        whileInView={{ pathLength: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1.5, delay: 0.6 }}
                                    />
                                    <motion.circle
                                        cx="100" cy="100" r="40"
                                        stroke="currentColor"
                                        strokeDasharray="4 4"
                                        strokeWidth="1"
                                        initial={{ pathLength: 0 }}
                                        whileInView={{ pathLength: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1.2, delay: 1 }}
                                    />
                                    <motion.line
                                        x1="100" y1="20" x2="100" y2="180"
                                        stroke="currentColor"
                                        strokeWidth="1"
                                        initial={{ pathLength: 0 }}
                                        whileInView={{ pathLength: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8, delay: 1.4 }}
                                    />
                                    <motion.line
                                        x1="20" y1="100" x2="180" y2="100"
                                        stroke="currentColor"
                                        strokeWidth="1"
                                        initial={{ pathLength: 0 }}
                                        whileInView={{ pathLength: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8, delay: 1.6 }}
                                    />
                                    <motion.rect
                                        x="85" y="85" width="30" height="30"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        initial={{ pathLength: 0 }}
                                        whileInView={{ pathLength: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: 1.8 }}
                                    />
                                    <motion.circle
                                        cx="100" cy="100" r="2"
                                        fill="currentColor"
                                        initial={{ opacity: 0, scale: 0 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: 2.2 }}
                                    />
                                    <motion.circle
                                        cx="160" cy="100" r="4"
                                        stroke="currentColor"
                                        strokeWidth="1"
                                        initial={{ pathLength: 0 }}
                                        whileInView={{ pathLength: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: 2.4 }}
                                    />
                                </svg>
                            </motion.div>
                        </div>

                        <p className="font-sans text-lg lg:text-xl text-black/60 leading-relaxed max-w-md mr-auto font-normal">
                            Aprovechamos la <span className="italic font-semibold text-black">precisión algorítmica</span> para dar forma al caos. Transiciones orgánicas e ingeniería impecable. Es donde vive la fiabilidad técnica.
                        </p>
                    </motion.div>

                </motion.div>
            </div>
        </section>
    );
};

export default ManifestoSection;
