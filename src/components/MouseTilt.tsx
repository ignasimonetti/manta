"use client";
import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface MouseTiltProps {
    children: React.ReactNode;
    className?: string;
    strength?: number; // How much it tilts (default 10)
}

/**
 * MouseTilt - Adds a subtle 3D parallax effect based on mouse movement.
 * Perfect for giving a "physical" feel to text elements.
 */
export const MouseTilt: React.FC<MouseTiltProps> = ({
    children,
    className,
    strength = 15
}) => {
    const containerRef = useRef<HTMLDivElement>(null);

    // Mouse positions relative to the element
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth springs for the tilt
    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    // Map mouse position to rotation
    // When mouse is at left (-0.5), rotate Y positive
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [strength, -strength]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-strength, strength]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        // Calculate mouse position relative to center (from -0.5 to 0.5)
        const mouseX = (e.clientX - rect.left) / width - 0.5;
        const mouseY = (e.clientY - rect.top) / height - 0.5;

        x.set(mouseX);
        y.set(mouseY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
                perspective: "1000px",
            }}
            className={className}
        >
            <div style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}>
                {children}
            </div>
        </motion.div>
    );
};
