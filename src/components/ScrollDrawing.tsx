import React, { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, motion, AnimatePresence, useSpring } from 'framer-motion';


const clamp = (val: number, min: number, max: number) => Math.min(Math.max(val, min), max);

const FRAME_COUNT = 240;

const ScrollDrawing: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [loadProgress, setLoadProgress] = useState(0);

    // Scroll tracking
    const { scrollY } = useScroll();
    const [vh, setVh] = useState(typeof window !== 'undefined' ? window.innerHeight : 800);

    useEffect(() => {
        const updateVh = () => setVh(window.innerHeight);
        window.addEventListener('resize', updateVh);
        return () => window.removeEventListener('resize', updateVh);
    }, []);

    // Map scroll pixels to frame index with spring smoothing (Act I: 0 -> 1.5vh)
    const rawFrameIndex = useTransform(scrollY, [0, vh * 1.5], [0, FRAME_COUNT - 1]);
    const frameIndex = useSpring(rawFrameIndex, {
        stiffness: 20, // Reduced for smoother "glide"
        damping: 40,   // Increased to prevent oscillation and handle "snappy" scroll
        restDelta: 0.001
    });

    // Preload images with progress tracking
    useEffect(() => {
        const preloadImages = async () => {
            const loadedImages: HTMLImageElement[] = [];
            let loadedCount = 0;

            const promises = Array.from({ length: FRAME_COUNT }).map((_, i) => {
                return new Promise<void>((resolve) => {
                    const img = new Image();
                    const frameNum = (i + 1).toString().padStart(3, '0');
                    img.src = `/frames/ezgif-frame-${frameNum}.jpg`;

                    img.onload = () => {
                        loadedCount++;
                        setLoadProgress(Math.round((loadedCount / FRAME_COUNT) * 100));
                        resolve();
                    };
                    img.onerror = () => resolve(); // Continue on error to avoid hanging
                    loadedImages[i] = img;
                });
            });

            await Promise.all(promises);
            setImages(loadedImages);
            setLoadProgress(100); // Forzar 100%
            setIsLoaded(true);
        };

        preloadImages();
    }, []);

    // Optimized Draw Loop
    useEffect(() => {
        if (!isLoaded || images.length === 0) return;

        const unsubscribe = frameIndex.on('change', (latest: number) => {
            const currentFrame = clamp(Math.floor(latest), 0, FRAME_COUNT - 1);
            const canvas = canvasRef.current;
            const context = canvas?.getContext('2d');

            if (canvas && context && images[currentFrame]) {
                const img = images[currentFrame];

                // Optimized clearing
                context.clearRect(0, 0, canvas.width, canvas.height);

                // High-DPI "Contain" Fit with increased bottom crop (8%) to remove artifacts
                const sourceHeight = img.height * 0.92;
                const imgAspect = img.width / sourceHeight;
                const canvasAspect = canvas.width / canvas.height;
                let drawWidth, drawHeight;

                if (canvasAspect > imgAspect) {
                    drawHeight = canvas.height;
                    drawWidth = canvas.height * imgAspect;
                } else {
                    drawWidth = canvas.width;
                    drawHeight = canvas.width / imgAspect;
                }

                const x = (canvas.width - drawWidth) / 2;
                const y = (canvas.height - drawHeight) / 2;

                // Draw with source cropping
                context.drawImage(img, 0, 0, img.width, sourceHeight, x, y, drawWidth, drawHeight);
            }
        });

        return () => unsubscribe();
    }, [isLoaded, images, frameIndex]);

    // Enhanced Canvas Resize Handler
    useEffect(() => {
        const handleResize = () => {
            const canvas = canvasRef.current;
            if (canvas) {
                const dpr = window.devicePixelRatio || 1;
                const rect = canvas.getBoundingClientRect();

                canvas.width = rect.width * dpr;
                canvas.height = rect.height * dpr;

                // Redraw current frame if possible
                const context = canvas.getContext('2d');
                const currentIdx = clamp(Math.floor(frameIndex.get()), 0, FRAME_COUNT - 1);
                if (context && images[currentIdx]) {
                    const img = images[currentIdx];
                    const sourceHeight = img.height * 0.92;
                    const imgAspect = img.width / sourceHeight;
                    const canvasAspect = canvas.width / canvas.height;
                    let drawWidth, drawHeight;

                    if (canvasAspect > imgAspect) {
                        drawHeight = canvas.height;
                        drawWidth = canvas.height * imgAspect;
                    } else {
                        drawWidth = canvas.width;
                        drawHeight = canvas.width / imgAspect;
                    }

                    const x = (canvas.width - drawWidth) / 2;
                    const y = (canvas.height - drawHeight) / 2;
                    // Draw with source cropping
                    context.drawImage(img, 0, 0, img.width, sourceHeight, x, y, drawWidth, drawHeight);
                }
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isLoaded, images, frameIndex]);

    return (
        <div className="relative w-full h-full flex items-center justify-center">
            <AnimatePresence>
                {!isLoaded && (
                    <motion.div
                        key="loader"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 flex flex-col items-center justify-center bg-cloud-dancer z-50"
                    >
                        <div className="w-48 h-[1px] bg-deep-charcoal/10 relative overflow-hidden">
                            <motion.div
                                className="absolute inset-y-0 left-0 bg-primary"
                                initial={{ width: 0 }}
                                animate={{ width: `${loadProgress}%` }}
                            />
                        </div>
                        <span className="mt-4 font-mono text-[10px] tracking-widest text-deep-charcoal/40 uppercase">
                            Loading Identity / {loadProgress}%
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>

            <canvas
                ref={canvasRef}
                style={{ width: '100%', height: '100%' }}
                className="w-full h-full object-contain mix-blend-multiply transition-opacity duration-700"
            />
        </div>
    );
};

export default ScrollDrawing;

