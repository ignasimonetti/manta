"use client";
import React, {
    useEffect,
    useRef,
    useState,
    useMemo,
    useCallback,
} from "react";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface GalleryItem {
    quote: string;
    name: string;
    designation: string;
    src: string;
    url?: string;
    tags?: string[];
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
    colors = {},
    fontSizes = {},
    className,
}: CircularGalleryProps) => {
    // Color & font config
    const colorName = colors.name ?? "#fff";
    const colorArrowBg = colors.arrowBackground ?? "rgba(255, 255, 255, 0.05)";
    const colorArrowFg = colors.arrowForeground ?? "#fff";
    const colorArrowHoverBg = colors.arrowHoverBackground ?? "rgba(37, 99, 235, 0.4)";

    const fontSizeName = fontSizes.name ?? "2.5rem";
    const fontSizeQuote = fontSizes.quote ?? "1.125rem";

    // State
    const [activeIndex, setActiveIndex] = useState(0);
    const [hoverPrev, setHoverPrev] = useState(false);
    const [hoverNext, setHoverNext] = useState(false);
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

    // Compute transforms for each image (always show 3: left, center, right)
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
                transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
            };
        }
        if (isLeft) {
            return {
                zIndex: 2,
                opacity: 0.4,
                pointerEvents: "auto",
                transform: `translateX(-${gap}px) translateY(-${maxStickUp}px) scale(0.8) rotateY(25deg)`,
                transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
                filter: "blur(4px) grayscale(1)",
            };
        }
        if (isRight) {
            return {
                zIndex: 2,
                opacity: 0.4,
                pointerEvents: "auto",
                transform: `translateX(${gap}px) translateY(-${maxStickUp}px) scale(0.8) rotateY(-25deg)`,
                transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
                filter: "blur(4px) grayscale(1)",
            };
        }
        // Hide all other images
        return {
            zIndex: 1,
            opacity: 0,
            pointerEvents: "none",
            transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
            transform: `scale(0.5) translateY(100px)`,
        };
    }

    // Framer Motion variants for quote
    const quoteVariants = {
        initial: { opacity: 0, x: 20 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -20 },
    };

    return (
        <div className={cn("w-full max-w-6xl mx-auto px-4 py-12 md:py-24", className)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">

                {/* Images Layer */}
                <div className="relative w-full h-[300px] md:h-[450px] [perspective:1500px]" ref={imageContainerRef}>
                    {items.map((item, index) => (
                        <motion.div
                            key={item.src + index}
                            className="absolute inset-0 shadow-2xl rounded-3xl overflow-hidden border border-white/10"
                            style={getImageStyle(index)}
                        >
                            <img
                                src={item.src}
                                alt={item.name}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                        </motion.div>
                    ))}

                    {/* Subtle Glow beneath images */}
                    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-2/3 h-20 bg-primary/20 blur-[100px] rounded-full opacity-50" />
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
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            className="space-y-6"
                        >
                            <div>
                                <motion.span
                                    className="font-mono text-[10px] text-primary uppercase tracking-[0.4em] mb-2 block"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    {activeItem.designation}
                                </motion.span>
                                <h3
                                    className="font-display font-medium tracking-tight mb-2"
                                    style={{ color: colorName, fontSize: fontSizeName }}
                                >
                                    {activeItem.name}
                                </h3>
                            </div>

                            <div className="h-px w-12 bg-primary/30" />

                            <motion.div
                                className="font-sans text-white/50 leading-relaxed max-w-md italic"
                                style={{ fontSize: fontSizeQuote }}
                            >
                                {activeItem.quote.split(" ").map((word, i) => (
                                    <motion.span
                                        key={i}
                                        initial={{
                                            filter: "blur(10px)",
                                            opacity: 0,
                                            y: 5,
                                        }}
                                        animate={{
                                            filter: "blur(0px)",
                                            opacity: 1,
                                            y: 0,
                                        }}
                                        transition={{
                                            duration: 0.3,
                                            ease: [0.22, 1, 0.36, 1],
                                            delay: 0.02 * i,
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
                                        <span key={tag} className="text-[9px] font-mono px-2 py-0.5 rounded-full border border-white/10 bg-white/5 text-white/40 uppercase tracking-widest">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}

                            <div className="pt-8 flex flex-wrap gap-4 items-center">
                                {activeItem.url && activeItem.url !== '#' && (
                                    <motion.button
                                        className="group flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary text-black font-display text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-white transition-all duration-300"
                                        whileHover={{ y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => window.open(activeItem.url, '_blank', 'noopener,noreferrer')}
                                    >
                                        Visitar Proyecto
                                        <ExternalLink size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                    </motion.button>
                                )}

                                <div className="flex gap-4">
                                    <button
                                        className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 border border-white/10"
                                        onClick={handlePrev}
                                        style={{
                                            backgroundColor: hoverPrev ? colorArrowHoverBg : colorArrowBg,
                                        }}
                                        onMouseEnter={() => setHoverPrev(true)}
                                        onMouseLeave={() => setHoverPrev(false)}
                                        aria-label="Previous project"
                                    >
                                        <ArrowLeft size={20} color={colorArrowFg} />
                                    </button>
                                    <button
                                        className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 border border-white/10"
                                        onClick={handleNext}
                                        style={{
                                            backgroundColor: hoverNext ? colorArrowHoverBg : colorArrowBg,
                                        }}
                                        onMouseEnter={() => setHoverNext(true)}
                                        onMouseLeave={() => setHoverNext(false)}
                                        aria-label="Next project"
                                    >
                                        <ArrowRight size={20} color={colorArrowFg} />
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
