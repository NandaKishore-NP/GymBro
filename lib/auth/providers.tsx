'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider 
      // Refresh session every 5 minutes (300 seconds)
      refetchInterval={300} 
      refetchOnWindowFocus={true}
    >
      {children}
    </SessionProvider>
  );
} 