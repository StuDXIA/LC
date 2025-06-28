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
  
  const y = useTransform(scrollY, [0, 300], [0, 30])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  
  useEffect(() => {
    setIsLoaded(true)
    
    let frameId: number | null = null
    const handleMouseMove = (e: MouseEvent) => {
      if (frameId) return
      
      frameId = requestAnimationFrame(() => {
        if (titleRef.current) {
          const x = (e.clientX / window.innerWidth - 0.5) * 5
          const y = (e.clientY / window.innerHeight - 0.5) * 5
          titleRef.current.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg) translateZ(0)`
        }
        frameId = null
      })
    }
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (frameId) cancelAnimationFrame(frameId)
    }
  }, [])
  
  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-white to-gray-50 pt-20">
      {/* Enhanced Neural Network × Growth Curve Background */}
      <NeuralGrowthBackground />
      
      {/* Refined gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-white/10 z-10" />
      
      <motion.div 
        className="container mx-auto px-6 relative z-20"
        style={{ y, opacity, transform: 'translateZ(0)' }}
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
              <div className="absolute inset-0 bg-primary/10 blur-2xl group-hover:bg-primary/15 transition-all duration-500" />
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
                      <span className="relative z-10 text-primary font-black">
                        <span className="hidden sm:inline">"</span>成長曲線<span className="hidden sm:inline">"</span>
                      </span>
                      <motion.div
                        className="absolute inset-0 blur-md bg-primary/10"
                        animate={{
                          opacity: [0.3, 0.5, 0.3]
                        }}
                        transition={{
                          duration: 4,
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
              <span className="font-semibold text-primary"> グローステック・パートナー</span>
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
          
          {/* Single CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="mt-16 flex justify-center px-4 sm:px-0"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-8 sm:px-12 py-4 sm:py-5 overflow-hidden rounded-lg font-semibold text-white transition-all duration-300"
            >
              <div className="absolute inset-0 bg-primary" />
              <div className="absolute inset-0 bg-primary-dark opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 text-base sm:text-lg">30分間の無料相談に申し込む</span>
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-20" />
    </section>
  )
}