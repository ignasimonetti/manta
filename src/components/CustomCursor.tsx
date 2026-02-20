import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor: React.FC = () => {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 200 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    const [isHovering, setIsHovering] = useState(false);
    const [cursorSize, setCursorSize] = useState(20);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);

            const target = e.target as HTMLElement;
            const isInteractive = target.closest('button, a, .group');

            if (isInteractive) {
                setIsHovering(true);
                setCursorSize(60);

                // Magnetism logic
                const rect = isInteractive.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;

                const distanceX = e.clientX - centerX;
                const distanceY = e.clientY - centerY;

                if (Math.abs(distanceX) < 50 && Math.abs(distanceY) < 50) {
                    cursorX.set(centerX + distanceX * 0.2);
                    cursorY.set(centerY + distanceY * 0.2);
                }
            } else {
                setIsHovering(false);
                setCursorSize(20);
            }
        };

        window.addEventListener('mousemove', moveCursor);
        return () => window.removeEventListener('mousemove', moveCursor);
    }, [cursorX, cursorY]);

    return (
        <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
            style={{
                translateX: cursorXSpring,
                translateY: cursorYSpring,
                x: '-50%',
                y: '-50%',
            }}
        >
            <motion.div
                className="relative flex items-center justify-center"
                animate={{
                    width: cursorSize,
                    height: cursorSize,
                }}
                transition={{ type: 'spring', damping: 20, stiffness: 150 }}
            >
                {/* Main Cursor Dot */}
                <div className="absolute inset-0 bg-primary opacity-60 rounded-full blur-[4px]" />
                <div className="absolute inset-0 border border-primary/40 rounded-full" />

                {/* Magnetism Pulse */}
                {isHovering && (
                    <motion.div
                        className="absolute inset-0 border border-primary rounded-full"
                        initial={{ scale: 1, opacity: 1 }}
                        animate={{ scale: 1.5, opacity: 0 }}
                        transition={{
                            duration: 2, repeat: Infinity, repeatType: "reverse"
                        }}
                    />
                )}
            </motion.div>
        </motion.div>
    );
};

export default CustomCursor;
