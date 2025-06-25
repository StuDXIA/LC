import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://lc-platform.vercel.app'),
  title: 'LC - Future Technology Platform',
  description: 'Experience the future of technology with cutting-edge innovations',
  keywords: 'technology, innovation, AI, future, platform',
  authors: [{ name: 'LC Team' }],
  icons: {
    icon: '/Luminous Core.png',
    shortcut: '/Luminous Core.png',
    apple: '/Luminous Core.png',
  },
  openGraph: {
    title: 'LC - Future Technology Platform',
    description: 'Experience the future of technology',
    type: 'website',
    images: ['/Luminous Core.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-cyber-black antialiased`}>
        <div className="fixed inset-0 cyber-grid opacity-20 pointer-events-none" />
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  )
}