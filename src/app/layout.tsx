import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://lc-platform.vercel.app'),
  title: 'Luminous Core - あなたの事業に、次の"成長曲線"を描く',
  description: 'デジタル戦略を起点として、独自AI技術と専門チームでクライアントの事業成果を最大化するグローステック・カンパニー',
  keywords: 'SNS運用, LP制作, Webサイト制作, AI開発, 業務効率化, DX, グロースハック',
  authors: [{ name: 'Kousai Yamamoto' }],
  icons: {
    icon: '/Luminous Core.png',
    shortcut: '/Luminous Core.png',
    apple: '/Luminous Core.png',
  },
  openGraph: {
    title: 'Luminous Core - あなたの事業に、次の"成長曲線"を描く',
    description: 'デジタル戦略を起点として、独自AI技術と専門チームでクライアントの事業成果を最大化',
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