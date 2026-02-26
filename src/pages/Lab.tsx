import React from 'react';
import { motion } from 'framer-motion';
import { Beaker, Binary, Sparkles } from 'lucide-react';
import Navbar from '../components/Navbar';
import FooterSignature from '../components/FooterSignature';

const Lab: React.FC = () => {

    return (
        <div className="relative min-h-screen bg-paper-light selection:bg-primary/20 overflow-x-hidden">
            <Navbar />

            {/* Main Content with padding for Navbar */}
            <main className="relative pt-32 pb-20">
                {/* Background Textures & Grids */}
                <div className="absolute inset-0 pointer-events-none opacity-30"
                    style={{ backgroundImage: 'radial-gradient(circle, #000 0.5px, transparent 0.5px)', backgroundSize: '32px 32px' }}
                />

                {/* Watercolor "Gesto" - Inspired by Stitch, breathed by Manta */}
                <motion.div
                    className="absolute top-[10%] right-[-5%] w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none z-0 opacity-20"
                    style={{ background: 'radial-gradient(circle, var(--color-ink-magenta) 0%, transparent 70%)' }}
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.15, 0.25, 0.15],
                        x: [0, 20, 0],
                        y: [0, -30, 0],
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Secondary Ink Wash */}
                <div className="absolute bottom-[20%] left-[-10%] w-[800px] h-[800px] ink-wash opacity-[0.03] rotate-45 pointer-events-none" />

                {/* Vertical Overlay Labels - Side Signatures */}
                <div className="fixed left-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-32 pointer-events-none z-20">
                    <span className="font-mono text-[8px] text-black/20 uppercase tracking-[0.8em] -rotate-90 origin-left">
                        Experimental_Atelier
                    </span>
                    <span className="font-mono text-[8px] text-black/20 uppercase tracking-[0.8em] -rotate-90 origin-left">
                        Phase_01 // Prototype
                    </span>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
                    {/* Hero Section */}
                    <div className="flex flex-col items-center justify-center text-center mb-32">
                        <motion.div
                            className="flex justify-center mb-16"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <div className="relative group">
                                {/* Morphing Organic Border (Atelier vibe) */}
                                <motion.div
                                    className="absolute -inset-6 border-[1.5px] border-primary/20 pointer-events-none"
                                    animate={{
                                        borderRadius: [
                                            "60% 40% 30% 70% / 60% 30% 70% 40%",
                                            "30% 60% 70% 40% / 50% 60% 30% 60%",
                                            "60% 40% 30% 70% / 60% 30% 70% 40%"
                                        ]
                                    }}
                                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                />

                                {/* Technical Symbol container */}
                                <div className="relative w-32 h-32 vellum flex items-center justify-center border border-black/5 shadow-xl bg-white/40 backdrop-blur-sm">
                                    <motion.div
                                        animate={{ rotate: [0, 90, 180, 270, 360] }}
                                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                        className="absolute inset-0 opacity-[0.05] pointer-events-none flex items-center justify-center"
                                    >
                                        <svg width="100" height="100" viewBox="0 0 100 100">
                                            <circle cx="50" cy="50" r="48" stroke="currentColor" fill="none" strokeDasharray="4 4" />
                                        </svg>
                                    </motion.div>
                                    <Beaker className="text-primary w-12 h-12" strokeWidth={1.5} />

                                    {/* Technical bits */}
                                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary/40" />
                                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary/40" />
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <h2 className="font-mono text-[11px] uppercase tracking-[0.5em] text-primary mb-8 font-bold">
                                Experimental Atelier
                            </h2>
                            <h1 className="font-display text-[3.2rem] sm:text-7xl md:text-9xl font-normal tracking-tight leading-[0.85] mb-12 text-deep-charcoal uppercase">
                                MANTA<br />
                                <span className="relative inline-block mt-4">
                                    <span className="italic font-light text-primary/90">LAB</span>
                                    {/* Brush Underline (Crafted feel) */}
                                    <motion.svg
                                        className="absolute -bottom-2 left-0 w-full h-4 text-primary/30"
                                        viewBox="0 0 200 20"
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        animate={{ pathLength: 1, opacity: 1 }}
                                        transition={{ delay: 1, duration: 1.5 }}
                                    >
                                        <path
                                            d="M2,10 Q50,0 100,10 T198,10"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="3"
                                            strokeLinecap="round"
                                        />
                                    </motion.svg>
                                </span>
                            </h1>
                        </motion.div>

                        <motion.div
                            className="space-y-12"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.5 }}
                        >
                            <p className="font-sans text-xl md:text-2xl text-deep-charcoal/50 font-light max-w-2xl mx-auto leading-relaxed italic">
                                Donde el <span className="text-deep-charcoal border-b border-primary/30 not-italic font-medium">código</span> se convierte en gesto y los <span className="text-deep-charcoal border-b border-primary/30 not-italic font-medium">algoritmos</span> en emoción visceral.
                            </p>

                            <div className="flex flex-wrap justify-center gap-8 pt-12">
                                {[
                                    { icon: <Binary size={16} />, label: "Creative Coding", code: "01" },
                                    { icon: <Sparkles size={16} />, label: "AI Aesthetics", code: "02" },
                                    { icon: <Beaker size={16} />, label: "R&D", code: "03" }
                                ].map((item, idx) => (
                                    <motion.div
                                        key={idx}
                                        className="group relative px-8 py-5 border border-black/5 bg-white/50 backdrop-blur-sm flex flex-col items-start gap-4 transition-all duration-500"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.7 + (idx * 0.1) }}
                                        whileHover={{ y: -5, borderColor: "var(--color-primary)", boxShadow: "var(--shadow-hatch)" }}
                                    >
                                        <span className="font-mono text-[9px] text-primary/50">{item.code} / 10</span>
                                        <div className="flex items-center gap-4 text-[12px] font-display font-bold uppercase tracking-[0.2em] text-deep-charcoal">
                                            <span className="text-primary group-hover:rotate-12 transition-transform duration-500">{item.icon}</span>
                                            {item.label}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Bottom Status - Synchronizing systems */}
                    <motion.div
                        className="relative mt-16 md:absolute md:bottom-16 md:left-1/2 md:-translate-x-1/2 flex flex-col items-center gap-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                    >
                        <div className="flex items-center gap-3">
                            <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-deep-charcoal/30">
                                Sincronizando sistemas creativos
                            </span>
                            <div className="flex gap-1.5">
                                <motion.span animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }} className="h-1 w-1 rounded-full bg-primary" />
                                <motion.span animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.3, ease: "easeInOut" }} className="h-1 w-1 rounded-full bg-primary" />
                                <motion.span animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.6, ease: "easeInOut" }} className="h-1 w-1 rounded-full bg-primary" />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </main>

            <FooterSignature />
        </div>
    );
};

export default Lab;
