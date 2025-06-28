'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function AboutSection() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })
  
  return (
    <section id="about" className="py-32 sm:py-40 lg:py-48 px-4 sm:px-6 relative bg-gradient-to-b from-white via-neutral-50/50 to-white">
      {/* Sophisticated geometric accent */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-20 right-0 w-[600px] h-[600px]"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 0.03 } : {}}
          transition={{ duration: 1.5 }}
        >
          <div className="w-full h-full border-[40px] border-primary/10 rounded-full" />
        </motion.div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <motion.div
          ref={ref}
          className="max-w-6xl mx-auto"
        >
          {/* Sophisticated title treatment */}
          <motion.div 
            className="mb-20 sm:mb-28 lg:mb-32"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-base sm:text-lg text-neutral-500 font-light tracking-[0.3em] uppercase mb-4">
              About
            </h2>
            <h3 className="text-4xl sm:text-5xl lg:text-6xl font-light">
              <span className="text-neutral-900">Luminous Core</span>
            </h3>
          </motion.div>
          
          {/* Ultra-sophisticated layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">
            {/* Left side - Core statement */}
            <motion.div 
              className="lg:col-span-7"
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <div className="space-y-8">
                <p className="text-xl sm:text-2xl lg:text-3xl leading-relaxed text-neutral-800 font-light">
                  Luminous Coreは、
                </p>
                
                <div className="pl-8 border-l-2 border-primary/20">
                  <p className="text-3xl sm:text-4xl lg:text-5xl font-light leading-tight">
                    <span className="text-primary">デジタル戦略</span>を起点として、
                  </p>
                  <p className="text-3xl sm:text-4xl lg:text-5xl font-light leading-tight mt-4">
                    クライアントの<span className="text-primary-dark font-normal">事業成果を最大化</span>する
                  </p>
                </div>
                
                <p className="text-xl sm:text-2xl text-neutral-700 font-light">
                  グローステック・パートナーです。
                </p>
              </div>
            </motion.div>
            
            {/* Right side - Approach */}
            <motion.div 
              className="lg:col-span-5"
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, delay: 0.4 }}
            >
              <div className="lg:pt-20">
                <h4 className="text-sm text-neutral-500 font-light tracking-widest uppercase mb-8">
                  Our Approach
                </h4>
                
                <p className="text-lg sm:text-xl text-neutral-700 mb-12 leading-relaxed">
                  <span className="text-primary-dark font-normal">AI技術と専門チーム</span>による
                  <br />戦略的なデジタルグロースを軸に、
                  <br />成果に必要な
                </p>
                
                <div className="space-y-6">
                  {['SNSグロース', 'ウェブサイト制作', 'カスタムツールの開発'].map((item, index) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: 20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                      className="group flex items-center gap-6"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-neutral-400 font-light">0{index + 1}</span>
                        <div className="w-12 h-px bg-neutral-300 group-hover:w-20 group-hover:bg-primary transition-all duration-500" />
                      </div>
                      <span className="text-lg sm:text-xl text-neutral-700 group-hover:text-primary transition-colors duration-300">
                        {item}
                      </span>
                    </motion.div>
                  ))}
                </div>
                
                <motion.p 
                  className="text-lg sm:text-xl text-neutral-900 mt-12 font-light"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.8, delay: 1 }}
                >
                  まで、<span className="font-normal">ワンストップ</span>で手掛けます。
                </motion.p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}