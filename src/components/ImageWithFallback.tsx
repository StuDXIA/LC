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
  
  // 実際のファイル名に合わせて調整
  let sources: string[] = []
  if (baseName === 'me1') {
    sources = ['/me1.JPG', '/me1.jpg', '/me1.png']
  } else if (baseName === 'me2') {
    sources = ['/me2.JPG', '/me2.jpg', '/me2.png']
  } else if (baseName === 'Luminous Core') {
    sources = ['/Luminous Core.png', '/Luminous Core.jpg', '/luminous-core.png']
  } else if (baseName === 'StudXIA') {
    sources = ['/StuDXIA.jpg', '/StuDXIA.png', '/StudXIA.jpg', '/StudXIA.png']
  } else if (baseName === 'rashinban') {
    sources = ['/rashinban.png', '/rashinban.jpg', '/rashinban.PNG']
  } else {
    const extensions = ['.jpg', '.jpeg', '.png', '.webp', '.JPG', '.JPEG', '.PNG']
    sources = extensions.map(ext => `/${baseName}${ext}`)
  }
  
  const handleError = () => {
    if (currentSrc < sources.length - 1) {
      setCurrentSrc(currentSrc + 1)
    }
  }
  
  if (currentSrc >= sources.length) {
    // すべての拡張子を試した後、フォールバック表示
    return (
      <div 
        className={`bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 rounded-lg flex items-center justify-center border border-neon-blue/30 ${className}`}
        style={fill ? {} : { width, height }}
      >
        <div className="text-white/70 text-center">
          <div className="text-4xl mb-2 animate-pulse">🌟</div>
          <div className="text-xs font-mono">Luminous Core</div>
          <div className="text-xs text-neon-blue/70">{baseName}</div>
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