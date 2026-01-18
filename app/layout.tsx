import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import './globals.css'

const outfit = Outfit({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
})

export const metadata: Metadata = {
  title: 'Devly',
  description: 'Building high-end digital experiences that change the trajectory of your business.',
  openGraph: {
    title: 'Devly',
    description: 'Building high-end digital experiences that change the trajectory of your business.',
    url: 'https://work.devly.info',
    siteName: 'Devly',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Devly',
    description: 'Building high-end digital experiences that change the trajectory of your business.',
    creator: '@DevlyOfficial',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`scroll-smooth ${outfit.variable}`}>
      <body className={`${outfit.className} antialiased`}>{children}</body>
    </html>
  )
}
