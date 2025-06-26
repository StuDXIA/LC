'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { FaChartLine, FaRocket, FaReact } from 'react-icons/fa'

const achievements = [
  { 
    icon: FaChartLine, 
    name: 'CVR向上', 
    metric: '+15%',
    description: 'LP改修による\nお問い合わせ転換率\n平均+15%以上',
    gradient: 'from-emerald-400 via-green-500 to-emerald-600',
    glowColor: 'emerald-500',
    delay: 0
  },
  { 
    icon: FaRocket, 
    name: 'リード獲得', 
    metric: '+30',
    unit: '件/月',
    description: '戦略的SNS運用による\n月間新規リード獲得\n+30件以上',
    gradient: 'from-amber-400 via-yellow-500 to-orange-500',
    glowColor: 'yellow-500',
    delay: 0.2
  },
  { 
    icon: FaReact, 
    name: '業務効率化', 
    metric: '50%',
    description: 'カスタムツール導入による\n特定業務の作業時間\n50%削減',
    gradient: 'from-purple-400 via-violet-500 to-purple-600',
    glowColor: 'purple-500',
    delay: 0.4
  },
]

function CountUpNumber({ target, duration = 2000, prefix = '', suffix = '' }: {
  target: number
  duration?: number
  prefix?: string
  suffix?: string
}) {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref)

  useEffect(() => {
    if (inView && !hasStarted) {
      setHasStarted(true)
      let startTime: number
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / duration, 1)
        
        // Easing function for smoother animation
        const easeOut = 1 - Math.pow(1 - progress, 3)
        setCount(Math.floor(target * easeOut))
        
        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      requestAnimationFrame(animate)
    }
  }, [inView, hasStarted, target, duration])

  return (
    <span ref={ref} className="font-mono">
      {prefix}{count}{suffix}
    </span>
  )
}

function AchievementCard({ achievement, index }: { achievement: typeof achievements[0], index: number }) {
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

  // Parse metric for CountUp
  const getMetricValue = () => {
    const numericValue = parseInt(achievement.metric.replace(/[^\d]/g, ''))
    return numericValue
  }

  const getMetricPrefix = () => {
    return achievement.metric.includes('+') ? '+' : ''
  }

  const getMetricSuffix = () => {
    if (achievement.metric.includes('%')) return '%'
    if (achievement.unit) return achievement.unit
    return ''
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 80, scale: 0.8 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.8, 
        delay: achievement.delay,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        scale: 1.05,
        rotateY: 5,
        rotateX: 5,
        transition: { duration: 0.3 }
      }}
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      style={{ perspective: '1000px' }}
    >
      {/* Animated background blur */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className={`absolute inset-0 bg-gradient-to-br ${achievement.gradient} rounded-2xl blur-xl scale-110`} />
      </div>

      {/* Main card */}
      <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 h-full overflow-hidden group-hover:border-white/20 transition-all duration-500">
        {/* Gradient border effect */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className={`absolute inset-px bg-gradient-to-br ${achievement.gradient} rounded-2xl opacity-20`} />
        </div>

        {/* Dynamic light effect following mouse */}
        {isHovered && (
          <div
            className="absolute inset-0 opacity-30 pointer-events-none transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle 200px at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.1), transparent 70%)`,
            }}
          />
        )}

        {/* Content */}
        <div className="relative z-10">
          {/* Icon with pulsing glow */}
          <motion.div 
            className="mb-6 relative"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div 
              className="absolute inset-0 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-500"
              style={{ 
                transform: 'scale(1.5)',
                background: achievement.glowColor === 'emerald-500' ? '#10b981' : 
                           achievement.glowColor === 'yellow-500' ? '#eab308' : '#a855f7'
              }} 
            />
            <div className={`relative w-16 h-16 bg-gradient-to-br ${achievement.gradient} rounded-full flex items-center justify-center`}>
              <achievement.icon className="text-2xl text-white drop-shadow-lg" />
            </div>
          </motion.div>

          {/* Category name */}
          <h4 className="text-xl font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-gray-300 transition-all duration-500">
            {achievement.name}
          </h4>

          {/* Large metric display */}
          <div className="mb-6">
            <motion.div 
              className={`text-5xl font-black bg-gradient-to-br ${achievement.gradient} bg-clip-text text-transparent`}
              whileInView={{ scale: [0.8, 1.1, 1] }}
              transition={{ duration: 1, delay: achievement.delay + 0.5 }}
            >
              <CountUpNumber 
                target={getMetricValue()}
                prefix={getMetricPrefix()}
                suffix={getMetricSuffix()}
                duration={2500}
              />
            </motion.div>
          </div>

          {/* Description with elegant typography */}
          <p className="text-gray-300 leading-relaxed whitespace-pre-line group-hover:text-gray-200 transition-colors duration-500">
            {achievement.description}
          </p>

          {/* Bottom accent line */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            transition={{ duration: 1, delay: achievement.delay + 1 }}
            className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${achievement.gradient} rounded-full`}
          />
        </div>

        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full opacity-0 group-hover:opacity-60"
              style={{
                backgroundColor: achievement.glowColor === 'emerald-500' ? '#10b981' : 
                                achievement.glowColor === 'yellow-500' ? '#eab308' : '#a855f7',
                left: `${20 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
              animate={{
                y: [-20, -40, -20],
                opacity: isHovered ? [0, 0.6, 0] : 0,
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function PremiumAchievements() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef)

  return (
    <div ref={sectionRef} className="mb-16">
      {/* Section header with elegant animations */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <motion.h3 
          className="text-4xl font-bold mb-6 relative"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <span className="text-gradient bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
            私たちが提供する"成果"の一例。
          </span>
          
          {/* Subtle underline effect */}
          <motion.div
            initial={{ width: 0 }}
            animate={inView ? { width: '60%' } : {}}
            transition={{ duration: 1.2, delay: 0.8 }}
            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"
          />
        </motion.h3>
        
        <motion.p 
          className="text-gray-800 font-medium text-lg max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          我々は、全てのプロジェクトにおいて、計測可能な
          <span className="text-blue-700 font-bold">「数字」</span>
          の改善にコミットします。
        </motion.p>
      </motion.div>

      {/* Achievement cards grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {achievements.map((achievement, index) => (
          <AchievementCard 
            key={achievement.name} 
            achievement={achievement} 
            index={index} 
          />
        ))}
      </div>

      {/* Bottom decorative element */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1, delay: 1.5 }}
        className="mt-12 text-center"
      >
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-black/40 to-black/20 backdrop-blur-sm border border-white/10 rounded-full">
          <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-pulse" />
          <span className="text-sm text-gray-400 font-mono">Real-time Performance Metrics</span>
          <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>
      </motion.div>
    </div>
  )
}