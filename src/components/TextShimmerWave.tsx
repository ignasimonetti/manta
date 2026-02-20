'use client';
import React, { type JSX } from 'react';
import { motion, type Transition } from 'framer-motion';
import { cn } from '@/lib/utils';

export type TextShimmerWaveProps = {
    children: string;
    as?: React.ElementType;
    className?: string;
    duration?: number;
    zDistance?: number;
    xDistance?: number;
    yDistance?: number;
    spread?: number;
    scaleDistance?: number;
    rotateYDistance?: number;
    transition?: Transition;
};

/**
 * TextShimmerWave - Adapted for Manta Studio
 * A sophisticated character-based animation that adds 3D depth.
 * Ideal for metadata, IDs, and subtle highlights.
 */
export function TextShimmerWave({
    children,
    as: Component = 'p',
    className,
    duration = 2,
    zDistance = 4,
    xDistance = 1,
    yDistance = -1,
    spread = 1,
    scaleDistance = 1.05,
    rotateYDistance = 5,
    transition,
}: TextShimmerWaveProps) {

    // Adapt to standard Component if needed
    const MotionComponent = motion[Component as keyof typeof motion] || motion.p;

    return (
        <MotionComponent
            className={cn(
                'relative inline-block [perspective:500px]',
                '[--base-color:rgba(255,255,255,0.4)] [--base-gradient-color:#ffffff]',
                className
            )}
            style={{ color: 'var(--base-color)' }}
        >
            {children.split('').map((char, i) => {
                const delay = (i * duration * (1 / spread)) / children.length;

                return (
                    <motion.span
                        key={i}
                        className={cn(
                            'inline-block whitespace-pre [transform-style:preserve-3d]'
                        )}
                        initial={{
                            translateZ: 0,
                            scale: 1,
                            rotateY: 0,
                            color: 'var(--base-color)',
                        }}
                        animate={{
                            translateZ: [0, zDistance, 0],
                            translateX: [0, xDistance, 0],
                            translateY: [0, yDistance, 0],
                            scale: [1, scaleDistance, 1],
                            rotateY: [0, rotateYDistance, 0],
                            color: [
                                'var(--base-color)',
                                'var(--base-gradient-color)',
                                'var(--base-color)',
                            ],
                        }}
                        transition={{
                            duration: duration,
                            repeat: Infinity,
                            repeatDelay: 0.5,
                            delay,
                            ease: 'easeInOut',
                            ...transition,
                        }}
                    >
                        {char}
                    </motion.span>
                );
            })}
        </MotionComponent>
    );
}
