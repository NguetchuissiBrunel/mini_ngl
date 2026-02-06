import type { Metadata } from 'next'
import { Inter, Allura } from 'next/font/google'
import './globals.css'
import ThemeInitializer from '@/components/ThemeInitializer'
import { ModalProvider } from '@/context/ModalContext'
import CustomModal from '@/components/CustomModal'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const allura = Allura({ weight: '400', subsets: ['latin'], variable: '--font-allura' })

export const metadata: Metadata = {
  title: 'Tell-Mi',
  description: 'Envoyez des messages anonymes avec amour',
  icons: {
    icon: '/logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={`${inter.variable} ${allura.variable} font-sans antialiased`}>
        <ThemeInitializer />
        <ModalProvider>
          <main>
            {children}
          </main>
          <CustomModal />
        </ModalProvider>
      </body>
    </html>
  )
}