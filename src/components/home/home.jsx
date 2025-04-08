"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { useNavigate } from "react-router-dom"
import useWindowSize from "../../hooks/useWindowSize"

// Define images outside component to prevent recreating on each render
import mobileImage1  from "../../assets/img/backgroundImages/welcomehomeMobilebg2.jpg"
import mobileImage2  from "../../assets/img/backgroundImages/welcomehomeMobilebg1.jpg"
import desktopImage1 from  "../../assets/img/backgroundImages/homedesktopbg1.jpg"
import desktopImage2 from  "../../assets/img/backgroundImages/homedesktopbg2.png"

// Constants
const PHRASES = [
  "The best place to be is Lovereign Bible Church",
  "We believe and live by the word of God.",
  "Making a people ready for God",
]

const WELCOME_TEXT = "Welcome Home"
const IMAGE_TRANSITION_INTERVAL = 6000
const PHRASE_TRANSITION_INTERVAL = 4000

export default function Home() {
  const containerRef = useRef(null)
  const imageIntervalRef = useRef(null)
  const phraseIntervalRef = useRef(null)
  const { width } = useWindowSize()
  const navigate = useNavigate()

  // Determine images based on screen width
  const images = width <= 768 ? [mobileImage1, mobileImage2] : [desktopImage1, desktopImage2]

  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)
  const [isImageTransitioning, setIsImageTransitioning] = useState(false)

  // Preload images for smoother transitions
  useEffect(() => {
    // Preload all images
    images.forEach((src) => {
      const img = new Image()
      img.src = src
    })
  }, [images])

  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start", "end start"],
  })

  const titleY = useTransform(scrollYProgress, [0, 0.3], [0, -50])
  const phraseY = useTransform(scrollYProgress, [0, 0.3], [0, -30])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.3])

  // Image transition with useCallback to prevent recreation
  const transitionImage = useCallback(() => {
    if (!isImageTransitioning) {
      setIsImageTransitioning(true)

      // Use a timeout to ensure the transition state is set before changing the image
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length)
      }, 50)
    }
  }, [isImageTransitioning, images.length])

  // Image transition interval
  useEffect(() => {
    imageIntervalRef.current = setInterval(transitionImage, IMAGE_TRANSITION_INTERVAL)

    return () => {
      if (imageIntervalRef.current) {
        clearInterval(imageIntervalRef.current)
      }
    }
  }, [transitionImage])

  // Reset transition state after animation completes
  const handleImageAnimationComplete = useCallback(() => {
    setIsImageTransitioning(false)
  }, [])

  // Phrase transition interval
  useEffect(() => {
    phraseIntervalRef.current = setInterval(() => {
      setCurrentPhraseIndex((prev) => (prev + 1) % PHRASES.length)
    }, PHRASE_TRANSITION_INTERVAL)

    return () => {
      if (phraseIntervalRef.current) {
        clearInterval(phraseIntervalRef.current)
      }
    }
  }, [])

  // Progress indicator variants
  const progressVariants = {
    initial: { width: 0 },
    animate: {
      width: "100%",
      transition: {
        duration: IMAGE_TRANSITION_INTERVAL / 1000,
        ease: "linear",
      },
    },
  }

  // Handle navigation to our-story page
  const handleDiscoverClick = useCallback(() => {
    navigate("/our-story")
  }, [navigate])

  return (
    <motion.div ref={containerRef} className="relative h-screen w-full overflow-hidden" style={{ opacity }}>
      {/* Background Images with Improved Transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImageIndex}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 1.5,
            ease: "easeInOut",
          }}
          onAnimationComplete={handleImageAnimationComplete}
        />
      </AnimatePresence>

      {/* Overlays */}
      <div className="absolute inset-0 bg-black/20 z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/70 z-20"></div>

      {/* Content */}
      <div className="relative z-30 flex flex-col items-center justify-center text-center h-full px-4">
        {/* Welcome Text */}
        <motion.div style={{ y: titleY }} className="mt-[-4rem]">
          <h1 className="relative text-5xl md:text-7xl lg:text-9xl text-white font-light tracking-tight overflow-hidden">
            {WELCOME_TEXT.split("").map((letter, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.1 + index * 0.05,
                  ease: [0.215, 0.61, 0.355, 1],
                }}
                className="inline-block"
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </h1>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="w-16 h-px bg-purple-300/70 my-8"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 0.7 }}
          transition={{ duration: 1, delay: 1.5 }}
        />

        {/* Phrases */}
        <motion.div style={{ y: phraseY }} className="h-12 md:h-16 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentPhraseIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{
                duration: 0.8,
                ease: [0.215, 0.61, 0.355, 1],
              }}
              className="text-white/90 text-lg md:text-2xl lg:text-3xl font-light"
            >
              {PHRASES[currentPhraseIndex]}
            </motion.p>
          </AnimatePresence>
        </motion.div>

        {/* Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
          whileHover={{
            scale: 1.05,
            backgroundColor: "rgba(139, 92, 246, 0.15)",
            borderColor: "rgba(139, 92, 246, 0.5)",
          }}
          whileTap={{ scale: 0.98 }}
          onClick={handleDiscoverClick}
          className="mt-12 px-8 py-2.5 border border-white/20 text-white rounded-full text-xs md:text-sm tracking-widest uppercase font-light hover:bg-white/5 transition-all duration-300"
        >
          Discover More
        </motion.button>
      </div>

      {/* Progress Indicators */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-30 flex gap-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`h-[2px] w-6 md:w-8 ${index === currentImageIndex ? "bg-white/70" : "bg-white/30"}`}
          >
            {index === currentImageIndex && (
              <motion.div
                className="h-full bg-purple-300"
                variants={progressVariants}
                initial="initial"
                animate="animate"
                key={currentImageIndex}
              />
            )}
          </div>
        ))}
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 h-[25vh] w-full bg-gradient-to-t from-[#2f1717] to-transparent z-20"></div>
    </motion.div>
  )
}
