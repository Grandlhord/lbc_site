"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"

const bookImage1 = '/assets/img/giftsandcallings.jpg'
const bookImage2 = '/assets/img/systems_structures.jpg'
const bookImage3 = '/assets/img/work_of_ministry.jpg'

export default function Books() {
  const [books, setBooks] = useState([]) // State to store book data
  const navigate = useNavigate() // Hook for programmatic navigation

  // Simulate API call with book information
  useEffect(() => {
    const fetchBooks = async () => {
      const placeholderBooks = [
        {
          id: 1,
          title: "Born Again",
          image: bookImage1,
          description:
            "An insightful exploration of spiritual rebirth and the transformative journey of faith. This book delves into the profound meaning of being 'born again' and how it changes one's perspective on life.",
          price: "$15.99",
          pages: 220,
          year: 2018,
          availableAt: ["Amazon", "Church Bookstore", "Christian Bookshops"],
          formats: ["Hardcover", "Paperback", "E-Book"],
        },
        {
          id: 2,
          title: "Gifts of the Spirit",
          image: bookImage2,
          description:
            "Discover the divine gifts bestowed upon believers and how to recognize and nurture them in your spiritual journey. Pastor John Winfred provides practical guidance on developing your spiritual gifts.",
          price: "$18.99",
          pages: 280,
          year: 2020,
          availableAt: ["Amazon", "Church Bookstore", "Christian Bookshops"],
          formats: ["Hardcover", "Paperback", "E-Book", "Audiobook"],
        },
        {
          id: 3,
          title: "Work of Ministry",
          image: bookImage3,
          description:
            "A comprehensive guide to understanding the various aspects of ministry work and how to effectively serve in your calling. This book offers wisdom for both new and experienced ministers.",
          price: "$19.99",
          pages: 310,
          year: 2022,
          availableAt: ["Amazon", "Church Bookstore", "Christian Bookshops"],
          formats: ["Hardcover", "Paperback", "E-Book"],
        },
      ]
      setBooks(placeholderBooks)
    }
    fetchBooks()
  }, [])

  // Function to handle navigation to book details
  // Changed to use /books?id= to match the other component
  const handleBookDetails = (bookId) => {
    navigate(`/books?id=${bookId}`)
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <div className="bg-gradient-to-b from-[#295264] to-[#152745] min-h-screen flex flex-col items-center px-4 md:px-8 py-16 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-10 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-10 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('/placeholder.svg?height=10&width=10')] bg-repeat opacity-5"></div>
      </div>

      {/* Title Section */}
      <motion.div
        className="w-full max-w-6xl text-center md:text-left mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center justify-center md:justify-start mb-4">
          <div className="h-1 w-16 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mr-4"></div>
          <span className="text-blue-300 uppercase tracking-wider text-sm font-medium">Published Works</span>
        </div>

        <h1 className="text-white text-[2.5rem] sm:text-[3rem] md:text-[4.5rem] leading-tight font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white">
          Books By <br className="hidden md:block" /> Pastor John Winfred
        </h1>

        <p className="text-blue-100/80 mt-6 max-w-2xl mx-auto md:mx-0 text-lg">
          Explore spiritual wisdom and guidance through these transformative books that have touched thousands of lives
          around the world.
        </p>
      </motion.div>

      {/* Books List */}
      <motion.div className="w-full max-w-6xl" variants={containerVariants} initial="hidden" animate="visible">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {books.map((book, index) => (
            <motion.div
              key={book.id || index}
              className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden border border-white/20 flex flex-col h-full"
              variants={itemVariants}
            >
              <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
                <img src={book.image || "/placeholder.svg"} alt={book.title} className="w-full h-full object-cover" />
                <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                  <h3 className="text-white text-xl font-bold">{book.title}</h3>
                  <p className="text-blue-200 text-sm mt-1">
                    {book.year} • {book.pages} pages
                  </p>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col">
                <p className="text-blue-100/90 text-sm mb-4 line-clamp-3">{book.description}</p>

                <div className="grid grid-cols-2 gap-3 mb-4 mt-auto">
                  <div>
                    <h4 className="text-blue-300 text-xs font-medium mb-1">Price</h4>
                    <p className="text-white text-sm">{book.price}</p>
                  </div>
                  <div>
                    <h4 className="text-blue-300 text-xs font-medium mb-1">Formats</h4>
                    <p className="text-white text-sm">{book.formats[0]}, ...</p>
                  </div>
                </div>

                <button
                  onClick={() => handleBookDetails(book.id)}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm transition-colors w-full"
                >
                  <ExternalLink size={14} />
                  <span>More Details</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

    </div>
  )
}