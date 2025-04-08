import React, { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
const  image1 = '/assets/img/pjw1.jpg';
const  image2 = '/assets/img/pjwm3.jpg';
const  image3 = '/assets/img/pjwd2.jpg';
const  image4 = '/assets/img/pjwd4.jpg';

const galleryImages = [
  image1,
  image2,
  image3,
  image4,
];

const MediaGallery = () => {
  const [open, setOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const openLightbox = (index) => {
    setCurrentImage(index);
    setOpen(true);
  };

  return (
    <div className="py-16 bg-black text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Our Gallery</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((image, index) => (
            <div 
              key={index} 
              className="overflow-hidden rounded-lg cursor-pointer transform transition-all hover:scale-105"
              onClick={() => openLightbox(index)}
            >
              <img 
                src={image} 
                alt={`Gallery image ${index + 1}`} 
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        <Lightbox
          open={open}
          close={() => setOpen(false)}
          slides={galleryImages.map(img => ({ src: img }))}
          index={currentImage}
        />
      </div>
    </div>
  );
};

export default MediaGallery;