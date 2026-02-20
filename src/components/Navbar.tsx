import React from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';
import { Link } from 'react-router-dom';

import { Logo } from './Logo';


const Navbar: React.FC = () => {
    const { scrollY } = useScroll();
    const [vh, setVh] = React.useState(typeof window !== 'undefined' ? window.innerHeight : 800);
    const [logoVariant, setLogoVariant] = React.useState<'dark' | 'light'>('dark');
    const [targetX, setTargetX] = React.useState(0);

    React.useEffect(() => {
        const updateVh = () => setVh(window.innerHeight);
        const calculateTarget = () => {
            const container = document.querySelector('.nav-container');
            if (container) {
                const containerWidth = container.clientWidth;
                const logoWidth = window.innerWidth >= 768 ? 320 : 240; // md:w-80 (320px) | w-60 (240px)
                setTargetX(containerWidth - logoWidth);
            }
        };

        const handleResize = () => {
            updateVh();
            calculateTarget();
        };

        updateVh();
        calculateTarget();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Switch logo variant based on scroll position (same as theme switch point)
    useMotionValueEvent(scrollY, "change", (latest) => {
        const threshold = vh * 3.0;
        setLogoVariant(latest > threshold ? 'light' : 'dark');
    });

    // Unified navbar appearance — starts as we move into the ascent phase (Act II)
    const navbarOpacityRaw = useTransform(scrollY, [vh * 1.5, vh * 2.0], [0, 1]);
    const navbarOpacity = useSpring(navbarOpacityRaw, { stiffness: 60, damping: 20 });

    // Background & Glassmorphism — increases as we approach the landing (Act III)
    const bgOpacity = useTransform(scrollY, [vh * 2.0, vh * 2.5], [0, 0.95]);
    const blurAmount = useTransform(scrollY, [vh * 2.0, vh * 2.5], [0, 20]);

    // Theme Switch: White -> Dark (Transition starts at ParticlesSection approx 3.5vh)
    const bgColor = useTransform(
        scrollY,
        [vh * 2.5, vh * 3.5],
        ["rgba(255, 255, 255, 1)", "rgba(10, 10, 10, 0.8)"]
    );

    const textColor = useTransform(
        scrollY,
        [vh * 2.5, vh * 3.5],
        ["#2d2d2d", "#ffffff"]
    );

    const borderColor = useTransform(
        scrollY,
        [vh * 2.5, vh * 3.5],
        ["rgba(0,0,0,0.05)", "rgba(255,255,255,0.1)"]
    );

    // Evolving Navigation Thresholds
    const navTransitionStart = vh * 3.0;
    const navTransitionEnd = vh * 3.8;

    // Links Visibility
    const linksOpacity = useTransform(scrollY, [navTransitionStart, navTransitionEnd - vh * 0.3], [1, 0]);
    const linksY = useTransform(scrollY, [navTransitionStart, navTransitionEnd - vh * 0.3], [0, -10]);

    // Logo Position Transition (Move to right)
    // We dynamically calculate targetX based on the container width
    const logoX = useTransform(scrollY, [navTransitionStart, navTransitionEnd], [0, targetX]);

    // Logo Handover — cross-fades with flying logo and anchors permanently
    const logoOpacity = useTransform(scrollY, [vh * 2.5, vh * 2.7], [0, 1]);
    const logoScale = useTransform(scrollY, [vh * 2.5, vh * 2.9], [1.5, 1]);
    const smoothLogoScale = useSpring(logoScale, { stiffness: 50, damping: 25 });

    return (
        <motion.nav
            className="fixed top-0 left-0 right-0 z-50 md:px-12 px-6 py-3"
            style={{
                opacity: navbarOpacity,
                backgroundColor: bgColor,
                backdropFilter: useTransform(blurAmount, (b) => `blur(${b}px)`),
                color: textColor,
                borderBottom: useTransform(borderColor, (c) => `1px solid ${c}`),
                boxShadow: useTransform(bgOpacity, (o) => o > 0.1 ? '0 10px 40px rgba(0,0,0,0.1)' : 'none')
            }}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
                duration: 1.6,
                ease: "easeOut",
                opacity: { duration: 1.2 }
            }}
        >
            <div className="nav-container max-w-7xl mx-auto flex justify-between items-center text-deep-charcoal dark:text-white relative">
                {/* The Logo that appears after the Hero flight - Bold brand presence */}
                <motion.div
                    // Increased size as requested: w-48->w-60, h-12->h-16 (mobile) | w-56->w-80, h-14->h-24 (desktop)
                    className="w-60 h-16 md:w-80 md:h-24 relative flex items-center justify-start z-10"
                    style={{
                        opacity: logoOpacity,
                        scale: smoothLogoScale,
                        x: logoX
                    }}
                >
                    <Logo className="h-full w-auto" variant={logoVariant} />
                </motion.div>

                <motion.div
                    className="hidden md:flex gap-12 items-center"
                    style={{
                        opacity: linksOpacity,
                        y: linksY,
                        pointerEvents: useTransform(linksOpacity, (o) => o < 0.1 ? 'none' : 'auto')
                    }}
                >
                    {[
                        { label: 'Servicios', id: 'servicios', type: 'anchor' },
                        { label: 'Proyectos', id: 'proyectos', type: 'anchor' },
                        { label: 'Enfoque', id: 'enfoque', type: 'anchor' },
                        { label: 'Lab', id: 'lab', type: 'link' }
                    ].map((item) => (
                        item.type === 'link' ? (
                            <Link
                                key={item.id}
                                to="/lab"
                                className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] hover:text-magenta transition-colors relative group"
                            >
                                {item.label}
                                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-magenta transition-all duration-300 group-hover:w-full" />
                            </Link>
                        ) : (
                            <motion.a
                                key={item.id}
                                href={`/#${item.id}`}
                                className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] hover:text-magenta transition-colors relative group"
                                whileHover={{ y: -1 }}
                            >
                                {item.label}
                                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-magenta transition-all duration-300 group-hover:w-full" />
                            </motion.a>
                        )
                    ))}

                    <a href="#contacto">
                        <motion.button
                            className="px-8 py-2.5 bg-current text-current invert-0 dark:invert rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-magenta hover:text-white transition-all shadow-xl"
                            style={{
                                backgroundColor: textColor,
                                color: useTransform(textColor, (t) => t === "#ffffff" ? "#000000" : "#ffffff")
                            }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            HABLEMOS
                        </motion.button>
                    </a>
                </motion.div>

                {/* Mobile Menu Icon */}
                <motion.div
                    className="md:hidden flex flex-col gap-1.5 cursor-pointer group"
                    style={{
                        opacity: linksOpacity,
                        pointerEvents: useTransform(linksOpacity, (o) => o < 0.1 ? 'none' : 'auto')
                    }}
                >
                    <motion.div
                        className="w-6 h-[1px] group-hover:bg-magenta transition-colors"
                        style={{ backgroundColor: textColor }}
                    />
                    <motion.div
                        className="w-4 h-[1px] group-hover:bg-magenta transition-colors self-end"
                        style={{ backgroundColor: textColor }}
                    />
                </motion.div>
            </div>
        </motion.nav >
    );
};

export default Navbar;
