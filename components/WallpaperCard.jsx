'use client' // Add this at the very top
import { AdvancedImage } from '@cloudinary/react'
import { Cloudinary } from '@cloudinary/url-gen'
import { useState } from 'react'

// Initialize outside component
const cld = new Cloudinary({ 
  cloud: { 
    cloudName: 'dzx2uira0' // Your cloud name
  } 
})

export default function WallpaperCard({ wallpaper }) {
  const [isHovered, setIsHovered] = useState(false)
  
  // Safe image generation
  const displayImg = wallpaper?.publicId 
    ? cld.image(wallpaper.publicId)
        .quality('auto')
        .format('auto')
        .resize('c_limit,w_500,h_350')
    : null

  if (!displayImg) return null // Fallback if no image

  return (
    <div 
      className="relative rounded-xl overflow-hidden shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AdvancedImage
        cldImg={displayImg}
        className="w-full h-full object-cover"
        alt={wallpaper?.title || 'Wallpaper'}
      />
      
      {/* Overlay */}
      {isHovered && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 p-4 flex flex-col justify-end">
          <h3 className="text-white font-bold">{wallpaper?.title}</h3>
          <a 
            href={`https://res.cloudinary.com/dzx2uira0/image/upload/${wallpaper.publicId}`} 
            download
            className="mt-2 inline-block bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded text-sm"
          >
            Download HD
          </a>
        </div>
      )}
    </div>
  )
}