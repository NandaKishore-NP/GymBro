import type { Metadata } from 'next'
import './globals.css'
import { Providers } from '@/lib/auth/providers';

export const metadata: Metadata = {
  title: 'GymBro - Track Your Fitness Journey',
  description: 'A modern fitness tracking app to monitor your gym progress, get workout suggestions, and reach your fitness goals.',
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
      <body className="min-h-screen">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
} 