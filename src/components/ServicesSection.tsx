import React, { useState } from 'react';
import { motion, useScroll, useTransform, type Variants } from 'framer-motion';
import { ArrowUpRight } from '@phosphor-icons/react';
import { useProject, type ProjectType } from '../context/ProjectContext';
import TiltedCard from './TiltedCard';

interface ServiceCard {
    title: string;
    subtitle: string;
    description: string;
    icon: React.ReactNode;
    tag: string;
    timeline: string;
    accent: string;
}

const Totem3D = () => (
    <svg viewBox="0 0 100 100" className="w-12 h-12 fill-current">
        <path d="M50 10 L85 30 L85 70 L50 90 L15 70 L15 30 Z" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M50 10 V50 L85 30 M50 50 L15 30" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M50 90 V50" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="50" cy="50" r="5" fill="currentColor" />
    </svg>
);

const TotemIdentity = () => (
    <svg viewBox="0 0 100 100" className="w-12 h-12 fill-current">
        <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M50 5 V95 M5 50 H95" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
        <rect x="35" y="35" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="3" />
        <path d="M20 20 L40 40 M80 20 L60 40 M20 80 L40 60 M80 80 L60 60" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
);

const TotemApp = () => (
    <svg viewBox="0 0 100 100" className="w-12 h-12 fill-current">
        <rect x="20" y="20" width="60" height="60" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M20 50 H80 M50 20 V80" fill="none" stroke="currentColor" strokeWidth="1" />
        <path d="M35 35 L65 65 M65 35 L35 65" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="20" cy="20" r="4" />
        <circle cx="80" cy="20" r="4" />
        <circle cx="20" cy="80" r="4" />
        <circle cx="80" cy="80" r="4" />
    </svg>
);

const services: ServiceCard[] = [
    {
        title: 'Landings 3D',
        subtitle: 'Conversión Boutique',
        description:
            'Cada landing es un plano vivo, diseñado para capturar la atención con la precisión de un gesto manual y tecnología de vanguardia.',
        icon: <Totem3D />,
        tag: '4 días',
        timeline: 'USD 350',
        accent: 'from-primary/20 to-transparent',
    },
    {
        title: 'Boutique Sites',
        subtitle: 'Sistemas de Identidad',
        description:
            'Identidad visual completa + sitio web. Cada pixel es un trazo deliberado que comunica la esencia de tu marca con elegancia técnica.',
        icon: <TotemIdentity />,
        tag: '2 semanas',
        timeline: 'USD 850 – 1K',
        accent: 'from-silver-industrial/20 to-transparent',
    },
    {
        title: 'SaaS Apps',
        subtitle: 'Ingeniería de Producto',
        description:
            'Arquitectura robusta y diseño excepcional — la artesanía aplicada al software de alto rendimiento y escala global.',
        icon: <TotemApp />,
        tag: 'Custom',
        timeline: 'Hablemos',
        accent: 'from-primary/20 to-transparent',
    },
];

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            delay: i * 0.15,
            ease: [0.16, 1, 0.3, 1],
        },
    }),
};

const ServiceCardComponent: React.FC<{ card: ServiceCard; index: number }> = ({
    card,
    index,
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const { setSelectedProject } = useProject();

    const handleCardClick = () => {
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
                captionText="Tallar"
                containerClassName="h-full"
                showTooltip={false}
            >
                <div
                    onClick={handleCardClick}
                    className={`relative overflow-hidden border transition-all duration-700 cursor-pointer h-full vellum
                        ${isHovered ? 'hatch-shadow border-black/10' : 'border-black/5'}
                    `}
                >
                    {/* Ink Splatter Backdrop on Hover */}
                    <div
                        className={`absolute -top-10 -right-10 w-40 h-40 rounded-full ink-wash transition-all duration-1000 transform
                            ${isHovered ? 'opacity-30 scale-150 rotate-12' : 'opacity-0 scale-50'}
                        `}
                    />

                    <div className="relative z-10 p-8 md:p-10 flex flex-col h-full min-h-[360px]">
                        {/* Header: The Stamp */}
                        <div className="flex items-start justify-between mb-12">
                            <motion.div
                                className={`transition-all duration-500 transform
                                    ${isHovered ? 'text-primary scale-110' : 'text-black/40'}
                                `}
                            >
                                {card.icon}
                            </motion.div>

                            <motion.div
                                className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 pt-2"
                                animate={isHovered ? { x: 0, y: 0 } : { x: 5, y: -5 }}
                            >
                                <ArrowUpRight
                                    weight="bold"
                                    size={16}
                                    className="text-primary"
                                />
                            </motion.div>
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-5">
                                <span className="font-mono text-[9px] text-black/60 uppercase tracking-[0.4em] px-2 py-0.5 border border-black/20">
                                    {card.tag}
                                </span>
                            </div>

                            <h3 className="font-display text-2xl font-medium text-black mb-2 tracking-tight">
                                {card.title}
                            </h3>
                            <p className="font-mono text-[10px] text-primary/60 uppercase tracking-[0.2em] mb-6">
                                {card.subtitle}
                            </p>
                            <p className="font-sans text-[15px] text-black/60 leading-relaxed font-normal group-hover:text-black transition-colors duration-500">
                                {card.description}
                            </p>
                        </div>

                        {/* Technical Footer */}
                        <div className="mt-8 pt-6 border-t border-black/10 flex items-center justify-between">
                            <span className="font-mono text-sm text-black font-bold tracking-[0.15em]">
                                {card.timeline}
                            </span>

                            <div className="w-8 h-[2px] bg-black group-hover:w-16 transition-all duration-700" />
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

    const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

    return (
        <section
            ref={sectionRef}
            id="servicios"
            className="relative py-32 md:py-48 px-6 md:px-12 bg-paper overflow-hidden"
        >
            {/* Background Texture Layers */}
            <motion.div
                className="absolute inset-0 pointer-events-none opacity-40"
                style={{ y: backgroundY }}
            >
                {/* Large Decorative Ink Wash */}
                <div className="absolute -left-20 top-20 w-[600px] h-[600px] ink-wash opacity-10" />

                {/* Technical Blueprint Elements */}
                <div className="absolute top-0 right-1/4 w-px h-full bg-black/5" />
                <div className="absolute top-1/2 left-0 w-full h-px bg-black/5" />
            </motion.div>

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Section Header */}
                <motion.div
                    className="mb-20 md:mb-28"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-[2px] bg-primary" />
                        <span className="font-mono text-[12px] text-primary uppercase tracking-[0.4em] font-bold">
                            Workshop / Atelier
                        </span>
                    </div>

                    <h2 className="font-display text-6xl md:text-8xl lg:text-9xl font-medium text-black tracking-tighter leading-[0.85] mb-8">
                        Servicios
                    </h2>

                    <p className="font-sans text-xl md:text-2xl text-black/60 max-w-2xl leading-relaxed font-normal">
                        Cada proyecto es una pieza tallada a mano — una unión visceral entre <span className="text-primary italic">precisión técnica</span> y <span className="text-black italic">alma artesanal</span>.
                    </p>
                </motion.div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
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
                    className="mt-24 flex items-center justify-between"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6, duration: 1 }}
                >
                    <span className="font-mono text-[10px] text-black/20 uppercase tracking-[0.5em]">
                        Stamp & Ink System V1.0
                    </span>
                    <div className="flex items-center gap-6">
                        <div className="w-12 h-px bg-black/10" />
                        <span className="font-mono text-[9px] text-black/40 uppercase tracking-[0.5em]">
                            Manta Creative Studio
                        </span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ServicesSection;
