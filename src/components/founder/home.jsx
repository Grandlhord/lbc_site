"use client"

import { useEffect, useState, useRef } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination, EffectFade } from "swiper/modules"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Quote } from "lucide-react"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/effect-fade"

// Import your images
const pjwd1 =  '/assets/img/backgroundImages/ourstorydesktop1.jp'
const pjwd2 =  '/assets/img/backgroundImages/thefounderdesktop1.'
const pjwm1 =  '/assets/img/backgroundImages/foundermobile1.jpg'
const pjwm2 =  '/assets/img/backgroundImages/foundermobile2.jpg'
const pjwm3 =  '/assets/img/backgroundImages/foundermobile3.jpg'

const desktopImages = [pjwd1, pjwd2]
const mobileImages = [pjwm1, pjwm2, pjwm3]

const founderQuotes = [
  "Faith is taking the first step even when you don't see the whole staircase.",
  "The true measure of our faith is how we live in service to others.",
  "Through prayer, we find the strength to overcome any challenge.",
  "Our mission is to spread love and hope to all corners of the world.",
]

export default function Home() {
  const [isMobile, setIsMobile] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const contentRef = useRef(null)
  const isInView = useInView(contentRef, { once: false })

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Animation variants
  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.3,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  const quoteVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: 0.6,
        ease: "easeOut",
      },
    },
  }

  const scrollIndicatorVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: [0.3, 1, 0.3],
      y: [0, 10, 0],
      transition: {
        duration: 2,
        ease: "easeInOut",
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "loop",
      },
    },
  }

  return (
    <div className="relative min-h-screen w-full text-white overflow-hidden">
      {/* Background Slider */}
      <Swiper
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        pagination={{ clickable: true, dynamicBullets: true }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="absolute inset-0"
      >
        {(isMobile ? mobileImages : desktopImages).map((image, index) => (
          <SwiperSlide key={index}>
            <div className="bg-cover bg-center min-h-screen" style={{ backgroundImage: `url(${image})` }} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Enhanced Gradient Overlays for better text visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/80"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>

      {/* Additional text shadow layer - reduced opacity */}
      <div className="absolute inset-0 backdrop-blur-[1px] opacity-20"></div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-80 h-80 rounded-full bg-purple-600/10 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-blue-600/10 blur-3xl"></div>
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 md:px-8"
      >
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={titleVariants}
          className="relative"
        >
          {/* Subtle glow behind the text */}
          <motion.div
            className="absolute -inset-x-6 -inset-y-3 rounded-lg bg-gradient-to-r from-purple-600/20 via-blue-500/20 to-purple-600/20 opacity-60 blur-xl"
            animate={{
              opacity: [0.4, 0.6, 0.4],
              scale: [0.98, 1.01, 0.98],
            }}
            transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "mirror",
            }}
          />

          {/* Main title with refined styling */}
          <h1 className="font-serif font-light tracking-wide text-[2.8rem] md:text-[4rem] lg:text-[5.5rem] xl:text-[6.5rem] leading-tight">
            <span className="inline-block relative">
              {/* Subtle outline effect */}
              <span className="absolute inset-0 blur-[2px] text-white/10">The Founder</span>

              {/* Main text with gradient */}
              <span
                className="relative bg-clip-text text-transparent bg-gradient-to-b from-white/90 via-white/80 to-white/60
                              drop-shadow-[0_1px_3px_rgba(0,0,0,0.3)]"
              >
                The Founder
              </span>
            </span>
          </h1>
        </motion.div>

        <motion.h2
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={subtitleVariants}
          className="mt-4 md:mt-6 text-xl md:text-2xl lg:text-3xl text-blue-100/90 max-w-3xl font-light tracking-wider
                    drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
        >
          Visionary Leader & Spiritual Guide
        </motion.h2>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="mt-8 md:mt-12 max-w-2xl mx-auto"
          >
            <div
              className="relative px-8 py-6 bg-black/20 backdrop-blur-sm rounded-xl border border-white/10
                           shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
            >
              <Quote className="absolute top-2 left-2 text-white/20 w-8 h-8" />
              <Quote className="absolute bottom-2 right-2 text-white/20 w-8 h-8 rotate-180" />
              <p className="text-lg md:text-xl lg:text-2xl italic text-white/90 font-light drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">
                {founderQuotes[activeIndex]}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

