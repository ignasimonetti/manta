import { useEffect, useRef, useState, useCallback } from 'react'
import { useTransform, motion, AnimatePresence, useSpring, type MotionValue } from 'framer-motion'

const clamp = (val: number, min: number, max: number) => Math.min(Math.max(val, min), max)

const FRAME_COUNT = 120
const pad = (n: number) => n.toString().padStart(4, '0')

interface ScrollDrawingProps {
  scrollY: MotionValue<number>
}

export default function ScrollDrawing({ scrollY }: ScrollDrawingProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imagesRef = useRef<HTMLImageElement[]>([])
  const loadedRef = useRef(0)
  const [ready, setReady] = useState(false)
  const [progress, setProgress] = useState(0)
  const [vh, setVh] = useState(typeof window !== 'undefined' ? window.innerHeight : 800)

  useEffect(() => {
    const update = () => setVh(window.innerHeight)
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const rawIndex = useTransform(scrollY, [0, vh * 1.5], [0, FRAME_COUNT - 1])
  const smoothIndex = useSpring(rawIndex, { stiffness: 80, damping: 20, restDelta: 0.001 })

  useEffect(() => {
    loadedRef.current = 0
    imagesRef.current = []
    let cancelled = false

    const loadNext = (i: number) => {
      if (cancelled || i >= FRAME_COUNT) return

      const img = new Image()
      img.src = `/frames/frame_${pad(i + 1)}.png`

      img.onload = () => {
        if (cancelled) return
        imagesRef.current[i] = img
        loadedRef.current++
        setProgress(Math.round((loadedRef.current / FRAME_COUNT) * 100))
        if (!ready && i === 0) setReady(true)
        loadNext(i + 1)
      }

      img.onerror = () => {
        if (cancelled) return
        loadedRef.current++
        setProgress(Math.round((loadedRef.current / FRAME_COUNT) * 100))
        loadNext(i + 1)
      }
    }

    loadNext(0)
    return () => { cancelled = true }
  }, [ready])

  const draw = useCallback((index: number) => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    const img = imagesRef.current[index]
    if (!canvas || !ctx || !img) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const imgAspect = img.width / img.height
    const canvasAspect = canvas.width / canvas.height
    let dw: number, dh: number

    if (canvasAspect > imgAspect) {
      dh = canvas.height
      dw = dh * imgAspect
    } else {
      dw = canvas.width
      dh = dw / imgAspect
    }

    const scale = 1.05
    const sw = dw * scale
    const sh = dh * scale

    ctx.drawImage(img, 0, 0, img.width, img.height, (canvas.width - sw) / 2, (canvas.height - sh) / 2, sw, sh)
  }, [])

  useEffect(() => {
    const unsub = smoothIndex.on('change', (v: number) => {
      draw(clamp(Math.floor(v), 0, FRAME_COUNT - 1))
    })
    return () => unsub()
  }, [smoothIndex, draw])

  useEffect(() => {
    if (ready) draw(clamp(Math.floor(smoothIndex.get()), 0, FRAME_COUNT - 1))
  }, [ready, smoothIndex, draw])

  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current
      if (!canvas) return
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      draw(clamp(Math.floor(smoothIndex.get()), 0, FRAME_COUNT - 1))
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [smoothIndex, draw])

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <AnimatePresence>
        {!ready && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-[#F9F9F7] z-50"
          >
            <div className="w-48 h-[1px] bg-black/10 relative overflow-hidden">
              <motion.div className="absolute inset-y-0 left-0 bg-black/60" initial={{ width: 0 }} animate={{ width: `${progress}%` }} />
            </div>
            <span className="mt-4 font-mono text-[10px] tracking-widest text-black/30 uppercase">
              Cargando identidad / {progress}%
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%' }}
        className="w-full h-full object-contain"
      />
    </div>
  )
}
