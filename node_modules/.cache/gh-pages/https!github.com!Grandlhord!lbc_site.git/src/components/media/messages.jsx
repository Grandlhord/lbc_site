"use client"
import { useState } from "react"
import { Youtube, Video, Play, X, Loader2 } from "lucide-react"

const VideoPlatforms = () => {
  const [activeModal, setActiveModal] = useState(null)

  const openModal = (platform) => setActiveModal(platform)
  const closeModal = () => setActiveModal(null)

  // Modal component with improved design and animations
  const VideoModal = ({ platform, src, title }) => {
    if (!activeModal) return null

    return (
      <div
        className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn"
        onClick={closeModal}
      >
        <div
          className={`relative w-full ${
            platform === "youtube" ? "max-w-5xl aspect-video" : "max-w-md aspect-[9/16]"
          } animate-scaleIn shadow-2xl rounded-xl overflow-hidden`}
          onClick={(e) => e.stopPropagation()}
        >
          <iframe
            src={`${src}?autoplay=1`}
            className="absolute top-0 left-0 w-full h-full"
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <button
            onClick={closeModal}
            className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors p-2 rounded-full bg-black/50 hover:bg-black/70"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>
      </div>
    )
  }

  // Enhanced platform card with better design and loading states
  const PlatformCard = ({ icon: Icon, color, title, description, platform, src }) => {
    const [isVideoLoaded, setIsVideoLoaded] = useState(false)
    const [isHovered, setIsHovered] = useState(false)

    const colorClasses = {
      red: {
        bg: "bg-red-500",
        text: "text-red-500",
        hover: "group-hover:text-red-400",
        shadow: "shadow-red-500/20",
        hoverShadow: "group-hover:shadow-red-500/40",
        border: "border-red-500/20",
        gradient: "from-red-600 to-red-500",
      },
      pink: {
        bg: "bg-pink-500",
        text: "text-pink-500",
        hover: "group-hover:text-pink-400",
        shadow: "shadow-pink-500/20",
        hoverShadow: "group-hover:shadow-pink-500/40",
        border: "border-pink-500/20",
        gradient: "from-pink-600 to-pink-500",
      },
    }

    const colorClass = colorClasses[color]

    return (
      <div
        className={`bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-xl w-full max-w-sm overflow-hidden 
          shadow-lg hover:shadow-xl transform transition-all duration-500 hover:scale-[1.02] 
          relative group border border-gray-800 ${colorClass.shadow} ${colorClass.hoverShadow}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative">
          {/* Video Preview */}
          <div className="aspect-video overflow-hidden relative">
            <iframe
              src={`${src}?controls=0&showinfo=0&rel=0&modestbranding=1&mute=1`}
              className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
                isVideoLoaded ? "opacity-100" : "opacity-0"
              }`}
              title={`${title} Preview`}
              onLoad={() => setIsVideoLoaded(true)}
              allow="accelerometer; encrypted-media;"
            ></iframe>

            {/* Enhanced Loading State */}
            {!isVideoLoaded && (
              <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-black/60 flex flex-col items-center justify-center">
                <Loader2 className={`w-10 h-10 ${colorClass.text} animate-spin mb-2`} />
                <div className="text-sm text-white/80">Loading preview...</div>
              </div>
            )}

            {/* Play Overlay with Animation */}
            <div
              className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent 
                flex items-center justify-center cursor-pointer transition-all duration-300
                ${isHovered ? "opacity-100" : "opacity-90"}`}
              onClick={() => openModal(platform)}
            >
              <div
                className={`w-16 h-16 rounded-full bg-${color}-500/20 flex items-center justify-center
                transform transition-transform duration-300 ${isHovered ? "scale-110" : "scale-100"}`}
              >
                <Play
                  className={`text-white w-8 h-8 drop-shadow-lg ${isHovered ? "animate-pulse" : ""}`}
                  fill="white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          <div className="flex items-center mb-4">
            <div className={`w-10 h-10 rounded-full ${colorClass.bg}/10 flex items-center justify-center mr-3`}>
              <Icon className={`${colorClass.text} w-5 h-5`} />
            </div>
            <h3 className={`text-xl font-bold text-white ${colorClass.hover} transition-colors duration-300`}>
              {title}
            </h3>
          </div>

          <p className="text-gray-400 text-sm mb-5 line-clamp-3">{description}</p>

          <button
            onClick={() => openModal(platform)}
            className={`w-full bg-gradient-to-r ${colorClass.gradient} hover:brightness-110 text-white 
              font-medium py-2.5 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2
              shadow-md ${colorClass.shadow} hover:shadow-lg ${colorClass.hoverShadow}`}
          >
            <Play size={16} />
            Watch Now
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="py-16 bg-black text-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-500 rounded-full filter blur-[100px]"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-pink-500 rounded-full filter blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-b from-white via-white/80 to-white/50 bg-clip-text text-transparent mb-4">
            Enjoy Our Videos
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-pink-500 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Experience our sermons, teachings, and inspirational content across different platforms
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <PlatformCard
            icon={Youtube}
            color="red"
            title="YouTube Videos"
            description="Explore our full-length sermons, teachings, and church events on YouTube. Dive deeper into God's word through our comprehensive video content."
            platform="youtube"
            src="https://www.youtube.com/embed/qAL4h2SgtPo"
          />

          <PlatformCard
            icon={Video}
            color="pink"
            title="TikTok Videos"
            description="Quick insights, short teachings, and inspiring moments on TikTok. Perfect for spiritual encouragement throughout your day."
            platform="tiktok"
            src="https://www.tiktok.com/embed/7467645060943727877"
          />
        </div>

        <VideoModal
          platform={activeModal}
          src={
            activeModal === "youtube"
              ? "https://www.youtube.com/embed/qAL4h2SgtPo"
              : "https://www.tiktok.com/embed/7467645060943727877"
          }
          title={activeModal === "youtube" ? "YouTube Video" : "TikTok Video"}
        />
      </div>
    </div>
  )
}

export default VideoPlatforms

