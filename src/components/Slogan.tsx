import React, { useMemo } from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';
import DissipatingChar from './DissipatingChar';
import DissipatingElement from './DissipatingElement';

interface SloganProps {
    progress?: MotionValue<number>;
}

const Slogan: React.FC<SloganProps> = ({ progress }) => {
    const fullText = "Fabricación en serie";

    const fallbackProgress = useMemo(() => new MotionValue(0), []);
    const activeProgress = progress || fallbackProgress;

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

    const strikeVariants = {
        hidden: { scaleX: 0 },
        visible: {
            scaleX: 1,
            transition: { delay: 2.8, duration: 0.4, ease: "easeInOut" }
        }
    } as const;

    const oVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.4 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: [
                "drop-shadow(0 0 0px rgba(0,0,0,0))",
                "drop-shadow(0 0 15px rgba(217,2,109,0.5)) drop-shadow(0 0 30px rgba(217,2,109,0.3))"
            ],
            transition: {
                y: { delay: 3.5, duration: 0.8, ease: [0.175, 0.885, 0.32, 1.275] as [number, number, number, number] },
                opacity: { delay: 3.5, duration: 0.8 },
                scale: { delay: 3.5, duration: 0.8 },
                filter: { delay: 3.8, duration: 1, repeat: 0 }
            }
        }
    };

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
            <svg width="0" height="0" className="absolute pointer-events-none">
                <filter id="crayon-filter" x="-20%" y="-20%" width="140%" height="140%">
                    <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" result="noise" />
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" xChannelSelector="R" yChannelSelector="G" />
                </filter>
            </svg>

            <motion.div
                variants={sloganWrapperVariants}
                className="relative font-display text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-black leading-[1.1] overflow-visible flex items-center"
            >
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

                <DissipatingChar
                    char={fullText.slice(-1)}
                    progress={progress}
                    variants={charVariants}
                    custom={fullText.length}
                >
                    <span className="relative inline-block overflow-visible">
                        <motion.span
                            className="inline-block"
                            variants={eDimVariants}
                        >
                            {fullText.slice(-1)}
                        </motion.span>

                        <DissipatingElement
                            progress={progress}
                            variants={strikeVariants}
                            className="absolute top-1/2 left-[0px] right-[-20px] z-10"
                            style={{
                                transformOrigin: 'left center',
                                filter: 'url(#crayon-filter)',
                                transform: 'rotate(-12deg) translateY(6px)',
                                display: 'block',
                                height: '24px',
                            }}
                        >
                            <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 100 24" className="overflow-visible">
                                <path d="M-2,12 Q25,8 50,14 T102,10" stroke="var(--color-ink-magenta)" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.9" />
                                <path d="M0,14 Q30,16 60,11 T100,14" stroke="var(--color-ink-magenta)" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.7" />
                                <path d="M2,10 Q40,6 70,16 T98,12" stroke="var(--color-ink-magenta)" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.5" />
                            </svg>
                            <span className="sr-only">strike</span>
                        </DissipatingElement>

                        <DissipatingElement
                            progress={progress}
                            variants={oVariants}
                            className="absolute z-20 pointer-events-none"
                            style={{
                                filter: 'url(#crayon-filter)',
                                top: '-120%',
                                right: '-280%',
                                width: '340%',
                                height: '340%',
                            }}
                        >
                            <svg width="100%" height="100%" viewBox="0 0 120 130" className="overflow-visible" style={{ transform: 'rotate(12deg)' }}>
                                <path d="M 60,8 C 22,5 5,35 8,70 C 11,105 40,125 72,118 C 104,111 118,80 112,48 C 106,16 78,5 55,12" stroke="var(--color-ink-magenta)" strokeWidth="7" strokeLinecap="round" fill="none" strokeLinejoin="round" opacity="0.85" />
                                <path d="M 55,12 C 28,10 10,42 14,72 C 18,102 42,120 68,115 C 98,108 114,75 108,45 C 102,18 72,8 52,16" stroke="var(--color-ink-magenta)" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.55" />
                                <circle cx="10" cy="25" r="2.5" fill="var(--color-ink-magenta)" opacity="0.7" />
                                <circle cx="108" cy="100" r="3" fill="var(--color-ink-magenta)" opacity="0.5" />
                                <circle cx="112" cy="18" r="1.8" fill="var(--color-ink-magenta)" opacity="0.6" />
                            </svg>
                        </DissipatingElement>
                    </span>
                </DissipatingChar>
            </motion.div>

            <motion.div
                className="mt-16 md:mt-24 relative font-mono text-xs md:text-sm tracking-[0.4em] uppercase font-bold"
                variants={subSloganVariants}
                style={{
                    opacity: progress ? subExitOpacity : undefined,
                    y: progress ? subExitY : undefined,
                    filter: progress ? subExitFilter : undefined,
                }}
            >
                <span className="text-black/10 whitespace-nowrap block">
                    Agencia Digital y Consultoría
                </span>

                <motion.div
                    className="absolute top-0 left-0 h-full overflow-hidden whitespace-nowrap text-black border-r-2 border-primary z-10"
                    variants={fillVariants}
                    style={{
                        boxShadow: '4px 0 15px -2px rgba(217,2,109,0.3)'
                    }}
                >
                    Agencia Digital y Consultoría
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default Slogan;
