"use client"

import { motion, useInView, AnimatePresence } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import { Search, MapPin } from 'lucide-react'

// Import images
const CEDelademAmekudzi = '/assets/img/church_leaders/CEDelademAmekudzi.jpg';
const CEElderEssienNana = '/assets/img/church_leaders/CEELderEssienNana.jpg';
const CEElderProsperAsamoah = '/assets/img/church_leaders/CEELderProsperAsamoah.jpg';
const CEFredAgyemang = '/assets/img/church_leaders/CEFredAgyemang.jpg';
const CEPeterHaginWealth = '/assets/img/church_leaders/CEPeterHagin-Wealth.jpg';
const ChiefElderCharlesFiadjoe = '/assets/img/church_leaders/ChiefElderCharlesFiadjoe.jpg';
const FrankTettehJunior = '/assets/img/church_leaders/FrankTettehJunior.jpg';
const LadyPastorAlexaHaginWealth = '/assets/img/church_leaders/LadyPastorAlexaHagin-Wealth.jpg';
const LadyPastorAliceOhenebaAsare = '/assets/img/church_leaders/LadyPastorAliceOhenebaAsare.png';
const PastorAbrahamTetteh = '/assets/img/church_leaders/PastorAbrahamTetteh.jpg';
const PastorAlbertOseiAwuah = '/assets/img/church_leaders/PastorAlbertOsei-Awuah.png';
const PastorCharles = '/assets/img/church_leaders/PastorCharles.jpg';
const PastorEmmanuelFiifiRobert = '/assets/img/church_leaders/PastorEmmanuelFiifiRobert.jpg';
const PastorEmmanuelYartey = '/assets/img/church_leaders/PastorEmmanuelYartey.jpg';
const PastorMichaelOduro = '/assets/img/church_leaders/PastorMichaelOduro.jpg';
const PastorBenjaminQuayson = '/assets/img/church_leaders/pastorBenjaminQuayson.jpg';
const PastorMosesFrimpong = '/assets/img/church_leaders/PastorMosesFrimpong.jpg';
const PastorVitalis = '/assets/img/church_leaders/PastorVitalis.jpg';
const ProphetEric = '/assets/img/church_leaders/ProphetEric.png';
const ProphetEvans = '/assets/img/church_leaders/ProphetEvans.jpg';
const ProphetSampson = '/assets/img/church_leaders/prophetSampson.png';
const CEHerbertTogbey = '/assets/img/church_leaders/CEHerbertTogbey.jpg';
const ShepherdKingsleyTetteh = '/assets/img/church_leaders/PastorKingsleyTetteh.jpg';
const PastorAlbertBoakye = '/assets/img/church_leaders/PastorAlbertBoakye.png';
const PastorEbenezerKotey = '/assets/img/church_leaders/PastorEbenezerKotey.png';
const CETerrickNaador = '/assets/img/church_leaders/CETerrick.jpg';
const noPicture = '/assets/img/church_leaders/noPic.png';


