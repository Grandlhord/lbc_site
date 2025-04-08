import React, { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/bundle';
const ellipse = '/public/assets/img/half-bg.png' 
const red_potizo = '/public/assets/img/flyers/red_potizo.png'

const Events = () => {
  const [inView, setInView] = useState(false);
  const eventsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting), 
      { threshold: 0.1 }
    );
    if (eventsRef.current) observer.observe(eventsRef.current);
    return () => eventsRef.current && observer.unobserve(eventsRef.current);
  }, []);

  const [events, setEvents] = useState([
    {
      image: red_potizo, 
      title: "Valentines Service",
      date: "14th Feb, 2024",
      time: "6:00PM GMT",
      description: "Encounter with Rev. Dr. Kwadwo Boateng Bempah on Flourishing in Hard Times.",
      phone: "0242371411",
    },
    {
      image: red_potizo,
      title: "Easter Sunday",
      date: "9th Apr, 2024",
      time: "10:00AM GMT",
      description: "Celebrate resurrection and embrace God's grace.",
      phone: "0242371422",
    },
    {
      image: red_potizo,
      title: "Annual Conference",
      date: "20th May, 2024",
      time: "8:00AM GMT",
      description: "Grow in faith with special speakers and sessions.",
      phone: "0242371433",
    },
  ]);

  return (
    <div ref={eventsRef} className="relative text-white font-instrument z-40 -mt-8">
      <div className="absolute bottom-0 left-0 right-0 -z-20 -mt-[30rem]">
        <img src={ellipse} alt="Ellipse Background" className="w-full object-cover" />
      </div>

      <h1 className="text-4xl md:text-5xl font-extrabold text-center pt-8 bg-gradient-to-t from-white via-white/50 to-transparent bg-clip-text text-transparent">
        Announcements
      </h1>

      <Swiper
        slidesPerView={1}
        slidesPerGroup={1}
        navigation={false}
        modules={[Navigation]}
        grabCursor={true}
        className="mt-8 px-4 md:px-8 lg:px-12"
        breakpoints={{
          640: { slidesPerView: 1, slidesPerGroup: 1, spaceBetween: 10 },
          768: { slidesPerView: 1, slidesPerGroup: 1, spaceBetween: 10 },
          1024: { slidesPerView: 2, slidesPerGroup: 2, spaceBetween: 20 },
        }}
      >
        {events.map((event, index) => (
          <SwiperSlide key={index}>
            <div className="wrapper p-4 bg-transparent rounded-xl shadow-lg mx-auto max-w-[500px] text-center">
              {/* Event Image */}
              <img
                src={event.image}
                alt="Event"
                className={`w-full sm:w-3/4 md:w-2/3 lg:w-3/4 rounded-xl object-cover mx-auto 
                  ${inView ? 'animate-slide-bottom' : ''}`}
              />
              {/* Event Title */}
              <h1 className="text-xl mt-6 font-semibold">{event.title}</h1>
              {/* Event Date and Time */}
              <div className="flex justify-center gap-4 mt-4">
                <p className="text-sm">
                  <span className="text-gray-400 mr-1">Date:</span>
                  {event.date}
                </p>
                <p className="text-sm">
                  <span className="text-gray-400 mr-1">Time:</span>
                  {event.time}
                </p>
              </div>
              {/* Event Description */}
              <p className="text-xs text-gray-300 text-center mt-3 px-4">
                {event.description}
                <span className="mt-1 block text-purple-300">{event.phone}</span>
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Events;
