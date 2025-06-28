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
      description: '素晴らしいサービスも、届けたい相手に見つけてもらえなければ、',
      pain: '存在しないのと同じです。'
    },
    solution: {
      title: '戦略的SNSグロース',
      description: '我々は、AIとデータ分析を駆使し、貴社の"本当のファン"になる層だけに、最適化されたメッセージを届けます。',
      approach: [
        '誰に、何を、いつ届けるか。AIが最適な「勝ち筋」を発見',
        'ターゲット顧客への精密なリーチで、広告費を無駄にしない',
        '話題のバイラルコンテンツを企画・制作'
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
      gradient: 'from-primary to-primary-dark',
      glow: 'blue'
    }
  },
  {
    id: 'conversion',
    number: '02',
    tagline: 'Transform Visitors',
    problem: {
      title: '失われる機会',
      description: '訪れた人の97%が、何もせずに離脱する。それは、ウェブサイトが',
      pain: '"ただのパンフレット"になっている証拠です。'
    },
    solution: {
      title: 'コンバージョン特化型Webサイト/LP制作',
      description: '我々は、訪問者が無意識に「欲しい」と感じる、心理学に基づいたサイトを設計します。',
      approach: [
        '行動心理学に基づいた、コンバージョンに繋がるUI/UX設計',
        'A/Bテストによる、最も効果の出るパターンのデータ証明',
        '問い合わせや購入に直結する、最適な顧客体験の構築'
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
      gradient: 'from-primary-dark to-primary',
      glow: 'purple'
    }
  },
  {
    id: 'automation',
    number: '03',
    tagline: 'Transform Operations',
    problem: {
      title: '消耗する時間',
      description: '問い合わせ対応、日報作成、予約管理…。毎日の繰り返し作業に、',
      pain: 'チームの貴重な才能と時間が埋没していませんか？'
    },
    solution: {
      title: 'AIによる業務プロセスの自動化',
      description: '我々は、定型的な業務をAIで自動化し、あなたのチームを退屈な繰り返し作業から解放します。',
      approach: [
        '問い合わせ対応、予約管理などの定型業務をAIで自動化',
        '貴社専用のカスタムAIツール・業務システムを開発',
        'チームを単純作業から解放し、創造性を最大化'
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
      gradient: 'from-primary to-primary-dark',
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
      whileHover={{ y: -2, transition: { duration: 0.3 } }}
      className="relative group block w-full will-change-transform"
    >
      <div className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-lg border border-neutral-200 bg-white transition-all duration-300">
        {/* Background gradient - stronger presence */}
        <div className={`absolute inset-0 bg-gradient-to-br ${service.visual.gradient} opacity-[0.02] group-hover:opacity-[0.04] transition-opacity duration-500`} />
        
        {/* Content container - better proportions */}
        <div className="relative p-6 sm:p-8 lg:p-14 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Glow effect */}
          <motion.div
            className={`absolute -inset-10 bg-primary/5 opacity-0 blur-xl`}
            animate={{ opacity: isHovered ? 0.1 : 0 }}
            transition={{ duration: 0.5 }}
          />
          
          {/* Left side - Number with better scale */}
          <div className="col-span-1 lg:col-span-2">
            <div className="lg:sticky lg:top-10">
              <span className="text-5xl sm:text-6xl lg:text-7xl font-black text-primary block leading-none">
                {service.number}
              </span>
              <div className="text-xs font-medium tracking-[0.2em] uppercase text-gray-400 mt-2">
                {service.tagline}
              </div>
              <motion.div
                className="w-12 h-12 sm:w-16 sm:h-16 mt-4 lg:mt-6"
                animate={{ 
                  scale: isHovered ? 1.05 : 1,
                  opacity: isHovered ? 0.3 : 0.15
                }}
                transition={{ duration: 0.8 }}
              >
                {service.visual.icon}
              </motion.div>
            </div>
          </div>
          
          {/* Right side - Content with better hierarchy */}
          <div className="col-span-1 lg:col-span-10 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Problem column */}
            <motion.div
              initial={{ opacity: 0.7 }}
              animate={{ opacity: isHovered ? 0.4 : 0.7 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <div className="absolute -top-2 -left-2 w-20 h-20 bg-neutral-100 rounded-full opacity-30 blur-xl" />
              <h4 className="text-sm sm:text-base font-bold text-neutral-500 mb-3 sm:mb-4 tracking-wider">PROBLEM</h4>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 sm:mb-3 leading-tight">
                {service.problem.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {service.problem.description}
                <span className="block text-lg sm:text-xl lg:text-2xl font-bold text-neutral-900 mt-2 sm:mt-3">
                  {service.problem.pain}
                </span>
              </p>
            </motion.div>
            
            {/* Solution column */}
            <motion.div
              initial={{ opacity: 0.8 }}
              animate={{ 
                opacity: isHovered ? 1 : 0.8,
                x: isHovered ? 0 : 10
              }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className={`absolute -top-2 -right-2 w-24 h-24 bg-primary-light opacity-20 rounded-full blur-xl`} />
              <h4 className="text-sm sm:text-base font-bold text-primary mb-3 sm:mb-4 tracking-wider">SOLUTION</h4>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary-dark mb-2 sm:mb-3 leading-tight">
                {service.solution.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-700 mb-4 leading-relaxed">
                {service.solution.description}
              </p>
              
              {/* Approach list - always visible */}
              <div className="space-y-2 mt-4 sm:mt-6">
                {service.solution.approach.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ x: 0, opacity: 0.7 }}
                    animate={{ 
                      x: isHovered ? 10 : 0, 
                      opacity: isHovered ? 1 : 0.7 
                    }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary group-hover:scale-110 transition-transform flex-shrink-0" />
                    <span className="text-xs sm:text-sm font-medium text-gray-700 break-words">{item}</span>
                  </motion.div>
                ))}
              </div>
              
              {/* CTA Button - always visible but subtle */}
              <motion.button 
                className="mt-4 sm:mt-6 px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg bg-primary text-white text-xs sm:text-sm font-semibold shadow-sm hover:shadow-md hover:bg-primary-dark transition-all duration-300 w-full sm:w-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                詳しく見る →
              </motion.button>
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
    <section id="services" ref={sectionRef} className="py-24 px-6 relative overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-40 w-80 h-80 bg-primary-light rounded-full blur-2xl opacity-20" />
        <div className="absolute bottom-1/4 -right-40 w-80 h-80 bg-primary-light rounded-full blur-2xl opacity-20" />
      </div>

      <div className="container mx-auto relative z-10 max-w-7xl">
        {/* Section header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16 lg:mb-20 px-4"
        >
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-gray-900">事業成長を加速する、</span>
            <br />
            <span className="text-primary-dark">
              3つの変革。
            </span>
          </motion.h2>
          <motion.p 
            className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            停滞から飛躍へ。私たちは問題の本質を見抜き、
            <br className="hidden sm:block" />
            テクノロジーとクリエイティビティで、あなたのビジネスの突破口を創ります。
          </motion.p>
        </motion.div>

        {/* Service cards */}
        <div className="flex flex-col gap-6 sm:gap-8 mt-8 sm:mt-12 lg:mt-16 max-w-7xl mx-auto">
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