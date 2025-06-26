'use client'

import { useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import dynamic from 'next/dynamic'
import { FaReact, FaRocket, FaChartLine } from 'react-icons/fa'
import { SiTypescript, SiGraphql, SiKubernetes, SiTensorflow } from 'react-icons/si'
import AlternatingImages from './AlternatingImages'
import ImageWithFallback from './ImageWithFallback'
import PremiumAchievements from './PremiumAchievements'

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false })

const codeExamples = {
  react: `// Advanced React Component with Hooks
import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export const FutureComponent = () => {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  
  const fetchData = useCallback(async () => {
    const response = await fetch('/api/future-tech')
    const result = await response.json()
    setData(result)
    setIsLoading(false)
  }, [])
  
  useEffect(() => {
    fetchData()
  }, [fetchData])
  
  return (
    <AnimatePresence>
      {!isLoading && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
        >
          {/* Futuristic UI */}
        </motion.div>
      )}
    </AnimatePresence>
  )
}`,
  python: `# AI-Powered Data Processing
import tensorflow as tf
import numpy as np
from typing import List, Tuple

class FutureAI:
    def __init__(self, model_path: str):
        self.model = tf.keras.models.load_model(model_path)
        self.preprocessor = DataPreprocessor()
    
    async def predict(self, data: np.ndarray) -> Tuple[float, List[float]]:
        """Generate predictions with confidence scores"""
        processed = self.preprocessor.transform(data)
        predictions = self.model.predict(processed)
        
        confidence = float(np.max(predictions))
        results = predictions.tolist()
        
        return confidence, results
    
    def optimize_performance(self):
        """Optimize model for production"""
        self.model = tf.lite.TFLiteConverter.from_keras_model(self.model)
        self.model.optimizations = [tf.lite.Optimize.DEFAULT]`,
  typescript: `// Advanced TypeScript with Generics
interface FutureAPI<T, R> {
  endpoint: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  transform?: (data: T) => R
}

class APIClient {
  private baseURL: string
  private cache = new Map<string, any>()
  
  constructor(baseURL: string) {
    this.baseURL = baseURL
  }
  
  async request<T, R = T>(
    config: FutureAPI<T, R>
  ): Promise<R> {
    const cacheKey = \`\${config.method}:\${config.endpoint}\`
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)
    }
    
    const response = await fetch(\`\${this.baseURL}\${config.endpoint}\`, {
      method: config.method,
      headers: { 'Content-Type': 'application/json' }
    })
    
    const data: T = await response.json()
    const result = config.transform ? config.transform(data) : data as unknown as R
    
    this.cache.set(cacheKey, result)
    return result
  }
}`,
}

const partnerships = [
  { 
    name: 'StuDXIA', 
    description: '国内最大級のDXコミュニティ',
    details: '慶應義塾大学を中心に、東京大学、早稲田大学の学生、上場企業・テック企業が連携',
    imageName: 'StudXIA',
    color: 'from-blue-500 to-cyan-500' 
  },
  { 
    name: '羅針盤', 
    description: '東京大学キャリア支援団体',
    details: '公式ウェブサイト制作を担当し、学生のキャリア形成を技術面でサポート',
    imageName: 'rashinban',
    color: 'from-purple-500 to-pink-500' 
  },
]


