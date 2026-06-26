import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Devly',
  description: 'A photography portfolio.',
  openGraph: {
    title: 'Devly',
    description: 'A photography portfolio.',
    url: 'https://work.devly.info',
    siteName: 'Devly',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Devly',
    description: 'A photography portfolio.',
    creator: '@DevlyOfficial',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
