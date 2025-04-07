"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { ChevronDown, ChevronLeft, ChevronRight, Star } from "lucide-react"

export default function Missionvision() {
  const [activeSlide, setActiveSlide] = useState(0)
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.2 })

  // Auto-rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev === 0 ? 1 : 0))
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { when: "beforeChildren", staggerChildren: 0.2 },
    },
  }

  const titleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 200 : -200,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: (direction) => ({
      x: direction < 0 ? 200 : -200,
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  }

  const scrollIndicatorVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: [0.2, 1, 0.2],
      y: [0, 10, 0],
      transition: {
        duration: 2,
        ease: "easeInOut",
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "loop",
      },
    },
  }

  const slides = [
    {
      title: "Our Mission",
      content:
        "Our mission is to spread the love and teachings of Jesus Christ, nurture spiritual growth, and serve our community through faith, compassion, and outreach. We are committed to bringing hope and transformation to all, empowering believers, fostering unity, and impacting lives through worship, discipleship, and service.",
    },
    {
      title: "Our Vision",
      content:
        "Our vision is to be a Christ-centered church that leads people into a deeper relationship with God and advances His Kingdom on earth. We envision a community where lives are transformed by the power of the Holy Spirit, where faith is nurtured, and where every person discovers their divine purpose and calling.",
    },
  ]

  const handleNext = () => {
    setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  const handlePrev = () => {
    setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  // Direction for slide animations
  const [[page, direction], setPage] = useState([0, 0])

  useEffect(() => {
    setPage([activeSlide, activeSlide > page ? 1 : -1])
  }, [activeSlide, page])

  return (
    <div
      ref={containerRef}
      className="relative min-h-[100vh] overflow-hidden bg-gradient-to-b from-[#0a0a1a] via-[#111133] to-[#0a0a1a] text-white font-serif"
    >
      {/* Animated Cross Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {[...Array(5)].map((_, index) => (
          <motion.div
            key={`cross-${index}`}
            className="absolute opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 45}deg)`,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: [0.05, 0.15, 0.05],
              scale: [0.8, 1, 0.8],
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 5,
            }}
          >
            <div className="h-40 w-2 bg-gradient-to-b from-transparent via-amber-300/30 to-transparent rounded-full" />
            <div className="h-2 w-24 bg-gradient-to-r from-transparent via-amber-300/30 to-transparent rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </motion.div>
        ))}
      </div>

      {/* Animated Light Particles */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {[...Array(30)].map((_, index) => (
          <motion.div
            key={`particle-${index}`}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              boxShadow: `0 0 ${Math.random() * 10 + 5}px ${Math.random() * 3 + 1}px rgba(255, 255, 255, 0.3)`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 0.7, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 10,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Radial Gradient Overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(circle at center, rgba(10, 10, 40, 0.3) 0%, rgba(10, 10, 40, 0.8) 100%)",
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-20 container mx-auto px-4 py-20 md:py-28 mb-10 text-center flex flex-col items-center justify-center min-h-[100vh]"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Decorative Elements */}
        <motion.div
          className="absolute top-1/4 -left-20 w-40 h-40 rounded-full border border-white/10 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 0.15 : 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-20 w-60 h-60 rounded-full border border-white/10 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 0.15 : 0 }}
          transition={{ delay: 0.7, duration: 1 }}
        />

        {/* Main Star */}
        <motion.div
          className="absolute top-20 right-[15%] z-10"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{
            scale: [0.8, 1.2, 0.8],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        >
          <div className="relative">
            <div className="absolute inset-0 blur-xl bg-amber-300/30 rounded-full w-12 h-12"></div>
            <Star className="w-12 h-12 text-amber-300" strokeWidth={1} />
          </div>
        </motion.div>

        {/* Small Stars */}
        {[...Array(8)].map((_, index) => (
          <motion.div
            key={`star-${index}`}
            className="absolute z-10"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.1, 0.4, 0.1],
              scale: [0.6, 1, 0.6],
            }}
            transition={{
              duration: Math.random() * 4 + 4,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          >
            <Star
              className={`w-${Math.floor(Math.random() * 3) + 2} h-${Math.floor(Math.random() * 3) + 2} text-amber-200/40`}
              strokeWidth={1}
            />
          </motion.div>
        ))}

        {/* Title with Star Icon */}
        <motion.div className="flex flex-col items-center mb-16" variants={titleVariants}>
          <motion.div
            className="flex items-center justify-center mb-6"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            <div className="relative">
              <div className="absolute inset-0 blur-md bg-amber-300/30 rounded-full"></div>
              <Star className="w-14 h-14 text-amber-300/70" strokeWidth={1} />
              <Star
                className="w-10 h-10 text-amber-300 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                strokeWidth={1}
              />
            </div>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-light tracking-tight font-serif">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-white to-amber-200">
              Mission
            </span>{" "}
            <span className="font-extralight text-white/80">&</span>{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-white to-amber-200">
              Vision
            </span>
          </h1>

          <motion.div
            className="w-32 h-0.5 bg-gradient-to-r from-amber-400/30 via-amber-400 to-amber-400/30 mt-8 rounded-full"
            variants={titleVariants}
          />
        </motion.div>

        {/* Slider */}
        <div className="relative max-w-4xl mx-auto w-full px-4 md:px-12 h-[400px] md:h-[350px]">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={page}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 flex flex-col items-center justify-center"
            >
              <div className="relative p-10 rounded-2xl backdrop-blur-sm border border-amber-500/10 bg-gradient-to-br from-black/40 to-black/20 overflow-hidden group">
                {/* Decorative corner accent */}
                <div className="absolute top-0 left-0 w-20 h-20 overflow-hidden">
                  <div className="absolute transform rotate-45 bg-amber-500/20 w-10 h-10 -top-5 -left-5"></div>
                </div>
                <div className="absolute bottom-0 right-0 w-20 h-20 overflow-hidden">
                  <div className="absolute transform rotate-45 bg-amber-500/20 w-10 h-10 -bottom-5 -right-5"></div>
                </div>

                <h2 className="text-3xl md:text-4xl font-light mb-8 text-amber-300 font-serif">
                  {slides[activeSlide].title}
                </h2>

                <p className="text-base md:text-xl leading-relaxed text-gray-200 font-light">
                  {slides[activeSlide].content}
                </p>

                {/* Subtle glow effect */}
                <motion.div
                  className="absolute inset-0 bg-amber-500/0 rounded-2xl pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.03 }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="absolute -bottom-16 left-0 right-0 flex justify-center items-center gap-8 mt-8">
            <button
              onClick={handlePrev}
              className="p-2 rounded-full bg-black/20 border border-amber-500/20 text-amber-300 hover:bg-black/40 hover:border-amber-500/40 transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex gap-3">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    activeSlide === index ? "bg-amber-400 scale-110" : "bg-white/30 hover:bg-white/50"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-2 rounded-full bg-black/20 border border-amber-500/20 text-amber-300 hover:bg-black/40 hover:border-amber-500/40 transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

