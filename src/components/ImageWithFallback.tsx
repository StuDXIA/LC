'use client'

import { useState } from 'react'
import Image from 'next/image'

interface ImageWithFallbackProps {
  baseName: string
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
  fill?: boolean
}

export default function ImageWithFallback({
  baseName,
  alt,
  width,
  height,
  className = '',
  priority = false,
  fill = false,
}: ImageWithFallbackProps) {
  const [currentSrc, setCurrentSrc] = useState(0)
  const extensions = ['.jpg', '.jpeg', '.png', '.webp']
  const sources = extensions.map(ext => `/${baseName}${ext}`)
  
  const handleError = () => {
    if (currentSrc < sources.length - 1) {
      setCurrentSrc(currentSrc + 1)
    }
  }
  
  if (currentSrc >= sources.length) {
    // すべての拡張子を試した後、フォールバック表示
    return (
      <div 
        className={`bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 rounded-lg flex items-center justify-center ${className}`}
        style={fill ? {} : { width, height }}
      >
        <div className="text-white/50 text-center">
          <div className="text-2xl mb-2">👤</div>
          <div className="text-xs">Image</div>
        </div>
      </div>
    )
  }
  
  const imageProps = {
    src: sources[currentSrc],
    alt,
    className: `${className} object-cover rounded-lg`,
    priority,
    onError: handleError,
    ...(fill ? { fill: true } : { width, height }),
  }
  
  return <Image {...imageProps} />
}