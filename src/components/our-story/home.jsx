"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import useWindowSize from "../../hooks/useWindowSize"

// Import your images
const mobileImage1 = '/public/assets/img/backgroundImages/ourstorymobile2.jpg'
const mobileImage2 = '/public/assets/img/backgroundImages/ourstorymobile1.jpg'
const mobileImage3 = '/public/assets/img/backgroundImages/ourstorymobile3.jpg'
const desktopImage1= '/public/assets/img/backgroundImages/ourstorydesktop1.jpg'
const desktopImage2= '/public/assets/img/backgroundImages/ourstorydesktop2.jpg'
const desktopImage3= '/public/assets/img/backgroundImages/ourstorydesktop3.jpg'
const desktopImage4= '/public/assets/img/backgroundImages/ourstorydesktop4.jpg'
const desktopImage5= '/public/assets/img/backgroundImages/ourstorydesktop5.jpg'

const Home = () => {
  const { width } = useWindowSize()
  const containerRef = useRef(null)

  // Define images for mobile and desktop views
  const mobileImages = [mobileImage1, mobileImage2,mobileImage3]
  const desktopImages = [desktopImage1, desktopImage2, desktopImage3, desktopImage4, desktopImage5]

  // Determine images based on screen size
  const isMobile = width <= 768
  const images = isMobile ? mobileImages : desktopImages

  // State for current image index and transition
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [previousImageIndex, setPreviousImageIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start", "end start"],
  })

  const titleY = useTransform(scrollYProgress, [0, 0.5], [0, -50])
  const subtitleY = useTransform(scrollYProgress, [0, 0.5], [0, -30])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  // Preload images
  useEffect(() => {
    images.forEach((imageSrc) => {
      const img = new Image()
      img.src = imageSrc
    })
  }, [images])

  // Change background image periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setPreviousImageIndex(currentImageIndex)
      setIsTransitioning(true)
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 6000) // Change image every 6 seconds

    return () => clearInterval(interval) // Cleanup on unmount
  }, [currentImageIndex, images.length])

  // Text animation variants
  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
    exit: {
      opacity: 0,
      y: -30,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  }

  // Letter animation for subtitle
  const subtitleText = "Discover the journey that defines us."
  const subtitleLetters = subtitleText.split("")

  // Progress indicator variants
  const progressVariants = {
    initial: { width: 0 },
    animate: {
      width: "100%",
      transition: {
        duration: 6,
        ease: "linear",
      },
    },
  }

  return (
    <motion.div ref={containerRef} className="relative h-screen w-full overflow-hidden" style={{ opacity }}>
      {/* Background Images with Crossfade */}
      <AnimatePresence mode="sync">
        <motion.div
          key={currentImageIndex}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          onAnimationComplete={() => setIsTransitioning(false)}
        />
      </AnimatePresence>

      {/* Subtle texture overlay */}
      <div className="absolute inset-0 bg-black/10 z-10" />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/80 z-20"></div>

      {/* Content */}
      <div className="relative z-30 flex flex-col items-center justify-center text-center h-full px-4">
        {/* Title Animation */}
        <motion.div style={{ y: titleY }}>
          <AnimatePresence mode="wait">
            <motion.h1
              key={currentImageIndex}
              variants={titleVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="text-5xl md:text-7xl lg:text-8xl font-light tracking-wide text-purple-950"
            >
              <span className="font-extralight">Our</span>{" "}
              <span className="text-purple-200 italic font-extralight">Story</span>
            </motion.h1>
          </AnimatePresence>
        </motion.div>

        {/* Subtitle Animation */}
        <motion.div style={{ y: subtitleY }} className="mt-6 md:mt-8 overflow-hidden">
          <motion.p
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-base md:text-xl text-white/80 font-light tracking-wide"
          >
            {subtitleLetters.map((letter, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.8 + index * 0.02,
                  ease: "easeOut",
                }}
                className="inline-block"
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </motion.p>
        </motion.div>

        {/* Decorative line */}
        <motion.div
          className="w-16 h-px bg-purple-300/50 mt-8"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        />
      </div>

      {/* Image Progress Indicators */}
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
      <div className="absolute bottom-0 h-[25vh] w-full bg-gradient-to-t from-[#1B172F] to-transparent z-20"></div>
    </motion.div>
  )
}

export default Home

