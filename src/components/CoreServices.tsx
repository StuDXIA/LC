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
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group block w-full"
      style={{ transform: 'translateZ(0)' }}
    >
      <div className="relative bg-white overflow-hidden">
        {/* Optimized large number background */}
        <div 
          className="absolute -top-20 -left-10 text-[150px] sm:text-[200px] lg:text-[250px] font-black text-neutral-100 leading-none select-none"
          style={{ transform: 'translateZ(0)', willChange: 'transform' }}
        >
          {service.number}
        </div>
        
        {/* Main content - vertical flow */}
        <div className="relative z-10 px-8 sm:px-12 lg:px-20 py-16 sm:py-24 lg:py-32">
          {/* Service tagline */}
          <motion.div 
            className="mb-16 sm:mb-20"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: index * 0.2 + 0.1 }}
            style={{ transform: 'translateZ(0)' }}
          >
            <h3 className="text-sm sm:text-base text-neutral-500 font-medium tracking-[0.3em] uppercase mb-4">
              {service.tagline}
            </h3>
            <div className="w-16 h-1 bg-primary" />
          </motion.div>
          
          {/* Problem Section - Large & Bold */}
          <motion.div 
            className="mb-16 sm:mb-24 lg:mb-32"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: index * 0.2 + 0.2 }}
            style={{ transform: 'translateZ(0)' }}
          >
            <h4 className="text-base sm:text-lg text-red-600 font-bold tracking-wider mb-6 sm:mb-8">
              ― PROBLEM
            </h4>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-neutral-900 mb-6 sm:mb-8 leading-tight">
              {service.problem.title}
            </h3>
            <p className="text-lg sm:text-xl lg:text-2xl text-neutral-600 leading-relaxed">
              {service.problem.description}
            </p>
            <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 mt-6 sm:mt-8">
              {service.problem.pain}
            </p>
          </motion.div>
          
          {/* Visual separator - Arrow or transition element */}
          <motion.div 
            className="flex justify-center mb-16 sm:mb-24 lg:mb-32"
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: index * 0.3 + 0.5 }}
          >
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-primary/10 flex items-center justify-center">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </motion.div>
          
          {/* Solution Section - Impactful */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: index * 0.2 + 0.3 }}
            style={{ transform: 'translateZ(0)' }}
          >
            <h4 className="text-base sm:text-lg text-primary font-bold tracking-wider mb-6 sm:mb-8">
              ― SOLUTION
            </h4>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-primary-dark mb-6 sm:mb-8 leading-tight">
              {service.solution.title}
            </h3>
            <p className="text-lg sm:text-xl lg:text-2xl text-neutral-700 mb-12 sm:mb-16 leading-relaxed">
              {service.solution.description}
            </p>
            
            {/* Approach points - Larger and clearer */}
            <div className="space-y-6 sm:space-y-8 mb-12 sm:mb-16">
              {service.solution.approach.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: index * 0.2 + 0.4 + i * 0.05 }}
                  className="flex items-start gap-6"
                  style={{ transform: 'translateZ(0)' }}
                >
                  <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                    <span className="text-sm sm:text-base font-bold text-primary">
                      {i + 1}
                    </span>
                  </div>
                  <span className="text-base sm:text-lg lg:text-xl text-neutral-700 leading-relaxed">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
            
            {/* CTA - More prominent */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: index * 0.3 + 1 }}
            >
              <a 
                href="https://line.me/R/ti/p/@862uxzup"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-primary hover:bg-primary-dark text-white font-bold text-base sm:text-lg rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform-gpu"
              >
                {service.id === 'awareness' && '無料相談でSNSグロースを始める'}
                {service.id === 'conversion' && '無料相談でWebサイト/LP制作を始める'}
                {service.id === 'automation' && '無料相談でカスタム開発を始める'}
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default function CoreServices() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true })


  return (
    <section id="services" ref={sectionRef} className="py-32 sm:py-40 lg:py-48 relative overflow-hidden bg-gradient-to-b from-neutral-50 to-white">
      {/* Minimal background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-primary/[0.02] rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Section header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-24 sm:mb-32 lg:mb-40 px-4"
        >
          <motion.h2 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 sm:mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-neutral-900">事業成長を加速する、</span>
            <br />
            <span className="text-primary-dark">
              3つの変革。
            </span>
          </motion.h2>
          <motion.p 
            className="text-lg sm:text-xl lg:text-2xl text-neutral-600 max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            停滞から飛躍へ。私たちは問題の本質を見抜き、
            <br className="hidden sm:block" />
            テクノロジーとクリエイティビティで、あなたのビジネスの突破口を創ります。
          </motion.p>
        </motion.div>

        {/* Service cards - with larger gaps */}
        <div className="flex flex-col gap-24 sm:gap-32 lg:gap-40">
          {serviceTransformations.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}