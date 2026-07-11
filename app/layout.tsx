import type { Metadata } from 'next'
import { Suspense } from 'react'
import { AnalyticsTracker } from '@/components/AnalyticsTracker'
import './globals.css'

export const metadata: Metadata = {
  title: 'Devly',
  description: 'Software solutions, websites, and SEO — book a call to get started.',
  openGraph: {
    title: 'Devly',
    description: 'Software solutions, websites, and SEO — book a call to get started.',
    url: 'https://work.devly.info',
    siteName: 'Devly',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Devly',
    description: 'Software solutions, websites, and SEO — book a call to get started.',
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
      <body>
        <Suspense fallback={null}>
          <AnalyticsTracker />
        </Suspense>
        {children}
      </body>
    </html>
  )
}
