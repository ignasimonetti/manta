import React, { useMemo } from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';

interface DissipatingCharProps {
    char: string;
    progress?: MotionValue<number>;
    variants?: any;
    custom?: number;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
}

const DissipatingChar: React.FC<DissipatingCharProps> = ({ char, progress, variants, custom, className, style, children }) => {
    const randoms = useMemo(() => {
        const exitStart = 0.91 + Math.random() * 0.05;
        const exitEnd = Math.min(exitStart + 0.06, 1.0);
        const fadeEnd = Math.min(exitStart + 0.05, 0.99);

        return {
            x: (Math.random() - 0.5) * 300,
            y: (Math.random() - 0.5) * 250,
            rotate: (Math.random() - 0.5) * 90,
            scale: 1.1 + Math.random() * 0.5,
            blur: 10 + Math.random() * 15,
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
            className="inline-block relative"
            style={{
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
                custom={custom}
                className={className}
                style={{
                    ...style,
                    display: "inline-block",
                }}
            >
                {children || char}
            </motion.span>
        </motion.span>
    );
};

export default DissipatingChar;
