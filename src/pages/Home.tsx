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
import { ArrowRight } from 'lucide-react';

const Home = () => {
    const { scrollY } = useScroll();
    const [currentVh, setCurrentVh] = React.useState(typeof window !== 'undefined' ? window.innerHeight : 800);

    React.useEffect(() => {
        const updateVh = () => setCurrentVh(window.innerHeight);
        window.addEventListener('resize', updateVh);
        return () => window.removeEventListener('resize', updateVh);
    }, []);

    // Background Color Transition: Pure White (#FFFFFF) -> Cloud Dancer (#F0F0EF)
    const bgColor = useTransform(scrollY, [currentVh * 2.8, currentVh * 3.0], ["#FFFFFF", "#F0F0EF"]);

    return (
        <motion.div
            className="min-h-screen selection:bg-primary selection:text-white relative"
            style={{ backgroundColor: bgColor }}
        >
            {/* Global Artistic Overlays */}
            <motion.div
                className="fixed inset-0 sketch-grid pointer-events-none -z-10"
                style={{ opacity: useTransform(scrollY, [currentVh * 2.8, currentVh * 3.0], [0, 0.4]) }}
            />

            <div className="noise-bg" />
            <Hero />

            {/* Brand Intro Section — Relocated from Hero */}
            <section className="relative bg-white z-20 py-32 px-8 md:px-12 border-t border-gray-100 overflow-hidden">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-end">

                    {/* Left: Brand Name & Tagline */}
                    <motion.div
                        className="md:col-span-5"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <motion.h1
                            className="font-montserrat text-6xl md:text-8xl lg:text-9xl font-normal tracking-tight text-deep-charcoal leading-none mb-6 uppercase"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                        >
                            MANTA
                        </motion.h1>
                        <motion.div
                            className="flex flex-col gap-3 border-l-2 border-primary pl-5"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                        >
                            <p className="font-sans text-base md:text-lg text-deep-charcoal/70 max-w-sm font-normal leading-relaxed">
                                Fusionando el gesto orgánico con la estructura digital precisa.
                            </p>
                            <div className="font-mono text-[10px] text-gray-400 uppercase tracking-widest mt-1">
                                Est. 1999 — Atelier Digital
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Spacer */}
                    <div className="md:col-span-2" />

                    {/* Right: CTA + Manifesto Summary */}
                    <motion.div
                        className="md:col-span-5 flex flex-col justify-end items-start gap-8"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <TextReveal
                            text="Eliminamos lo innecesario, dejando marcas que se sienten humanas en un mundo digital."
                            className="font-sans text-xl md:text-2xl text-gray-500 leading-relaxed font-light max-w-md italic"
                            delay={0.4}
                            accentLastWord={true}
                        />

                        <a href="#contacto" className="group cursor-pointer">
                            <div className="flex items-center gap-4 bg-deep-charcoal text-white px-8 py-4 rounded-full font-display font-medium text-sm tracking-widest hover:bg-primary transition-all transform hover:-translate-y-1 shadow-glass">
                                INICIAR PROYECTO
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
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

            <FooterSignature />
        </motion.div>
    );
};

export default Home;
