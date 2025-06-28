'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import dynamic from 'next/dynamic'

const NeuralGrowthBackground = dynamic(() => import('./NeuralGrowthBackground'), { ssr: false })

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const { scrollY } = useScroll()
  
  const y = useTransform(scrollY, [0, 300], [0, 50])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  
  useEffect(() => {
    setIsLoaded(true)
    
    const handleMouseMove = (e: MouseEvent) => {
      if (titleRef.current) {
        const x = (e.clientX / window.innerWidth - 0.5) * 10
        const y = (e.clientY / window.innerHeight - 0.5) * 10
        titleRef.current.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg)`
      }
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])
  
  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-white to-gray-50 pt-20">
      {/* Enhanced Neural Network × Growth Curve Background */}
      <NeuralGrowthBackground />
      
      {/* Refined gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-white/10 z-10" />
      
      <motion.div 
        className="container mx-auto px-6 relative z-20"
        style={{ y, opacity }}
      >
        <div className="max-w-5xl mx-auto">
          {/* Refined Logo Section */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
            className="flex flex-col items-center mb-12"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-blue-400/20 blur-3xl group-hover:bg-blue-400/30 transition-all duration-500" />
              <Image
                src="/Luminous Core.png"
                alt="Luminous Core"
                width={100}
                height={100}
                className="relative z-10 drop-shadow-2xl"
                priority
              />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-4"
            >
              <span className="text-gray-700 text-sm font-medium tracking-[0.3em] uppercase">Luminous Core</span>
            </motion.div>
          </motion.div>
          
          {/* Minimalist Title with Enhanced Typography */}
          <div 
            ref={titleRef}
            className="text-center transform-gpu transition-transform duration-100"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <AnimatePresence>
              {isLoaded && (
                <motion.h1 
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight px-4 sm:px-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  <motion.span 
                    className="block text-gray-900 mb-2"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                  >
                    あなたの事業に、
                  </motion.span>
                  <motion.span 
                    className="block relative"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                  >
                    <span className="text-gray-900">次の</span>
                    <motion.span
                      className="inline-block mx-1 sm:mx-2 md:mx-3 relative"
                      animate={{ 
                        scale: [1, 1.05, 1],
                      }}
                      transition={{ 
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 font-black">
                        <span className="hidden sm:inline">"</span>成長曲線<span className="hidden sm:inline">"</span>
                      </span>
                      <motion.div
                        className="absolute inset-0 blur-xl bg-gradient-to-r from-blue-400/30 to-blue-600/30"
                        animate={{
                          opacity: [0.5, 0.8, 0.5]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    </motion.span>
                    <span className="text-gray-900">を描く</span>
                  </motion.span>
                </motion.h1>
              )}
            </AnimatePresence>
          </div>
          
          {/* Simplified Subtitle */}
          <motion.div 
            className="mt-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              デジタル戦略で事業成果を最大化する
              <span className="font-semibold text-blue-600"> グローステック・パートナー</span>
            </p>
            <motion.p
              className="mt-4 text-base text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              AI技術と専門チームで、SNSグロース・Web制作・業務効率化を
              <span className="font-medium">ワンストップ</span>で実現
            </motion.p>
          </motion.div>
          
          {/* Enhanced CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="mt-12 flex flex-col sm:flex-row gap-4 justify-center px-4 sm:px-0"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-6 sm:px-8 py-3 sm:py-4 overflow-hidden rounded-xl font-semibold text-white transition-all duration-300 w-full sm:w-auto"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 bg-white/20 blur-xl" />
              </div>
              <span className="relative z-10">無料相談を開始する</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold border-2 border-gray-300 text-gray-700 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:border-blue-400 hover:text-blue-600 w-full sm:w-auto"
            >
              <span className="relative z-10">サービス詳細 →</span>
            </motion.button>
          </motion.div>

          {/* Refined Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="flex flex-col items-center gap-2 text-gray-400"
            >
              <span className="text-xs tracking-wider uppercase">Scroll</span>
              <div className="w-5 h-8 border-2 border-gray-300 rounded-full relative">
                <motion.div
                  className="absolute left-1/2 top-1 -translate-x-1/2 w-1.5 h-1.5 bg-gray-400 rounded-full"
                  animate={{ y: [0, 16, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-20" />
    </section>
  )
}