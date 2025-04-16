"use client"

import React, { useRef, useState, useEffect } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"

const belief = '/assets/img/beli.jpg'
const founderStorymobile = '/assets/img/backgroundImages/thefounderstorymobile1.jpg'
const founderdesktop1 = '/assets/img/backgroundImages/thefounderdesktop1.jpg'

const FounderStory = () => {
  const containerRef = useRef(null)
  const textRef = useRef(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.2 })
  const textInView = useInView(textRef, { once: false, amount: 0.5 })
  const [isMobile, setIsMobile] = useState(false)

  // Check if mobile on mount and when window resizes
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkIfMobile()

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  // Parallax effect for background
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0.6, 1, 1, 0.6])

  // Text animation variants
  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  }

  // Staggered text animation for paragraph
  const textVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.015, // Slightly faster stagger
        delayChildren: 0.3,
        duration: 0.5,
      },
    },
  }

  const letterVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  }

  // Split text into words and characters for animation
  const text =
    "Pastor John Winfred received a divine calling to spread the Gospel and build a strong faith community. With prayer and dedication, the church was established on 13th December 2013. Starting as a small gathering and growing into a thriving place of worship, today it continues to fulfill its mission of bringing hope, healing, and transformation through Christ."
  const words = text.split(" ")

  // Dynamically select background image based on screen size
  const backgroundImage = isMobile ? founderStorymobile : founderdesktop1

  return (
    <motion.div ref={containerRef} className="relative h-screen w-full overflow-hidden" style={{ opacity }}>
      {/* Background image with parallax */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImage || belief})`,
          y: bgY,
        }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-black/70 z-10" />

      {/* Subtle texture overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjMDAwIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDVMNSAwWk02IDRMNCA2Wk0tMSAxTDEgLTFaIiBzdHJva2U9IiMyMjIiIHN0cm9rZS13aWR0aD0iMSI+PC9wYXRoPgo8L3N2Zz4=')] opacity-10 z-10" />

      {/* Floating elements for visual interest */}
      {[...Array(3)].map((_, index) => (
        <motion.div
          key={index}
          className="absolute w-1 h-1 rounded-full bg-purple-300/30"
          initial={{
            x: 50 + index * 100,
            y: 100 + index * 50,
            opacity: 0,
          }}
          animate={{
            y: [100 + index * 50, 50 + index * 50],
            opacity: [0, 0.4, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 8 + index * 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: index * 2,
            ease: "easeInOut",
          }}
          style={{
            left: `${20 + index * 20}%`,
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4 md:px-12 max-w-5xl mx-auto">
        {/* Decorative line */}
        <motion.div
          className="w-16 h-px bg-purple-300 mb-8"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={isInView ? { scaleX: 1, opacity: 0.7 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
        />

        {/* Heading with subtle text shadow */}
        <motion.h1
          variants={titleVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-4xl md:text-6xl font-light tracking-wider text-white drop-shadow-sm"
        >
          <span className="font-light">Founder</span>{" "}
          <span className="text-purple-200 italic font-extralight">Story</span>
        </motion.h1>

        {/* Description with character animation */}
        <motion.div
          ref={textRef}
          variants={textVariants}
          initial="hidden"
          animate={textInView ? "visible" : "hidden"}
          className="mt-10 md:mt-16 max-w-3xl"
        >
          <p className="text-sm md:text-base leading-relaxed text-white/80 font-light drop-shadow-sm">
            {words.map((word, index) => (
              <React.Fragment key={index}>
                <motion.span variants={letterVariants} className="inline-block">
                  {word}
                </motion.span>{" "}
              </React.Fragment>
            ))}
          </p>
        </motion.div>

        {/* Call-to-Action Button with enhanced animation */}
        <motion.button
          className="mt-10 md:mt-16 px-8 py-2.5 border border-purple-300/30 text-purple-100 rounded-full text-xs md:text-sm tracking-widest uppercase font-light hover:bg-purple-900/20 transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          whileHover={{
            scale: 1.05,
            backgroundColor: "rgba(139, 92, 246, 0.15)",
            borderColor: "rgba(139, 92, 246, 0.5)",
            boxShadow: "0 0 15px rgba(139, 92, 246, 0.3)",
            transition: { duration: 0.2 },
          }}
          whileTap={{ scale: 0.98 }}
        >
          Learn More
        </motion.button>
      </div>

      {/* Subtle scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.div
          className="w-5 h-9 border border-white/30 rounded-full flex justify-center p-1"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        >
          <motion.div
            className="w-1 h-1.5 bg-white/70 rounded-full"
            animate={{
              y: [0, 12, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          />
        </motion.div>
        <motion.p
          className="text-white/50 text-xs mt-2 font-light tracking-wider"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        >
          SCROLL
        </motion.p>
      </motion.div>
    </motion.div>
  )
}

export default FounderStory

