"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { useNavigate } from "react-router-dom"
import useWindowSize from "../../hooks/useWindowSize"

// Define images outside component to prevent recreating on each render
const mobileImage1 = '/assets/img/backgroundImages/welcomehomemobilebg2.jpg'
const mobileImage2 = '/assets/img/backgroundImages/welcomehomeMobilebg1.jpg'
const desktopImage1 = '/assets/img/backgroundImages/homedesktopbg1.jpg'
const desktopImage2 = '/assets/img/backgroundImages/homedesktopbg2.png'

// Constants
const PHRASES = [
  "The best place to be is Lovereign Bible Church",
  "We believe and live by the word of God.",
  "Making a people ready for God",
]

const TITLES = ["Welcome Home", "Lovereign Bible Church"]
const IMAGE_TRANSITION_INTERVAL = 6000
const TITLE_TRANSITION_INTERVAL = 4000
const PHRASE_TRANSITION_INTERVAL = 4000

export default function Home() {
  const containerRef = useRef(null)
  const imageIntervalRef = useRef(null)
  const phraseIntervalRef = useRef(null)
  const titleIntervalRef = useRef(null)
  const { width } = useWindowSize()
  const navigate = useNavigate()

  // Determine images based on screen width
  const images = width <= 768 ? [mobileImage1, mobileImage2] : [desktopImage1, desktopImage2]

  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0)
  const [isImageTransitioning, setIsImageTransitioning] = useState(false)

  // Preload images for smoother transitions
  useEffect(() => {
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

  // Image transition
  useEffect(() => {
    imageIntervalRef.current = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length)
    }, IMAGE_TRANSITION_INTERVAL)

    return () => {
      clearInterval(imageIntervalRef.current)
    }
  }, [images.length])

  // Phrase transition
  useEffect(() => {
    phraseIntervalRef.current = setInterval(() => {
      setCurrentPhraseIndex((prev) => (prev + 1) % PHRASES.length)
    }, PHRASE_TRANSITION_INTERVAL)

    return () => {
      clearInterval(phraseIntervalRef.current)
    }
  }, [])

  // Title transition
  useEffect(() => {
    titleIntervalRef.current = setInterval(() => {
      setCurrentTitleIndex((prev) => (prev + 1) % TITLES.length)
    }, TITLE_TRANSITION_INTERVAL)

    return () => {
      clearInterval(titleIntervalRef.current)
    }
  }, [])

  return (
    <motion.div ref={containerRef} className="relative h-screen w-full overflow-hidden" style={{ opacity }}>
      {/* Background Images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImageIndex}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "fadein" }}
        />
      </AnimatePresence>

      {/* Overlays */}
      <div className="absolute inset-0 bg-black/20 z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/70 z-20"></div>

      {/* Content */}
      <div className="relative z-30 flex flex-col items-center justify-center text-center h-full px-4">
        {/* Title */}
        <motion.div
          style={{ y: titleY }}
          className={`${width <= 768 ? "mt-[-18rem]" : "mt-[-8rem]"}`}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-Geist tracking-tight overflow-hidden text-white">
            {TITLES[currentTitleIndex].split(" ").map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.1 + index * 0.05,
                  ease: [0.215, 0.61, 0.355, 1],
                }}
                className="inline-block mr-4"
              >
                {word === "Bible" || word === "Home" ? (
                  <span className="italic">{word}</span>
                ) : (
                  word
                )}
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
              className="text-white/90 text-lg md:text-2xl lg:text-3xl font-Geist font-light"
            >
              {PHRASES[currentPhraseIndex]}
            </motion.p>
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  )
}