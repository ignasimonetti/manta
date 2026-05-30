import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useScroll, useTransform, motion, AnimatePresence, useSpring } from 'framer-motion';


const clamp = (val: number, min: number, max: number) => Math.min(Math.max(val, min), max);

const FRAME_COUNT = 240;
const BATCH_SIZE = 30;

const ScrollDrawing: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const [ready, setReady] = useState(false);
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
        stiffness: 20,
        damping: 40,
        restDelta: 0.001
    });

    // Preload images in progressive batches
    useEffect(() => {
        const loaded: HTMLImageElement[] = [];
        let loadedCount = 0;
        let cancelled = false;

        const loadBatch = (start: number) => {
            const end = Math.min(start + BATCH_SIZE, FRAME_COUNT);
            let batchLoaded = 0;

            for (let i = start; i < end; i++) {
                const img = new Image();
                const frameNum = (i + 1).toString().padStart(3, '0');
                img.src = `/frames/ezgif-frame-${frameNum}.webp`;

                img.onload = () => {
                    if (cancelled) return;
                    loadedCount++;
                    batchLoaded++;
                    setLoadProgress(Math.round((loadedCount / FRAME_COUNT) * 100));

                    if (i === 0) {
                        imagesRef.current[0] = img;
                        setReady(true);
                    }

                    if (batchLoaded === end - start && end < FRAME_COUNT) {
                        requestAnimationFrame(() => loadBatch(end));
                    }
                };

                img.onerror = () => {
                    if (cancelled) return;
                    loadedCount++;
                    batchLoaded++;
                    if (batchLoaded === end - start && end < FRAME_COUNT) {
                        requestAnimationFrame(() => loadBatch(end));
                    }
                };

                loaded[i] = img;
            }
        };

        loadBatch(0);

        return () => { cancelled = true; };
    }, []);

    const drawFrame = useCallback((index: number) => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');
        const img = imagesRef.current[index];
        if (!canvas || !context || !img) return;

        context.clearRect(0, 0, canvas.width, canvas.height);

        const sourceHeight = img.height * 0.92;
        const imgAspect = img.width / sourceHeight;
        const canvasAspect = canvas.width / canvas.height;
        let drawWidth: number, drawHeight: number;

        if (canvasAspect > imgAspect) {
            drawHeight = canvas.height;
            drawWidth = canvas.height * imgAspect;
        } else {
            drawWidth = canvas.width;
            drawHeight = canvas.width / imgAspect;
        }

        const x = (canvas.width - drawWidth) / 2;
        const y = (canvas.height - drawHeight) / 2;
        context.drawImage(img, 0, 0, img.width, sourceHeight, x, y, drawWidth, drawHeight);
    }, []);

    useEffect(() => {
        const unsubscribe = frameIndex.on('change', (latest: number) => {
            const currentFrame = clamp(Math.floor(latest), 0, FRAME_COUNT - 1);
            drawFrame(currentFrame);
        });

        return () => unsubscribe();
    }, [frameIndex, drawFrame]);

    useEffect(() => {
        const handleResize = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;

            const dpr = window.devicePixelRatio || 1;
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;

            const currentIdx = clamp(Math.floor(frameIndex.get()), 0, FRAME_COUNT - 1);
            drawFrame(currentIdx);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [frameIndex, drawFrame]);

    return (
        <div className="relative w-full h-full flex items-center justify-center">
            <AnimatePresence>
                {!ready && (
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

