import React, { useState } from 'react';
import { X } from 'lucide-react';
import { motion } from 'framer-motion'; 

// Import motion for animations
const image1= '/assets/img/pjw1.jpg';
const image2= '/assets/img/pjwm3.jpg';
const image3= '/assets/img/pjwd2.jpg';
const image4= '/assets/img/pjwd4.jpg';
const image5= '/assets/img/pjwd3.jpg';
const image6= '/assets/img/pjwm4.jpg';

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    { src: image1, alt: 'Gallery Image 1' },
    { src: image2, alt: 'Gallery Image 2' },
    { src: image3, alt: 'Gallery Image 3' },
    { src: image4, alt: 'Gallery Image 4' },
    { src: image5, alt: 'Gallery Image 5' },
    { src: image6, alt: 'Gallery Image 6' },
  ];

  return (
    <div className="min-h-screen w-full mb-24">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative inline-block text-center"
      >
        <motion.div
          className="absolute -inset-1 rounded-lg bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 opacity-75 blur-lg"
          animate={{
            opacity: [0.5, 0.8, 0.5],
            rotate: [0, 5, 0],
            scale: [0.98, 1.01, 0.98],
          }}
          transition={{
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "mirror",
          }}
        />
        <h1 className="item-center relative text-4xl sm:text-5xl lg:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-200 to-purple-200 py-2 px-4">
          Photo Gallery
        </h1>
      </motion.div>

      {/* Gallery Grid */}
      <div className="container mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative group cursor-pointer"
              onClick={() => setSelectedImage(image)}
            >
              <div className="relative h-64 w-full overflow-hidden rounded-lg">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <span className="text-white text-lg font-semibold">View</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-6xl w-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 focus:outline-none"
            >
              <X size={36} />
            </button>
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="w-full h-auto max-h-[90vh] object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
