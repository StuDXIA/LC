'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function AboutSection() {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true })
  
  return (
    <section id="about" className="py-24 sm:py-32 lg:py-40 px-4 sm:px-6 relative bg-white">
      {/* Ultra-minimal background accent */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-96 -right-96 w-[800px] h-[800px] bg-primary/[0.02] rounded-full blur-3xl" />
        <div className="absolute -bottom-96 -left-96 w-[800px] h-[800px] bg-primary-dark/[0.02] rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto"
        >
          {/* Ultra-clean title */}
          <motion.h2 
            className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-16 sm:mb-20 lg:mb-24"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-neutral-900">Luminous Core</span>
            <span className="text-neutral-500 font-normal">について</span>
          </motion.h2>
          
          {/* Ultra-structured content */}
          <div className="space-y-12 sm:space-y-16">
            {/* First statement - Core Identity */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -left-4 top-0 w-1 h-full bg-primary/10" />
              <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed text-neutral-900 pl-8 sm:pl-12">
                Luminous Coreは、
                <span className="block mt-2 mb-2 text-2xl sm:text-3xl lg:text-4xl font-bold text-primary">
                  デジタル戦略を起点として、<br className="hidden sm:block" />
                  クライアントの事業成果を最大化する
                </span>
                <span className="text-neutral-700">グローステック・パートナーです。</span>
              </p>
            </motion.div>
            
            {/* Visual separator */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent"
            />
            
            {/* Second statement - Approach */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="relative"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-7">
                  <p className="text-lg sm:text-xl leading-relaxed text-neutral-700">
                    <span className="text-primary-dark font-semibold">
                      AI技術と専門チームによる戦略的なデジタルグロース
                    </span>
                    を軸に、成果に必要な
                  </p>
                </div>
                <div className="lg:col-span-5">
                  <ul className="space-y-3 text-base sm:text-lg text-neutral-600">
                    <li className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                      SNSグロース
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                      ウェブサイト制作
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                      カスタムツールの開発
                    </li>
                  </ul>
                </div>
              </div>
              <p className="text-lg sm:text-xl text-neutral-900 font-medium mt-8">
                まで、ワンストップで手掛けます。
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}