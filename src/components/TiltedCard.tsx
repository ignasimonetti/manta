'use client';
import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, type SpringOptions } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TiltedCardProps {
    children: React.ReactNode;
    captionText?: string;
    containerClassName?: string;
    scaleOnHover?: number;
    rotateAmplitude?: number;
    showTooltip?: boolean;
    tooltipClassName?: string;
}

const springValues: SpringOptions = {
    damping: 30,
    stiffness: 100,
    mass: 2
};

/**
 * TiltedCard - Manta Edition
 * Adapts the "React Bits" physics to our boutique design system.
 * Features: Velocity-based caption rotation, smooth 3D tilt, and glassmorphism.
 */
export default function TiltedCard({
    children,
    captionText = 'Explorar Proyecto',
    containerClassName,
    scaleOnHover = 1.02,
    rotateAmplitude = 12,
    showTooltip = true,
    tooltipClassName,
}: TiltedCardProps) {
    const ref = useRef<HTMLElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useSpring(useMotionValue(0), springValues);
    const rotateY = useSpring(useMotionValue(0), springValues);
    const scale = useSpring(1, springValues);
    const opacity = useSpring(0);

    // Physics for the floating label balance
    const rotateFigcaption = useSpring(0, {
        stiffness: 350,
        damping: 30,
        mass: 1
    });

    const [lastY, setLastY] = useState<number>(0);

    function handleMouse(e: React.MouseEvent<HTMLElement>) {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const offsetX = e.clientX - rect.left - rect.width / 2;
        const offsetY = e.clientY - rect.top - rect.height / 2;

        const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
        const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;

        rotateX.set(rotationX);
        rotateY.set(rotationY);

        x.set(e.clientX - rect.left);
        y.set(e.clientY - rect.top);

        const velocityY = offsetY - lastY;
        rotateFigcaption.set(-velocityY * 0.5); // Subtle balance
        setLastY(offsetY);
    }

    function handleMouseEnter() {
        scale.set(scaleOnHover);
        opacity.set(1);
    }

    function handleMouseLeave() {
        opacity.set(0);
        scale.set(1);
        rotateX.set(0);
        rotateY.set(0);
        rotateFigcaption.set(0);
    }

    return (
        <figure
            ref={ref}
            className={cn("relative w-full h-full [perspective:1200px] flex flex-col items-center justify-center", containerClassName)}
            onMouseMove={handleMouse}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <motion.div
                className="relative w-full h-full [transform-style:preserve-3d]"
                style={{
                    rotateX,
                    rotateY,
                    scale
                }}
            >
                {/* Main Content */}
                <div className="w-full h-full [transform-style:preserve-3d]">
                    {children}
                </div>
            </motion.div>

            {showTooltip && (
                <motion.figcaption
                    className={cn(
                        "pointer-events-none absolute left-0 top-0 z-50",
                        "px-4 py-1.5 rounded-full border border-white/20",
                        "bg-white/10 backdrop-blur-md",
                        "text-[10px] font-mono uppercase tracking-[0.2em] text-white",
                        "shadow-[0_10px_30px_rgba(0,0,0,0.3)]",
                        tooltipClassName
                    )}
                    style={{
                        x,
                        y,
                        opacity,
                        rotate: rotateFigcaption,
                        translateX: '-50%',
                        translateY: '-50%',
                    }}
                >
                    {captionText}
                </motion.figcaption>
            )}
        </figure>
    );
}
