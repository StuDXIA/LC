'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { FaArrowDown } from 'react-icons/fa'
import Image from 'next/image'
import AlternatingImages from './AlternatingImages'

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
      
      {/* 左側の交互画像 */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="absolute left-8 top-1/2 transform -translate-y-1/2 hidden lg:block"
      >
        <AlternatingImages
          images={['me1', 'me2']}
          alt="Profile Images"
          width={200}
          height={250}
          className="drop-shadow-[0_0_30px_rgba(0,217,255,0.3)] opacity-80"
          interval={2000}
        />
      </motion.div>

      {/* 右側の交互画像 */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7, duration: 1 }}
        className="absolute right-8 top-1/2 transform -translate-y-1/2 hidden lg:block"
      >
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-neon-purple to-neon-pink rounded-lg blur opacity-30"></div>
          <AlternatingImages
            images={['me1', 'me2']}
            alt="Profile Images"
            width={200}
            height={250}
            className="relative drop-shadow-[0_0_30px_rgba(191,0,255,0.3)]"
            interval={2000}
          />
        </div>
      </motion.div>
      
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
            <span className="text-neon-blue text-lg font-mono">Luminous Core</span>
          </motion.div>
          
          <h1 
            ref={titleRef}
            className="text-4xl md:text-6xl font-bold mb-8 glitch transform-gpu transition-transform duration-100 leading-tight"
            data-text="あなたの事業に、次の成長曲線を描く。"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <span className="text-gradient">
              あなたの事業に、
              <br />
              次の&quot;成長曲線&quot;を描く。
            </span>
          </h1>
          
          <div className="text-lg md:text-xl mb-12 max-w-4xl mx-auto leading-relaxed">
            <p className="text-gray-300">
              私たちは、<span className="text-neon-blue font-semibold">AI技術とプロの実行力</span>を組み合わせ、
              <br />
              <span className="text-neon-purple font-semibold">SNSを起点とした事業成長</span>をワンストップで支援する、
              <br />
              <span className="text-gradient font-semibold">グローステック・チーム</span>です。
            </p>
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <button className="px-8 py-4 bg-gradient-to-r from-neon-blue to-neon-purple rounded-lg font-semibold hover-lift glass-effect neon-border transition-all duration-300 hover:scale-105">
              まずは無料で相談する
            </button>
            <button className="px-8 py-4 glass-effect rounded-lg font-semibold hover-lift transition-all duration-300 hover:border-neon-blue">
              提供サービスを見る →
            </button>
          </motion.div>

          {/* モバイル用の交互画像 */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="lg:hidden mb-8"
          >
            <AlternatingImages
              images={['me1', 'me2']}
              alt="Profile Images"
              width={150}
              height={180}
              className="mx-auto drop-shadow-[0_0_20px_rgba(0,217,255,0.4)] opacity-90"
              interval={2000}
            />
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