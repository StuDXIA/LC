'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'

const features = [
  {
    iconImage: '/LC1.png',
    title: '戦略的SNSグロース',
    description: 'データ分析とトレンド洞察に基づき、単なる「運用」ではなく、事業成果に繋がる「成長戦略」を設計・実行します。アカウントのコンセプト設計から日々の運用、効果測定まで、SNS成長の全てをサポートします。',
    gradient: 'from-blue-500 to-cyan-500',
    stats: { value: 300, suffix: '%', label: '平均エンゲージメント向上率' }
  },
  {
    iconImage: '/LC2.png',
    title: 'コンバージョン特化型Webサイト/LP制作',
    description: 'SNSからのアクセスを、一滴も無駄にしない"受け皿"を構築します。デザイン性はもちろん、確実に「問い合わせ」や「購入」に繋げる、成果コミット型のウェブサイト及びランディングページを制作します。',
    gradient: 'from-purple-500 to-pink-500',
    stats: { value: 85, suffix: '%', label: 'コンバージョン率改善実績' }
  },
  {
    iconImage: '/LC3.png',
    title: '業務効率化のためのカスタム開発',
    description: '属人的な作業や非効率なプロセスを、テクノロジーで解決します。業務を効率化するAIチャットボットや、SNSと連携する予約システムなど、貴社の課題に合わせたオーダーメイドのツールを開発します。',
    gradient: 'from-orange-500 to-red-500',
    stats: { value: 60, suffix: '%', label: '業務時間削減率' }
  },
]

// 数値カウントアップコンポーネント
function CountUp({ end, duration = 2000, suffix = '' }: { end: number, duration?: number, suffix?: string }) {
  const [count, setCount] = useState(0)
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true })

  useEffect(() => {
    if (!inView) return
    
    let startTime: number
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      
      setCount(Math.floor(end * progress))
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    requestAnimationFrame(animate)
  }, [inView, end, duration])

  return <span ref={ref}>{count}{suffix}</span>
}

