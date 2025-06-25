'use client'

import dynamic from 'next/dynamic'
import HeroSection from '@/components/HeroSection'
import TechShowcase from '@/components/TechShowcase'
import FeaturesSection from '@/components/FeaturesSection'
import DataVisualization from '@/components/DataVisualization'
import TerminalInterface from '@/components/TerminalInterface'
import Footer from '@/components/Footer'

const ParticleBackground = dynamic(() => import('@/components/ParticleBackground'), {
  ssr: false,
})

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-cyber-black to-cyber-gray">
      <ParticleBackground />
      <HeroSection />
      <TechShowcase />
      <FeaturesSection />
      <DataVisualization />
      <TerminalInterface />
      <Footer />
    </main>
  )
}