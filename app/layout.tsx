import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics'

const inter = Inter({ subsets: ['latin'] })

// Google Analytics Measurement ID
const GA_MEASUREMENT_ID = 'G-46H17N1SR9';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.lataifas-suceava.ro'),
  title: {
    default: 'La Taifas - Restaurant și Terasă în Suceava | Livrare la Domiciliu',
    template: '%s | La Taifas'
  },
  description: 'Restaurant La Taifas în Suceava - mâncare tradițională românească, pizza, paste, vinuri selectate. Comandă online cu livrare la domiciliu în Burdujeni și zonele limitrofe.',
  keywords: ['restaurant Suceava', 'La Taifas', 'livrare mancare Suceava', 'restaurant Burdujeni', 'pizza Suceava', 'mancare romaneasca', 'terasa Suceava', 'vinuri', 'evenimente'],
  authors: [{ name: 'La Taifas' }],
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.svg', sizes: '32x32', type: 'image/svg+xml' },
      { url: '/favicon.svg', sizes: '16x16', type: 'image/svg+xml' }
    ],
    apple: [
      { url: '/favicon.svg', sizes: '180x180', type: 'image/svg+xml' }
    ],
    shortcut: '/favicon.svg'
  },
  openGraph: {
    type: 'website',
    locale: 'ro_RO',
    url: 'https://www.lataifas-suceava.ro',
    siteName: 'La Taifas Restaurant',
    title: 'La Taifas - Restaurant și Terasă în Suceava',
    description: 'Restaurant La Taifas în Suceava - mâncare tradițională românească, pizza, paste, vinuri selectate. Comandă online cu livrare la domiciliu.',
    images: [
      {
        url: '/images/logo.png',
        width: 1200,
        height: 630,
        alt: 'La Taifas Restaurant Logo'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'La Taifas - Restaurant și Terasă în Suceava',
    description: 'Mâncare tradițională românească, pizza, paste, vinuri. Comandă online cu livrare la domiciliu.',
    images: ['/images/logo.png']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'x0Ch3cYKCcmaq_fDSKnDwMIBWxuquDZC3V9pKSxTtfs',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <GoogleAnalytics measurementId={GA_MEASUREMENT_ID} />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}