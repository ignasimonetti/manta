import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { PaperPlaneTilt, Check, Copy, InstagramLogo, LinkedinLogo, XLogo, YoutubeLogo, Sparkle, CaretDown } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';
import { useProject, type ProjectType } from '../context/ProjectContext';
import TiltedCard from './TiltedCard';

const ContactSection = () => {
    const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
    const [copied, setCopied] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const categories = ["Landing Page", "Boutique Sites", "Aplicaciones", "Otro"];
    const { selectedProject, setSelectedProject } = useProject();
    const containerRef = useRef<HTMLDivElement>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormState('submitting');

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            category: selectedProject,
            message: formData.get('message'),
            source: 'Manta Website Contact Form'
        };

        try {
            const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL;

            if (!webhookUrl) {
                console.warn('VITE_N8N_WEBHOOK_URL is not defined. Falling back to simulation.');
                await new Promise(resolve => setTimeout(resolve, 2000));
            } else {
                const response = await fetch(webhookUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                });

                if (!response.ok) throw new Error('Network response was not ok');
            }

            setFormState('success');

            // Reset form after 6 seconds
            setTimeout(() => {
                setFormState('idle');
            }, 6000);
        } catch (error) {
            console.error('Error submitting form:', error);
            setFormState('idle');
            alert('Hubo un error al enviar el mensaje. Por favor intenta de nuevo.');
        }
    };

    const copyEmail = () => {
        navigator.clipboard.writeText('hola@manta.com.ar');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Stagger layout variants
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
        }
    };

    const inputClasses = "w-full bg-transparent border-0 border-b-2 border-black/10 focus:border-primary focus:bg-black/[0.02] px-4 py-4 rounded-t-sm transition-all placeholder:text-black/30 text-lg text-black outline-none";

    return (
        <section id="contacto" ref={containerRef} className="relative py-32 px-6 md:px-12 bg-paper-light overflow-hidden">
            {/* Technical Grid Overlay */}
            <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px)',
                    backgroundSize: '80px 80px'
                }}
            />

            {/* Light Ink Splatter (Subtle) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-5 pointer-events-none overflow-hidden">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] ink-wash rotate-45 scale-150" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] ink-wash -rotate-12" />
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-start relative z-10">

                {/* Left Content */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="space-y-16"
                >
                    <div className="space-y-8">
                        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 bg-transparent border border-black/10 text-[10px] font-mono uppercase tracking-widest text-black/60 rounded-full">
                            <Sparkle weight="fill" size={10} className="text-primary animate-pulse" />
                            Contacto Directo
                        </motion.div>

                        <motion.div variants={itemVariants} className="relative">
                            <h2 className="text-5xl md:text-8xl lg:text-9xl font-display font-bold text-black tracking-tighter leading-[0.85]">
                                Elevamos <br />
                                <span className="text-black/30 italic font-serif font-light block mt-2">tu escala.</span>
                            </h2>
                            <div className="absolute -z-10 -top-10 -left-10 w-48 h-48 bg-primary opacity-5 blur-3xl rounded-full"></div>
                        </motion.div>

                        <motion.p variants={itemVariants} className="text-lg md:text-xl text-black/60 max-w-sm font-light leading-relaxed mt-6">
                            Diseñamos experiencias que no solo se ven bien, sino que <strong className="text-black font-medium border-b-2 border-primary/30">generan impacto real.</strong> <br />¿Hablamos?
                        </motion.p>
                    </div>

                    {/* Contact Methods */}
                    <div className="space-y-12">
                        <motion.div
                            variants={itemVariants}
                            className="group cursor-pointer w-fit"
                            onClick={copyEmail}
                        >
                            <p className="text-[10px] uppercase tracking-[0.4em] text-black/40 mb-4 font-mono">Línea de Enlace / Email</p>
                            <div className="flex items-center gap-4 text-xl sm:text-3xl md:text-5xl text-black font-display font-medium transition-all duration-700 hover:text-primary">
                                <span className="relative break-all">
                                    hola@manta.com.ar
                                </span>
                                <div className="p-4 bg-transparent border border-black/10 group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all duration-500 ease-in-out group-hover:rotate-12 rounded-sm">
                                    {copied ? <Check weight="bold" size={18} /> : <Copy weight="bold" size={18} />}
                                </div>
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="space-y-4 pt-4">
                            <p className="text-[10px] uppercase tracking-[0.4em] text-black/40 font-mono mb-6">Canales Sociales</p>
                            <div className="flex gap-3">
                                {[
                                    { icon: InstagramLogo, label: 'Instagram', href: 'https://www.instagram.com/mantasrl/' },
                                    { icon: LinkedinLogo, label: 'LinkedIn', href: 'https://www.linkedin.com/in/ignacio-simonetti-7148b6ba/' },
                                    { icon: YoutubeLogo, label: 'YouTube', href: 'https://www.youtube.com/@mantasrl' },
                                    { icon: XLogo, label: 'X', href: 'https://x.com/mantasrlsgo/' }
                                ].map((social, i) => (
                                    <motion.a
                                        key={i}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ y: -4, backgroundColor: "rgba(217, 2, 109, 0.05)", borderColor: "rgba(217, 2, 109, 0.3)", color: "var(--color-primary)" }}
                                        whileTap={{ scale: 0.95 }}
                                        className="w-12 h-12 bg-transparent backdrop-blur-sm border border-black/10 flex items-center justify-center text-black/50 hover:text-primary transition-all duration-300 rounded-sm"
                                    >
                                        <social.icon weight="fill" size={20} />
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    <motion.div variants={itemVariants} className="pt-12 border-t border-black/5 hidden lg:block">
                        <div className="flex items-center gap-4 text-black/40 font-mono text-[9px] uppercase tracking-[0.3em] bg-transparent border border-black/5 px-6 py-4 rounded-sm w-fit">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full bg-primary opacity-20"></span>
                                <span className="relative inline-flex h-2 w-2 bg-primary"></span>
                            </span>
                            Estudio Operativo · Argentina / Global
                        </div>
                    </motion.div>
                </motion.div>

                {/* Right Content: Vellum Form */}
                <motion.div
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="relative"
                >
                    <TiltedCard
                        showTooltip={false}
                        rotateAmplitude={3}
                        containerClassName="h-full"
                    >
                        <div className="relative vellum p-5 sm:p-8 md:p-14 border border-black/10 hatch-shadow min-h-[600px] group overflow-visible">

                            {/* Technical Corner Bracket */}
                            <div className="absolute top-0 right-0 w-16 h-16 border-t font-mono border-black/10 border-r" />

                            <div className="mb-14 relative">
                                <span className="text-primary font-mono text-[10px] tracking-widest uppercase mb-4 block">Fase 01</span>
                                <h3 className="text-4xl font-display text-black mb-3 tracking-tight">Inicio del Vínculo</h3>
                                <p className="text-black/60 text-base font-sans font-normal leading-relaxed">Describe tu visión y tracemos el camino juntos.</p>
                            </div>

                            <AnimatePresence mode="wait">
                                {formState !== 'success' ? (
                                    <motion.form
                                        key="form"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0, scale: 0.98 }}
                                        transition={{ duration: 0.5 }}
                                        onSubmit={handleSubmit}
                                        className="space-y-10 relative"
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                            <div className="space-y-3 group">
                                                <label className="text-[10px] uppercase tracking-[0.2em] text-black/40 ml-1 font-mono group-focus-within:text-primary transition-colors duration-500">Tu Identidad</label>
                                                <input
                                                    name="name"
                                                    required
                                                    disabled={formState === 'submitting'}
                                                    placeholder="Nombre"
                                                    className={inputClasses}
                                                />
                                            </div>
                                            <div className="space-y-3 group">
                                                <label className="text-[10px] uppercase tracking-[0.2em] text-black/40 ml-1 font-mono group-focus-within:text-primary transition-colors duration-500">Vía de Contacto</label>
                                                <input
                                                    name="email"
                                                    required
                                                    disabled={formState === 'submitting'}
                                                    placeholder="Correo electrónico"
                                                    className={inputClasses}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-3 group relative">
                                            <label className="text-[10px] uppercase tracking-[0.2em] text-black/40 ml-1 font-mono group-focus-within:text-primary transition-colors duration-500">Categoría del Desafío</label>
                                            <div className="relative">
                                                <div
                                                    className={cn(inputClasses, "cursor-pointer flex justify-between items-center group/dropdown", formState === 'submitting' && "opacity-50 pointer-events-none")}
                                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                                >
                                                    <span className={selectedProject ? "text-black" : "text-black/30"}>
                                                        {selectedProject || "Selecciona una categoría"}
                                                    </span>
                                                    <motion.div animate={{ rotate: isDropdownOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                                                        <CaretDown weight="bold" size={14} className="text-black/30 group-focus-within:text-primary transition-colors" />
                                                    </motion.div>
                                                </div>
                                                <AnimatePresence>
                                                    {isDropdownOpen && (
                                                        <motion.div
                                                            initial={{ opacity: 0, y: 5 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            exit={{ opacity: 0, y: 5 }}
                                                            className="absolute top-full left-0 w-full mt-2 bg-[#F4F1EA] border border-black/10 rounded-sm overflow-hidden z-50 hatch-shadow"
                                                        >
                                                            {categories.map((cat) => (
                                                                <div
                                                                    key={cat}
                                                                    className={cn("px-6 py-4 cursor-pointer text-sm font-sans transition-colors duration-300 flex items-center justify-between", selectedProject === cat ? "bg-black/[0.03] text-primary" : "text-black/60 hover:text-black hover:bg-black/[0.02]")}
                                                                    onClick={() => {
                                                                        setSelectedProject(cat as ProjectType);
                                                                        setIsDropdownOpen(false);
                                                                    }}
                                                                >
                                                                    {cat}
                                                                    {selectedProject === cat && <Check weight="bold" size={14} className="text-primary" />}
                                                                </div>
                                                            ))}
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        </div>

                                        <div className="space-y-3 group">
                                            <label className="text-[10px] uppercase tracking-[0.2em] text-black/40 ml-1 font-mono group-focus-within:text-primary transition-colors duration-500">La Visión</label>
                                            <textarea
                                                name="message"
                                                rows={4}
                                                required
                                                disabled={formState === 'submitting'}
                                                placeholder="Escribe aquí el núcleo de tu propuesta..."
                                                className={cn(inputClasses, "resize-none")}
                                            />
                                        </div>

                                        <motion.button
                                            type="submit"
                                            disabled={formState !== 'idle'}
                                            className={cn(
                                                "w-full py-6 rounded-none font-bold uppercase tracking-widest text-[12px] transition-all duration-300",
                                                formState === 'idle'
                                                    ? "bg-black text-white hover:bg-black/80 hover:hatch-shadow hover:-translate-y-1"
                                                    : formState === 'submitting'
                                                        ? "bg-black/20 text-black cursor-not-allowed"
                                                        : "bg-primary text-white cursor-not-allowed"
                                            )}
                                        >
                                            <AnimatePresence mode="wait">
                                                {formState === 'idle' && (
                                                    <motion.div
                                                        key="idle"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        exit={{ opacity: 0 }}
                                                        className="flex items-center justify-center gap-4"
                                                    >
                                                        Enviar Iniciativa <PaperPlaneTilt weight="bold" size={14} />
                                                    </motion.div>
                                                )}
                                                {formState === 'submitting' && (
                                                    <motion.div
                                                        key="submitting"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        className="flex items-center justify-center gap-3"
                                                    >
                                                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                                        Procesando...
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </motion.button>
                                    </motion.form>
                                ) : (
                                    <motion.div
                                        key="success-message"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 z-10"
                                    >
                                        <div className="w-24 h-24 bg-primary/5 border border-primary/20 flex items-center justify-center mb-8 text-primary rounded-sm shadow-sm">
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ type: "spring", stiffness: 200 }}
                                            >
                                                <Check weight="bold" size={40} />
                                            </motion.div>
                                        </div>
                                        <h4 className="text-4xl font-display text-black mb-4 tracking-tight">Iniciativa Recibida</h4>
                                        <p className="text-black/60 font-sans text-lg max-w-sm mx-auto leading-relaxed">
                                            Hemos capturado tu visión. Nos pondremos en contacto contigo a la brevedad.
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </TiltedCard>
                </motion.div>
            </div>

            {/* Aesthetic Footer Detail */}
            <div className="max-w-7xl mx-auto mt-32 pt-12 border-t border-black/10 flex flex-col md:flex-row justify-between items-center gap-6 text-[8px] font-mono text-black/40 uppercase tracking-[0.5em]">
                <div className="order-2 md:order-1 flex items-center gap-4">
                    <span className="w-1.5 h-1.5 bg-black/10" />
                    Manta Studio © {new Date().getFullYear()} · Digital Atelier
                </div>
                <div className="order-1 md:order-2 flex gap-10">
                    <a href="#" className="hover:text-black transition-colors duration-500">Privacy</a>
                    <a href="#" className="hover:text-black transition-colors duration-500">Terms</a>
                    <a href="#" className="hover:text-black transition-colors duration-500">Legal</a>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
