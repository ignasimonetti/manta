import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CircularGallery } from './ui/CircularGallery';

interface PortfolioItem {
    title: string;
    category: string;
    description: string;
    fullDescription: string;
    tags: string[];
    color: string;
    accentColor: string;
    span: string; // grid span classes (legacy, keeping for reference if needed)
    image: string;
    url: string; // Live site link
}

const portfolioItems: PortfolioItem[] = [
    {
        title: 'Estudio Simonetti',
        category: 'Legal & Corporate',
        description: 'Firma de consultoría legal y tributaria con enfoque en innovación y gestión estratégica.',
        fullDescription: 'Un ecosistema digital premium diseñado para transmitir autoridad y modernidad. Implementación de una arquitectura de información clara para servicios corporativos complejos, con una estética dark-mode sofisticada que refleja el prestigio de la firma fundada en 1976.',
        tags: ['React', 'Framer Motion', 'Tailwind CSS', 'Branding'],
        color: 'from-blue-600/30 via-slate-500/20 to-transparent',
        accentColor: 'rgba(37, 99, 235, 0.4)',
        span: 'md:col-span-2 md:row-span-2',
        image: '/projects/simonetti.png',
        url: 'https://estudiosimonetti.com.ar',
    },
    {
        title: 'CISB',
        category: 'Institutional Site',
        description: 'Portal del Centro Integral de Salud La Banda, conectando a la comunidad con servicios de salud.',
        fullDescription: 'Desarrollo de una plataforma institucional robusta y accesible. Enfoque en la experiencia del paciente (PX) y la claridad en la comunicación de prestaciones médicas especializadas, servicios de guardia y turnos.',
        tags: ['Next.js', 'UI/UX', 'Accessibility', 'Public Sector'],
        color: 'from-cyan-500/25 via-blue-500/15 to-transparent',
        accentColor: 'rgba(6, 182, 212, 0.4)',
        span: 'md:col-span-1 md:row-span-1',
        image: '/projects/cisb.png',
        url: 'https://cisb.gob.ar',
    },
    {
        title: 'Hospital Intranet',
        category: 'Software Architecture',
        description: 'Sistema centralizado para gestión de flujo hospitalario y datos críticos.',
        fullDescription: 'Una intranet técnica diseñada para la eficiencia operativa. Visualización de datos en tiempo real, gestión de triage y coordinación de equipos médicos bajo una interfaz técnica inspirada en sistemas de alto rendimiento.',
        tags: ['Real-time Data', 'Dashboard', 'Security', 'Bento UI'],
        color: 'from-primary/25 via-emerald-500/15 to-transparent',
        accentColor: 'rgba(16, 185, 129, 0.4)',
        span: 'md:col-span-1 md:row-span-1',
        image: '/projects/intranet.png',
        url: '#',
    },
];

const PortfolioSection: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });

    const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

    // Map portfolio items to gallery format
    const galleryItems = portfolioItems.map(item => ({
        name: item.title,
        designation: item.category,
        quote: item.fullDescription || item.description,
        src: item.image,
        url: item.url,
        tags: item.tags
    }));

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!sectionRef.current) return;
            const rect = sectionRef.current.getBoundingClientRect();
            const relativeX = (e.clientX - rect.left - rect.width / 2) / rect.width;
            const relativeY = (e.clientY - rect.top - rect.height / 2) / rect.height;
            setMousePosition({ x: relativeX * 50, y: relativeY * 50 });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <section
            ref={sectionRef}
            id="proyectos"
            className="relative py-32 md:py-44 px-6 md:px-12 bg-[#080808] overflow-hidden"
        >
            {/* Background elements */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{ y: parallaxY }}
            >
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/[0.03] blur-[200px] rounded-full transition-all duration-700"
                    style={{
                        transform: `translate(calc(-50% + ${mousePosition.x}px), calc(-50% + ${mousePosition.y}px))`
                    }}
                />
            </motion.div>

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Section Header */}
                <motion.div
                    className="mb-12 md:mb-16"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-px bg-primary/60" />
                        <span className="font-mono text-[11px] text-primary/80 uppercase tracking-[0.4em]">
                            Featured Work
                        </span>
                    </div>

                    <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-medium text-white tracking-tighter leading-[0.9] mb-6">
                        Portfolio
                    </h2>

                    <p className="font-sans text-lg md:text-xl text-white/40 max-w-xl leading-relaxed font-light">
                        Proyectos que fusionan visión estratégica con ejecución de alta precisión.
                    </p>
                </motion.div>

                {/* Circular Gallery Integration */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                >
                    <CircularGallery items={galleryItems} autoplay={true} />
                </motion.div>
            </div>
        </section>
    );
};

export default PortfolioSection;
