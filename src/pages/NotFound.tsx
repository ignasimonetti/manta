import React from 'react';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Logo } from '../components/Logo';

const NotFound: React.FC = () => {
    return (
        <div className="min-h-screen bg-white relative flex flex-col items-center justify-center overflow-hidden px-6">
            {/* Background Texture — Consistency with main site */}
            <div className="sketch-grid opacity-[0.12]" />
            <div className="noise-bg" />

            {/* Geometric Fluid Background — Subtle magenta aura */}
            <motion.div
                className="absolute top-[-15%] right-[-15%] w-[50vw] h-[50vw] bg-primary/[0.04] rounded-full blur-[150px]"
                animate={{
                    scale: [1, 1.15, 1],
                    rotate: [0, 60, 0],
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
                className="absolute bottom-[-20%] left-[-10%] w-[40vw] h-[40vw] bg-primary/[0.06] rounded-full blur-[120px]"
                animate={{
                    scale: [1.1, 1, 1.1],
                    rotate: [0, -45, 0],
                }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            />

            {/* ============================================ */}
            {/* IMMENSE LOGO WATERMARK — The Hero of the Page */}
            {/* ============================================ */}
            <motion.div
                className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
            >
                <img
                    src="/logo-color-vector.svg"
                    alt=""
                    aria-hidden="true"
                    className="w-[80vw] md:w-[60vw] lg:w-[50vw] max-w-[900px] h-auto opacity-[0.04]"
                    draggable={false}
                />
            </motion.div>

            {/* Main Content Area */}
            <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center">
                {/* Navigation Logo — Prominent and clickable */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-12"
                >
                    <Link to="/" className="block">
                        <Logo className="h-14 md:h-20 w-auto hover:opacity-60 transition-opacity duration-500" variant="dark" />
                    </Link>
                </motion.div>

                {/* Typography Block */}
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                    {/* Error Code — Technical accent */}
                    <motion.div
                        className="font-mono text-[11px] text-primary/60 uppercase tracking-[0.5em] mb-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.6 }}
                    >
                        Error 404
                    </motion.div>

                    <h1 className="font-display text-5xl md:text-8xl font-normal text-deep-charcoal mb-8 uppercase tracking-tight leading-[0.9]">
                        Extraviado en <br /> el Proceso
                    </h1>

                    <p className="font-sans text-lg md:text-xl text-deep-charcoal/50 max-w-md mx-auto mb-14 leading-relaxed font-light italic">
                        La página que buscas se ha disuelto en el vacío digital.
                        Volvamos al lienzo principal.
                    </p>

                    {/* Actions */}
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                        <Link to="/" className="group relative">
                            <motion.div
                                className="flex items-center gap-4 bg-deep-charcoal text-white px-10 py-5 rounded-full font-display font-medium text-sm tracking-widest hover:bg-primary transition-all duration-500 shadow-glass"
                                whileHover={{ y: -4, scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Home size={18} className="group-hover:rotate-12 transition-transform duration-500" />
                                VOLVER AL INICIO
                            </motion.div>
                            <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 rounded-full" />
                        </Link>

                        <button
                            onClick={() => window.history.back()}
                            className="font-display text-xs tracking-[0.2em] text-deep-charcoal/35 hover:text-primary transition-colors duration-300 flex items-center gap-2 uppercase py-4"
                        >
                            <ArrowLeft size={14} />
                            Regresar
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* Premium Detail Footer */}
            <div className="absolute bottom-8 left-0 w-full flex flex-col md:flex-row justify-between px-8 md:px-16 items-center gap-4 pointer-events-none">
                <div className="flex items-center gap-6">
                    <div className="h-[1px] w-12 bg-deep-charcoal/10 hidden md:block" />
                    <span className="font-mono text-[10px] text-deep-charcoal/25 uppercase tracking-[0.4em]">
                        0x404NF
                    </span>
                </div>

                <div className="font-mono text-[9px] text-deep-charcoal/15 uppercase tracking-[0.5em] text-center">
                    Manta Studio — All ideas start from a blank page
                </div>

                <div className="flex items-center gap-6">
                    <span className="font-mono text-[10px] text-deep-charcoal/25 uppercase tracking-[0.4em]">
                        {new Date().getFullYear()} — Atelier
                    </span>
                    <div className="h-[1px] w-12 bg-deep-charcoal/10 hidden md:block" />
                </div>
            </div>
        </div>
    );
};

export default NotFound;
