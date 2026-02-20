import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

const SignatureCanvas: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [hasDrawn, setHasDrawn] = useState(false);
    const fadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const getCtx = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return null;
        return canvas.getContext('2d');
    }, []);

    // Setup canvas
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.scale(dpr, dpr);
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
        }
    }, []);

    const startDraw = useCallback(
        (e: React.MouseEvent | React.TouchEvent) => {
            const ctx = getCtx();
            if (!ctx) return;

            if (fadeTimerRef.current) {
                clearTimeout(fadeTimerRef.current);
                fadeTimerRef.current = null;
            }

            setIsDrawing(true);
            setHasDrawn(true);

            const canvas = canvasRef.current!;
            const rect = canvas.getBoundingClientRect();
            const clientX =
                'touches' in e
                    ? (e as React.TouchEvent).touches[0].clientX
                    : (e as React.MouseEvent).clientX;
            const clientY =
                'touches' in e
                    ? (e as React.TouchEvent).touches[0].clientY
                    : (e as React.MouseEvent).clientY;

            ctx.beginPath();
            ctx.moveTo(clientX - rect.left, clientY - rect.top);
        },
        [getCtx]
    );

    const draw = useCallback(
        (e: React.MouseEvent | React.TouchEvent) => {
            if (!isDrawing) return;
            const ctx = getCtx();
            if (!ctx || !canvasRef.current) return;

            const rect = canvasRef.current.getBoundingClientRect();
            const clientX =
                'touches' in e
                    ? (e as React.TouchEvent).touches[0].clientX
                    : (e as React.MouseEvent).clientX;
            const clientY =
                'touches' in e
                    ? (e as React.TouchEvent).touches[0].clientY
                    : (e as React.MouseEvent).clientY;

            ctx.strokeStyle = 'rgba(255, 0, 255, 0.6)';
            ctx.lineWidth = 2;
            ctx.lineTo(clientX - rect.left, clientY - rect.top);
            ctx.stroke();
        },
        [isDrawing, getCtx]
    );

    const endDraw = useCallback(() => {
        setIsDrawing(false);

        // Auto-fade after 4 seconds
        fadeTimerRef.current = setTimeout(() => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            let opacity = 1;
            // Save current drawing then fade
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const fadeStep = () => {
                opacity -= 0.02;
                if (opacity <= 0) {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.globalAlpha = 1;
                    setHasDrawn(false);
                    return;
                }
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.globalAlpha = opacity;
                ctx.putImageData(imageData, 0, 0);
                requestAnimationFrame(fadeStep);
            };
            requestAnimationFrame(fadeStep);
        }, 4000);
    }, []);

    return (
        <div className="relative w-full max-w-md mx-auto">
            <canvas
                ref={canvasRef}
                className="w-full h-32 rounded-2xl border border-white/[0.06] bg-white/[0.02] cursor-crosshair touch-none"
                onMouseDown={startDraw}
                onMouseMove={draw}
                onMouseUp={endDraw}
                onMouseLeave={endDraw}
                onTouchStart={startDraw}
                onTouchMove={draw}
                onTouchEnd={endDraw}
            />
            <motion.p
                className="absolute inset-0 flex items-center justify-center font-mono text-[10px] text-white/15 uppercase tracking-[0.4em] pointer-events-none select-none"
                animate={{ opacity: hasDrawn ? 0 : 1 }}
                transition={{ duration: 0.3 }}
            >
                Dejá tu firma aquí
            </motion.p>
        </div>
    );
};

export default SignatureCanvas;
