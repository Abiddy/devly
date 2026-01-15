import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import './globals.css'

const outfit = Outfit({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
})

export const metadata: Metadata = {
  title: 'Devly | Design & Webflow Partner',
  description: 'Build trust, convert more, and raise funding with a beautifully functional website & brand.',
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
