import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Providers } from '@/lib/auth/providers';

export const metadata: Metadata = {
  title: 'GymBro - Track Your Fitness Journey',
  description: 'A modern fitness tracking app to monitor your gym progress, get workout suggestions, and reach your fitness goals.',
  icons: {
    icon: [
      {
        url: '/favicon.svg',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/favicon-dark.svg',
        media: '(prefers-color-scheme: dark)',
      },
    ],
  },
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
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `
            // Initialize dark mode from localStorage
            try {
              if (localStorage.getItem('darkMode') === 'true') {
                document.documentElement.classList.add('dark');
              } else {
                document.documentElement.classList.remove('dark');
              }
            } catch (e) {
              // Handle case where localStorage is not available
              console.log('Could not access localStorage for dark mode');
            }
          `
        }} />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="min-h-screen flex flex-col">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
} 
