import React from 'react';
import Hero from '../components/Hero';
import ParticlesSection from '../components/ParticlesSection';
import ServicesSection from '../components/ServicesSection';
import ManifestoSection from '../components/ManifestoSection';
import PortfolioSection from '../components/PortfolioSection';
import ContactSection from '../components/ContactSection';
import FooterSignature from '../components/FooterSignature';
import VideoShowcase from '../components/VideoShowcase';
import VideoLight from '../components/VideoLight';
import TextReveal from '../components/TextReveal';
import { useScroll, useTransform, motion } from 'framer-motion';

const FooterReveal = () => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end end"]
    });
    const yParallax = useTransform(scrollYProgress, [0, 1], ["-20%", "0%"]);
    const footerOpacity = useTransform(scrollYProgress, [0, 0.6], [0.6, 1]);
    const footerScale = useTransform(scrollYProgress, [0, 0.8], [0.92, 1]);

    return (
        <div ref={containerRef} className="relative z-0 bg-[#0A0A0A] pt-[20%]">
            <motion.div style={{ y: yParallax, opacity: footerOpacity, scale: footerScale }}>
                <FooterSignature />
            </motion.div>
        </div>
    );
};

const Home = () => {
    const { scrollY } = useScroll();
    const [currentVh, setCurrentVh] = React.useState(typeof window !== 'undefined' ? window.innerHeight : 800);

    const introRef = React.useRef<HTMLElement>(null);
    const { scrollYProgress: introScrollProgress } = useScroll({
        target: introRef,
        offset: ["start end", "end start"]
    });

    // Parallax values for the intro section
    const titleY = useTransform(introScrollProgress, [0, 1], ["-15%", "15%"]);
    const textY = useTransform(introScrollProgress, [0, 1], ["10%", "-10%"]);
    const rightSideY = useTransform(introScrollProgress, [0, 1], ["15%", "-15%"]);

    React.useEffect(() => {
        const updateVh = () => setCurrentVh(window.innerHeight);
        window.addEventListener('resize', updateVh);
        return () => window.removeEventListener('resize', updateVh);
    }, []);

    // Background Color Transition: Pure White (#FFFFFF) -> Paper Light (#F9F9F7)
    const bgColor = useTransform(scrollY, [currentVh * 2.8, currentVh * 3.0], ["#FFFFFF", "#F9F9F7"]);
    const sketchOpacity = useTransform(scrollY, [currentVh * 2.8, currentVh * 3.0], [0, 0.4]);

    return (
        <div className="selection:bg-primary selection:text-white bg-[#0A0A0A] font-sans">
            <motion.main
                className="relative z-10 w-full shadow-[0_20px_60px_rgba(0,0,0,0.5)] origin-top border-b border-black/10"
                style={{ backgroundColor: bgColor }}
            >
                {/* Global Artistic Overlays */}
                <motion.div
                    className="fixed inset-0 sketch-grid pointer-events-none -z-10"
                    style={{ opacity: sketchOpacity }}
                />

                <div className="noise-bg" />
                <Hero />

                {/* Brand Intro Section — Relocated from Hero */}
                <section ref={introRef} className="relative bg-paper-light z-20 py-20 md:py-40 px-6 md:px-12 border-t border-black/5 overflow-hidden">
                    {/* Technical Grid Accent */}
                    <motion.div className="absolute top-0 right-0 w-64 h-64 opacity-[0.03] pointer-events-none"
                        style={{
                            y: useTransform(introScrollProgress, [0, 1], ["-30%", "30%"]),
                            backgroundImage: 'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)',
                            backgroundSize: '40px 40px'
                        }}
                    />

                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 items-end">

                        {/* Left: Brand Name & Tagline */}
                        <motion.div
                            className="md:col-span-6"
                            style={{ y: titleY }}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div className="mb-10 text-primary/60 font-mono text-[10px] tracking-[0.5em] uppercase font-bold">
                                Manta / Atelier Digital
                            </div>

                            <motion.h1
                                className="font-display text-6xl md:text-9xl lg:text-[10rem] font-medium tracking-[calc(-0.06em)] text-black leading-none mb-10 uppercase"
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: 0.1 }}
                            >
                                MANTA
                            </motion.h1>

                            <motion.div
                                className="flex flex-col gap-5 border-l-[3px] border-primary pl-8 max-w-sm"
                                style={{ y: textY }}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3, duration: 0.8 }}
                            >
                                <p className="font-sans text-xl md:text-2xl text-black/60 font-normal leading-tight">
                                    Fusionando el <span className="text-black font-medium italic">gesto orgánico</span> con la estructura digital precisa.
                                </p>
                                <div className="font-mono text-[10px] text-black/30 uppercase tracking-[0.4em] mt-2">
                                    Est. 1999 — System Built
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Right: CTA + Manifesto Summary */}
                        <motion.div
                            className="md:col-span-6 flex flex-col justify-end items-start md:items-end gap-12"
                            style={{ y: rightSideY }}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div className="md:text-right">
                                <TextReveal
                                    text="Eliminamos lo innecesario, dejando marcas que se sienten humanas en un mundo digital."
                                    className="font-sans text-2xl md:text-3xl text-black/50 leading-snug font-normal max-w-md italic"
                                    delay={0.4}
                                    accentLastWord={true}
                                />
                            </div>

                            <a href="#contacto" className="group cursor-pointer">
                                <div className="btn-atelier bg-black text-white px-8 py-5 md:px-10 rounded-none font-mono font-bold text-[11px] tracking-[0.3em] md:tracking-[0.4em] transition-all hatch-shadow border-none hover:bg-neutral-900 border-none">
                                    INICIAR PROYECTO
                                </div>
                            </a>
                        </motion.div>

                    </div>
                </section>

                <VideoLight />

                <ParticlesSection />
                <VideoShowcase />
                <ManifestoSection />
                <ServicesSection />

                <PortfolioSection />

                <ContactSection />

            </motion.main>

            <FooterReveal />
        </div>
    );
};

export default Home;
