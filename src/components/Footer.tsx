'use client'

import { motion } from 'framer-motion'
import { FaGithub, FaTwitter, FaLinkedin, FaDiscord } from 'react-icons/fa'
import Image from 'next/image'

const socialLinks = [
  { icon: FaGithub, href: '#', label: 'GitHub' },
  { icon: FaTwitter, href: '#', label: 'Twitter' },
  { icon: FaLinkedin, href: '#', label: 'LinkedIn' },
  { icon: FaDiscord, href: '#', label: 'Discord' },
]

const footerLinks = [
  {
    title: 'Product',
    links: ['Features', 'Pricing', 'Documentation', 'API'],
  },
  {
    title: 'Company',
    links: ['About', 'Blog', 'Careers', 'Press'],
  },
  {
    title: 'Resources',
    links: ['Community', 'Support', 'Status', 'Security'],
  },
  {
    title: 'Legal',
    links: ['Privacy', 'Terms', 'Cookie Policy', 'Licenses'],
  },
]

export default function Footer() {
  return (
    <>
      {/* CTA Section */}
      <section className="relative py-20 px-6 bg-gradient-to-b from-cyber-gray to-cyber-black">
        <div className="absolute inset-0 bg-gradient-radial from-neon-blue/10 via-transparent to-transparent" />
        
        <div className="container mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold mb-6">
              <span className="text-gradient">さあ、あなたのビジネスを、次世代へ。</span>
            </h2>
            
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              まずは30分、貴社の現状と課題をお聞かせください。<br/>
              我々が、その未来をどう変えられるかをお見せします。
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-4 bg-gradient-to-r from-neon-blue to-neon-purple rounded-lg font-bold text-xl hover-lift glass-effect neon-border transition-all duration-300"
            >
              30分間の無料相談に申し込む
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-6 border-t border-gray-800">
        <div className="container mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <Image
                src="/Luminous Core.png"
                alt="Luminous Core Logo"
                width={30}
                height={30}
                className="drop-shadow-[0_0_10px_rgba(0,217,255,0.4)]"
              />
              <span className="text-xl font-bold text-gradient">Luminous Core</span>
            </div>
            
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.3 }}
                  className="w-8 h-8 glass-effect rounded-lg flex items-center justify-center hover:border-neon-blue text-sm"
                >
                  <social.icon />
                </motion.a>
              ))}
            </div>
            
            <p className="text-gray-400 text-sm">
              © 2024 Luminous Core. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}