'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import dynamic from 'next/dynamic'
import { FaReact, FaRocket, FaChartLine } from 'react-icons/fa'
import { SiTypescript, SiGraphql, SiKubernetes, SiTensorflow } from 'react-icons/si'
import AlternatingImages from './AlternatingImages'

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

const achievements = [
  { icon: FaReact, name: 'StuDXIA', description: '慶應・東大・早稲田等\n国内最大級DXコミュニティ', color: 'text-blue-400' },
  { icon: SiTypescript, name: '羅針盤', description: '東京大学\nキャリア支援団体', color: 'text-blue-600' },
  { icon: FaChartLine, name: 'CVR向上', description: 'お問い合わせ転換率\n平均+15%以上', color: 'text-green-500' },
  { icon: FaRocket, name: 'リード獲得', description: '戦略的SNS運用による\n月間新規+30件以上', color: 'text-yellow-400' },
]

export default function TechShowcase() {
  const [selectedLang, setSelectedLang] = useState<keyof typeof codeExamples>('react')
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })
  
  return (
    <section ref={ref} className="py-20 px-6">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl font-bold text-center mb-4">
            <span className="text-gradient">信頼の源泉</span>
          </h2>
          <p className="text-center text-gray-400 mb-12 text-lg">
            次世代をリードするコミュニティからの、確かな信頼
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.1 }}
                className="glass-effect p-6 rounded-lg hover-lift text-center"
              >
                <achievement.icon className={`text-5xl ${achievement.color} mx-auto mb-3`} />
                <p className="font-bold text-lg mb-2">{achievement.name}</p>
                <p className="text-sm text-gray-400 whitespace-pre-line">{achievement.description}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="glass-effect rounded-lg p-8">
            <h3 className="text-3xl font-bold text-center mb-6">
              <span className="text-gradient">代表者について</span>
            </h3>
            
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="lg:w-1/3">
                <div className="relative w-48 h-48 mx-auto">
                  <AlternatingImages
                    images={['me1', 'me2']}
                    alt="山本公才 / Kousai Yamamoto"
                    width={192}
                    height={192}
                    className="rounded-full border-4 border-neon-blue/30 drop-shadow-[0_0_30px_rgba(0,217,255,0.5)]"
                    interval={3000}
                  />
                </div>
              </div>
              
              <div className="lg:w-2/3 text-center lg:text-left">
                <h4 className="text-2xl font-bold mb-2 text-neon-blue">山本 公才 / Kousai Yamamoto</h4>
                <p className="text-lg font-semibold mb-4 text-neon-purple">Luminous Core 主宰</p>
                
                <div className="text-gray-300 leading-relaxed space-y-4">
                  <p>
                    慶應義塾大学経済学部出身。在学中より経理代行事業での起業を経験し、ビジネスの現場におけるリアルな課題解決に取り組む。
                  </p>
                  <p>
                    その経験からデジタル分野の可能性を確信し、多様な才能を集めて学生団体「StuDXIA」を創設。
                  </p>
                  <p>
                    現在は、論理的なビジネス・AIの知見と、モデルとしても活動する表現力を掛け合わせ、独自の視点で企業の課題解決に挑む。
                    <span className="text-neon-blue font-semibold">IT資格や簿記資格</span>も、その多角的な視点を支えている。
                  </p>
                  <p>
                    アカデミックな知見とビジネスの最前線を繋ぎ、データとAIを駆使してクライアントの事業価値を最大化することを使命とする。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}