'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useEffect, useState } from 'react'
import Image from 'next/image'

const features = [
  {
    iconImage: '/LC1.png',
    title: '戦略的SNSグロース',
    description: 'データ分析とトレンド洞察に基づき、単なる「運用」ではなく、事業成果に繋がる「成長戦略」を設計・実行します。アカウントのコンセプト設計から日々の運用、効果測定まで、SNS成長の全てをサポートします。',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    iconImage: '/LC2.png',
    title: 'コンバージョン特化型Webサイト/LP制作',
    description: 'SNSからのアクセスを、一滴も無駄にしない"受け皿"を構築します。デザイン性はもちろん、確実に「問い合わせ」や「購入」に繋げる、成果コミット型のウェブサイト及びランディングページを制作します。',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    iconImage: '/LC3.png',
    title: '業務効率化のためのカスタム開発',
    description: '属人的な作業や非効率なプロセスを、テクノロジーで解決します。業務を効率化するAIチャットボットや、SNSと連携する予約システムなど、貴社の課題に合わせたオーダーメイドのツールを開発します。',
    gradient: 'from-orange-500 to-red-500',
  },
]

function FeatureCard({ feature, index }: { feature: typeof features[0], index: number }) {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.05, rotateY: 5 }}
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <div className="glass-effect p-8 rounded-xl hover-lift h-full relative overflow-hidden">
        {isHovered && (
          <div
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 217, 255, 0.3), transparent 50%)`,
            }}
          />
        )}
        
        <div className="mb-6">
          <Image 
            src={feature.iconImage} 
            alt={feature.title}
            width={80}
            height={80}
            className="w-20 h-20 rounded-lg"
          />
        </div>
        
        <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
        <p className="text-gray-400">{feature.description}</p>
        
        <motion.div
          initial={{ width: 0 }}
          whileHover={{ width: '100%' }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-neon-blue to-neon-purple"
        />
      </div>
    </motion.div>
  )
}

export default function FeaturesSection() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [activeIndex, setActiveIndex] = useState(0)
  
  useEffect(() => {
    if (inView) {
      const interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % features.length)
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [inView])
  
  return (
    <section ref={ref} className="py-20 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-blue/5 to-transparent" />
      
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.h2 
            className="text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          >
            <motion.span className="text-gradient inline-block">
              事業成果に直結する、
            </motion.span>
            <br />
            <motion.span 
              className="text-gradient inline-block"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              3つの
              <motion.span
                className="inline-block mx-2 text-6xl"
                animate={{ 
                  color: ["#00d9ff", "#9333ea", "#ff006e", "#00d9ff"],
                  rotateY: [0, 360],
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                コア
              </motion.span>
              ソリューション
            </motion.span>
          </motion.h2>
          <motion.p 
            className="text-gray-400 text-lg max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <motion.span
              className="inline-block"
              whileHover={{ scale: 1.02, color: "#ffffff" }}
            >
              SNSを起点とした成長戦略から、コンバージョンを最大化するWebサイト制作、業務効率化まで、
            </motion.span>
            <br/>
            <motion.span
              className="inline-block font-semibold text-xl text-white"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              ワンストップで貴社の事業価値を最大化します
            </motion.span>
          </motion.p>
        </motion.div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 glass-effect px-6 py-3 rounded-full">
            <div className="flex gap-2">
              {features.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex ? 'bg-neon-blue w-8' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-400 ml-2">Auto-scrolling features</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}