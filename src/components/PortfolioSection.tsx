import React, { useRef } from 'react';
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
    span: string;
    image: string;
    url: string;
    mediaType?: 'image' | 'video';
}

const portfolioItems: PortfolioItem[] = [
    {
        title: 'Estudio Simonetti',
        category: 'Legal & Corporate',
        description: 'Firma de consultoría legal y tributaria con enfoque en innovación y gestión estratégica.',
        fullDescription: 'Un ecosistema digital premium donde el diseño artesanal se encuentra con la autoridad legal. Cada elemento ha sido curado para transmitir prestigio a través de una experiencia fluida y minimalista.',
        tags: ['React', 'Framer Motion', 'Tailwind CSS', 'Branding'],
        color: 'from-blue-600/30 via-slate-500/20 to-transparent',
        accentColor: 'rgba(37, 99, 235, 0.4)',
        span: 'md:col-span-2 md:row-span-2',
        image: '/projects/simonetti.mp4',
        url: 'https://estudiosimonetti.com.ar',
        mediaType: 'video'
    },
    {
        title: 'CISB',
        category: 'Institutional Site',
        description: 'Portal del Centro Integral de Salud La Banda, conectando a la comunidad con servicios de salud.',
        fullDescription: 'Plataforma institucional diseñada bajo un prisma de "taller digital". Enfoque en la calidez humana y la claridad informativa, facilitando el acceso a la salud con una interfaz limpia y accesible.',
        tags: ['Next.js', 'UI/UX', 'Accessibility', 'Public Sector'],
        color: 'from-cyan-500/25 via-blue-500/15 to-transparent',
        accentColor: 'rgba(6, 182, 212, 0.4)',
        span: 'md:col-span-1 md:row-span-1',
        image: '/projects/cisb.mp4',
        url: 'https://cisb.gob.ar',
        mediaType: 'video'
    },
    {
        title: 'Hospital HUB',
        category: 'Software Architecture',
        description: 'Sistema centralizado para gestión de flujo hospitalario y datos críticos.',
        fullDescription: 'Una arquitectura de datos compleja simplificada a través del diseño. Visualización técnica que equilibra la precisión industrial con una ejecución visual fluida y artesanal.',
        tags: ['Real-time Data', 'Dashboard', 'Security', 'Bento UI'],
        color: 'from-primary/25 via-emerald-500/15 to-transparent',
        accentColor: 'rgba(16, 185, 129, 0.4)',
        span: 'md:col-span-1 md:row-span-1',
        image: '/projects/hub.mp4',
        url: 'https://intranet.cisb.gob.ar/',
        mediaType: 'video'
    },
];

const PortfolioSection: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });

    const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

    // Map portfolio items to gallery format
    const galleryItems = portfolioItems.map(item => ({
        name: item.title,
        designation: item.category,
        quote: item.fullDescription || item.description,
        src: item.image,
        url: item.url,
        tags: item.tags,
        mediaType: item.mediaType
    }));

    return (
        <section
            ref={sectionRef}
            id="proyectos"
            className="relative py-32 md:py-48 px-6 md:px-12 bg-paper overflow-hidden"
        >
            {/* Background Texture Layers */}
            <motion.div
                className="absolute inset-0 pointer-events-none opacity-40"
                style={{ y: parallaxY }}
            >
                {/* Large Decorative Ink Wash */}
                <div className="absolute -right-20 bottom-20 w-[700px] h-[700px] ink-wash opacity-10 rotate-180" />

                {/* Technical Grid Elements */}
                <div className="absolute top-0 left-1/3 w-px h-full bg-black/5" />
                <div className="absolute bottom-1/4 left-0 w-full h-px bg-black/5" />
            </motion.div>

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Section Header */}
                <motion.div
                    className="mb-16 md:mb-24"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-[2px] bg-black" />
                        <span className="font-mono text-[12px] text-black uppercase tracking-[0.4em] font-bold">
                            Featured Work / Colección
                        </span>
                    </div>

                    <h2 className="font-display text-6xl md:text-8xl lg:text-9xl font-medium text-black tracking-tighter leading-[0.85] mb-8">
                        Portfolio
                    </h2>

                    <p className="font-sans text-xl md:text-2xl text-black/60 max-w-2xl leading-relaxed font-normal">
                        Proyectos que fusionan <span className="text-primary italic">visión estratégica</span> con el rigor del <span className="text-black italic">diseño artesanal</span>. <span className="font-mono text-[10px] uppercase tracking-widest block mt-4 opacity-40">[ COORDINATES: 27.4698° S, 58.8302° W // REF: ARTISAN_ST01 ]</span>
                    </p>
                </motion.div>

                {/* Circular Gallery Integration */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                >
                    <CircularGallery items={galleryItems} autoplay={true} />
                </motion.div>
            </div>
        </section>
    );
};

export default PortfolioSection;
