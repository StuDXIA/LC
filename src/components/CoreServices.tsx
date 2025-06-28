'use client'

import { useState, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface ServiceTransformation {
  id: string
  number: string
  tagline: string
  problem: {
    title: string
    description: string
    pain: string
  }
  solution: {
    title: string
    description: string
    approach: string[]
  }
  visual: {
    icon: React.ReactNode
    gradient: string
    glow: string
  }
}

const serviceTransformations: ServiceTransformation[] = [
  {
    id: 'awareness',
    number: '01',
    tagline: 'Transform Visibility',
    problem: {
      title: '埋もれる価値',
      description: '素晴らしいサービスも、',
      pain: '誰にも見つけてもらえない'
    },
    solution: {
      title: '戦略的露出拡大',
      description: 'データ駆動のSNS戦略で',
      approach: [
        'AI分析による最適配信',
        'バイラルコンテンツ設計',
        'ターゲット精密リーチ'
      ]
    },
    visual: {
      icon: (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <motion.circle
            cx="50"
            cy="50"
            r="30"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.circle
            cx="50"
            cy="50"
            r="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 0.5, repeat: Infinity }}
          />
          <motion.circle
            cx="50"
            cy="50"
            r="10"
            fill="currentColor"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.5, 1] }}
            transition={{ duration: 2, delay: 1, repeat: Infinity }}
          />
        </svg>
      ),
      gradient: 'from-blue-600 via-cyan-500 to-blue-400',
      glow: 'blue'
    }
  },
  {
    id: 'conversion',
    number: '02',
    tagline: 'Transform Visitors',
    problem: {
      title: '失われる機会',
      description: '訪問者の97%が、',
      pain: 'そのまま離脱している'
    },
    solution: {
      title: 'コンバージョン最適化',
      description: '心理学×データで設計する',
      approach: [
        '行動心理学UI/UX',
        'A/Bテスト自動化',
        'リアルタイム最適化'
      ]
    },
    visual: {
      icon: (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <motion.path
            d="M 30 30 L 70 30 L 60 50 L 70 50 L 50 70 L 40 50 L 50 50 Z"
            fill="currentColor"
            initial={{ scale: 0, rotate: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
          />
        </svg>
      ),
      gradient: 'from-purple-600 via-pink-500 to-purple-400',
      glow: 'purple'
    }
  },
  {
    id: 'automation',
    number: '03',
    tagline: 'Transform Operations',
    problem: {
      title: '消耗する時間',
      description: '毎日の繰り返し作業に、',
      pain: '貴重な人材が埋没している'
    },
    solution: {
      title: 'AI業務自動化',
      description: '人は創造的な仕事に集中',
      approach: [
        'カスタムAI開発',
        'ワークフロー自動化',
        '24/7稼働システム'
      ]
    },
    visual: {
      icon: (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <motion.g
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <circle cx="50" cy="20" r="8" fill="currentColor" />
            <circle cx="80" cy="50" r="8" fill="currentColor" />
            <circle cx="50" cy="80" r="8" fill="currentColor" />
            <circle cx="20" cy="50" r="8" fill="currentColor" />
            <line x1="50" y1="20" x2="80" y2="50" stroke="currentColor" strokeWidth="2" />
            <line x1="80" y1="50" x2="50" y2="80" stroke="currentColor" strokeWidth="2" />
            <line x1="50" y1="80" x2="20" y2="50" stroke="currentColor" strokeWidth="2" />
            <line x1="20" y1="50" x2="50" y2="20" stroke="currentColor" strokeWidth="2" />
          </motion.g>
          <circle cx="50" cy="50" r="12" fill="currentColor" />
        </svg>
      ),
      gradient: 'from-indigo-600 via-blue-500 to-indigo-400',
      glow: 'indigo'
    }
  }
]

function ServiceCard({ service, index }: { service: ServiceTransformation, index: number }) {
  const [isHovered, setIsHovered] = useState(false)
  const [ref, inView] = useInView({ threshold: 0.01, triggerOnce: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.95 }}
      transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
      className="relative group block w-full"
    >
      <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl border border-gray-200 bg-white transform transition-all duration-300 hover:shadow-3xl">
        {/* Background gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${service.visual.gradient} opacity-5`} />
        
        {/* Content container */}
        <div className="relative h-full p-8 lg:p-12 flex flex-row justify-between items-center">
          {/* Glow effect */}
          <motion.div
            className={`absolute -inset-10 bg-gradient-to-br ${service.visual.gradient} opacity-0 blur-2xl`}
            animate={{ opacity: isHovered ? 0.2 : 0 }}
            transition={{ duration: 0.5 }}
          />
          
          {/* Left side - Number and Icon */}
          <div className="relative z-10 flex-shrink-0">
            <span className={`text-8xl lg:text-9xl font-black bg-gradient-to-br ${service.visual.gradient} bg-clip-text text-transparent block`}>
              {service.number}
            </span>
            <motion.div
              className="w-24 h-24 mt-4 opacity-30"
              animate={{ 
                scale: isHovered ? 1.2 : 1,
                opacity: isHovered ? 0.5 : 0.3
              }}
              transition={{ duration: 0.5 }}
            >
              {service.visual.icon}
            </motion.div>
          </div>
          
          {/* Right side - Content */}
          <div className="relative z-10 flex-grow ml-8 lg:ml-16">
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: isHovered ? 0.5 : 1 }}
              transition={{ duration: 0.3 }}
              className="mb-8"
            >
              <h4 className="text-sm font-medium text-gray-500 mb-3">PROBLEM</h4>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">
                {service.problem.title}
              </h3>
              <p className="text-lg text-gray-700">
                {service.problem.description}
                <span className="block text-2xl font-bold text-red-500 mt-1">
                  {service.problem.pain}
                </span>
              </p>
            </motion.div>
            
            {/* Solution section */}
            <motion.div
              initial={{ opacity: 0.8 }}
              animate={{ 
                opacity: isHovered ? 1 : 0.8
              }}
              transition={{ duration: 0.5 }}
            >
              <h4 className="text-sm font-medium text-gray-500 mb-3">SOLUTION</h4>
              <h3 className={`text-3xl font-bold bg-gradient-to-r ${service.visual.gradient} bg-clip-text text-transparent mb-2`}>
                {service.solution.title}
              </h3>
              <p className="text-lg text-gray-700 mb-4">
                {service.solution.description}
              </p>
              
              {/* Approach list */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: isHovered ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className="space-y-2"
              >
                {service.solution.approach.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: isHovered ? 0 : -20, opacity: isHovered ? 1 : 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.visual.gradient}`} />
                    <span className="text-sm font-medium text-gray-700">{item}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
            {/* CTA Button */}
            <motion.div
              className="mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
              transition={{ duration: 0.3 }}
            >
              <button className={`px-8 py-3 rounded-xl bg-gradient-to-r ${service.visual.gradient} text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300`}>
                詳しく見る →
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function CoreServices() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })


  return (
    <section ref={sectionRef} className="py-24 px-6 relative overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-40 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-1/4 -right-40 w-80 h-80 bg-purple-100 rounded-full blur-3xl opacity-30" />
      </div>

      <div className="container mx-auto relative z-10 max-w-7xl">
        {/* Section header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.h2 
            className="text-5xl md:text-6xl font-black mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-gray-900">事業成長を加速する</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
              3つの変革
            </span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            停滞から飛躍へ。私たちは問題の本質を見抜き、
            <br />
            テクノロジーとクリエイティビティで突破口を創ります。
          </motion.p>
        </motion.div>

        {/* Service cards */}
        <div className="flex flex-col gap-12 mt-16 max-w-6xl mx-auto">
          {serviceTransformations.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
        

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-gray-700 mb-2">
            実際の成果をご覧ください
          </p>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-gray-400"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="mx-auto">
              <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}