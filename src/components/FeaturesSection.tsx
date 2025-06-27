'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'

const features = [
  {
    iconImage: '/LC1.png',
    title: '戦略的SNSグロース',
    description: 'データ分析とトレンド洞察に基づき、「運用」だけではなく、事業成果に繋がる「成長戦略」を設計・実行します。',
    gradient: 'from-blue-500 to-cyan-500',
    accentColor: '#3B82F6',
    bgMesh: 'polygon(0 0, 100% 0, 100% 75%, 0 100%)',
    iconBg: 'linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%)'
  },
  {
    iconImage: '/LC2.png',
    title: 'コンバージョン特化型Webサイト制作',
    description: 'SNSからのアクセスを、確実に「問い合わせ」や「購入」に繋げる、成果コミット型のウェブサイトを制作します。',
    gradient: 'from-purple-500 to-pink-500',
    accentColor: '#A855F7',
    bgMesh: 'polygon(0 25%, 100% 0, 100% 100%, 0 75%)',
    iconBg: 'linear-gradient(135deg, #A855F7 0%, #EC4899 100%)'
  },
  {
    iconImage: '/LC3.png',
    title: '業務効率化のためのカスタム開発',
    description: '属人的な作業や非効率なプロセスを、AIとテクノロジーで解決。貴社の課題に合わせたツールを開発します。',
    gradient: 'from-orange-500 to-red-500',
    accentColor: '#F97316',
    bgMesh: 'polygon(0 0, 100% 25%, 100% 100%, 0 100%)',
    iconBg: 'linear-gradient(135deg, #F97316 0%, #EF4444 100%)'
  },
]


function FeatureCard({ feature, index }: { feature: typeof features[0], index: number }) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        delay: index * 0.15,
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1]
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative"
    >
      {/* メインカード - Apple風のミニマルデザイン */}
      <motion.div 
        className="relative h-full group"
        whileHover={{ y: -12 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* カード本体 */}
        <div className="relative h-full bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-shadow duration-500 overflow-hidden">
          {/* グラデーションメッシュ背景 */}
          <div 
            className="absolute inset-0 opacity-[0.02]"
            style={{
              background: `linear-gradient(135deg, ${feature.accentColor}20 0%, transparent 50%)`,
              clipPath: feature.bgMesh
            }}
          />
          
          {/* コンテンツ */}
          <div className="relative z-10 p-8 h-full flex flex-col">
        
        
            {/* アイコンコンテナ */}
            <motion.div 
              className="mb-6 relative inline-block"
              animate={isHovered ? { scale: 1.05, rotate: -5 } : { scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div 
                className="w-14 h-14 rounded-xl flex items-center justify-center relative overflow-hidden"
                style={{ background: feature.iconBg }}
              >
                {/* アイコンのグロウ効果 */}
                <motion.div
                  className="absolute inset-0"
                  animate={isHovered ? {
                    background: [
                      "radial-gradient(circle at 50% 50%, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 100%)",
                      "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 100%)",
                      "radial-gradient(circle at 50% 50%, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 100%)"
                    ]
                  } : {}}
                  transition={{ duration: 1.5 }}
                />
                <Image 
                  src={feature.iconImage} 
                  alt={feature.title}
                  width={32}
                  height={32}
                  className="w-8 h-8 relative z-10"
                />
              </div>
            </motion.div>
        
            {/* タイトル */}
            <h3 className="text-xl font-semibold mb-4 text-gray-900">
              {feature.title}
            </h3>
        
            {/* 説明文 */}
            <p className="text-gray-600 leading-relaxed text-sm mb-6 flex-grow">
              {feature.description}
            </p>
        
            {/* CTAボタン */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.4 }}
              className="mt-auto"
            >
              <motion.button 
                className="text-sm font-medium flex items-center gap-2 group/btn"
                style={{ color: feature.accentColor }}
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span>詳しく見る</span>
                <motion.svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 16 16" 
                  fill="none"
                  animate={isHovered ? { x: 3 } : { x: 0 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <path 
                    d="M6 12L10 8L6 4" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </motion.svg>
              </motion.button>
            </motion.div>
        
          </div>
          
          {/* ホバー時のサイドアクセント */}
          <motion.div
            className="absolute left-0 top-0 bottom-0 w-1 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="h-full w-full"
              style={{ background: feature.iconBg }}
              initial={{ y: "-100%" }}
              animate={isHovered ? { y: 0 } : { y: "-100%" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
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
  
  
  return (
    <section ref={sectionRef} className="py-24 px-6 relative overflow-hidden bg-gray-50/30">
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
              デジタル戦略を起点とした成長戦略から、コンバージョンを最大化するWebサイト制作、業務効率化まで、
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
        <div className="grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>

      </div>
    </section>
  )
}