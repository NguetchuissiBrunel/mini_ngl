import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ThemeInitializer from '@/components/ThemeInitializer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mini NGL',
  description: 'Envoyez des messages anonymes',
  icons: {
    icon: '/icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <ThemeInitializer />
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}