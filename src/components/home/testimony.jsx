"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, X, Play, Quote } from "lucide-react"
const  one = '/assets/img/images3.png'
const  two = '/assets/img/2.png'

// Enhanced testimonial data with more details
const testimonials = [
  {
    name: "Gerald Addai",
    title: "Debt Cancellation",
    summary: "Bought a car for myself and my wife.",
    fullStory:
      "After struggling with debt for years, I attended a special service at Lovereign Bible Church. Pastor John prayed for financial breakthrough, and within two months, my debts were miraculously cleared. I was able to purchase a car for myself and my wife, something we never thought possible.",
    date: "March 15, 2023",
    location: "Sunday Service",
    img: one,
    bgGradient: "from-emerald-200 to-emerald-400",
    accentColor: "emerald-500",
  },
  {
    name: "Sarah Mensah",
    title: "Healing Journey",
    summary: "Experienced a miraculous healing.",
    fullStory:
      "I had been diagnosed with a chronic condition that doctors said was incurable. During a healing service at Lovereign, I felt a strange warmth flow through my body as Pastor John prayed. The next week, I went for tests and the doctors were shocked to find no trace of the disease. It's been two years now and I'm still completely healed!",
    date: "January 8, 2023",
    location: "Healing Service",
    img: two,
    bgGradient: "from-sky-200 to-sky-400",
    accentColor: "sky-500",
  },
  {
    name: "Emmanuel Osei",
    title: "Financial Breakthrough",
    summary: "Received unexpected blessings.",
    fullStory:
      "After losing my job during the pandemic, I was struggling to make ends meet. I continued to tithe from my savings, trusting God. During a Wednesday service, Pastor John spoke about supernatural provision. The very next day, I received three job offers, and one of them paid twice my previous salary. God's timing is truly perfect.",
    date: "April 22, 2023",
    location: "Midweek Service",
    img: one,
    bgGradient: "from-purple-200 to-purple-400",
    accentColor: "purple-500",
  },
]

