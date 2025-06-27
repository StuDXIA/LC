'use client'

import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import TechShowcase from '@/components/TechShowcase'
import CoreServices from '@/components/CoreServices'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-gray-100">
      <HeroSection />
      <AboutSection />
      <CoreServices />
      <TechShowcase />
      <Footer />
    </main>
  )
}