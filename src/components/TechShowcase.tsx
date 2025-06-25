'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import dynamic from 'next/dynamic'
import { FaReact, FaNodeJs, FaPython, FaDocker } from 'react-icons/fa'
import { SiTypescript, SiGraphql, SiKubernetes, SiTensorflow } from 'react-icons/si'

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

const technologies = [
  { icon: FaReact, name: 'React', color: 'text-blue-400' },
  { icon: SiTypescript, name: 'TypeScript', color: 'text-blue-600' },
  { icon: FaNodeJs, name: 'Node.js', color: 'text-green-500' },
  { icon: FaPython, name: 'Python', color: 'text-yellow-400' },
  { icon: SiGraphql, name: 'GraphQL', color: 'text-pink-500' },
  { icon: FaDocker, name: 'Docker', color: 'text-blue-500' },
  { icon: SiKubernetes, name: 'Kubernetes', color: 'text-blue-600' },
  { icon: SiTensorflow, name: 'TensorFlow', color: 'text-orange-500' },
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
            <span className="text-gradient">Technology Stack</span>
          </h2>
          <p className="text-center text-gray-400 mb-12 text-lg">
            Powered by cutting-edge technologies
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.1 }}
                className="glass-effect p-6 rounded-lg hover-lift text-center"
              >
                <tech.icon className={`text-5xl ${tech.color} mx-auto mb-3`} />
                <p className="font-semibold">{tech.name}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="glass-effect rounded-lg p-6">
            <div className="flex gap-4 mb-6">
              {Object.keys(codeExamples).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setSelectedLang(lang as keyof typeof codeExamples)}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    selectedLang === lang
                      ? 'bg-gradient-to-r from-neon-blue to-neon-purple'
                      : 'glass-effect hover:border-neon-blue'
                  }`}
                >
                  {lang.charAt(0).toUpperCase() + lang.slice(1)}
                </button>
              ))}
            </div>
            
            <div className="h-[400px] rounded-lg overflow-hidden neon-border">
              <MonacoEditor
                height="100%"
                language={selectedLang === 'react' ? 'javascript' : selectedLang}
                theme="vs-dark"
                value={codeExamples[selectedLang]}
                options={{
                  readOnly: true,
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  fontSize: 14,
                  wordWrap: 'on',
                  automaticLayout: true,
                }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}