export default function TestimonyCorner() {
  const [testimonyData, setTestimonyData] = useState(testimonials)
  const [selectedTestimony, setSelectedTestimony] = useState(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const scrollRef = useRef(null)

  const fetchTestimonies = async () => {
    try {
      const response = await fetch("https://api.example.com/testimonies")
      const data = await response.json()
      setTestimonyData(data.length ? data : testimonials)
    } catch (error) {
      console.error("Error fetching testimonies:", error)
      setTestimonyData(testimonials)
    }
  }

  useEffect(() => {
    fetchTestimonies()
  }, [])

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth < 768 ? 250 : 300
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonyData.length)
      if (scrollRef.current) {
        const cardWidth = scrollRef.current.querySelector("div").offsetWidth + 16 // width + gap
        scrollRef.current.scrollTo({
          left: cardWidth * ((activeIndex + 1) % testimonyData.length),
          behavior: "smooth",
        })
      }
    }, 5000)
    return () => clearInterval(interval)
  }, [activeIndex, testimonyData.length])

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#7564CC] to-[#B1A4F6] px-4 py-10 md:py-14">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
        <div className="absolute top-[10%] left-[5%] w-64 h-64 rounded-full bg-purple-400 blur-3xl"></div>
        <div className="absolute bottom-[20%] right-[10%] w-80 h-80 rounded-full bg-indigo-400 blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Header Section */}
          <div className="w-full md:w-1/3 text-center md:text-left">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">
                Testimonies
              </h1>
              <p className="text-indigo-200 mb-6 max-w-md mx-auto md:mx-0">
                Real stories of transformation, healing, and divine intervention from our church members.
              </p>

              <div className="flex gap-4 justify-center md:justify-start">
                <motion.button
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.95)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scroll("left")}
                  className="p-3 bg-white/90 rounded-full shadow-lg hover:shadow-xl transition-all"
                >
                  <ChevronLeft className="text-indigo-800" size={20} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.95)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scroll("right")}
                  className="p-3 bg-white/90 rounded-full shadow-lg hover:shadow-xl transition-all"
                >
                  <ChevronRight className="text-indigo-800" size={20} />
                </motion.button>
              </div>

              {/* Indicators */}
              <div className="hidden md:flex mt-6 gap-2">
                {testimonyData.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setActiveIndex(index)
                      if (scrollRef.current) {
                        const cardWidth = scrollRef.current.querySelector("div").offsetWidth + 16
                        scrollRef.current.scrollTo({
                          left: cardWidth * index,
                          behavior: "smooth",
                        })
                      }
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      activeIndex === index ? "w-8 bg-white" : "bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Testimonials Carousel */}
          <div className="w-full md:w-2/3">
            <div ref={scrollRef} className="flex gap-4 overflow-x-auto scrollbar-hide py-4 snap-x snap-mandatory">
              {testimonyData.map((testimony, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`min-w-[80%] sm:min-w-[60%] md:min-w-[45%] lg:min-w-[35%] rounded-2xl shadow-xl bg-gradient-to-br ${testimony.bgGradient} snap-center overflow-hidden h-[280px] md:h-[320px]`}
                >
                  <div className="relative h-full flex flex-col">
                    {/* Quote icon */}
                    <div className="absolute top-4 right-4 opacity-20">
                      <Quote size={40} className={`text-${testimony.accentColor}`} />
                    </div>

                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center mb-4">
                        <div className="relative">
                          <img
                            src={testimony.img || "/placeholder.svg"}
                            className="rounded-full h-14 w-14 object-cover border-2 border-white"
                            alt={testimony.name}
                          />
                          <div
                            className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-${testimony.accentColor} flex items-center justify-center text-white`}
                          >
                            <Quote size={12} />
                          </div>
                        </div>
                        <div className="ml-3">
                          <h3 className="font-medium text-gray-800">{testimony.name}</h3>
                          <p className="text-xs text-gray-600">{testimony.date}</p>
                        </div>
                      </div>

                      <h2 className="font-semibold text-lg text-gray-800 mb-2">{testimony.title}</h2>
                      <p className="text-gray-700 text-sm mb-4 flex-grow">{testimony.summary}</p>

                      <motion.button
                        whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.9)" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedTestimony(testimony)}
                        className="text-xs font-medium text-indigo-700 bg-white/80 rounded-full px-4 py-2 flex items-center gap-1 shadow-md mt-auto"
                      >
                        <Play size={12} /> Read More
                      </motion.button>
                    </div>

                    <div className={`h-2 w-full bg-${testimony.accentColor}`}></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Testimony Detail Modal */}
      <AnimatePresence>
        {selectedTestimony && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedTestimony(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="bg-white rounded-2xl overflow-hidden max-w-2xl w-full max-h-[80vh] shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`bg-gradient-to-r ${selectedTestimony.bgGradient} p-6 relative`}>
                <button
                  onClick={() => setSelectedTestimony(null)}
                  className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 rounded-full p-1.5 text-white transition-colors"
                >
                  <X size={18} />
                </button>

                <div className="flex items-center">
                  <img
                    src={selectedTestimony.img || "/placeholder.svg"}
                    className="rounded-full h-16 w-16 object-cover border-2 border-white"
                    alt={selectedTestimony.name}
                  />
                  <div className="ml-4">
                    <h2 className="text-xl font-semibold text-white">{selectedTestimony.title}</h2>
                    <p className="text-white/80 text-sm">{selectedTestimony.name}</p>
                  </div>
                </div>
              </div>

              <div className="p-6 overflow-y-auto max-h-[50vh]">
                <div className="flex justify-between text-sm text-gray-500 mb-4">
                  <span>{selectedTestimony.date}</span>
                  <span>{selectedTestimony.location}</span>
                </div>

                <p className="text-gray-700 leading-relaxed mb-6">{selectedTestimony.fullStory}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

