'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ImageWithFallback from './ImageWithFallback'

interface AlternatingImagesProps {
  images: string[]
  alt: string
  width?: number
  height?: number
  className?: string
  interval?: number
}

export default function AlternatingImages({ 
  images, 
  alt, 
  width = 300, 
  height = 300, 
  className = '',
  interval = 2000 
}: AlternatingImagesProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  useEffect(() => {
    if (images.length <= 1) return
    
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, interval)
    
    return () => clearInterval(timer)
  }, [images.length, interval])
  
  if (images.length === 0) return null
  
  return (
    <div className={`relative overflow-hidden w-full h-full ${className}`} style={width && height ? { width, height } : {}}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ 
            duration: 0.8, 
            ease: [0.4, 0, 0.2, 1] 
          }}
          className="absolute inset-0"
        >
          <ImageWithFallback
            baseName={images[currentIndex].replace(/^\//, '').replace(/\.[^.]+$/, '')}
            alt={`${alt} ${currentIndex + 1}`}
            width={width || 400}
            height={height || 400}
            className="object-cover w-full h-full"
            priority={currentIndex === 0}
            fill
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />
        </motion.div>
      </AnimatePresence>
      
      {/* インジケーター */}
      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-primary-blue w-6' 
                  : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}