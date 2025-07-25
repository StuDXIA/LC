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
    gradient: 'from-primary to-primary-dark',
    glowColor: 'primary',
    delay: 0
  },
  { 
    icon: FaRocket, 
    name: 'リード獲得', 
    metric: '+30',
    unit: '件/月',
    description: '戦略的SNS運用による\n月間新規リード獲得\n+30件以上',
    gradient: 'from-primary-dark to-primary',
    glowColor: 'primary-dark',
    delay: 0.2
  },
  { 
    icon: FaReact, 
    name: '業務効率化', 
    metric: '50%',
    description: 'カスタムツール導入による\n特定業務の作業時間\n50%削減',
    gradient: 'from-primary to-primary-dark',
    glowColor: 'primary',
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
      <div className="relative bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 sm:p-8 h-full overflow-hidden group-hover:border-gray-300 group-hover:shadow-2xl transition-all duration-500">
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
          <h4 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-900 transition-all duration-500">
            {achievement.name}
          </h4>

          {/* Large metric display */}
          <div className="mb-4 sm:mb-6">
            <motion.div 
              className={`text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-br ${achievement.gradient} bg-clip-text text-transparent`}
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
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-line group-hover:text-gray-800 transition-colors duration-500">
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
    <section id="achievements" ref={sectionRef} className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 relative overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Section header with elegant animations */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <motion.h3 
          className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 relative"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <span className="text-gray-900">
            私たちが実現した
          </span>
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600">
            具体的な成果
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
          className="text-gray-600 text-base sm:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed px-4 sm:px-0"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          実際のクライアント様と共に達成した、
          <span className="text-green-600 font-bold">計測可能な成果</span>
          の一例をご紹介します。
        </motion.p>
      </motion.div>

      {/* Achievement cards grid */}
      <div className="container mx-auto relative z-10 max-w-7xl">
        <div className="grid lg:grid-cols-3 gap-8">
          {achievements.map((achievement, index) => (
            <AchievementCard 
              key={achievement.name} 
              achievement={achievement} 
              index={index} 
            />
          ))}
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 -left-40 w-96 h-96 bg-green-100 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-1/3 -right-40 w-96 h-96 bg-yellow-100 rounded-full blur-3xl opacity-20" />
      </div>
    </section>
  )
}