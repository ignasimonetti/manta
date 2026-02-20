"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * TextGenerateEffect - Adapted for Manta Studio
 * Optimized for legibility over complex backgrounds (like videos).
 * Uses a staggered word reveal with a subtle blur-in and y-shift.
 */
export const TextGenerateEffect = ({
    words,
    className,
    filter = true,
    duration = 0.5,
    delay = 0.2,
}: {
    words: string;
    className?: string;
    filter?: boolean;
    duration?: number;
    delay?: number;
}) => {
    const [scope, animate] = useAnimate();
    let wordsArray = words.split(" ");

    useEffect(() => {
        // Only animate if scope matches
        if (scope.current) {
            animate(
                "span",
                {
                    opacity: 1,
                    filter: filter ? "blur(0px)" : "none",
                    y: 0,
                },
                {
                    duration: duration ? duration : 1,
                    delay: stagger(0.12, { startDelay: delay }),
                    ease: "easeOut"
                }
            );
        }
    }, [scope.current, animate, filter, duration, delay]);

    const renderWords = () => {
        return (
            <motion.div ref={scope} className="inline-block">
                {wordsArray.map((word, idx) => {
                    return (
                        <motion.span
                            key={word + idx}
                            className="opacity-0 inline-block mr-[0.25em]"
                            style={{
                                filter: filter ? "blur(8px)" : "none",
                                transform: "translateY(8px)",
                                // Subtle lift to help reading on video/noisy bgs
                                textShadow: "0px 1px 12px rgba(255,255,255,0.4)"
                            }}
                        >
                            {word}
                        </motion.span>
                    );
                })}
            </motion.div>
        );
    };

    return (
        <div className={cn("font-normal", className)}>
            <div className="leading-snug tracking-wide">
                {renderWords()}
            </div>
        </div>
    );
};
