'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'

interface ServicePhase {
  id: string
  phase: string
  title: string
  subtitle: string
  description: string
  mainMetric: {
    value: string
    label: string
    comparison: string
  }
  visualType: 'network' | 'funnel' | 'automation'
  benefits: string[]
  cta: {
    text: string
    action: string
  }
  iconImage: string
  accent: string
  gradient: string
}

const servicePhases: ServicePhase[] = [
  {
    id: 'awareness',
    phase: 'Phase 1',
    title: '認知拡大',
    subtitle: '戦略的SNSグロース',
    description: 'データドリブンな戦略で、ターゲット層にリーチし続ける成長エンジンを構築',
    mainMetric: {
      value: '320%',
      label: '年間フォロワー成長率',
      comparison: '業界平均の4.2倍'
    },
    visualType: 'network',
    benefits: [
      'AI分析による最適投稿時間',
      'ターゲット層の精密な特定',
      'バイラルコンテンツ戦略'
    ],
    cta: {
      text: '無料アカウント分析',
      action: 'analyze-sns'
    },
    iconImage: '/LC1.png',
    accent: '#3B82F6',
    gradient: 'from-blue-600 to-cyan-500'
  },
  {
    id: 'conversion',
    phase: 'Phase 2',
    title: '顧客獲得',
    subtitle: 'コンバージョン特化型Web制作',
    description: 'SNSからの流入を確実に成果へ。心理学とデータに基づく最適化されたWeb体験',
    mainMetric: {
      value: '5.2%',
      label: '平均コンバージョン率',
      comparison: '一般サイトの2.6倍'
    },
    visualType: 'funnel',
    benefits: [
      'A/Bテストによる継続改善',
      'ヒートマップ分析で最適化',
      'モバイルファースト設計'
    ],
    cta: {
      text: 'サイト無料診断',
      action: 'audit-website'
    },
    iconImage: '/LC2.png',
    accent: '#60A5FA',
    gradient: 'from-blue-500 to-purple-500'
  },
  {
    id: 'optimization',
    phase: 'Phase 3',
    title: '業務最適化',
    subtitle: 'AIカスタム開発',
    description: '獲得した顧客への対応を自動化・効率化。人的リソースを戦略的業務へシフト',
    mainMetric: {
      value: '78%',
      label: '業務時間削減',
      comparison: '年間2,400時間の創出'
    },
    visualType: 'automation',
    benefits: [
      'カスタムAI自動化ツール',
      'レガシーシステム統合',
      '24/7自動対応システム'
    ],
    cta: {
      text: '業務課題ヒアリング',
      action: 'consult-automation'
    },
    iconImage: '/LC3.png',
    accent: '#1E40AF',
    gradient: 'from-purple-600 to-pink-500'
  }
]

