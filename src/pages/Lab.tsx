import React from 'react';
import { motion } from 'framer-motion';
import { Beaker, ArrowLeft, FlaskConical, Binary, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Lab: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-deep-charcoal text-white selection:bg-primary selection:text-white relative overflow-hidden flex flex-col items-center justify-center px-6">
            {/* Background Elements */}
            <div className="sketch-grid opacity-20 pointer-events-none" />
            <div className="noise-bg opacity-[0.05]" />

            {/* Glowing Orbs */}
            <motion.div
                className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px]"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute bottom-1/4 -right-20 w-96 h-96 bg-magenta/10 rounded-full blur-[120px]"
                animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.2, 0.4, 0.2],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />

            {/* Back Button */}
            <motion.button
                onClick={() => navigate('/')}
                className="fixed top-12 left-12 z-50 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-white/50 hover:text-white transition-colors group"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 }}
            >
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                Regresar
            </motion.button>

            {/* Main Content */}
            <div className="relative z-10 text-center max-w-4xl mx-auto">
                <motion.div
                    className="flex justify-center mb-12"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div className="relative">
                        <motion.div
                            className="absolute inset-0 bg-primary/30 blur-2xl rounded-full"
                            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.8, 0.5] }}
                            transition={{ duration: 4, repeat: Infinity }}
                        />
                        <div className="relative w-24 h-24 bg-deep-charcoal border border-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                            <FlaskConical className="text-primary w-10 h-10" strokeWidth={1.5} />
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                >
                    <h2 className="font-mono text-[12px] uppercase tracking-[0.5em] text-primary mb-4 font-bold">
                        Experimental Division
                    </h2>
                    <h1 className="font-display text-7xl md:text-9xl font-normal tracking-tight leading-none mb-8">
                        MANTA<span className="text-white/20">.</span>LAB
                    </h1>
                </motion.div>

                <motion.div
                    className="space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    <p className="font-sans text-xl md:text-2xl text-white/60 font-light max-w-xl mx-auto leading-relaxed italic">
                        "Donde el código se convierte en gesto y los algoritmos en emoción."
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 pt-8">
                        {[
                            { icon: <Binary size={14} />, label: "Creative Coding" },
                            { icon: <Sparkles size={14} />, label: "AI Aesthetics" },
                            { icon: <Beaker size={14} />, label: "R&D" }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                className="px-5 py-2 rounded-full border border-white/5 bg-white/[0.02] flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-white/40"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7 + (idx * 0.1) }}
                            >
                                <span className="text-primary">{item.icon}</span>
                                {item.label}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Progress/Coming Soon Status */}
            <motion.div
                className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
            >
                <div className="w-48 h-[1px] bg-white/10 relative overflow-hidden">
                    <motion.div
                        className="absolute inset-0 bg-primary"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                </div>
                <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-white/30">
                    Sincronizando sistemas creativos...
                </span>
            </motion.div>

            {/* Vertical labels */}
            <div className="fixed right-10 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-20">
                <span className="writing-mode-vertical text-[9px] font-mono uppercase tracking-[0.5em] text-white/20">
                    Phase 01 — Prototype
                </span>
                <span className="writing-mode-vertical text-[9px] font-mono uppercase tracking-[0.5em] text-white/20">
                    {new Date().getFullYear()} — Future
                </span>
            </div>
        </div>
    );
};

export default Lab;
