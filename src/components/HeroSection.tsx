'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import TypewriterEffect from 'typewriter-effect'
import { FaArrowDown } from 'react-icons/fa'
import Image from 'next/image'

export default function HeroSection() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (titleRef.current) {
        const x = (e.clientX / window.innerWidth - 0.5) * 20
        const y = (e.clientY / window.innerHeight - 0.5) * 20
        titleRef.current.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg)`
      }
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-neon-blue/20 via-transparent to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-6 flex flex-col items-center"
          >
            <div className="mb-4 relative">
              <Image
                src="/Luminous Core.png"
                alt="Luminous Core Logo"
                width={120}
                height={120}
                className="animate-float drop-shadow-[0_0_20px_rgba(0,217,255,0.6)]"
                priority
              />
            </div>
            <span className="text-neon-blue text-lg font-mono">Welcome to the Future</span>
          </motion.div>
          
          <h1 
            ref={titleRef}
            className="text-6xl md:text-8xl font-bold mb-8 glitch transform-gpu transition-transform duration-100"
            data-text="LC PLATFORM"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <span className="text-gradient">LC PLATFORM</span>
          </h1>
          
          <div className="text-2xl md:text-3xl mb-12 h-20">
            <TypewriterEffect
              options={{
                strings: [
                  'Revolutionary Technology',
                  'Cutting-Edge Innovation',
                  'Future-Ready Solutions',
                  'Next-Gen Platform',
                ],
                autoStart: true,
                loop: true,
                delay: 75,
                deleteSpeed: 50,
              }}
            />
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <button className="px-8 py-4 bg-gradient-to-r from-neon-blue to-neon-purple rounded-lg font-semibold hover-lift glass-effect neon-border transition-all duration-300 hover:scale-105">
              Get Started
            </button>
            <button className="px-8 py-4 glass-effect rounded-lg font-semibold hover-lift transition-all duration-300 hover:border-neon-blue">
              Learn More
            </button>
          </motion.div>
          
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-neon-blue"
          >
            <FaArrowDown size={30} className="mx-auto animate-pulse-neon" />
          </motion.div>
        </motion.div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-blue to-transparent" />
    </section>
  )
}