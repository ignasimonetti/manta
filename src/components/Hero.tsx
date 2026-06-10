import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useSpring, type Variants } from 'framer-motion'
import { CrayonFilter } from './CrayonFilter'

const LETTERS = "MANTA".split("")

const containerVariants: Variants = {
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 1.5,
    },
  },
}

const letterVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95, filter: 'blur(12px)' },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

export default function Hero() {
  const { scrollY } = useScroll()
  const [vh, setVh] = useState(typeof window !== 'undefined' ? window.innerHeight : 800)

  useEffect(() => {
    const update = () => setVh(window.innerHeight)
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const imageOpacity = useTransform(scrollY, [vh * 1.5, vh * 2.5], [1, 0])
  const smoothOpacity = useSpring(imageOpacity, { stiffness: 80, damping: 20, restDelta: 0.001 })

  return (
    <section className="relative w-full h-[300vh]">
      <CrayonFilter id="hero-crayon" />
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center z-10 overflow-hidden bg-[#F9F9F7]">
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{ opacity: smoothOpacity }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster="/videos/manta-hero-poster.jpg"
            className="w-full h-full object-cover"
          >
            <source src="/videos/manta-hero.mp4" type="video/mp4" />
          </video>

          <div className="absolute inset-0 flex flex-col justify-end items-center pb-[12vh] md:pb-[10vh] pointer-events-none">
            <motion.h1
              className="font-display text-7xl md:text-9xl lg:text-[10rem] font-medium tracking-[-0.06em] leading-none uppercase"
              style={{ filter: 'url(#hero-crayon)' }}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {LETTERS.map((letter, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  variants={letterVariants}
                  style={i === 4 ? { color: '#FF00FF', textShadow: '0 0 24px rgba(255,0,255,0.25)' } : { color: '#1A1A1A' }}
                >
                  {letter}
                </motion.span>
              ))}
            </motion.h1>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
