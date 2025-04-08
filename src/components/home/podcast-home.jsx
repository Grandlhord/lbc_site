"use client"
import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import CountUp from "react-countup"

const  earth = '/assets/img/earth.png'
const  youtube ='/assets/img/youtube.svg'
const  podbean  ='/assets/img/podbean.svg'
const  spotify = '/assets/img/spotify.svg'
const  apply = '/assets/img/apply_pod.svg'

function Podcast() {
  const containerRef = useRef(null)
  const statsRef = useRef(null)
  const platformsRef = useRef(null)

  const isInView = useInView(containerRef, { once: false, amount: 0.2 })
  const statsInView = useInView(statsRef, { once: false, amount: 0.5 })
  const platformsInView = useInView(platformsRef, { once: false, amount: 0.3 })

  // Platform data
  const platforms = [
    { name: "YouTube", icon: youtube },
    { name: "Podbean", icon: podbean },
    { name: "Spotify", icon: spotify },
    { name: "Apple", icon: apply },
  ]

  return (
    <motion.div
      ref={containerRef}
      className="relative w-full overflow-hidden bg-gradient-to-b from-black to-slate-950 py-16 md:py-20"
    >
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjMDAwIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDVMNSAwWk02IDRMNCA2Wk0tMSAxTDEgLTFaIiBzdHJva2U9IiMyMjIiIHN0cm9rZS13aWR0aD0iMSI+PC9wYXRoPgo8L3N2Zz4=')] opacity-[0.03] z-10"></div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-6 md:px-8 lg:px-16 xl:px-24 max-w-5xl">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 lg:gap-20">
          {/* Left side - Earth and Stats */}
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start">
            {/* Earth Image with Animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative mb-8 md:mb-10"
            >
              <motion.img 
                src={earth} 
                alt="Earth" 
                className="w-[8rem] md:w-[10rem] relative z-10" 
                animate={isInView ? { 
                  rotate: [0, 5, 0, -5, 0],
                } : {}}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />

              {/* Subtle glow effect */}
              <div className="absolute inset-0 bg-teal-500/10 blur-2xl rounded-full -z-10 scale-75"></div>
            </motion.div>

            {/* Stats Section */}
            <motion.div 
              ref={statsRef} 
              className="text-center md:text-left"
            >
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-xl md:text-2xl font-light tracking-wide text-white mb-2"
              >
                Join our <span className="text-teal-400 italic">podcast</span> community
              </motion.h1>

              {/* Decorative line */}
              <motion.div
                className="w-12 h-px bg-teal-500/40 mx-auto md:mx-0 my-4"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={statsInView ? { scaleX: 1, opacity: 0.7 } : {}}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={statsInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mb-1"
              >
                <span className="text-3xl md:text-4xl font-light text-white">
                  {statsInView && <CountUp start={0} end={7563} duration={2} delay={0.2} suffix="+" />}
                </span>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={statsInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="text-xs md:text-sm text-slate-400 font-light"
              >
                Messages and Sermons
              </motion.p>
            </motion.div>
          </div>

          {/* Right side - Platforms */}
          <motion.div 
            ref={platformsRef} 
            className="w-full md:w-1/2"
          >
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={platformsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-base md:text-lg font-light text-white/80 mb-6 text-center md:text-left"
            >
              Listen on:
            </motion.h2>

            <motion.div
              className="grid grid-cols-2 gap-4 md:gap-6"
              initial={{ opacity: 0, y: 15 }}
              animate={platformsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {platforms.map((platform, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={platformsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  {/* Platform icon */}
                  <motion.div
                    className="relative flex items-center justify-center bg-slate-800/50 rounded-lg p-2 w-10 h-10"
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(20, 184, 166, 0.1)" }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.img
                      src={platform.icon || "/placeholder.svg"}
                      alt={platform.name}
                      className="w-6 h-6 object-contain"
                    />
                    
                    {/* Subtle indicator dot */}
                    <motion.div
                      className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-teal-500/70"
                      animate={{
                        opacity: [0.4, 0.7, 0.4],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.5,
                      }}
                    />
                  </motion.div>

                  <span className="text-sm text-slate-300">{platform.name}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default Podcast
