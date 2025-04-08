"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"
import { ShoppingCart, Download, ExternalLink, Info } from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom"

const bookImage1 = '/assets/img/born_again.svg'
const bookImage2 = '/assets/img/gifts.svg'
const bookImage3 = '/assets/img/workofministry.svg'

export default function BooksByFounder() {
  const [books, setBooks] = useState([]) 
  const [activeBook, setActiveBook] = useState(null)
  const scrollRef = useRef(null)
  const location = useLocation()
  const navigate = useNavigate()

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
      
      // Check if there's a book ID in the URL
      const params = new URLSearchParams(location.search)
      const bookId = params.get('id')
      
      if (bookId) {
        // Find the book with the matching ID
        const selectedBook = placeholderBooks.find(book => book.id === parseInt(bookId))
        if (selectedBook) {
          setActiveBook(selectedBook)
          // Scroll to the active book in the carousel
          setTimeout(() => {
            const bookElement = document.getElementById(`book-${selectedBook.id}`)
            if (bookElement && scrollRef.current) {
              const scrollLeft = bookElement.offsetLeft - scrollRef.current.offsetLeft
              scrollRef.current.scrollTo({ left: scrollLeft, behavior: 'smooth' })
            }
          }, 300)
        } else {
          // Default to the first book if ID not found
          setActiveBook(placeholderBooks[0])
        }
      } else {
        // Default to the first book if no ID is provided
        setActiveBook(placeholderBooks[0])
      }
    }
    fetchBooks()
  }, [location])

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -200 : 200,
        behavior: "smooth",
      })
    }
  }

  // Update URL when active book changes
  useEffect(() => {
    if (activeBook) {
      navigate(`/books?id=${activeBook.id}`, { replace: true })
    }
  }, [activeBook, navigate])

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

  const detailsVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <div className="bg-gradient-to-b from-[#295264] to-[#152745] min-h-screen flex flex-col items-center justify-center px-3 md:px-6 py-24 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-10 w-40 h-40 rounded-full bg-blue-500/10 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-10 w-48 h-48 rounded-full bg-purple-500/10 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('/placeholder.svg?height=10&width=10')] bg-repeat opacity-5"></div>
      </div>

      {/* Title Section */}
      <motion.div
        className="w-full max-w-5xl text-center md:text-left mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center justify-center md:justify-start mb-3">
          <div className="h-0.5 w-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mr-3"></div>
          <span className="text-blue-300 uppercase tracking-wider text-xs font-medium">Published Works</span>
        </div>

        <h1 className="text-white text-xl sm:text-2xl md:text-3xl leading-tight font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white">
          Books By <br className="hidden md:block" /> Pastor John Winfred
        </h1>

        <p className="text-blue-100/80 mt-4 max-w-xl mx-auto md:mx-0 text-sm">
          Explore spiritual wisdom and guidance through these transformative books that have touched thousands of lives
          around the world.
        </p>

        <div className="flex justify-center md:justify-start gap-2 mt-5">
          <button
            onClick={() => scroll("left")}
            className="w-8 h-8 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-full shadow-md hover:bg-white/20 transition border border-white/20"
            aria-label="Scroll left"
          >
            <FaArrowLeft className="text-white text-xs" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-8 h-8 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-full shadow-md hover:bg-white/20 transition border border-white/20"
            aria-label="Scroll right"
          >
            <FaArrowRight className="text-white text-xs" />
          </button>
        </div>
      </motion.div>

      {/* Books Carousel */}
      <div className="relative overflow-hidden w-full max-w-5xl">
        <motion.div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide p-3 flex-nowrap pb-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {books.map((book, index) => (
            <motion.div
              id={`book-${book.id}`}
              key={book.id || index}
              className={`min-w-[12rem] sm:min-w-[14rem] md:min-w-[16rem] flex flex-col ${activeBook?.id === book.id ? "ring-1 ring-blue-400 ring-offset-2 ring-offset-[#152745]" : ""}`}
              variants={itemVariants}
              whileHover={{
                scale: 1.03,
                transition: { duration: 0.3 },
              }}
              onClick={() => setActiveBook(book)}
            >
              <div className="relative group overflow-hidden rounded-lg">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 z-10 group-hover:opacity-80 transition-opacity duration-300"></div>

                <img
                  src={book.image || "/placeholder.svg"}
                  alt={book.title}
                  className="w-full h-[16rem] object-cover rounded-lg shadow-lg transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute bottom-0 left-0 right-0 p-3 z-20">
                  <h3 className="text-white text-base font-bold">{book.title}</h3>
                  <p className="text-blue-200 text-xs mt-0.5">
                    {book.year} • {book.pages} pages
                  </p>

                  <div className="mt-2 flex gap-1.5">
                    <span className="px-1.5 py-0.5 bg-white/20 backdrop-blur-sm rounded-full text-[10px] text-white">
                      {book.price}
                    </span>
                    <span className="px-1.5 py-0.5 bg-white/20 backdrop-blur-sm rounded-full text-[10px] text-white">
                      {book.formats[0]}
                    </span>
                  </div>
                </div>

                <button
                  className="absolute top-3 right-3 z-20 w-6 h-6 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white/40"
                  onClick={(e) => {
                    e.stopPropagation()
                    setActiveBook(book)
                  }}
                >
                  <Info size={12} className="text-white" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Book Details Section */}
      <AnimatePresence mode="wait">
        {activeBook && (
          <motion.div
            className="w-full max-w-5xl mt-8 bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-white/20"
            key={activeBook.id}
            variants={detailsVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-lg md:text-xl font-bold text-white mb-3">{activeBook.title}</h2>
                <p className="text-blue-100/90 text-sm mb-4">{activeBook.description}</p>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div>
                    <h4 className="text-blue-300 text-xs font-medium mb-1">Price</h4>
                    <p className="text-white text-sm font-semibold">{activeBook.price}</p>
                  </div>
                  <div>
                    <h4 className="text-blue-300 text-xs font-medium mb-1">Published</h4>
                    <p className="text-white text-sm">{activeBook.year}</p>
                  </div>
                  <div>
                    <h4 className="text-blue-300 text-xs font-medium mb-1">Pages</h4>
                    <p className="text-white text-sm">{activeBook.pages}</p>
                  </div>
                  <div>
                    <h4 className="text-blue-300 text-xs font-medium mb-1">Formats</h4>
                    <p className="text-white text-sm">{activeBook.formats.join(", ")}</p>
                  </div>
                </div>

                <div className="mb-5">
                  <h4 className="text-blue-300 text-xs font-medium mb-1">Where to Buy</h4>
                  <ul className="text-white text-sm space-y-0.5">
                    {activeBook.availableAt.map((place, i) => (
                      <li key={i} className="flex items-center">
                        <span className="w-1 h-1 bg-blue-400 rounded-full mr-1.5"></span>
                        {place}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2">
                  <a
                    href="#"
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded-full transition-colors"
                  >
                    <ShoppingCart size={12} />
                    <span>Purchase Online</span>
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs rounded-full transition-colors border border-white/20"
                  >
                    <Download size={12} />
                    <span>Sample Chapter</span>
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs rounded-full transition-colors border border-white/20"
                  >
                    <ExternalLink size={12} />
                    <span>More Details</span>
                  </a>
                </div>
              </div>

              <div className="flex justify-center items-center">
                <div className="relative max-w-[180px]">
                  <div className="absolute -inset-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg blur-lg opacity-70"></div>
                  <img
                    src={activeBook.image || "/placeholder.svg"}
                    alt={activeBook.title}
                    className="relative z-10 rounded-lg shadow-xl max-h-[250px] object-cover"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}