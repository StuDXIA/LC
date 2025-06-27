'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'

interface Service {
  id: string
  title: string
  subtitle: string
  description: string
  metrics: {
    label: string
    value: string
    suffix: string
  }[]
  features: string[]
  iconImage: string
  accent: string
}

const services: Service[] = [
  {
    id: 'sns-growth',
    title: '戦略的SNSグロース',
    subtitle: 'Strategic SNS Growth',
    description: 'データ分析とトレンド洞察に基づき、「運用」だけではなく、事業成果に繋がる「成長戦略」を設計・実行します。',
    metrics: [
      { label: '平均エンゲージメント率', value: '8.7', suffix: '%' },
      { label: 'フォロワー成長率', value: '320', suffix: '%/年' },
      { label: 'CV貢献度', value: '45', suffix: '%向上' }
    ],
    features: [
      'AI駆動のコンテンツ最適化',
      'リアルタイムトレンド分析',
      'ROI可視化ダッシュボード',
      'インフルエンサー連携戦略'
    ],
    iconImage: '/LC1.png',
    accent: '#3B82F6'
  },
  {
    id: 'web-conversion',
    title: 'コンバージョン特化型Webサイト制作',
    subtitle: 'Conversion-Optimized Web Development',
    description: 'SNSからのアクセスを、確実に「問い合わせ」や「購入」に繋げる、成果コミット型のウェブサイトを制作します。',
    metrics: [
      { label: 'CVR改善率', value: '5.2', suffix: '%達成' },
      { label: '直帰率削減', value: '42', suffix: '%' },
      { label: 'ページ速度', value: '98', suffix: '/100' }
    ],
    features: [
      'A/Bテスト継続実施',
      'ヒートマップ分析',
      'モバイルファースト設計',
      'SEO完全最適化'
    ],
    iconImage: '/LC2.png',
    accent: '#60A5FA'
  },
  {
    id: 'custom-dev',
    title: '業務効率化のためのカスタム開発',
    subtitle: 'Custom Development for Efficiency',
    description: '属人的な作業や非効率なプロセスを、AIとテクノロジーで解決。貴社の課題に合わせたツールを開発します。',
    metrics: [
      { label: '業務時間削減', value: '78', suffix: '%' },
      { label: 'エラー率低下', value: '95', suffix: '%' },
      { label: 'ROI', value: '380', suffix: '%' }
    ],
    features: [
      'AI自動化ソリューション',
      'カスタムAPI開発',
      'レガシーシステム統合',
      '24/7サポート体制'
    ],
    iconImage: '/LC3.png',
    accent: '#1E40AF'
  }
]

function AnimatedMetric({ label, value, suffix, delay }: { label: string, value: string, suffix: string, delay: number }) {
  const [displayValue, setDisplayValue] = useState('0')
  const [ref, inView] = useInView({ threshold: 0.5, triggerOnce: true })

  useEffect(() => {
    if (inView) {
      const numValue = parseFloat(value)
      const duration = 2000
      const steps = 60
      const increment = numValue / steps
      let current = 0

      const timer = setInterval(() => {
        current += increment
        if (current >= numValue) {
          current = numValue
          clearInterval(timer)
        }
        setDisplayValue(current.toFixed(1))
      }, duration / steps)

      return () => clearInterval(timer)
    }
  }, [inView, value])

  return (
    <div ref={ref} className="text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay, duration: 0.6 }}
      >
        <div className="text-3xl font-bold text-gray-900">
          {displayValue}{suffix}
        </div>
        <div className="text-sm text-gray-600 mt-1">{label}</div>
      </motion.div>
    </div>
  )
}

function ServiceCard({ service, index }: { service: Service, index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]))
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]))

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2, duration: 0.8 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d'
      }}
      className="relative"
    >
      <div className="relative h-full bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200/50 shadow-xl overflow-hidden group">
        {/* Gradient overlay */}
        <div 
          className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${service.accent} 0%, transparent 70%)`
          }}
        />

        <div className="relative p-8 h-full flex flex-col">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-start justify-between mb-4">
              <div className="relative w-16 h-16 rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={service.iconImage}
                  alt={service.title}
                  fill
                  className="object-cover"
                />
              </div>
              <motion.div
                animate={{ rotate: isHovered ? 180 : 0 }}
                transition={{ duration: 0.6 }}
                className="text-gray-400"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{service.title}</h3>
            <p className="text-sm text-gray-500 font-medium">{service.subtitle}</p>
          </div>

          {/* Description */}
          <p className="text-gray-700 mb-6 flex-grow">{service.description}</p>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-gray-200">
            {service.metrics.map((metric, idx) => (
              <AnimatedMetric
                key={idx}
                {...metric}
                delay={index * 0.2 + idx * 0.1}
              />
            ))}
          </div>

          {/* Features */}
          <div className="space-y-2">
            {service.features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 + idx * 0.05 }}
                className="flex items-center gap-2 text-sm text-gray-600"
              >
                <div 
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: service.accent }}
                />
                {feature}
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-6 w-full py-3 px-6 rounded-xl font-medium transition-all duration-300"
            style={{
              backgroundColor: isHovered ? service.accent : 'transparent',
              color: isHovered ? 'white' : service.accent,
              border: `2px solid ${service.accent}`
            }}
          >
            詳しく見る
          </motion.button>
        </div>

        {/* Floating particles */}
        {isHovered && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 100 }}
                animate={{
                  opacity: [0, 1, 0],
                  y: -100,
                  x: Math.random() * 100 - 50
                }}
                transition={{
                  duration: 3,
                  delay: i * 0.3,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
                className="absolute bottom-0 left-1/2 w-1 h-1 rounded-full"
                style={{ backgroundColor: service.accent }}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default function CoreServices() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [50, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section ref={sectionRef} className="py-24 px-6 relative overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      {/* Background decoration */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ y, opacity }}
      >
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-20" />
      </motion.div>

      <div className="container mx-auto relative z-10 max-w-7xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            事業成果に直結する、
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
              3つのコアソリューション
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            デジタル戦略を起点とした成長戦略から、コンバージョンを最大化するWebサイト制作、業務効率化まで、
            <br />
            ワンストップで貴社の事業価値を最大化します
          </p>
        </motion.div>

        {/* Service cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* Connection visualization */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-16 relative h-32"
        >
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 100">
            <motion.path
              d="M 150 50 Q 500 20 850 50"
              stroke="#3B82F6"
              strokeWidth="2"
              fill="none"
              strokeDasharray="5 5"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, delay: 1 }}
            />
          </svg>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-4 h-4 bg-blue-500 rounded-full"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}