import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InstagramLogo, LinkedinLogo, XLogo, YoutubeLogo, ChatCircleText } from '@phosphor-icons/react';

const SocialIcon: React.FC<{ icon: any, href: string }> = ({ icon: Icon, href }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        setIsClicked(true);
        setTimeout(() => setIsClicked(false), 500);
    };

    return (
        <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="relative w-12 h-12 flex items-center justify-center glass-card rounded-xl group cursor-none"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleClick}
            initial="idle"
            animate={isHovered ? "hover" : "idle"}
        >
            {/* Idle/Hover State Icon */}
            <motion.div
                variants={{
                    idle: { scale: 1, opacity: 0.6, rotate: 0 },
                    hover: { scale: 1.1, opacity: 1, rotate: 5, color: 'var(--color-primary)' }
                }}
                transition={{
                    duration: 2, repeat: Infinity, repeatType: "reverse"
                }}
            >
                <Icon weight="thin" size={24} className="transition-colors group-hover:drop-shadow-[0_0_8px_rgba(217,2,109,0.5)]" />
            </motion.div>

            {/* Ripple Effect on Click */}
            <AnimatePresence>
                {isClicked && (
                    <motion.span
                        className="absolute inset-0 bg-primary/20 rounded-xl"
                        initial={{ scale: 0, opacity: 1 }}
                        animate={{ scale: 2, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    />
                )}
            </AnimatePresence>

            {/* Glassmorphism Border Glow */}
            <motion.div
                className="absolute inset-0 rounded-xl border border-white/20"
                animate={{
                    opacity: isHovered ? 1 : 0.4,
                    borderColor: isHovered ? 'var(--color-primary)' : 'rgba(255,255,255,0.2)'
                }}
            />
        </motion.a>
    );
};

const SocialIcons: React.FC = () => {
    return (
        <div className="flex gap-4">
            <SocialIcon icon={LinkedinLogo} href="https://www.linkedin.com/in/ignacio-simonetti-7148b6ba/" />
            <SocialIcon icon={YoutubeLogo} href="https://www.youtube.com/@mantasrl" />
            <SocialIcon icon={InstagramLogo} href="https://www.instagram.com/mantasrl/" />
            <SocialIcon icon={XLogo} href="https://x.com/mantasrlsgo/" />
            <SocialIcon icon={ChatCircleText} href="#" />
        </div>
    );
};

export default SocialIcons;
