import React from 'react';
import { motion, type Variants } from 'framer-motion';

interface TextRevealProps {
    text: string;
    className?: string;
    /** Delay before the entire animation begins (seconds) */
    delay?: number;
    /** Accent the last word with primary color + glow */
    accentLastWord?: boolean;
}

const containerVariants: Variants = {
    hidden: {},
    visible: (delay: number) => ({
        transition: {
            staggerChildren: 0.08,
            delayChildren: delay,
        },
    }),
};

const wordVariants: Variants = {
    hidden: {
        opacity: 0.12,
        y: 8,
        filter: 'blur(2px)',
    },
    visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

const accentVariants: Variants = {
    hidden: {
        opacity: 0.12,
        y: 8,
        filter: 'blur(2px)',
        color: 'inherit',
    },
    visible: {
        opacity: 1,
        y: 0,
        filter: ['blur(2px)', 'blur(0px)', 'blur(0px)'],
        color: ['inherit', '#FF00FF', '#FF00FF'],
        textShadow: [
            '0 0 0px rgba(255,0,255,0)',
            '0 0 20px rgba(255,0,255,0.5)',
            '0 0 0px rgba(255,0,255,0)',
        ],
        transition: {
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1],
            color: { duration: 1.2, times: [0, 0.4, 1] },
            textShadow: { duration: 1.8, times: [0, 0.3, 1] },
            filter: { duration: 0.5, times: [0, 0.5, 1] },
        },
    },
};

const TextReveal: React.FC<TextRevealProps> = ({
    text,
    className = '',
    delay = 0.3,
    accentLastWord = true,
}) => {
    const words = text.split(' ');

    return (
        <motion.p
            className={`flex flex-wrap ${className}`}
            variants={containerVariants}
            custom={delay}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
        >
            {words.map((word, i) => {
                const isLast = i === words.length - 1;
                const useAccent = isLast && accentLastWord;

                return (
                    <motion.span
                        key={i}
                        className="inline-block mr-[0.3em]"
                        variants={useAccent ? accentVariants : wordVariants}
                    >
                        {word}
                    </motion.span>
                );
            })}
        </motion.p>
    );
};

export default TextReveal;
