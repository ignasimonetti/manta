import React, { useMemo } from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';

interface SloganProps {
    progress?: MotionValue<number>;
}

const DissipatingChar: React.FC<{
    char: string;
    progress?: MotionValue<number>;
    variants?: any;
    custom?: number;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
}> = ({ char, progress, variants, custom, className, style, children }) => {
    // Generate constant random targets for this instance
    const randoms = useMemo(() => {
        // Point 2: Each char gets a slightly different exit start (0.91–0.96)
        const exitStart = 0.91 + Math.random() * 0.05;
        const exitEnd = Math.min(exitStart + 0.06, 1.0);
        const fadeEnd = Math.min(exitStart + 0.05, 0.99);

        return {
            // Point 3: Omnidirectional Y — some go up, some go down
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

    // Exit transforms — each char uses its own randomized timing window
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

// Point 1: Standalone component for elements that need independent exit trajectories
const DissipatingElement: React.FC<{
    progress?: MotionValue<number>;
    variants?: any;
    className?: string;
    style?: React.CSSProperties;
    children: React.ReactNode;
}> = ({ progress, variants, className, style, children }) => {
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
        // Outer: invisible ghost that fills the parent, handles ONLY exit transforms
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
            {/* Inner: handles entrance variants + all visual/positioning classes */}
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

const Slogan: React.FC<SloganProps> = ({ progress }) => {
    const fullText = "Fabricación en serie";

    // Placeholder motion value for complex children
    const fallbackProgress = useMemo(() => new MotionValue(0), []);
    const activeProgress = progress || fallbackProgress;

    // Point 4: ALL useTransform hooks called unconditionally at top level
    const subExitOpacity = useTransform(activeProgress, [0.91, 0.97], [1, 0]);
    const subExitY = useTransform(activeProgress, [0.91, 0.98], [0, 60]);
    const subExitBlurRaw = useTransform(activeProgress, [0.91, 0.97], [0, 15]);
    const subExitFilter = useTransform(subExitBlurRaw, (v) => `blur(${v}px)`);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 0.3 }
        }
    };

    // "Fabricación en serie" = 20 chars. Last char starts at 0.8 + 19*0.05 = 1.75s
    // Char animation duration = 0.6s → full phrase visible at ~2.35s
    const sloganWrapperVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.05,
                delayChildren: 0.8
            }
        }
    };

    const charVariants = {
        hidden: {
            opacity: 0,
            y: 30
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    // Typewriter finishes at ~2.35s from root trigger (0.8 delay + 19*0.05 stagger + 0.6 char anim)
    // Strike appears 0.5s AFTER the full phrase is visible
    const strikeVariants = {
        hidden: { scaleX: 0 },
        visible: {
            scaleX: 1,
            transition: { delay: 2.8, duration: 0.4, ease: "easeInOut" }
        }
    } as const;

    // 'o' appears 0.3s after strike finishes (2.8 + 0.4 + 0.3 = 3.5)
    const oVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.4 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: [
                "drop-shadow(0 0 0px rgba(255,255,255,0))",
                "drop-shadow(0 0 15px rgba(255,0,255,0.8)) drop-shadow(0 0 30px rgba(255,0,255,0.4))"
            ],
            transition: {
                y: { delay: 3.5, duration: 0.8, ease: [0.175, 0.885, 0.32, 1.275] as [number, number, number, number] },
                opacity: { delay: 3.5, duration: 0.8 },
                scale: { delay: 3.5, duration: 0.8 },
                filter: { delay: 3.8, duration: 1, repeat: 0 }
            }
        }
    };

    // 'e' dims after the strike lands
    const eDimVariants = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 0.5,
            transition: { delay: 3.2, duration: 0.5 }
        }
    };

    const subSloganVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { delay: 4.8, duration: 0.8 }
        }
    };

    const fillVariants = {
        hidden: { clipPath: "inset(0 100% 0 0)" },
        visible: {
            clipPath: "inset(0 0% 0 0)",
            transition: { delay: 5.2, duration: 1.8, ease: "easeInOut" as any }
        }
    };

    return (
        <motion.div
            className="flex flex-col items-center justify-center relative overflow-visible py-32 md:py-48"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{
                once: true,
                margin: "-35%"
            }}
        >
            {/* Stagger wrapper — direct children must be motion elements */}
            <motion.div
                variants={sloganWrapperVariants}
                className="relative font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white leading-[1.1] overflow-visible flex items-center"
            >
                {/* Regular chars — each is a direct motion child */}
                {fullText.slice(0, -1).split("").map((char, index) => (
                    <DissipatingChar
                        key={index}
                        char={char}
                        progress={progress}
                        variants={charVariants}
                        custom={index}
                        style={{ minWidth: char === " " ? "0.22em" : "auto" }}
                    />
                ))}

                {/* Last char 'e' — uses SAME charVariants so it enters in sequence */}
                <DissipatingChar
                    char={fullText.slice(-1)}
                    progress={progress}
                    variants={charVariants}
                    custom={fullText.length}
                >
                    <span className="relative inline-block overflow-visible">
                        {/* The letter 'e' with dim effect after strike */}
                        <motion.span
                            className="inline-block"
                            variants={eDimVariants}
                        >
                            {fullText.slice(-1)}
                        </motion.span>

                        {/* Point 1: Strike has independent exit trajectory */}
                        <DissipatingElement
                            progress={progress}
                            variants={strikeVariants}
                            className="absolute top-1/2 left-[-4px] right-[-4px] h-[4px] md:h-[8px] bg-primary z-10"
                            style={{
                                originX: 0,
                                filter: 'url(#crayon-filter)',
                                boxShadow: '0 0 20px rgba(212,33,140,0.3)',
                                display: 'block',
                            }}
                        >
                            {/* Empty — the element itself is the strike line */}
                            <span className="sr-only">strike</span>
                        </DissipatingElement>

                        {/* Point 1: 'o' has independent exit trajectory */}
                        <DissipatingElement
                            progress={progress}
                            variants={oVariants}
                            className="absolute -top-10 -right-4 md:-top-16 md:-right-8 text-white font-bold z-20 italic heading-glow"
                        >
                            o
                        </DissipatingElement>
                    </span>
                </DissipatingChar>
            </motion.div>


            {/* Sub-slogan — Point 4: hooks called unconditionally above */}
            <motion.div
                className="mt-12 relative font-sans text-lg md:text-xl tracking-[0.2em] uppercase font-light"
                variants={subSloganVariants}
                style={{
                    opacity: progress ? subExitOpacity : undefined,
                    y: progress ? subExitY : undefined,
                    filter: progress ? subExitFilter : undefined,
                }}
            >
                <span className="text-white/10 whitespace-nowrap block">
                    Agencia Digital y Consultoría
                </span>

                <motion.div
                    className="absolute top-0 left-0 h-full overflow-hidden whitespace-nowrap text-white border-r-2 border-primary z-10"
                    variants={fillVariants}
                    style={{
                        boxShadow: '4px 0 15px -2px rgba(212,33,140,0.5)'
                    }}
                >
                    Agencia Digital y Consultoría
                </motion.div>
            </motion.div>
        </motion.div>
    );



};

export default Slogan;
