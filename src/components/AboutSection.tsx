'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function AboutSection() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })
  
  return (
    <section ref={ref} className="py-20 px-6">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-5xl font-bold text-center mb-12">
            <span className="text-gradient">Luminous Coreについて</span>
          </h2>
          
          <div className="glass-effect rounded-lg p-8 md:p-12">
            <p className="text-xl leading-relaxed text-gray-300">
              Luminous Coreは、<span className="text-neon-blue font-semibold">SNSを起点として、クライアントの事業成果を最大化する</span>グローステック・カンパニーです。
            </p>
            
            <br/>
            
            <p className="text-xl leading-relaxed text-gray-300">
              独自の<span className="text-neon-purple font-semibold">AI技術と専門チームによる戦略的なSNS運用</span>を軸に、成果に必要な<span className="text-neon-pink font-semibold">ウェブサイト制作やカスタムツールの開発</span>まで、ワンストップで手掛けます。
            </p>
            
            <div className="mt-8 flex justify-center">
              <div className="inline-flex items-center gap-2 glass-effect px-6 py-3 rounded-full">
                <div className="w-2 h-2 rounded-full bg-neon-blue animate-pulse" />
                <span className="text-sm text-gray-400">グローステック・カンパニー</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}