'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useRef } from 'react'

export default function AboutSection() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  
  return (
    <section id="about" ref={sectionRef} className="py-16 sm:py-20 px-4 sm:px-6 relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div 
        className="absolute inset-0 opacity-10"
        style={{ y }}
      >
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-blue rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary-dark rounded-full blur-3xl" />
      </motion.div>
      
      <div className="container mx-auto relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <motion.h2 
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-8 sm:mb-12"
            whileInView={{ scale: [0.8, 1.05, 1] }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-gradient">Luminous Coreについて</span>
          </motion.h2>
          
          <motion.div 
            className="glass-effect rounded-lg p-6 sm:p-8 md:p-12 relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* Animated gradient border */}
            <motion.div 
              className="absolute inset-0 rounded-lg opacity-50"
              animate={{
                background: [
                  "linear-gradient(45deg, transparent, #0066CC, transparent)",
                  "linear-gradient(225deg, transparent, #003D7A, transparent)",
                  "linear-gradient(45deg, transparent, #0066CC, transparent)",
                ],
              }}
              transition={{ duration: 8, repeat: Infinity }}
              style={{ padding: "2px", backgroundClip: "content-box" }}
            />
            
            <motion.p 
              className="text-base sm:text-lg lg:text-xl leading-relaxed text-gray-800 font-medium relative z-10"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              Luminous Coreは、
              <motion.span 
                className="text-blue-800 font-black block sm:inline-block mx-0 sm:mx-1 my-2 sm:my-0"
                whileHover={{ scale: 1.02 }}
              >
                デジタル戦略を起点として、クライアントの事業成果を最大化する
              </motion.span>
              グローステック・パートナーです。
            </motion.p>
            
            <br/>
            
            <motion.p 
              className="text-base sm:text-lg lg:text-xl leading-relaxed text-gray-800 font-medium relative z-10"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              独自の
              <motion.span 
                className="text-blue-900 font-black block sm:inline-block mx-0 sm:mx-1 my-2 sm:my-0"
                animate={{ 
                  opacity: [0.9, 1, 0.9]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                独自AI技術と専門チームによる戦略的なデジタルグロース
              </motion.span>
              を軸に、成果に必要な
              <motion.span 
                className="text-accent-blue font-semibold block sm:inline-block mx-0 sm:mx-1 my-2 sm:my-0"
                whileInView={{ rotate: [0, 2, -2, 0] }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                SNSグロース、ウェブサイト制作やカスタムツールの開発
              </motion.span>
              まで、ワンストップで手掛けます。
            </motion.p>
            
            <motion.div 
              className="mt-8 flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <motion.div 
                className="inline-flex items-center gap-2 glass-effect px-6 py-3 rounded-full"
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0, 217, 255, 0.5)" }}
              >
                <motion.div 
                  className="w-2 h-2 rounded-full bg-primary-blue"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-sm text-gray-400">Growth Tech Partner</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}