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
      <section id="contact" className="relative py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-b from-slate-100 to-white">
        <div className="absolute inset-0 bg-gradient-radial from-primary-blue/5 via-transparent to-transparent" />
        
        <div className="container mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 px-4 sm:px-0">
              <span className="text-gradient">さあ、あなたのビジネスを、次世代へ。</span>
            </h2>
            
            <p className="text-base sm:text-lg lg:text-xl text-gray-800 font-medium mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
              まずは30分、貴社の現状と課題をお聞かせください。我々が、その未来をどう変えられるかをお見せします。
            </p>
            
            <motion.a
              href="https://line.me/R/ti/p/@862uxzup"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-8 sm:px-12 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg font-bold text-base sm:text-lg lg:text-xl hover-lift shadow-lg clean-border transition-all duration-300 text-white hover:shadow-xl"
            >
              30分間の無料相談に申し込む
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-8 sm:py-12 px-4 sm:px-6 border-t border-neutral-200">
        <div className="container mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <Image
                src="/Luminous Core.png"
                alt="Luminous Core Logo"
                width={30}
                height={30}
                className="opacity-60"
              />
              <span className="text-lg font-medium text-neutral-600">Luminous Core</span>
            </div>
            
            <p className="text-neutral-500 text-sm">
              © 2024 Luminous Core. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}