import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Providers } from '@/lib/auth/providers';

export const metadata: Metadata = {
  title: 'GymBro - Track Your Fitness Journey',
  description: 'A modern fitness tracking app to monitor your gym progress, get workout suggestions, and reach your fitness goals.',
}

// Add viewport configuration for better mobile responsiveness
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
}

// Force dynamic rendering to ensure proper auth handling
export const dynamic = 'force-dynamic';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
} 
