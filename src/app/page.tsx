'use client'

import dynamic from 'next/dynamic'
import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import TechShowcase from '@/components/TechShowcase'
import FeaturesSection from '@/components/FeaturesSection'
import Footer from '@/components/Footer'

const ParticleBackground = dynamic(() => import('@/components/ParticleBackground'), {
  ssr: false,
})

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-gray-100">
      <ParticleBackground />
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <TechShowcase />
      <Footer />
    </main>
  )
}