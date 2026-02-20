import React, { useState } from 'react';
import { motion, useScroll, useTransform, type Variants } from 'framer-motion';
import { Layers, Globe, Cpu, ArrowUpRight } from 'lucide-react';

interface ServiceCard {
    title: string;
    subtitle: string;
    description: string;
    icon: React.ReactNode;
    tag: string;
    timeline: string;
    accent: string;
}

const services: ServiceCard[] = [
    {
        title: 'Landings 3D',
        subtitle: 'Páginas de Conversión Boutique',
        description:
            'Páginas de conversión artesanales con efectos 3D inmersivos. Cada landing es una pieza única, diseñada para capturar la atención y transformar visitantes en clientes.',
        icon: <Layers size={28} strokeWidth={1.5} />,
        tag: '3 días',
        timeline: 'USD 500',
        accent: 'from-fuchsia-500/20 to-violet-600/10',
    },
    {
        title: 'Boutique Sites',
        subtitle: 'Identidad Visual Completa',
        description:
            'Identidad visual completa + sitio web profesional personalizado. Cada pixel es un trazo deliberado que comunica la esencia de tu marca con la precisión de un relojero.',
        icon: <Globe size={28} strokeWidth={1.5} />,
        tag: '1 semana',
        timeline: 'USD 1K',
        accent: 'from-primary/20 to-rose-500/10',
    },
    {
        title: 'SaaS Apps',
        subtitle: 'Desarrollo a Medida High-End',
        description:
            'Desarrollo a medida para plataformas digitales. Arquitectura robusta, código limpio y diseño excepcional — la artesanía aplicada al software de alto rendimiento.',
        icon: <Cpu size={28} strokeWidth={1.5} />,
        tag: 'Custom',
        timeline: 'Hablemos',
        accent: 'from-cyan-400/15 to-blue-500/10',
    },
];

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 60, rotateX: 8 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        rotateX: 0,
        transition: {
            duration: 0.9,
            delay: i * 0.15,
            ease: [0.22, 1, 0.36, 1],
        },
    }),
};

import { useProject, type ProjectType } from '../context/ProjectContext';
import TiltedCard from './TiltedCard';

