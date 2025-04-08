"use client"

import { useRef } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import CountUp from "react-countup"
const seats = '/public/assets/img/backgroundImages/seats.jpeg'
import { useNavigate } from "react-router-dom"

export default function Seat() {
  const containerRef = useRef(null)
  const statsRef = useRef(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.3 })
  const statsInView = useInView(statsRef, { once: false, amount: 0.5 })
  const navigate = useNavigate()

  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0.7, 1, 1, 0.7])
  const titleY = useTransform(scrollYProgress, [0, 0.5], [0, -30])
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -15])

  // Stats data
  const stats = [
    { label: "Service Times", value: 5, suffix: "+" },
    { label: "Cell Groups", value: 50, suffix: "+" },
    { label: "Workers", value: 35, suffix: "+" },
  ]

  const handleJoinUsClick = () => {
    navigate("/contact-us")
  }

  return (
    <motion.div ref={containerRef} className="relative h-screen w-full overflow-hidden" style={{ opacity }}>
      {/* Background image with parallax */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${seats})`,
          y: bgY,
        }}
      />

      {/* Gradient overlays for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/80 z-10"></div>

      {/* Subtle texture overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjMDAwIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDVMNSAwWk02IDRMNCA2Wk0tMSAxTDEgLTFaIiBzdHJva2U9IiMyMjIiIHN0cm9rZS13aWR0aD0iMSI+PC9wYXRoPgo8L3N2Zz4=')] opacity-5 z-10"></div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-6">
        {/* Title */}
        <motion.div style={{ y: titleY }} className="max-w-2xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-4xl md:text-6xl font-light tracking-wide text-white"
          >
            <span className="font-extralight">We've saved a </span>
            <span className="text-amber-200 italic font-extralight">seat</span>
            <span className="font-extralight"> for you!</span>
          </motion.h1>
        </motion.div>

        {/* Decorative line */}
        <motion.div
          className="w-16 h-px bg-amber-300/50 my-8"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={isInView ? { scaleX: 1, opacity: 0.7 } : {}}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
        />

        {/* Description */}
        <motion.div style={{ y: textY }} className="max-w-2xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-sm md:text-base leading-relaxed text-white/80 font-light"
          >
            At Lovereign Bible Church, we want to stand with you as you discover more about God's grace, grow in His
            knowledge, and serve His will.
          </motion.p>
        </motion.div>

        {/* Stats */}
        <motion.div
          ref={statsRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 grid grid-cols-3 gap-8 md:gap-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1 + index * 0.2 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={statsInView ? { scale: 1 } : {}}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  delay: 1.2 + index * 0.2,
                }}
                className="mb-2"
              >
                <span className="text-4xl md:text-6xl font-light text-white">
                  {/* Show the number immediately, then animate when in view */}
                  {statsInView ? (
                    <CountUp
                      start={stat.value * 0.5} // Start from half the value for a smoother effect
                      end={stat.value}
                      duration={2.5}
                      delay={0.5}
                      suffix={stat.suffix}
                    />
                  ) : (
                    <>
                      {stat.value}
                      {stat.suffix}
                    </>
                  )}
                </span>
              </motion.div>
              <motion.p
                className="text-xs md:text-sm uppercase tracking-wider text-amber-300/80 font-light"
                initial={{ opacity: 0 }}
                animate={statsInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 1.5 + index * 0.2 }}
              >
                {stat.label}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>

        {/* Call-to-action button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.8 }}
          whileHover={{
            scale: 1.05,
            backgroundColor: "rgba(251, 191, 36, 0.1)",
            borderColor: "rgba(251, 191, 36, 0.5)",
            transition: { duration: 0.2 },
          }}
          whileTap={{ scale: 0.98 }}
          onClick={handleJoinUsClick}
          className="mt-12 px-8 py-2.5 border border-amber-300/30 text-amber-100 rounded-full text-xs md:text-sm tracking-widest uppercase font-light hover:bg-amber-900/10 transition-all duration-300"
        >
          Join Us
        </motion.button>

        {/* Floating elements for visual interest */}
        {[...Array(5)].map((_, index) => (
          <motion.div
            key={index}
            className="absolute w-1 h-1 rounded-full bg-amber-300/30"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0,
            }}
            animate={{
              y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight - 100],
              opacity: [0, 0.4, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              delay: index * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </motion.div>
  )
}

