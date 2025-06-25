'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaBrain, FaRocket, FaShieldAlt, FaChartLine, FaCode, FaCloud } from 'react-icons/fa'
import { useEffect, useState } from 'react'

const features = [
  {
    icon: FaBrain,
    title: 'AI-Powered Intelligence',
    description: 'Advanced machine learning algorithms that adapt and evolve with your needs',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: FaRocket,
    title: 'Lightning Fast Performance',
    description: 'Optimized for speed with cutting-edge caching and edge computing',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: FaShieldAlt,
    title: 'Enterprise Security',
    description: 'Military-grade encryption and zero-trust architecture',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    icon: FaChartLine,
    title: 'Real-time Analytics',
    description: 'Powerful insights with live data visualization and predictive modeling',
    gradient: 'from-orange-500 to-red-500',
  },
  {
    icon: FaCode,
    title: 'Developer First',
    description: 'Comprehensive APIs and SDKs for seamless integration',
    gradient: 'from-indigo-500 to-purple-500',
  },
  {
    icon: FaCloud,
    title: 'Cloud Native',
    description: 'Built for scale with auto-scaling and global distribution',
    gradient: 'from-teal-500 to-blue-500',
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
        
        <div className={`bg-gradient-to-r ${feature.gradient} p-4 rounded-lg inline-block mb-6`}>
          <feature.icon className="text-3xl text-white" />
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
          <h2 className="text-5xl font-bold mb-4">
            <span className="text-gradient">Revolutionary Features</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Experience the future of technology with our comprehensive suite of advanced features
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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