"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronDown } from "lucide-react"

export default function Partner() {
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("")
  const categoryRef = useRef(null)

  const partnershipCategories = ["Silver Partner", "Gold Partner", "Platinum Partner", "Diamond Partner"]

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setCategoryDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-4xl bg-black/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl border border-gray-800">
        <div className="flex flex-col md:flex-row">
          {/* Information Section */}
          <div className="bg-gradient-to-br from-purple-900/40 to-black p-8 md:w-2/5 flex flex-col justify-center">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">Become a partner today</h1>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              Join Lovereign Covenant Partnership and become part of a family touching lives around the globe.
            </p>
            <div className="mt-8 hidden md:block">
              <div className="h-1 w-16 bg-purple-500 rounded-full mb-6"></div>
              <div className="space-y-4">
                {["Global impact initiatives", "Exclusive partner events", "Community of like-minded individuals"].map(
                  (benefit, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                      <span className="text-gray-300 text-sm">{benefit}</span>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="p-8 md:w-3/5">
            <form className="space-y-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-1">
                  Full Name
                </label>
                <input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full px-4 py-2.5 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white transition-all duration-200"
                />
              </div>

              <div>
                <label htmlFor="telephone" className="block text-sm font-medium text-gray-300 mb-1">
                  Telephone
                </label>
                <input
                  id="telephone"
                  type="tel"
                  placeholder="Enter your phone number"
                  className="w-full px-4 py-2.5 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white transition-all duration-200"
                />
              </div>

              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-300 mb-1">
                  Country
                </label>
                <input
                  id="country"
                  type="text"
                  placeholder="Enter your country"
                  className="w-full px-4 py-2.5 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white transition-all duration-200"
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-1">
                  Partnership Category
                </label>
                <div className="relative" ref={categoryRef}>
                  <button
                    type="button"
                    onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                    className="w-full flex items-center justify-between px-4 py-1 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white transition-all duration-200"
                  >
                    <span className={selectedCategory ? "text-white" : "text-gray-400"}>
                      {selectedCategory || "Select partnership category"}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${categoryDropdownOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {categoryDropdownOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-lg overflow-hidden">
                      <ul className="py-1 max-h-60 overflow-auto">
                        {partnershipCategories.map((category) => (
                          <li key={category}>
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedCategory(category)
                                setCategoryDropdownOpen(false)
                              }}
                              className="w-full text-left px-4 py-1 text-sm text-white hover:bg-purple-700/30 transition-colors duration-150"
                            >
                              {category}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-1 px-2 bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white font-medium rounded-lg shadow-lg transition-all duration-200 transform hover:translate-y-[-2px]"
              >
                BECOME A PARTNER
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