function FeatureCard({ feature, index }: { feature: typeof features[0], index: number }) {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        delay: index * 0.2,
        duration: 0.8,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        scale: 1.03,
        rotateX: mousePos.y < 150 ? 5 : -5,
        rotateY: mousePos.x < 150 ? -5 : 5,
      }}
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
    >
      {/* グラスモーフィズムカード */}
      <div className="relative h-full p-8 rounded-2xl backdrop-blur-xl bg-white/40 border border-white/20 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500">
        
        {/* 背景の動的グラデーション */}
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            background: isHovered ? 
              `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, ${feature.gradient.split(' ')[1]} 0%, transparent 50%)` :
              'none'
          }}
          transition={{ duration: 0.3 }}
        />
        
        {/* アイコンコンテナ */}
        <motion.div 
          className="mb-6 relative"
          animate={isHovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {/* パルスエフェクト */}
          <motion.div
            className="absolute inset-0 rounded-lg"
            animate={isHovered ? {
              boxShadow: [
                "0 0 0 0 rgba(59, 130, 246, 0)",
                "0 0 0 10px rgba(59, 130, 246, 0.1)",
                "0 0 0 20px rgba(59, 130, 246, 0)",
              ]
            } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <Image 
            src={feature.iconImage} 
            alt={feature.title}
            width={80}
            height={80}
            className="w-20 h-20 rounded-lg relative z-10"
          />
        </motion.div>
        
        {/* タイトル */}
        <motion.h3 
          className="text-2xl font-black mb-4 text-gray-900"
          animate={isHovered ? { x: 5 } : { x: 0 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {feature.title}
        </motion.h3>
        
        {/* 説明文 */}
        <p className="text-gray-700 font-medium mb-6 leading-relaxed">
          {feature.description}
        </p>
        
        {/* 統計情報 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isHovered ? { opacity: 1 } : { opacity: 0.7 }}
          className="mt-auto pt-4 border-t border-gray-200/50"
        >
          <div className="text-3xl font-bold text-gray-900">
            <CountUp end={feature.stats.value} suffix={feature.stats.suffix} />
          </div>
          <div className="text-sm text-gray-600 mt-1">{feature.stats.label}</div>
        </motion.div>
        
        {/* ホバー時のボトムライン */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isHovered ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.3 }}
          className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.gradient} origin-left`}
        />
      </div>
    </motion.div>
  )
}

// コネクションライン描画用SVGコンポーネント
function ConnectionLines() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  
  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: 400
      })
    }
    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  if (dimensions.width < 1024) return null // モバイルでは非表示

  return (
    <svg 
      className="absolute inset-0 pointer-events-none" 
      style={{ width: '100%', height: '100%' }}
    >
      <motion.path
        d={`M ${dimensions.width * 0.25} 200 Q ${dimensions.width * 0.5} 150 ${dimensions.width * 0.75} 200`}
        stroke="url(#gradient1)"
        strokeWidth="2"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.3 }}
        transition={{ duration: 2, delay: 1 }}
      />
      <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="50%" stopColor="#A855F7" />
          <stop offset="100%" stopColor="#F97316" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default function FeaturesSection() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  
  // マウスフォロワー
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])
  
  return (
    <section ref={sectionRef} className="py-24 px-6 relative overflow-hidden bg-gradient-to-b from-gray-50/50 to-white">
      {/* 背景の幾何学的パターン */}
      <motion.div 
        className="absolute inset-0 opacity-5"
        style={{ y }}
      >
        <div className="absolute inset-0" style={{
          backgroundImage: `
            repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(59, 130, 246, 0.1) 35px, rgba(59, 130, 246, 0.1) 70px),
            repeating-linear-gradient(-45deg, transparent, transparent 35px, rgba(168, 85, 247, 0.1) 35px, rgba(168, 85, 247, 0.1) 70px)
          `
        }} />
      </motion.div>

      {/* マウスフォロワーエフェクト */}
      <motion.div
        className="fixed w-96 h-96 rounded-full pointer-events-none z-0"
        animate={{
          x: mousePosition.x - 192,
          y: mousePosition.y - 192,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      
      <div className="container mx-auto relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          {/* メインタイトル */}
          <motion.h2 
            className="text-6xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          >
            <motion.span 
              className="inline-block bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              style={{ backgroundSize: "200% 200%" }}
            >
              事業成果に直結する、
            </motion.span>
            <br />
            <motion.span 
              className="inline-block"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <span className="text-gray-900">3つの</span>
              <motion.span
                className="inline-block mx-3 text-7xl md:text-8xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-orange-600 bg-clip-text text-transparent"
                animate={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ 
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{ backgroundSize: "200% 200%" }}
              >
                コア
              </motion.span>
              <span className="text-gray-900">ソリューション</span>
            </motion.span>
          </motion.h2>
          
          {/* サブタイトル */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <p className="text-xl md:text-2xl text-gray-700 font-medium leading-relaxed mb-2">
              SNSを起点とした成長戦略から、コンバージョンを最大化するWebサイト制作、業務効率化まで、
            </p>
            <motion.p
              className="text-2xl md:text-3xl font-bold text-gray-900"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.6, type: "spring", stiffness: 100 }}
            >
              ワンストップで貴社の事業価値を最大化します
            </motion.p>
          </motion.div>
        </motion.div>
        
        {/* カードグリッド */}
        <div className="relative">
          <ConnectionLines />
          <div className="grid lg:grid-cols-3 gap-8 relative z-10">
            {features.map((feature, index) => (
              <FeatureCard key={index} feature={feature} index={index} />
            ))}
          </div>
        </div>

        {/* セクション下部の装飾 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-20 text-center"
        >
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-white/60 backdrop-blur-sm rounded-full border border-gray-200/50">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
            />
            <span className="text-gray-700 font-medium">エンタープライズグレードのソリューション</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}