// Visual components for each service type
function NetworkVisual({ isActive }: { isActive: boolean }) {
  const nodes = Array.from({ length: 7 }, (_, i) => ({
    id: i,
    x: 50 + (i % 3) * 40 + (Math.random() - 0.5) * 20,
    y: 50 + Math.floor(i / 3) * 40 + (Math.random() - 0.5) * 20,
    size: 4 + Math.random() * 4
  }))

  return (
    <svg viewBox="0 0 150 150" className="w-full h-full">
      {/* Connections */}
      {nodes.map((node, i) => 
        nodes.slice(i + 1).map((target, j) => (
          <motion.line
            key={`${i}-${j}`}
            x1={node.x}
            y1={node.y}
            x2={target.x}
            y2={target.y}
            stroke="#3B82F6"
            strokeWidth="0.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isActive ? { pathLength: 1, opacity: 0.3 } : { pathLength: 0, opacity: 0 }}
            transition={{ duration: 1, delay: i * 0.1 }}
          />
        ))
      )}
      {/* Nodes */}
      {nodes.map((node, i) => (
        <motion.circle
          key={node.id}
          cx={node.x}
          cy={node.y}
          r={node.size}
          fill="#3B82F6"
          initial={{ scale: 0 }}
          animate={isActive ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
        />
      ))}
    </svg>
  )
}

function FunnelVisual({ isActive }: { isActive: boolean }) {
  const levels = [
    { width: 100, y: 20, value: '10,000' },
    { width: 70, y: 50, value: '3,500' },
    { width: 40, y: 80, value: '520' }
  ]

  return (
    <svg viewBox="0 0 150 150" className="w-full h-full">
      {levels.map((level, i) => (
        <g key={i}>
          <motion.rect
            x={(150 - level.width) / 2}
            y={level.y}
            width={level.width}
            height={25}
            fill="#60A5FA"
            opacity={0.3 + i * 0.2}
            initial={{ scaleY: 0 }}
            animate={isActive ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
            style={{ originY: `${level.y}px` }}
          />
          <motion.text
            x={75}
            y={level.y + 17}
            textAnchor="middle"
            fill="white"
            fontSize="10"
            fontWeight="bold"
            initial={{ opacity: 0 }}
            animate={isActive ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: i * 0.2 + 0.3 }}
          >
            {level.value}
          </motion.text>
        </g>
      ))}
    </svg>
  )
}

function AutomationVisual({ isActive }: { isActive: boolean }) {
  return (
    <svg viewBox="0 0 150 150" className="w-full h-full">
      {/* Flow lines */}
      <motion.path
        d="M 30 30 L 75 30 L 75 75 L 120 75"
        stroke="#1E40AF"
        strokeWidth="2"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={isActive ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 1 }}
      />
      <motion.path
        d="M 30 120 L 75 120 L 75 75"
        stroke="#1E40AF"
        strokeWidth="2"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={isActive ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      />
      
      {/* Process nodes */}
      {[
        { x: 30, y: 30, label: 'Input' },
        { x: 75, y: 75, label: 'AI' },
        { x: 120, y: 75, label: 'Output' },
        { x: 30, y: 120, label: 'Data' }
      ].map((node, i) => (
        <g key={i}>
          <motion.rect
            x={node.x - 15}
            y={node.y - 15}
            width={30}
            height={30}
            rx={i === 1 ? 15 : 4}
            fill="#1E40AF"
            initial={{ scale: 0 }}
            animate={isActive ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
          />
          <motion.text
            x={node.x}
            y={node.y + 1}
            textAnchor="middle"
            fill="white"
            fontSize="8"
            fontWeight="bold"
            initial={{ opacity: 0 }}
            animate={isActive ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: i * 0.2 + 0.3 }}
          >
            {node.label}
          </motion.text>
        </g>
      ))}
    </svg>
  )
}

function ServicePhaseCard({ phase, index, isActive, onActivate }: {
  phase: ServicePhase
  index: number
  isActive: boolean
  onActivate: () => void
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]))
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]))
  
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

  const visualComponents = {
    network: NetworkVisual,
    funnel: FunnelVisual,
    automation: AutomationVisual
  }
  const VisualComponent = visualComponents[phase.visualType]

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2, duration: 0.8 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        setIsHovered(true)
        onActivate()
      }}
      onMouseLeave={handleMouseLeave}
      onClick={() => setShowDetails(!showDetails)}
      style={{
        rotateX: isActive ? rotateX : 0,
        rotateY: isActive ? rotateY : 0,
        transformStyle: 'preserve-3d'
      }}
      className={`relative cursor-pointer transition-all duration-500 ${
        isActive ? 'z-20' : 'z-10'
      }`}
    >
      <div className={`relative h-full rounded-2xl border overflow-hidden transition-all duration-500 ${
        isActive 
          ? 'bg-white shadow-2xl border-gray-200 scale-105' 
          : 'bg-gray-50/50 shadow-lg border-gray-200/50 scale-100'
      }`}>
        {/* Phase indicator */}
        <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
          isActive ? 'bg-gradient-to-r ' + phase.gradient + ' text-white' : 'bg-gray-200 text-gray-600'
        }`}>
          {phase.phase}
        </div>

        {/* Visual representation */}
        <div className="absolute top-4 right-4 w-32 h-32 opacity-20">
          <VisualComponent isActive={isActive} />
        </div>

        <div className="relative p-8 pt-12">
          {/* Title section */}
          <div className="mb-6">
            <h3 className={`text-3xl font-bold mb-2 transition-colors duration-300 ${
              isActive ? 'text-gray-900' : 'text-gray-700'
            }`}>
              {phase.title}
            </h3>
            <p className={`text-lg font-medium transition-colors duration-300 ${
              isActive ? 'text-' + phase.accent.replace('#', 'blue-600') : 'text-gray-500'
            }`}>
              {phase.subtitle}
            </p>
          </div>

          {/* Main metric - always visible */}
          <motion.div
            className={`mb-6 p-6 rounded-xl transition-all duration-300 ${
              isActive ? 'bg-gradient-to-br ' + phase.gradient + ' text-white' : 'bg-gray-100'
            }`}
            animate={isActive ? { scale: [1, 1.02, 1] } : { scale: 1 }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className={`text-5xl font-bold mb-2 ${isActive ? '' : 'text-gray-800'}`}>
              {phase.mainMetric.value}
            </div>
            <div className={`text-sm font-medium ${isActive ? 'text-white/90' : 'text-gray-600'}`}>
              {phase.mainMetric.label}
            </div>
            <div className={`text-xs mt-1 ${isActive ? 'text-white/70' : 'text-gray-500'}`}>
              {phase.mainMetric.comparison}
            </div>
          </motion.div>

          {/* Description */}
          <p className={`text-base mb-6 transition-all duration-300 ${
            isActive ? 'text-gray-700' : 'text-gray-600'
          }`}>
            {phase.description}
          </p>

          {/* Expandable benefits */}
          <AnimatePresence>
            {(isActive || showDetails) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-6 overflow-hidden"
              >
                <div className="space-y-3 pt-4 border-t border-gray-200">
                  {phase.benefits.map((benefit, i) => (
                    <motion.div
                      key={i}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: phase.accent }} />
                      <span className="text-sm text-gray-700">{benefit}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`w-full py-3 px-6 rounded-xl font-medium transition-all duration-300 ${
              isActive 
                ? 'bg-gradient-to-r ' + phase.gradient + ' text-white shadow-lg' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {phase.cta.text}
          </motion.button>
        </div>

        {/* Connection indicator */}
        {index < servicePhases.length - 1 && (
          <div className="absolute -right-8 top-1/2 -translate-y-1/2 z-30">
            <motion.svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              initial={{ opacity: 0 }}
              animate={{ opacity: isActive ? 1 : 0.3 }}
              transition={{ duration: 0.3 }}
            >
              <motion.path
                d="M 10 20 L 30 20"
                stroke={phase.accent}
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: isActive ? 1 : 0 }}
                transition={{ duration: 0.5 }}
              />
              <motion.polygon
                points="30,20 25,17 25,23"
                fill={phase.accent}
                initial={{ scale: 0 }}
                animate={{ scale: isActive ? 1 : 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              />
            </motion.svg>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default function CoreServices() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [activePhase, setActivePhase] = useState(0)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [50, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  // Auto-rotate phases
  useEffect(() => {
    const interval = setInterval(() => {
      setActivePhase((prev) => (prev + 1) % servicePhases.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section ref={sectionRef} className="py-24 px-6 relative overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Dynamic background */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ y, opacity }}
      >
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-20" />
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
            事業成長の
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              ジャーニー
            </span>
            を設計
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            認知拡大から顧客獲得、そして業務最適化まで。
            <br />
            各フェーズに最適なソリューションで、持続的な成長を実現します
          </p>
        </motion.div>

        {/* Journey visualization */}
        <div className="relative mb-12">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2" />
          <motion.div
            className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 -translate-y-1/2"
            initial={{ width: '0%' }}
            animate={{ width: `${((activePhase + 1) / servicePhases.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Service cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {servicePhases.map((phase, index) => (
            <ServicePhaseCard
              key={phase.id}
              phase={phase}
              index={index}
              isActive={activePhase === index}
              onActivate={() => setActivePhase(index)}
            />
          ))}
        </div>

        {/* Value proposition */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <p className="text-lg text-gray-700 font-medium">
            すべてのフェーズを
            <span className="text-blue-600 font-bold mx-1">ワンストップ</span>
            で支援し、
            <span className="text-purple-600 font-bold mx-1">相乗効果</span>
            を最大化
          </p>
        </motion.div>
      </div>
    </section>
  )
}