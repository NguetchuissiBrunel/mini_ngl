import type { Metadata } from 'next'
import { Inter, Allura } from 'next/font/google'
import './globals.css'
import ThemeInitializer from '@/components/ThemeInitializer'
import { ModalProvider } from '@/context/ModalContext'
import CustomModal from '@/components/CustomModal'
import GoogleAnalytics from '@/components/GoogleAnalytics'


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
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics ga_id={process.env.NEXT_PUBLIC_GA_ID} />
        )}
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