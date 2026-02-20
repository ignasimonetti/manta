import React from 'react';
import { motion } from 'framer-motion';

interface ScribbleTextProps {
    text: string;
    path: string;
    className?: string;
    underlineClassName?: string;
    color?: string;
    duration?: number;
    delay?: number;
}

const ScribbleText: React.FC<ScribbleTextProps> = ({
    text,
    path,
    className = "",
    underlineClassName = "",
    color = "currentColor",
    duration = 1.5,
    delay = 0.5
}) => {
    return (
        <span className={`relative inline-block ${className}`}>
            {text}
            <motion.svg
                viewBox="0 0 300 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`absolute -bottom-3 left-0 w-full h-[20px] overflow-visible pointer-events-none ${underlineClassName}`}
                preserveAspectRatio="none"
            >
                <motion.path
                    d={path}
                    stroke={color}
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                        duration,
                        delay,
                        ease: [0.45, 0, 0.55, 1] // easeInOutSine
                    }}
                />
            </motion.svg>
        </span>
    );
};

export default ScribbleText;
