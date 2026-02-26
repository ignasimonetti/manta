import React from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SquaresFour, Briefcase, Target, TestTube, EnvelopeSimple } from '@phosphor-icons/react';
import { Logo } from './Logo';




const StickyLogo: React.FC<{ opacity: any }> = ({ opacity }) => {
    const mouseX = useSpring(0, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(0, { stiffness: 150, damping: 15 });
    const [isHovered, setIsHovered] = React.useState(false);

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;

        // Limited magnetic pull
        mouseX.set(distanceX * 0.35);
        mouseY.set(distanceY * 0.35);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <motion.div
            className="fixed top-6 left-6 md:top-8 md:left-10 z-[60] pointer-events-none"
            style={{ opacity }}
        >
            <motion.div
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={handleMouseLeave}
                style={{ x: mouseX, y: mouseY }}
                className="pointer-events-auto relative group"
            >
                <Link to="/" className="block">
                    {/* Layered Glitch Effect on Hover */}
                    <div className="relative">
                        {/* Red Layer */}
                        <motion.div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                            animate={isHovered ? { x: [-1, 2, -2, 1, 0], y: [1, -1, 1, 0] } : {}}
                            transition={{ repeat: Infinity, duration: 0.2 }}
                            style={{ filter: 'drop-shadow(2px 0px 0px rgba(255,0,0,0.5))' }}
                        >
                            <Logo className="h-14 md:h-20 w-auto grayscale brightness-75 contrast-125" variant="dark" />
                        </motion.div>

                        {/* Blue Layer */}
                        <motion.div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                            animate={isHovered ? { x: [2, -1, 1, -2, 0], y: [-1, 1, 0] } : {}}
                            transition={{ repeat: Infinity, duration: 0.25 }}
                            style={{ filter: 'drop-shadow(-2px 0px 0px rgba(0,0,255,0.5))' }}
                        >
                            <Logo className="h-14 md:h-20 w-auto grayscale brightness-125 contrast-75" variant="dark" />
                        </motion.div>

                        {/* Main Logo */}
                        <motion.div
                            animate={{ scale: isHovered ? 1.05 : 1 }}
                            transition={{ type: "spring", stiffness: 300, damping: 10 }}
                        >
                            <Logo className="h-14 md:h-20 w-auto" variant="dark" />
                        </motion.div>
                    </div>
                </Link>
            </motion.div>
        </motion.div>
    );
};

const Navbar: React.FC = () => {
    const { scrollY, scrollYProgress } = useScroll();
    const [vh, setVh] = React.useState(typeof window !== 'undefined' ? window.innerHeight : 800);
    const [hovered, setHovered] = React.useState<number | null>(null);

    React.useEffect(() => {
        const updateVh = () => setVh(window.innerHeight);
        updateVh();
        window.addEventListener('resize', updateVh);
        return () => window.removeEventListener('resize', updateVh);
    }, []);

    // Global Visibility: Fades out completely as we reach the footer (last ~5% of scroll)
    const globalHideOpacity = useTransform(scrollYProgress, [0.88, 0.92], [1, 0]);

    // Unified navbar appearance — starts AFTER the hero animation ends (~2.7vh)
    const navbarOpacityRaw = useTransform(scrollY, [vh * 2.5, vh * 2.8], [0, 1]);
    const navbarSpringOpacity = useSpring(navbarOpacityRaw, { stiffness: 60, damping: 20 });

    // Combine with global hide
    const navbarOpacity = useTransform(
        [navbarSpringOpacity, globalHideOpacity],
        ([nav, hide]) => (nav as number) * (hide as number)
    );

    // Permanent Light Glassmorphism — more premium
    const bgColor = "rgba(255, 255, 255, 0.82)";
    const textColor = "#1a1a1a";
    const borderColor = "rgba(0, 0, 0, 0.04)";

    // Sticky Logo Reveal — Decoupled Branding
    const stickyLogoOpacityRaw = useTransform(scrollY, [vh * 2.5, vh * 2.8], [0, 1]);
    const stickyLogoOpacity = useTransform(
        [stickyLogoOpacityRaw, globalHideOpacity],
        ([logo, hide]) => (logo as number) * (hide as number)
    );

    const navItems = [
        { name: 'Servicios', icon: <SquaresFour size={18} weight="thin" />, href: '#servicios', type: 'anchor' as const },
        { name: 'Proyectos', icon: <Briefcase size={18} weight="thin" />, href: '#proyectos', type: 'anchor' as const },
        { name: 'Enfoque', icon: <Target size={18} weight="thin" />, href: '#enfoque', type: 'anchor' as const },
        { name: 'Lab', icon: <TestTube size={18} weight="thin" />, href: '/lab', type: 'link' as const },
        { name: 'Contacto', icon: <EnvelopeSimple size={18} weight="thin" />, href: '#contacto', type: 'anchor' as const },
    ];

    return (
        <div>
            <StickyLogo opacity={stickyLogoOpacity} />

            <motion.nav
                className="fixed top-8 inset-x-0 mx-auto w-max max-w-[calc(100vw-2rem)] z-50 flex items-center p-1.5 md:p-2 rounded-full border shadow-xl backdrop-blur-xl"
                style={{
                    opacity: navbarOpacity,
                    y: 0,
                    backgroundColor: bgColor,
                    color: textColor,
                    borderColor: borderColor,
                }}
            >
                {/* Navigation Items (Dock style) */}
                <div className="flex items-center gap-0.5 md:gap-2">
                    {navItems.map((item, idx) => {
                        const isActive = hovered === idx;
                        const content = (
                            <div
                                className={`relative px-3 py-3 md:px-4 md:py-2 rounded-full flex items-center gap-2.5 group transition-all duration-300 ${isActive ? 'text-primary' : 'text-black/50 hover:text-black/80'}`}
                                onMouseEnter={() => setHovered(idx)}
                                onMouseLeave={() => setHovered(null)}
                            >
                                <span className="relative z-10 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3">
                                    {item.icon}
                                </span>
                                <span className="hidden md:inline relative z-10 font-sans text-[11px] font-bold uppercase tracking-[0.25em]">
                                    {item.name}
                                </span>

                                <AnimatePresence>
                                    {isActive && (
                                        <motion.div
                                            layoutId="nav-hover-bg"
                                            className="absolute inset-0 bg-primary/5 rounded-full -z-10"
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                        />
                                    )}
                                </AnimatePresence>
                            </div>
                        );

                        return item.type === 'link' ? (
                            <Link key={item.name} to={item.href}>
                                {content}
                            </Link>
                        ) : (
                            <a key={item.name} href={item.href}>
                                {content}
                            </a>
                        );
                    })}
                </div>
            </motion.nav>
        </div>
    );
};

export default Navbar;
