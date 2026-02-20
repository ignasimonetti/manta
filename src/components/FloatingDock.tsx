import React, { useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { LayoutGrid, Briefcase, Target, Beaker, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const primaryNavItems = [
    { name: 'Servicios', icon: <LayoutGrid size={18} />, href: '#servicios', type: 'anchor' as const },
    { name: 'Proyectos', icon: <Briefcase size={18} />, href: '#proyectos', type: 'anchor' as const },
    { name: 'Enfoque', icon: <Target size={18} />, href: '#enfoque', type: 'anchor' as const },
    { name: 'Lab', icon: <Beaker size={18} />, href: '/lab', type: 'link' as const },
];

const secondaryNavItems = [
    { name: 'Contacto', icon: <Mail size={18} />, href: '#contacto', type: 'anchor' as const },
];

const FloatingDock: React.FC = () => {
    const [hovered, setHovered] = useState<number | null>(null);
    const { scrollY } = useScroll();
    const [vh, setVh] = useState(typeof window !== 'undefined' ? window.innerHeight : 800);

    React.useEffect(() => {
        const updateVh = () => setVh(window.innerHeight);
        window.addEventListener('resize', updateVh);
        return () => window.removeEventListener('resize', updateVh);
    }, []);

    // Visibility threshold: Show after passing the Hero/Brand Intro
    const showThreshold = vh * 3.0; // Same as when Navbar links start to hide
    const dockOpacityRaw = useTransform(scrollY, [showThreshold, showThreshold + vh * 0.5], [0, 1]);
    const dockYRaw = useTransform(scrollY, [showThreshold, showThreshold + vh * 0.5], [40, 0]);

    const dockOpacity = useSpring(dockOpacityRaw, { stiffness: 100, damping: 30 });
    const dockY = useSpring(dockYRaw, { stiffness: 100, damping: 30 });

    const allItems = [...primaryNavItems, ...secondaryNavItems];

    return (
        <motion.nav
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50"
            style={{
                opacity: dockOpacity,
                y: dockY,
                pointerEvents: useTransform(dockOpacity, (o) => o < 0.1 ? 'none' : 'auto')
            }}
        >
            <motion.div
                className="glass-dock flex items-center gap-1 md:gap-2 p-2 rounded-3xl shadow-2xl backdrop-blur-xl bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10"
            >
                {allItems.map((item, idx) => {
                    const className = `relative px-4 md:px-6 py-3 rounded-2xl flex items-center gap-2 group transition-colors duration-300 ${hovered === idx ? 'text-magenta' : 'text-deep-charcoal/60 dark:text-white/60'}`;
                    const inner = (
                        <>
                            <span className="relative z-10">{item.icon}</span>
                            <span className="hidden md:inline relative z-10 font-sans text-[10px] font-bold uppercase tracking-wider">{item.name}</span>
                            {hovered === idx && (
                                <motion.div
                                    layoutId="nav-bg"
                                    className="absolute inset-0 bg-magenta/10 rounded-2xl -z-10"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                />
                            )}
                        </>
                    );

                    return (
                        <React.Fragment key={item.name}>
                            {item.type === 'link' ? (
                                <motion.div
                                    onMouseEnter={() => setHovered(idx)}
                                    onMouseLeave={() => setHovered(null)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Link to={item.href} className={className}>
                                        {inner}
                                    </Link>
                                </motion.div>
                            ) : (
                                <motion.a
                                    href={item.href}
                                    className={className}
                                    onMouseEnter={() => setHovered(idx)}
                                    onMouseLeave={() => setHovered(null)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {inner}
                                </motion.a>
                            )}
                            {idx === primaryNavItems.length - 1 && <div className="w-px h-6 bg-deep-charcoal/10 dark:bg-white/10 mx-1" />}
                        </React.Fragment>
                    );
                })}
            </motion.div>
        </motion.nav>
    );
};

export default FloatingDock;
