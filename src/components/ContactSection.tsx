import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { Send, Check, Copy, Instagram, Linkedin, Twitter, Youtube, Sparkles, ChevronDown } from 'lucide-react';
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormState('submitting');
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        setFormState('success');

        // Reset form after 5 seconds to allow sending another
        setTimeout(() => {
            setFormState('idle');
        }, 6000);
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

    const inputClasses = "w-full bg-white/[0.06] border border-white/[0.12] rounded-2xl px-6 py-4 text-white font-sans focus:outline-none focus:border-primary/60 focus:bg-white/[0.10] focus:shadow-[0_0_0_3px_rgba(255,0,255,0.08)] transition-all duration-500 placeholder:text-white/30 hover:border-white/20";

    return (
        <section id="contacto" ref={containerRef} className="relative py-32 px-6 md:px-12 bg-[#080808] overflow-hidden">
            {/* Ambient Background Pattern */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: '40px 40px' }}
            />

            {/* Animated Background Decorative Elements */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.15, 0.3, 0.15],
                    x: [0, 50, 0],
                    y: [0, -30, 0]
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/20 blur-[180px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"
            />
            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.1, 0.25, 0.1],
                    x: [0, -40, 0],
                    y: [0, 40, 0]
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear", delay: 1 }}
                className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/10 blur-[150px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none"
            />

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
                        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-primary text-[10px] font-mono uppercase tracking-widest">
                            <Sparkles size={10} className="text-primary" />
                            Contacto Directo
                        </motion.div>

                        <motion.h2
                            variants={itemVariants}
                            className="text-7xl md:text-9xl font-display font-medium text-white tracking-tighter leading-[0.85] filter drop-shadow-2xl"
                        >
                            Elevamos <br /><span className="text-white/20 italic font-light">tu escala.</span>
                        </motion.h2>

                        <motion.p variants={itemVariants} className="text-xl text-white/40 max-w-md font-sans leading-relaxed">
                            Diseñamos experiencias que no solo se ven bien, sino que <span className="text-white/70">generan impacto real.</span> ¿Hablamos?
                        </motion.p>
                    </div>

                    {/* Contact Methods */}
                    <div className="space-y-12">
                        <motion.div
                            variants={itemVariants}
                            className="group cursor-pointer w-fit"
                            onClick={copyEmail}
                        >
                            <p className="text-[10px] uppercase tracking-[0.4em] text-white/20 mb-4 font-mono">Línea de Enlace</p>
                            <div className="flex items-center gap-6 text-3xl md:text-5xl text-white font-display transition-all duration-700 group-hover:tracking-tight hover:text-primary">
                                <span className="relative">
                                    hola@manta.com.ar
                                    <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-primary transition-all duration-700 group-hover:w-full" />
                                </span>
                                <div className="p-4 rounded-full bg-white/5 border border-white/10 group-hover:bg-primary group-hover:border-primary group-hover:text-white group-hover:rotate-[360deg] transition-all duration-1000 ease-in-out">
                                    {copied ? <Check size={18} /> : <Copy size={18} />}
                                </div>
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="space-y-6">
                            <p className="text-[10px] uppercase tracking-[0.4em] text-white/20 font-mono">Canales</p>
                            <div className="flex gap-4">
                                {[
                                    { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/mantasrl/' },
                                    { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/ignacio-simonetti-7148b6ba/' },
                                    { icon: Youtube, label: 'YouTube', href: 'https://www.youtube.com/@mantasrl' },
                                    { icon: Twitter, label: 'X', href: 'https://x.com/mantasrlsgo/' }
                                ].map((social, i) => (
                                    <motion.a
                                        key={i}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ y: -8, scale: 1.1, backgroundColor: "rgba(255,0,255,0.1)", borderColor: "rgba(255,0,255,0.4)" }}
                                        whileTap={{ scale: 0.9 }}
                                        className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-white/40 hover:text-white transition-all duration-500 shadow-xl"
                                    >
                                        <social.icon size={20} strokeWidth={1.5} />
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    <motion.div variants={itemVariants} className="pt-12 border-t border-white/5 hidden lg:block">
                        <div className="flex items-center gap-4 text-white/20 font-mono text-[9px] uppercase tracking-[0.3em] bg-white/[0.01] border border-white/[0.04] px-6 py-4 rounded-full w-fit backdrop-blur-sm">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/40 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            Estudio Operativo · Argentina / Global
                        </div>
                    </motion.div>
                </motion.div>

                {/* Right Content: Atelier Form with Tilted Card Effect */}
                <motion.div
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="relative"
                >
                    <TiltedCard
                        showTooltip={false}
                        rotateAmplitude={5}
                        containerClassName="h-full"
                    >
                        <div className="relative glass-card-dark bg-[#111111] p-8 md:p-14 rounded-[3.5rem] overflow-hidden min-h-[600px] shadow-[0_50px_100px_rgba(0,0,0,0.8)] group">
                            {/* Inner Glow - Refined for better depth */}
                            <div className="absolute -top-24 -right-24 w-80 h-80 bg-primary/20 blur-[100px] rounded-full pointer-events-none opacity-50" />
                            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/5 blur-[80px] rounded-full pointer-events-none" />

                            <div className="absolute top-0 right-0 p-10">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                    className="w-14 h-14 rounded-full border border-white/5 flex items-center justify-center text-white/20"
                                >
                                    <Sparkles size={24} />
                                </motion.div>
                            </div>

                            <div className="mb-14 relative">
                                <h3 className="text-4xl font-display text-white mb-3 tracking-tight">Inicio del Vínculo</h3>
                                <p className="text-white/50 text-base font-sans font-light">Describe tu visión y tracemos el camino juntos.</p>
                            </div>

                            <AnimatePresence mode="wait">
                                {formState !== 'success' ? (
                                    <motion.form
                                        key="form"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                                        transition={{ duration: 0.5 }}
                                        onSubmit={handleSubmit}
                                        className="space-y-10 relative"
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                            <div className="space-y-3 group">
                                                <label className="text-[10px] uppercase tracking-[0.2em] text-white/60 ml-1 font-mono group-focus-within:text-primary transition-colors duration-500">Tu Identidad</label>
                                                <input
                                                    type="text"
                                                    required
                                                    disabled={formState === 'submitting'}
                                                    placeholder="Nombre"
                                                    className={inputClasses}
                                                />
                                            </div>
                                            <div className="space-y-3 group">
                                                <label className="text-[10px] uppercase tracking-[0.2em] text-white/60 ml-1 font-mono group-focus-within:text-primary transition-colors duration-500">Vía de Contacto</label>
                                                <input
                                                    type="email"
                                                    required
                                                    disabled={formState === 'submitting'}
                                                    placeholder="Correo electrónico"
                                                    className={inputClasses}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-3 group relative">
                                            <label className="text-[10px] uppercase tracking-[0.2em] text-white/60 ml-1 font-mono group-focus-within:text-primary transition-colors duration-500">Categoría del Desafío</label>
                                            <div className="relative">
                                                <div
                                                    className={cn(inputClasses, "cursor-pointer flex justify-between items-center", formState === 'submitting' && "opacity-50 pointer-events-none")}
                                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                                >
                                                    <span className={selectedProject ? "text-white" : "text-white/30"}>
                                                        {selectedProject || "Selecciona una categoría"}
                                                    </span>
                                                    <motion.div animate={{ rotate: isDropdownOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                                                        <ChevronDown size={16} className="text-white/30 group-focus-within:text-primary transition-colors" />
                                                    </motion.div>
                                                </div>
                                                <AnimatePresence>
                                                    {isDropdownOpen && (
                                                        <motion.div
                                                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                                            transition={{ duration: 0.2 }}
                                                            className="absolute top-full left-0 w-full mt-2 bg-[#1A1A1A]/95 backdrop-blur-3xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-50 p-2"
                                                        >
                                                            {categories.map((cat) => (
                                                                <div
                                                                    key={cat}
                                                                    className={cn("px-4 py-3 rounded-xl cursor-pointer text-sm font-sans transition-colors duration-300 flex items-center justify-between", selectedProject === cat ? "bg-primary/20 text-white" : "text-white/60 hover:text-white hover:bg-white/5")}
                                                                    onClick={() => {
                                                                        setSelectedProject(cat as ProjectType);
                                                                        setIsDropdownOpen(false);
                                                                    }}
                                                                >
                                                                    {cat}
                                                                    {selectedProject === cat && <Check size={14} className="text-primary" />}
                                                                </div>
                                                            ))}
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        </div>

                                        <div className="space-y-3 group">
                                            <label className="text-[10px] uppercase tracking-[0.2em] text-white/60 ml-1 font-mono group-focus-within:text-primary transition-colors duration-500">La Visión</label>
                                            <textarea
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
                                            whileHover={formState === 'idle' ? { scale: 1.02, y: -2, backgroundColor: "#ffffff", color: "#000000" } : {}}
                                            whileTap={formState === 'idle' ? { scale: 0.98 } : {}}
                                            className={cn(
                                                "w-full py-6 rounded-2xl font-display font-medium text-[11px] tracking-[4px] uppercase transition-all duration-700 relative overflow-hidden group/btn shadow-2xl",
                                                formState === 'idle'
                                                    ? "bg-white text-black hover:shadow-[0_20px_40px_rgba(255,255,255,0.1)]"
                                                    : "bg-white/10 text-white/40 cursor-default"
                                            )}
                                        >
                                            <AnimatePresence mode="wait">
                                                {formState === 'idle' && (
                                                    <motion.div
                                                        key="idle"
                                                        initial={{ opacity: 0, scale: 0.9 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        exit={{ opacity: 0, scale: 1.1 }}
                                                        className="flex items-center justify-center gap-4"
                                                    >
                                                        Enviar Propuesta <Send size={14} className="group-hover/btn:translate-x-2 group-hover/btn:-translate-y-2 transition-transform duration-500" />
                                                    </motion.div>
                                                )}
                                                {formState === 'submitting' && (
                                                    <motion.div
                                                        key="submitting"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        exit={{ opacity: 0 }}
                                                        className="flex items-center justify-center gap-3"
                                                    >
                                                        <div className="w-4 h-4 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
                                                        Procesando Visión...
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </motion.button>
                                    </motion.form>
                                ) : (
                                    <motion.div
                                        key="success-message"
                                        initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                        transition={{ duration: 0.5, delay: 0.2 }}
                                        className="absolute inset-0 flex flex-col items-center justify-center text-center bg-[#111111] z-10"
                                    >
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.4 }}
                                            className="w-24 h-24 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-8 text-primary shadow-[0_0_50px_rgba(255,0,255,0.2)]"
                                        >
                                            <Check size={40} strokeWidth={1.5} />
                                        </motion.div>
                                        <motion.h4
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.5 }}
                                            className="text-4xl md:text-5xl font-display text-white mb-4 tracking-tight"
                                        >
                                            Iniciativa Recibida
                                        </motion.h4>
                                        <motion.p
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.6 }}
                                            className="text-white/50 font-sans text-lg max-w-sm mx-auto leading-relaxed"
                                        >
                                            Hemos capturado tu visión. Nos pondremos en contacto contigo a la brevedad para materializar el siguiente paso.
                                        </motion.p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </TiltedCard>
                </motion.div>
            </div>

            {/* Aesthetic Footer Detail */}
            <div className="max-w-7xl mx-auto mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[8px] font-mono text-white/10 uppercase tracking-[0.5em]">
                <div className="order-2 md:order-1 flex items-center gap-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/5" />
                    Manta Studio © 2026 · Digital Atelier
                </div>
                <div className="order-1 md:order-2 flex gap-10">
                    <a href="#" className="hover:text-white transition-colors duration-500">Privacy</a>
                    <a href="#" className="hover:text-white transition-colors duration-500">Terms</a>
                    <a href="#" className="hover:text-white transition-colors duration-500">Legal</a>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;

