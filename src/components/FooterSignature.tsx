import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import SocialIcons from './SocialIcons';
import SignatureCanvas from './SignatureCanvas';

const FooterSignature: React.FC = () => {
    const footerRef = useRef<HTMLDivElement>(null);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const timeString = currentTime.toLocaleTimeString('es-AR', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });

    const { scrollYProgress } = useScroll({
        target: footerRef,
        offset: ['start end', 'end end'],
    });

    const contentOpacity = useTransform(scrollYProgress, [0, 0.2], [0.6, 1]);
    const contentYRaw = useTransform(scrollYProgress, [0, 0.3], [80, 0]);
    const contentY = useSpring(contentYRaw, { stiffness: 100, damping: 30 });

    const bigTextScale = useTransform(scrollYProgress, [0.4, 1], [0.8, 1]);
    const bigTextOpacity = useTransform(scrollYProgress, [0.6, 1], [0, 0.03]);

    const navLinks = [
        { label: 'Inicio', href: '#' },
        { label: 'Servicios', href: '#servicios' },
        { label: 'Proyectos', href: '#proyectos' },
        { label: 'Contacto', href: '#contacto' },
    ];

    return (
        <footer
            ref={footerRef}
            id="footer"
            className="relative bg-paper-dark py-32 md:py-48 px-6 md:px-12 xl:px-24 overflow-hidden border-t border-white/[0.05]"
        >
            {/* Technical Header Reveal */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            {/* Background elements: Large Dark Ink Splatters */}
            <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] ink-wash-dark opacity-20 rotate-12 pointer-events-none" />

            {/* Big Background Reveal Text - Woodblock Inspired */}
            <motion.div
                className="absolute bottom-[-5%] left-0 w-full flex justify-center pointer-events-none select-none z-0"
                style={{ scale: bigTextScale, opacity: bigTextOpacity }}
            >
                <h2 className="text-[25vw] font-bold text-white leading-none tracking-[-0.1em] font-display opacity-15 filter blur-[1px]">
                    MANTA
                </h2>
            </motion.div>

            <motion.div
                className="relative z-10 max-w-7xl mx-auto"
                style={{ opacity: contentOpacity, y: contentY }}
            >
                {/* Contact CTA Section */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-20 md:mb-40 items-center border-b border-white/5 pb-12 md:pb-20">
                    <div className="md:col-span-7 lg:col-span-8">
                        <motion.h3
                            className="font-display text-4xl md:text-7xl lg:text-8xl font-medium text-white tracking-tighter mb-8 leading-[0.9]"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        >
                            ¿Tienes una idea <br />
                            <span className="text-primary italic font-light">fuera de serie?</span>
                        </motion.h3>
                        <p className="font-sans text-lg md:text-xl text-white/40 max-w-xl leading-relaxed">
                            Buscamos proyectos que desafíen los límites del diseño digital.
                            Si buscas algo predecible, <span className="text-white/60">no somos tu estudio.</span>
                        </p>
                    </div>
                    <div className="md:col-span-5 lg:col-span-4 flex md:justify-end">
                        <a href="#contacto" className="group relative">
                            <motion.div
                                className="flex flex-col items-center justify-center w-40 h-40 md:w-52 md:h-52 bg-white/[0.02] border border-white/10 group-hover:border-primary transition-all duration-700 hatch-shadow"
                                whileHover={{ scale: 1.05 }}
                            >
                                <span className="font-mono text-xs tracking-[0.4em] text-white group-hover:text-primary transition-colors duration-500 z-10 font-bold uppercase">Hablemos</span>
                                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            </motion.div>
                        </a>
                    </div>
                </div>

                {/* Main Footer Info */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-x-12 lg:gap-x-24 xl:gap-x-32 mb-32 pt-10">
                    {/* Brand Meta & Info */}
                    <div className="md:col-span-5 lg:col-span-5 flex flex-col justify-between relative z-20">
                        <div>
                            <div className="mb-12">
                                <p className="font-mono text-[10px] text-primary uppercase tracking-[0.5em] mb-6">Manta Studio // Atelier</p>
                                <p className="font-sans text-lg text-white/70 leading-relaxed max-w-sm">
                                    Diseño de alto impacto y desarrollo de precisión para marcas que desafían lo predecible.
                                </p>
                            </div>
                            <SocialIcons />
                        </div>

                        {/* Brand Details / Secondary Meta */}
                        <div className="mt-16 md:mt-24">
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <span className="w-8 h-px bg-primary/30" />
                                    <span className="font-mono text-[9px] text-white/40 uppercase tracking-[0.4em]">Digital Craftsmen</span>
                                </div>
                                <p className="font-sans text-sm text-white/30 italic max-w-xs">
                                    "La belleza es el esplendor de la verdad."
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation & Signature */}
                    <div className="md:col-span-7 lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-16 md:gap-12">
                        {/* Explorar */}
                        <div className="space-y-12">
                            <h4 className="font-mono text-[10px] text-white/50 uppercase tracking-[0.5em] flex items-center gap-4">
                                <span className="w-8 h-px bg-white/20" />
                                Explorar
                            </h4>
                            <nav>
                                <ul className="space-y-8">
                                    {navLinks.map((link) => (
                                        <li key={link.label}>
                                            <a
                                                href={link.href}
                                                className="group flex items-center gap-4 font-sans text-base text-white/60 hover:text-white transition-all duration-500"
                                            >
                                                <span className="h-[1px] w-0 bg-primary group-hover:w-6 transition-all duration-700 ease-out" />
                                                <span className="group-hover:translate-x-1 transition-transform duration-500">{link.label}</span>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>

                        {/* Signature Area */}
                        <div className="flex flex-col">
                            <h4 className="font-mono text-[10px] text-white/50 uppercase tracking-[0.5em] flex items-center gap-4 mb-12">
                                <span className="w-8 h-px bg-white/20" />
                                Creative Mark
                            </h4>
                            <div className="flex-grow relative group">
                                {/* Ink Splatter behind signature */}
                                <div className="absolute inset-0 ink-wash opacity-0 group-hover:opacity-60 transition-opacity duration-1000 scale-150 -rotate-12 pointer-events-none" />

                                <div className="relative z-10 vellum-dark p-6 border border-white/10 hatch-shadow">
                                    <SignatureCanvas />
                                </div>

                                <div className="mt-8 flex items-center justify-center gap-3">
                                    <div className="w-1.5 h-1.5 bg-primary/40" />
                                    <p className="font-mono text-[8px] text-white/40 uppercase tracking-[0.3em]">
                                        Trazado de Autor
                                    </p>
                                </div>
                            </div>
                            <div className="mt-auto pt-16 hidden sm:block">
                                <p className="font-mono text-[10px] text-white/40 leading-relaxed uppercase tracking-widest text-right">
                                    Hecho con precisión racional <br />
                                    y alma visceral. <br />
                                    <span className="text-white/60 mt-2 block">Mendoza & Sgo. del Estero, Arg.</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar: Technical Grid Closing */}
                <div className="flex flex-col md:flex-row items-stretch border-t border-white/10">
                    <div className="flex-1 p-8 border-b md:border-b-0 md:border-r border-white/10">
                        <div className="flex items-center justify-between mb-4">
                            <span className="font-mono text-[8px] text-white/20 uppercase tracking-[0.5em]">Estado del Sistema</span>
                            <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
                                <span className="font-mono text-[9px] text-green-500/80 uppercase tracking-widest">Commission: Open</span>
                            </div>
                        </div>
                        <div className="flex items-end justify-between">
                            <div className="font-mono text-2xl font-bold text-white tracking-tighter">
                                {timeString}
                            </div>
                            <div className="font-mono text-[8px] text-white/30 uppercase text-right">
                                SGO_DEL_ESTERO <br />
                                ARGENTINA / GMT-3
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 p-8 flex flex-col justify-between">
                        <div className="flex justify-between items-start mb-6">
                            <div className="space-y-1">
                                <div className="font-mono text-[9px] text-white font-bold tracking-[0.3em] uppercase">MANTA STUDIO © {new Date().getFullYear()}</div>
                                <div className="font-mono text-[8px] text-white/20 uppercase tracking-[0.4em]">Digital Atelier — Precision & Soul</div>
                            </div>
                            <div className="px-3 py-1 border border-white/10 font-mono text-[8px] text-white/40 uppercase">V_1.0.4</div>
                        </div>

                        <div className="flex gap-8">
                            <a href="#" className="font-mono text-[8px] text-white/40 hover:text-primary uppercase tracking-[0.3em] transition-colors">Privacy</a>
                            <a href="#" className="font-mono text-[8px] text-white/40 hover:text-primary uppercase tracking-[0.3em] transition-colors">Terms</a>
                            <a href="#" className="font-mono text-[8px] text-white/40 hover:text-primary uppercase tracking-[0.3em] transition-colors">Legal</a>
                        </div>
                    </div>
                </div>
            </motion.div>
        </footer>
    );
};

export default FooterSignature;
