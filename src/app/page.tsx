'use client'

import Navigation from '@/components/Navigation'
import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import TechShowcase from '@/components/TechShowcase'
import CoreServices from '@/components/CoreServices'
import PremiumAchievements from '@/components/PremiumAchievements'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-gray-100">
        <HeroSection />
        <AboutSection />
        <CoreServices />
        <PremiumAchievements />
        <TechShowcase />
        <Footer />
      </main>
    </>
  )
}