const ServiceCardComponent: React.FC<{ card: ServiceCard; index: number }> = ({
    card,
    index,
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const { setSelectedProject } = useProject();

    const handleCardClick = () => {
        // Map card title to ProjectType
        let projectType: ProjectType = 'Otro';
        if (card.title === 'Landings 3D') projectType = 'Landing Page';
        else if (card.title === 'Boutique Sites') projectType = 'Boutique Sites';
        else if (card.title === 'SaaS Apps') projectType = 'Aplicaciones';

        setSelectedProject(projectType);

        const contactSection = document.getElementById('contacto');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <motion.div
            className="group relative h-full"
            custom={index}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <TiltedCard
                captionText="Consultar"
                containerClassName="h-full"
            >
                <div
                    onClick={handleCardClick}
                    className={`relative overflow-hidden rounded-3xl border transition-all duration-700 cursor-pointer h-full
                        ${isHovered
                            ? 'border-primary/30 bg-white/[0.07] shadow-[0_0_60px_rgba(255,0,255,0.08)]'
                            : 'border-white/[0.06] bg-white/[0.03]'
                        }`}
                >
                    {/* Gradient accent overlay */}
                    <div
                        className={`absolute inset-0 bg-gradient-to-br ${card.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}
                    />

                    {/* Animated border glow */}
                    <motion.div
                        className="absolute -inset-px rounded-3xl pointer-events-none"
                        style={{
                            background: isHovered
                                ? 'linear-gradient(135deg, rgba(255,0,255,0.15) 0%, transparent 50%, rgba(255,0,255,0.08) 100%)'
                                : 'none',
                        }}
                        animate={{ opacity: isHovered ? 1 : 0 }}
                        transition={{ duration: 0.5 }}
                    />

                    <div className="relative z-10 p-8 md:p-10 flex flex-col h-full min-h-[380px] [transform-style:preserve-3d]">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-8 [transform:translateZ(30px)]">
                            <motion.div
                                className={`p-3 rounded-2xl transition-all duration-500
                                    ${isHovered
                                        ? 'bg-primary/20 text-primary'
                                        : 'bg-white/[0.06] text-white/50'
                                    }`}
                                animate={isHovered ? { rotate: [0, -5, 5, 0] } : {}}
                                transition={{ duration: 0.6 }}
                            >
                                {card.icon}
                            </motion.div>

                            <motion.div
                                className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                animate={isHovered ? { x: 0 } : { x: 10 }}
                            >
                                <ArrowUpRight
                                    size={20}
                                    className="text-primary"
                                />
                            </motion.div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 [transform:translateZ(20px)]">
                            <div className="flex items-center gap-3 mb-3">
                                <span className="font-mono text-[10px] text-primary/80 uppercase tracking-[0.3em] px-3 py-1 rounded-full border border-primary/20 bg-primary/5">
                                    {card.tag}
                                </span>
                            </div>

                            <h3 className="font-display text-2xl md:text-3xl font-medium text-white mb-2 tracking-tight">
                                {card.title}
                            </h3>
                            <p className="font-mono text-xs text-white/30 uppercase tracking-widest mb-5">
                                {card.subtitle}
                            </p>
                            <p className="font-sans text-sm md:text-base text-white/50 leading-relaxed group-hover:text-white/70 transition-colors duration-500">
                                {card.description}
                            </p>
                        </div>

                        {/* Footer */}
                        <div className="mt-8 pt-6 border-t border-white/[0.06] flex items-center justify-between [transform:translateZ(10px)]">
                            <span className="font-display text-lg text-white/80 font-medium">
                                {card.timeline}
                            </span>

                            {/* Crayon → Clean line animation */}
                            <div className="relative h-[2px] w-16 overflow-hidden">
                                <motion.div
                                    className="absolute inset-0 bg-white/20"
                                    style={{ filter: 'url(#crayon-filter)' }}
                                    animate={{ opacity: isHovered ? 0 : 1 }}
                                    transition={{ duration: 0.4 }}
                                />
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-primary to-primary/50"
                                    animate={{
                                        scaleX: isHovered ? 1 : 0,
                                        opacity: isHovered ? 1 : 0,
                                    }}
                                    style={{ originX: 0 }}
                                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </TiltedCard>
        </motion.div>
    );
};

const ServicesSection: React.FC = () => {
    const sectionRef = React.useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });

    const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

    return (
        <section
            ref={sectionRef}
            id="servicios"
            className="relative py-32 md:py-44 px-6 md:px-12 bg-[#050505] overflow-hidden"
        >
            {/* Background elements */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{ y: backgroundY }}
            >
                {/* Subtle grid */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage:
                            'linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)',
                        backgroundSize: '80px 80px',
                    }}
                />
                {/* Magenta bloom */}
                <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-primary/[0.03] blur-[150px] rounded-full" />
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-violet-500/[0.02] blur-[120px] rounded-full" />
            </motion.div>

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Section Header */}
                <motion.div
                    className="mb-20 md:mb-28"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-px bg-primary/60" />
                        <span className="font-mono text-[11px] text-primary/80 uppercase tracking-[0.4em]">
                            El Taller
                        </span>
                    </div>

                    <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-medium text-white tracking-tighter leading-[0.9] mb-6">
                        Servicios
                    </h2>

                    <p className="font-sans text-lg md:text-xl text-white/40 max-w-xl leading-relaxed font-light">
                        Cada proyecto es una pieza artesanal — desde la estrategia
                        hasta el último pixel.
                    </p>
                </motion.div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {services.map((card, idx) => (
                        <ServiceCardComponent
                            key={card.title}
                            card={card}
                            index={idx}
                        />
                    ))}
                </div>

                {/* Bottom decorative element */}
                <motion.div
                    className="mt-24 flex items-center justify-center gap-6"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6, duration: 1 }}
                >
                    <div className="w-24 h-px bg-white/10" />
                    <span className="font-mono text-[9px] text-white/20 uppercase tracking-[0.5em]">
                        Artesanía / Precisión / Alma
                    </span>
                    <div className="w-24 h-px bg-white/10" />
                </motion.div>
            </div>
        </section>
    );
};

export default ServicesSection;
