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
    <footer className="relative py-20 px-6 border-t border-gray-800">
      <div className="absolute inset-0 bg-gradient-to-t from-cyber-black to-transparent opacity-50" />
      
      <div className="container mx-auto relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/Luminous Core.png"
                alt="Luminous Core Logo"
                width={40}
                height={40}
                className="drop-shadow-[0_0_10px_rgba(0,217,255,0.4)]"
              />
              <h3 className="text-3xl font-bold glitch" data-text="LC">
                <span className="text-gradient">LC</span>
              </h3>
            </div>
            <p className="text-gray-400 mb-6">
              Building the future of technology, one innovation at a time.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.3 }}
                  className="w-10 h-10 glass-effect rounded-lg flex items-center justify-center hover:border-neon-blue"
                >
                  <social.icon className="text-lg" />
                </motion.a>
              ))}
            </div>
          </div>
          
          {footerLinks.map((section, index) => (
            <div key={section.title}>
              <h4 className="font-semibold mb-4 text-neon-blue">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2024 LC Platform. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm text-gray-400">All systems operational</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}