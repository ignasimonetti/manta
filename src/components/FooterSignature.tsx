import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SocialIcons from './SocialIcons';
import Lanyard from './Lanyard';
import SignatureCanvas from './SignatureCanvas';
import { Suspense } from 'react';

const FooterSignature: React.FC = () => {
    const footerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: footerRef,
        offset: ['start end', 'end end'],
    });

    const contentOpacity = useTransform(scrollYProgress, [0, 0.25], [0, 1]);
    const contentY = useTransform(scrollYProgress, [0, 0.3], [100, 0]);
    const bigTextScale = useTransform(scrollYProgress, [0.3, 1], [0.85, 1]);
    const bigTextOpacity = useTransform(scrollYProgress, [0.5, 1], [0, 0.08]);

    const navLinks = [
        { label: 'Inicio', href: '#' },
        { label: 'Servicios', href: '#services' },
        { label: 'Portfolio', href: '#portfolio' },
        { label: 'Contacto', href: '#contact' },
    ];

    return (
        <footer
            ref={footerRef}
            id="contact"
            className="relative bg-[#0A0A0A] py-24 md:py-40 px-6 md:px-12 overflow-hidden border-t border-white/[0.03]"
        >
            {/* Subtle top gradient transition */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#080808] to-transparent pointer-events-none" />

            {/* Background accent */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/[0.03] blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-white/[0.01] blur-[150px] rounded-full pointer-events-none" />

            {/* Big Background Reveal Text */}
            <motion.div
                className="absolute bottom-[-10%] left-0 w-full flex justify-center pointer-events-none select-none z-0"
                style={{ scale: bigTextScale, opacity: bigTextOpacity }}
            >
                <h2
                    className="text-[25vw] font-normal text-white leading-none tracking-tighter font-montserrat"
                >
                    MANTA
                </h2>
            </motion.div>

            <motion.div
                className="relative z-10 max-w-7xl mx-auto"
                style={{ opacity: contentOpacity, y: contentY }}
            >
                {/* Contact CTA Section */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-32 items-start">
                    <div className="md:col-span-8">
                        <motion.h3
                            className="font-display text-5xl md:text-7xl lg:text-8xl font-medium text-white tracking-tighter mb-8 leading-[0.85]"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                        >
                            ¿Tienes una idea <br />
                            <span className="text-primary italic">fuera de serie?</span>
                        </motion.h3>
                        <p className="font-sans text-lg md:text-xl text-white/50 max-w-xl leading-relaxed">
                            Buscamos proyectos que desafíen los límites del diseño digital.
                            Si buscas algo predecible, no somos tu agencia.
                        </p>
                    </div>
                    <div className="md:col-span-4 flex md:justify-end pt-8 md:pt-16">
                        <a href="mailto:hola@manta.studio" className="group relative">
                            <div className="flex flex-col items-center justify-center w-32 h-32 md:w-40 md:h-40 rounded-full border border-white/10 group-hover:bg-white group-hover:border-white transition-all duration-500 overflow-hidden">
                                <span className="font-display text-xs tracking-widest text-white group-hover:text-black transition-colors duration-500 z-10">HABLEMOS</span>
                                <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                            </div>
                        </a>
                    </div>
                </div>

                {/* Main Footer Info */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 mb-24">
                    {/* Brand Meta */}
                    <div className="md:col-span-4 lg:col-span-5">
                        <div className="mb-8">
                            <h2
                                className="text-4xl font-normal text-white tracking-tighter mb-4 font-montserrat uppercase"
                            >
                                MANTA
                            </h2>
                            <p className="font-sans text-sm text-white/40 leading-relaxed max-w-xs">
                                Atelier Digital especializado en diseño de alto impacto y desarrollo de precisión.
                                Elevamos marcas al siguiente nivel visual.
                            </p>
                        </div>
                        <SocialIcons />

                        <div className="mt-12 h-[350px] w-full relative group">
                            <div className="absolute inset-x-0 -top-8 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <span className="font-mono text-[8px] text-white/20 uppercase tracking-[0.3em]">Manta Digital ID — Drag to interact</span>
                            </div>
                            <Suspense fallback={
                                <div className="w-full h-full flex items-center justify-center">
                                    <div className="w-8 h-8 rounded-full border border-white/10 border-t-white/30 animate-spin" />
                                </div>
                            }>
                                <Lanyard position={[0, 0, 18]} gravity={[0, -40, 0]} transparent={true} />
                            </Suspense>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="md:col-span-4 lg:col-span-3">
                        <h4 className="font-mono text-[10px] text-white/30 uppercase tracking-[0.4em] mb-8">
                            Explorar
                        </h4>
                        <nav>
                            <ul className="space-y-4">
                                {navLinks.map((link) => (
                                    <li key={link.label}>
                                        <a
                                            href={link.href}
                                            className="group inline-flex items-center gap-4 font-sans text-sm text-white/50 hover:text-white transition-all duration-300"
                                        >
                                            <span className="h-px w-0 bg-primary group-hover:w-6 transition-all duration-500" />
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>

                    {/* Signature Area */}
                    <div className="md:col-span-4 lg:col-span-4">
                        <h4 className="font-mono text-[10px] text-white/30 uppercase tracking-[0.4em] mb-8">
                            The Creative Mark
                        </h4>
                        <SignatureCanvas />
                        <p className="mt-4 font-mono text-[9px] text-white/10 text-center uppercase tracking-widest">
                            Interacción táctil habilitada
                        </p>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-12 border-t border-white/[0.05]">
                    <div className="flex flex-wrap justify-center md:justify-start gap-8">
                        <div className="font-mono text-[9px] text-white/20 tracking-[0.4em] uppercase">
                            © {new Date().getFullYear()} MANTA STUDIO
                        </div>
                        <div className="font-mono text-[9px] text-white/20 tracking-[0.4em] uppercase">
                            All Rights Reserved
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-pulse" />
                            <span className="font-mono text-[9px] text-white/20 uppercase tracking-widest">
                                Status: Active
                            </span>
                        </div>
                        <div className="font-mono text-[9px] text-white/15 uppercase tracking-widest border border-white/10 px-3 py-1 rounded-full">
                            Arg — Global
                        </div>
                    </div>
                </div>
            </motion.div>
        </footer>
    );
};

export default FooterSignature;
