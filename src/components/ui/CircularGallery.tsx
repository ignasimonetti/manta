"use client";
import React, {
    useEffect,
    useRef,
    useState,
    useMemo,
    useCallback,
} from "react";
import { CaretLeft, CaretRight, ArrowSquareOut } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface GalleryItem {
    quote: string;
    name: string;
    designation: string;
    src: string;
    url?: string;
    tags?: string[];
    mediaType?: 'image' | 'video';
}

interface Colors {
    name?: string;
    designation?: string;
    testimony?: string;
    arrowBackground?: string;
    arrowForeground?: string;
    arrowHoverBackground?: string;
}

interface FontSizes {
    name?: string;
    designation?: string;
    quote?: string;
}

interface CircularGalleryProps {
    items: GalleryItem[];
    autoplay?: boolean;
    colors?: Colors;
    fontSizes?: FontSizes;
    className?: string;
}

function calculateGap(width: number) {
    const minWidth = 1024;
    const maxWidth = 1456;
    const minGap = 60;
    const maxGap = 86;
    if (width <= minWidth) return minGap;
    if (width >= maxWidth)
        return Math.max(minGap, maxGap + 0.06018 * (width - maxWidth));
    return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth));
}

export const CircularGallery = ({
    items,
    autoplay = true,
    className,
}: CircularGalleryProps) => {
    // State
    const [activeIndex, setActiveIndex] = useState(0);
    const [containerWidth, setContainerWidth] = useState(1200);

    const imageContainerRef = useRef<HTMLDivElement>(null);
    const autoplayIntervalRef = useRef<number | null>(null);

    const itemsLength = useMemo(() => items.length, [items]);
    const activeItem = useMemo(
        () => items[activeIndex],
        [activeIndex, items]
    );

    // Responsive gap calculation
    useEffect(() => {
        function handleResize() {
            if (imageContainerRef.current) {
                setContainerWidth(imageContainerRef.current.offsetWidth);
            }
        }
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Autoplay
    useEffect(() => {
        if (autoplay) {
            autoplayIntervalRef.current = window.setInterval(() => {
                setActiveIndex((prev) => (prev + 1) % itemsLength);
            }, 7000);
        }
        return () => {
            if (autoplayIntervalRef.current) window.clearInterval(autoplayIntervalRef.current);
        };
    }, [autoplay, itemsLength]);

    // Keyboard navigation
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") handlePrev();
            if (e.key === "ArrowRight") handleNext();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
        // eslint-disable-next-line
    }, [activeIndex, itemsLength]);

    // Navigation handlers
    const handleNext = useCallback(() => {
        setActiveIndex((prev) => (prev + 1) % itemsLength);
        if (autoplayIntervalRef.current) window.clearInterval(autoplayIntervalRef.current);
    }, [itemsLength]);
    const handlePrev = useCallback(() => {
        setActiveIndex((prev) => (prev - 1 + itemsLength) % itemsLength);
        if (autoplayIntervalRef.current) window.clearInterval(autoplayIntervalRef.current);
    }, [itemsLength]);

    // Compute transforms for each image
    function getImageStyle(index: number): React.CSSProperties {
        const gap = calculateGap(containerWidth);
        const maxStickUp = gap * 0.8;

        const isActive = index === activeIndex;
        const isLeft = (activeIndex - 1 + itemsLength) % itemsLength === index;
        const isRight = (activeIndex + 1) % itemsLength === index;

        if (isActive) {
            return {
                zIndex: 3,
                opacity: 1,
                pointerEvents: "auto",
                transform: `translateX(0px) translateY(0px) scale(1) rotateY(0deg)`,
                transition: "all 0.8s cubic-bezier(.16, 1, .3, 1)",
            };
        }
        if (isLeft) {
            return {
                zIndex: 2,
                opacity: 0.3,
                pointerEvents: "auto",
                transform: `translateX(-${gap}px) translateY(-${maxStickUp}px) scale(0.8) rotateY(15deg)`,
                transition: "all 0.8s cubic-bezier(.16, 1, .3, 1)",
                filter: "grayscale(1)",
            };
        }
        if (isRight) {
            return {
                zIndex: 2,
                opacity: 0.3,
                pointerEvents: "auto",
                transform: `translateX(${gap}px) translateY(-${maxStickUp}px) scale(0.8) rotateY(-15deg)`,
                transition: "all 0.8s cubic-bezier(.16, 1, .3, 1)",
                filter: "grayscale(1)",
            };
        }
        return {
            zIndex: 1,
            opacity: 0,
            pointerEvents: "none",
            transition: "all 0.8s cubic-bezier(.16, 1, .3, 1)",
            transform: `scale(0.5) translateY(100px)`,
        };
    }

    const quoteVariants = {
        initial: { opacity: 0, x: 20 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -20 },
    };

    return (
        <div className={cn("w-full max-w-6xl mx-auto px-4 py-12 md:py-24", className)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">

                {/* Images Layer - The Woodblock Frame */}
                <div className="relative w-full h-[300px] md:h-[450px] [perspective:1500px]" ref={imageContainerRef}>
                    {items.map((item, index) => (
                        <motion.div
                            key={item.src + index}
                            className={`absolute inset-0 overflow-hidden border vellum
                                ${index === activeIndex ? 'hatch-shadow border-black/10' : 'border-black/5'}
                            `}
                            style={getImageStyle(index)}
                        >
                            {item.mediaType === 'video' || item.src.match(/\.(mp4|webm|ogg)$/i) ? (
                                <video
                                    src={item.src}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="w-full h-full object-cover grayscale-[0.5] contrast-[1.1]"
                                />
                            ) : (
                                <img
                                    src={item.src}
                                    alt={item.name}
                                    className="w-full h-full object-cover grayscale-[0.5] contrast-[1.1]"
                                />
                            )}
                            {/* Paper Grain Overlay for images/video */}
                            <div className="absolute inset-0 bg-paper opacity-10 pointer-events-none mix-blend-multiply" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40" />
                        </motion.div>
                    ))}

                    {/* Ink Splatter backdrop beneath images */}
                    <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-full h-40 ink-wash opacity-20 rotate-45 scale-150" />
                </div>

                {/* Content Layer */}
                <div className="flex flex-col justify-center min-h-[400px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeIndex}
                            variants={quoteVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            className="space-y-6"
                        >
                            <div>
                                <motion.span
                                    className="font-mono text-[11px] text-primary uppercase tracking-[0.4em] mb-3 block font-bold"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    {activeItem.designation}
                                </motion.span>
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="font-mono text-[9px] text-black/30 tracking-[0.2em]">ID_{activeIndex.toString().padStart(3, '0')}</span>
                                    <div className="w-8 h-[1px] bg-black/10" />
                                    <span className="font-mono text-[9px] text-black/30 tracking-[0.2em]">COORD: {((activeIndex + 1) * 12.34).toFixed(2)}°N</span>
                                </div>
                                <h3
                                    className="font-display font-medium tracking-tight mb-2 text-black text-4xl md:text-5xl"
                                >
                                    {activeItem.name}
                                </h3>
                            </div>

                            <div className="h-[2px] w-12 bg-primary" />

                            <motion.div
                                className="font-sans text-black/60 leading-relaxed max-w-md font-normal text-lg"
                            >
                                {activeItem.quote.split(" ").map((word, i) => (
                                    <motion.span
                                        key={i}
                                        initial={{
                                            filter: "blur(4px)",
                                            opacity: 0,
                                            y: 5,
                                        }}
                                        animate={{
                                            filter: "blur(0px)",
                                            opacity: 1,
                                            y: 0,
                                        }}
                                        transition={{
                                            duration: 0.4,
                                            ease: [0.16, 1, 0.3, 1],
                                            delay: 0.012 * i,
                                        }}
                                        style={{ display: "inline-block" }}
                                    >
                                        {word}&nbsp;
                                    </motion.span>
                                ))}
                            </motion.div>

                            {activeItem.tags && (
                                <div className="flex flex-wrap gap-2 pt-2">
                                    {activeItem.tags.map((tag) => (
                                        <span key={tag} className="text-[10px] font-mono px-2 py-0.5 border border-black/10 text-black/40 uppercase tracking-widest bg-white/50">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}

                            <div className="pt-8 flex flex-wrap gap-4 items-center">
                                {activeItem.url && activeItem.url !== '#' && (
                                    <motion.button
                                        className="group flex items-center gap-2 px-8 py-3 bg-black text-white font-display text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-primary hover:text-white transition-all duration-300 hatch-shadow"
                                        whileHover={{ y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => window.open(activeItem.url, '_blank', 'noopener,noreferrer')}
                                    >
                                        Visitar Proyecto
                                        <ArrowSquareOut size={14} weight="bold" className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                    </motion.button>
                                )}

                                <div className="flex gap-4">
                                    <button
                                        className="w-12 h-12 flex items-center justify-center cursor-pointer transition-all duration-300 border border-black/10 bg-white/40 hover:bg-white hover:hatch-shadow"
                                        onClick={handlePrev}
                                        aria-label="Previous project"
                                    >
                                        <CaretLeft size={24} weight="bold" color="#000" />
                                    </button>
                                    <button
                                        className="w-12 h-12 flex items-center justify-center cursor-pointer transition-all duration-300 border border-black/10 bg-white/40 hover:bg-white hover:hatch-shadow"
                                        onClick={handleNext}
                                        aria-label="Next project"
                                    >
                                        <CaretRight size={24} weight="bold" color="#000" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};
