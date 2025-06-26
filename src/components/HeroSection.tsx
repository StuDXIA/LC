'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { FaArrowDown } from 'react-icons/fa'
import Image from 'next/image'
import dynamic from 'next/dynamic'

const Neural3DBackground = dynamic(() => import('./Neural3DBackground'), { ssr: false })

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
      {/* 3D Neural Network Background */}
      <Neural3DBackground />
      
      {/* Subtle overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-radial from-white/50 via-white/20 to-slate-100/30 z-10" />
      
      <div className="container mx-auto px-6 relative z-20">
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
                className="animate-float drop-shadow-[0_4px_20px_rgba(14,165,233,0.3)]"
                priority
              />
            </div>
            <span className="text-gray-900 text-lg font-mono font-bold">Luminous Core</span>
          </motion.div>
          
          <h1 
            ref={titleRef}
            className="text-4xl md:text-6xl font-bold mb-8 transform-gpu transition-transform duration-100 leading-tight relative text-gray-900"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <motion.span 
              className="text-gradient block"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              あなたの事業に、
            </motion.span>
            <motion.span 
              className="text-gradient block relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              次の
              <motion.span
                className="inline-block mx-2 text-white font-bold"
                style={{
                  textShadow: "0 0 10px rgba(14, 165, 233, 0.5), 0 2px 4px rgba(0, 0, 0, 0.1)",
                  WebkitTextStroke: "1px rgba(14, 165, 233, 0.3)"
                }}
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 3, -3, 0],
                  textShadow: [
                    "0 0 10px rgba(14, 165, 233, 0.5), 0 2px 4px rgba(0, 0, 0, 0.1)",
                    "0 0 15px rgba(14, 165, 233, 0.7), 0 2px 4px rgba(0, 0, 0, 0.1)",
                    "0 0 10px rgba(14, 165, 233, 0.5), 0 2px 4px rgba(0, 0, 0, 0.1)"
                  ]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                &quot;成長曲線&quot;
              </motion.span>
              を描く。
            </motion.span>
          </h1>
          
          <motion.div 
            className="text-lg md:text-xl mb-12 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <p className="text-gray-800 font-semibold">
              私たちは、
              <motion.span 
                className="text-blue-700 font-black inline-block"
                whileHover={{ scale: 1.05, color: "#1d4ed8" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                AI技術とプロの実行力
              </motion.span>
              を組み合わせ、
              <br />
              <motion.span 
                className="text-blue-700 font-black inline-block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.6 }}
              >
                SNSを起点とした事業成長
              </motion.span>
              をワンストップで支援する、
              <br />
              <motion.span 
                className="inline-block"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5, duration: 0.6 }}
              >
                <span className="bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent font-black text-2xl">グローステック・チーム</span>
              </motion.span>
              です。
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <button className="px-8 py-4 bg-gradient-to-r from-primary-blue to-primary-dark rounded-lg font-semibold hover-lift glass-effect clean-border transition-all duration-300 hover:scale-105 text-white">
              まずは無料で相談する
            </button>
            <button className="px-8 py-4 glass-effect rounded-lg font-bold hover-lift transition-all duration-300 hover:border-primary-blue text-gray-900">
              提供サービスを見る →
            </button>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-primary-blue"
          >
            <FaArrowDown size={30} className="mx-auto animate-pulse-neon" />
          </motion.div>
        </motion.div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-blue to-transparent z-20" />
    </section>
  )
}