export default function TechShowcase() {
  const [selectedLang, setSelectedLang] = useState<keyof typeof codeExamples>('react')
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [50, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  
  return (
    <section ref={sectionRef} className="py-20 px-6 relative overflow-hidden">
      {/* Dynamic background gradient */}
      <motion.div 
        className="absolute inset-0 opacity-20"
        style={{ y }}
      >
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary-dark rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-primary-blue rounded-full blur-3xl opacity-30" />
      </motion.div>
      
      <div className="container mx-auto relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-5xl font-bold text-center mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          >
            <motion.span 
              className="text-gradient inline-block"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              style={{
                backgroundSize: "200% 200%",
                backgroundImage: "linear-gradient(90deg, #00d9ff, #9333ea, #ff006e, #00d9ff)"
              }}
            >
              信頼の
            </motion.span>
            <motion.span
              className="inline-block ml-2 text-6xl"
              initial={{ opacity: 0, rotateX: -90 }}
              whileInView={{ opacity: 1, rotateX: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              whileHover={{ scale: 1.1, textShadow: "0 0 40px rgba(147, 51, 234, 0.8)" }}
            >
              源泉
            </motion.span>
          </motion.h2>
          
          <div className="max-w-4xl mx-auto mb-12">
            <motion.h3 
              className="text-2xl font-bold text-center mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <motion.span
                className="inline-block"
                whileHover={{ scale: 1.05 }}
                animate={{ 
                  color: ["#00d9ff", "#ffffff", "#00d9ff"],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                次世代をリードするコミュニティからの、
              </motion.span>
              <motion.span
                className="inline-block text-primary-dark font-bold"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                確かな信頼。
              </motion.span>
            </motion.h3>
            
            <motion.div 
              className="glass-effect rounded-lg p-8 mb-8 relative overflow-hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              whileHover={{ boxShadow: "0 0 50px rgba(0, 217, 255, 0.3)" }}
            >
              {/* Animated border gradient */}
              <motion.div 
                className="absolute inset-0 rounded-lg opacity-30"
                animate={{
                  background: [
                    "linear-gradient(45deg, #00d9ff, transparent, #9333ea)",
                    "linear-gradient(225deg, #9333ea, transparent, #ff006e)",
                    "linear-gradient(45deg, #ff006e, transparent, #00d9ff)",
                  ],
                }}
                transition={{ duration: 6, repeat: Infinity }}
                style={{ padding: "2px", backgroundClip: "content-box" }}
              />
              
              <motion.p 
                className="text-lg leading-relaxed text-gray-300 mb-6 relative z-10"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                私たちの技術力とデザイン性は、次世代をリードするコミュニティからの確かな信頼に裏付けられています。
              </motion.p>
              
              <motion.p 
                className="text-lg leading-relaxed text-gray-300 mb-6 relative z-10"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                代表が創設した
                <motion.span 
                  className="text-primary-blue font-bold inline-block mx-1"
                  whileHover={{ scale: 1.1, textShadow: "0 0 20px rgba(0, 217, 255, 0.8)" }}
                >
                  『StuDXIA』
                </motion.span>
                は、慶應義塾大学を中心に、東京大学や早稲田大学の学生、さらには上場企業やテック企業とも連携する、
                <motion.span 
                  className="text-gradient font-semibold inline-block mx-1"
                  animate={{ 
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  国内最大級のDXコミュニティ
                </motion.span>
                です。
              </motion.p>
              
              <motion.p 
                className="text-lg leading-relaxed text-gray-300 relative z-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                また、東京大学のキャリア支援団体
                <motion.span 
                  className="text-primary-dark font-bold inline-block mx-1"
                  whileHover={{ scale: 1.1, textShadow: "0 0 20px rgba(147, 51, 234, 0.8)" }}
                >
                  『羅針盤』
                </motion.span>
                の公式ウェブサイト制作も担当。これらの実績こそが、我々が信頼できるプロフェッショナルな開発パートナーであることの何よりの証明です。
              </motion.p>
            </motion.div>
          </div>
          
          {/* パートナーシップセクション */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {partnerships.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ 
                  delay: index * 0.2,
                  duration: 0.8,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(0, 217, 255, 0.3)",
                  transition: { duration: 0.3 }
                }}
                className="glass-effect p-8 rounded-lg relative overflow-hidden"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Dynamic background pulse */}
                <motion.div
                  className="absolute inset-0 opacity-10"
                  animate={{
                    background: [
                      `radial-gradient(circle at 20% 50%, ${partner.color.split(' ')[1]}, transparent 50%)`,
                      `radial-gradient(circle at 80% 50%, ${partner.color.split(' ')[3]}, transparent 50%)`,
                      `radial-gradient(circle at 20% 50%, ${partner.color.split(' ')[1]}, transparent 50%)`,
                    ],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                
                <div className="flex items-center gap-6 relative z-10">
                  <motion.div 
                    className="w-20 h-20 flex-shrink-0"
                    whileHover={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <ImageWithFallback
                      baseName={partner.imageName}
                      alt={`${partner.name} Logo`}
                      width={80}
                      height={80}
                      className="rounded-lg border border-white/20 shadow-lg"
                    />
                  </motion.div>
                  
                  <div className="flex-1">
                    <motion.h4 
                      className="text-2xl font-bold mb-2"
                      whileHover={{ scale: 1.05 }}
                    >
                      <span className={`bg-gradient-to-r ${partner.color} bg-clip-text text-transparent`}>
                        {partner.name}
                      </span>
                    </motion.h4>
                    <motion.p 
                      className="text-lg font-semibold mb-3 text-primary-blue"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      {partner.description}
                    </motion.p>
                    <motion.p 
                      className="text-sm text-gray-400 leading-relaxed"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      {partner.details}
                    </motion.p>
                  </div>
                </div>
                
                {/* Hover glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-lg opacity-0"
                  whileHover={{ opacity: 1 }}
                  style={{
                    background: `linear-gradient(45deg, ${partner.color.split(' ')[1]}20, ${partner.color.split(' ')[3]}20)`,
                    filter: "blur(20px)",
                  }}
                />
              </motion.div>
            ))}
          </div>
          
          {/* Premium Achievements Section */}
          <PremiumAchievements />
          
          <motion.div 
            className="glass-effect rounded-lg p-8 relative overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            whileHover={{ boxShadow: "0 0 60px rgba(147, 51, 234, 0.2)" }}
          >
            {/* Animated particles background */}
            <motion.div
              className="absolute inset-0 opacity-5"
              animate={{
                backgroundImage: [
                  "radial-gradient(circle at 10% 20%, #9333ea 0%, transparent 50%)",
                  "radial-gradient(circle at 80% 80%, #00d9ff 0%, transparent 50%)",
                  "radial-gradient(circle at 10% 20%, #9333ea 0%, transparent 50%)",
                ],
              }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            
            <motion.h3 
              className="text-3xl font-bold text-center mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, type: "spring" }}
            >
              <motion.span 
                className="text-gradient inline-block"
                animate={{
                  textShadow: [
                    "0 0 20px rgba(147, 51, 234, 0.5)",
                    "0 0 40px rgba(0, 217, 255, 0.5)",
                    "0 0 20px rgba(147, 51, 234, 0.5)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                代表者について
              </motion.span>
            </motion.h3>
            
            <div className="flex flex-col lg:flex-row items-center gap-8 relative z-10 px-4 sm:px-6 lg:px-0">
              <motion.div 
                className="w-full lg:w-1/3 flex justify-center"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <motion.div 
                  className="w-40 h-40 sm:w-48 sm:h-48 lg:w-80 lg:h-80 relative flex-shrink-0"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <AlternatingImages
                    images={['me1', 'me2']}
                    alt="山本公才 / Kousai Yamamoto"
                    className="rounded-full border-4 border-primary-blue/30 drop-shadow-[0_0_15px_rgba(14,165,233,0.3)] w-full h-full object-cover"
                    interval={3000}
                  />
                  {/* Rotating glow ring */}
                  <motion.div
                    className="absolute inset-0 rounded-full border-4 border-transparent"
                    style={{
                      borderTopColor: "rgba(0, 217, 255, 0.3)",
                      borderRightColor: "rgba(147, 51, 234, 0.3)",
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  />
                </motion.div>
              </motion.div>
              
              <motion.div 
                className="w-full lg:w-2/3 text-center lg:text-left px-4 sm:px-0"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <motion.h4 
                  className="text-2xl font-bold mb-2"
                  whileHover={{ scale: 1.02 }}
                >
                  <span className="text-primary-blue" style={{ textShadow: "0 0 10px rgba(14, 165, 233, 0.3)" }}>
                    山本 公才 / Kousai Yamamoto
                  </span>
                </motion.h4>
                <motion.p 
                  className="text-lg font-semibold mb-4 text-primary-dark"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  style={{ textShadow: "0 0 15px rgba(147, 51, 234, 0.5)" }}
                >
                  Luminous Core 主宰
                </motion.p>
                
                <div className="text-gray-300 leading-relaxed space-y-4">
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    慶應義塾大学経済学部出身。在学中より経理代行事業での起業を経験し、ビジネスの現場におけるリアルな課題解決に取り組む。
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    その経験からデジタル分野の可能性を確信し、多様な才能を集めて学生団体「StuDXIA」を創設。
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    現在は、論理的なビジネス・AIの知見と、モデルとしても活動する表現力を掛け合わせ、独自の視点で企業の課題解決に挑む。
                    <motion.span 
                      className="text-primary-blue font-semibold inline-block"
                      whileHover={{ scale: 1.05, textShadow: "0 0 10px rgba(14, 165, 233, 0.5)" }}
                    >
                      IT資格や簿記資格
                    </motion.span>
                    も、その多角的な視点を支えている。
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="font-semibold"
                  >
                    アカデミックな知見とビジネスの最前線を繋ぎ、データとAIを駆使してクライアントの事業価値を最大化することを使命とする。
                  </motion.p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}