export default function ChurchLeadership() {
  const [branches, setBranches] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [imagesLoaded, setImagesLoaded] = useState({})
  const containerRef = useRef(null)
  const headerRef = useRef(null)
  const isInView = useInView(containerRef, { triggerOnce: true })
  const isHeaderInView = useInView(headerRef, { triggerOnce: true })

  // Modified categories as requested
  const categories = ["All", "Headquarters", "Church Planters"]

  // Modified data array - all are pastors now
  const placeHolderBranches = [
    { name: "Pastor", pastor: "Sampson Agborson", location: "Headquarters", image: ProphetSampson },
    { name: "Pastor", pastor: "Eric Sappor", location: "Headquarters", image: ProphetEric },
    { name: "Pastor", pastor: "Albert Boakye", location: "Headquarters", image: PastorAlbertBoakye },
    { name: "Pastor", pastor: "Alexa Hagin-Wealth", location: "Headquarters", image: LadyPastorAlexaHaginWealth },
    { name: "Pastor", pastor: "Alice Oheneba Asare", location: "Headquarters", image: LadyPastorAliceOhenebaAsare },
    { name: "Pastor", pastor: "Evans Oheneba Asare", location: "Headquarters", image: ProphetEvans },
    { name: "Pastor", pastor: "Albert Osei Awuah", location: "Headquarters", image: PastorAlbertOseiAwuah },
    { name: "Pastor", pastor: "Ebenezer Kotey", location: "Headquarters", image: PastorEbenezerKotey },
    { name: "Pastor", pastor: "Emmanuel Fiifi Robertson", location: "Ho", image: PastorEmmanuelFiifiRobert },
    { name: "Pastor", pastor: "Emmanuel Yartey", location: "Abeka", image: PastorEmmanuelYartey },
    { name: "Pastor", pastor: "Moses Frimpong", location: "Sowutuom", image: PastorMosesFrimpong },
    { name: "Pastor", pastor: "Michael Oduro", location: "Accra", image: PastorMichaelOduro },
    { name: "Pastor", pastor: "Charles Fiadjoe", location: "Koforidua", image: ChiefElderCharlesFiadjoe },
    { name: "Pastor", pastor: "Prosper Asamoah", location: "Pantang", image: CEElderProsperAsamoah },
    { name: "Pastor", pastor: "Herbert", location: "Tantra", image: CEHerbertTogbey },
    { name: "Pastor", pastor: "Michael Agbadji", location: "Bole", image: noPicture },
    { name: "Pastor", pastor: "Terrick Naador", location: "East Legon", image: CETerrickNaador },
    { name: "Pastor", pastor: "Abraham Tetteh", location: "Kumasi", image: PastorAbrahamTetteh },
    { name: "Pastor", pastor: "Essien Nana", location: "Cape Coast", image: CEElderEssienNana },
    { name: "Pastor", pastor: "Vitalis Kanyerigbani", location: "Winneba", image: PastorVitalis },
    { name: "Pastor", pastor: "Peter Hagin Wealth", location: "UPSA", image: CEPeterHaginWealth },
    { name: "Pastor", pastor: "Frederick Agyemang", location: "North Legon", image: CEFredAgyemang },
    { name: "Pastor", pastor: "Charles", location: "Korle-Bu", image: PastorCharles },
    { name: "Chief Elder", pastor: "Deladem Amekudzi", location: "Headquarters", image: CEDelademAmekudzi },
    { name: "Pastor", pastor: "Benjamin Quayson", location: "Tema", image: PastorBenjaminQuayson },
    { name: "Pastor", pastor: "Kingsley", location: "Abelenkpe", image: ShepherdKingsleyTetteh },
    { name: "Pastor", pastor: "Frank Tetteh", location: "Sunyani", image: FrankTettehJunior },
  ]

  // Track image loading
  const handleImageLoad = (index) => {
    setImagesLoaded(prev => ({
      ...prev,
      [index]: true
    }))
  }

  // Fetch branch data
  useEffect(() => {
    setBranches(placeHolderBranches)
  }, [])

  // Filter branches based on search term and category
  const filteredBranches = branches.filter((branch) => {
    const matchesSearch =
      branch.pastor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      branch.location.toLowerCase().includes(searchTerm.toLowerCase())

    // Modified filter logic for the new categories
    let matchesCategory = selectedCategory === "All"
    
    if (selectedCategory === "Headquarters") {
      matchesCategory = branch.location === "Headquarters"
    } else if (selectedCategory === "Church Planters") {
      matchesCategory = branch.location !== "Headquarters"
    }

    return matchesSearch && matchesCategory
  })

  // Simplified animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
  }

  // Generate a random color for each pastor's glow
  const getGlowColor = (index) => {
    const colors = [
      'from-blue-500/30 to-indigo-500/30',
      'from-purple-500/30 to-pink-500/30',
      'from-amber-500/30 to-orange-500/30',
      'from-emerald-500/30 to-teal-500/30',
      'from-sky-500/30 to-cyan-500/30',
      'from-violet-500/30 to-fuchsia-500/30',
    ]
    return colors[index % colors.length]
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 text-white">

      <div ref={headerRef} className="max-w-5xl mx-auto text-center mb-10">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-bold text-white mb-4"
        >
          Church Pastors
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={isHeaderInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-base text-gray-300 max-w-2xl mx-auto mb-8"
        >
          Serving with dedication across over 20 branches throughout the country
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8"
          initial={{ opacity: 0 }}
          animate={isHeaderInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search by name or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
            />
          </div>

          <div className="flex gap-2 flex-wrap justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        ref={containerRef}
        className="max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <AnimatePresence>
          {filteredBranches.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
              {filteredBranches.map((branch, index) => (
                <motion.div
                  key={`${branch.pastor}-${index}`}
                  variants={cardVariants}
                  className="flex flex-col items-center text-center group"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="relative mb-3">
                    {/* Glowing oval background with angled curve */}
                    <div className={`absolute -inset-1 rounded-full bg-gradient-to-br ${getGlowColor(index)} blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-300 transform -rotate-12`}></div>
                    
                    {/* Inner oval with angled curve */}
                    <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-gray-800/80 to-gray-900/80 transform -rotate-12"></div>
                    
                    {/* Image container */}
                    <div className="relative w-28 h-28 sm:w-32 sm:h-32 overflow-hidden rounded-full border-2 border-gray-700 group-hover:border-gray-500 transition-colors">
                      {!imagesLoaded[index] && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                          <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      )}
                      <img
                        src={branch.image || noPicture}
                        alt={branch.pastor}
                        className="w-full h-full object-cover"
                        loading={index < 10 ? "eager" : "lazy"}
                        onLoad={() => handleImageLoad(index)}
                        style={{ opacity: imagesLoaded[index] ? 1 : 0 }}
                      />
                    </div>
                  </div>
                  
                  {/* Location badge */}
                  <div className="flex items-center justify-center space-x-1 text-xs bg-gray-800/80 text-blue-300 px-2 py-0.5 rounded-full mb-2 backdrop-blur-sm">
                    <MapPin size={10} />
                    <span>{branch.location}</span>
                  </div>
                  
                  {/* Name and title */}
                  <h3 className="text-sm font-medium text-white mb-0.5 line-clamp-2">
                    {branch.pastor}
                  </h3>
                  <p className="text-gray-400 text-xs">{branch.name}</p>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-10"
            >
              <p className="text-base text-gray-400">No leaders found matching your search criteria.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Stats Section - Simplified */}
      <motion.div
  className="mt-16 max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center"
  initial={{ opacity: 0 }}
  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
  transition={{ duration: 0.5, delay: 0.5 }}
>
  <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-3 border border-gray-700">
    <h3 className="text-3xl font-bold text-blue-400">27+</h3> {/* Increased size */}
    <p className="mt-1 text-xs text-gray-300">Church Pastors</p>
  </div>
  <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-3 border border-gray-700">
    <h3 className="text-3xl font-bold text-purple-400">20+</h3> {/* Increased size */}
    <p className="mt-1 text-xs text-gray-300">Branches</p>
  </div>
  <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-3 border border-gray-700">
    <h3 className="text-3xl font-bold text-indigo-400">15+</h3> {/* Increased size */}
    <p className="mt-1 text-xs text-gray-300">Cities</p>
  </div>
  <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-3 border border-gray-700">
    <h3 className="text-3xl font-bold text-sky-400">1000+</h3> {/* Increased size */}
    <p className="mt-1 text-xs text-gray-300">Members</p>
  </div>
</motion.div>

    </div>
  )
}
