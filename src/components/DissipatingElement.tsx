import React, { useMemo } from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';

interface DissipatingElementProps {
    progress?: MotionValue<number>;
    variants?: any;
    className?: string;
    style?: React.CSSProperties;
    children: React.ReactNode;
}

const DissipatingElement: React.FC<DissipatingElementProps> = ({ progress, variants, className, style, children }) => {
    const randoms = useMemo(() => {
        const exitStart = 0.91 + Math.random() * 0.05;
        const exitEnd = Math.min(exitStart + 0.06, 1.0);
        const fadeEnd = Math.min(exitStart + 0.05, 0.99);

        return {
            x: (Math.random() - 0.5) * 400,
            y: (Math.random() - 0.5) * 300,
            rotate: (Math.random() - 0.5) * 120,
            scale: 0.3 + Math.random() * 0.5,
            blur: 12 + Math.random() * 18,
            exitStart,
            exitEnd,
            fadeEnd,
        };
    }, []);

    const fallbackProgress = useMemo(() => new MotionValue(0), []);
    const activeProgress = progress || fallbackProgress;

    const exitOpacity = useTransform(activeProgress, [randoms.exitStart, randoms.fadeEnd], [1, 0]);
    const exitX = useTransform(activeProgress, [randoms.exitStart, randoms.exitEnd], [0, randoms.x]);
    const exitY = useTransform(activeProgress, [randoms.exitStart, randoms.exitEnd], [0, randoms.y]);
    const exitRotate = useTransform(activeProgress, [randoms.exitStart, randoms.exitEnd], [0, randoms.rotate]);
    const exitScale = useTransform(activeProgress, [randoms.exitStart, randoms.exitEnd], [1, randoms.scale]);
    const exitBlur = useTransform(activeProgress, [randoms.exitStart, randoms.fadeEnd], [0, randoms.blur]);
    const filter = useTransform(exitBlur, (v) => `blur(${v}px)`);

    return (
        <motion.span
            style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none' as const,
                opacity: progress ? exitOpacity : 1,
                x: progress ? exitX : 0,
                y: progress ? exitY : 0,
                rotate: progress ? exitRotate : 0,
                scale: progress ? exitScale : 1,
                filter: progress ? filter : "none",
            }}
        >
            <motion.span
                variants={variants}
                className={className}
                style={style}
            >
                {children}
            </motion.span>
        </motion.span>
    );
};

export default DissipatingElement;
