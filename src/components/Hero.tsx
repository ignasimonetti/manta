import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import ScrollDrawing from './ScrollDrawing'

export default function Hero() {
  const { scrollY } = useScroll()
  const [vh, setVh] = useState(typeof window !== 'undefined' ? window.innerHeight : 800)

  useEffect(() => {
    const update = () => setVh(window.innerHeight)
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  // Phase 1: Drawing (0 → 1.5vh) handled inside ScrollDrawing
  // Phase 2: Organic fade (1.5 → 2.5vh)
  const imageOpacity = useTransform(scrollY, [vh * 1.5, vh * 2.5], [1, 0])
  const smoothOpacity = useSpring(imageOpacity, { stiffness: 80, damping: 20, restDelta: 0.001 })

  return (
    <section className="relative w-full h-[300vh]">
          <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center z-10 overflow-hidden bg-[#F9F9F7]">
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{ opacity: smoothOpacity }}
        >
          <ScrollDrawing scrollY={scrollY} />
        </motion.div>
      </div>
    </section>
  )
}
