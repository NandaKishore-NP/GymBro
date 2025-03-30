'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider 
      // Refresh session every 1 minute to ensure it remains valid
      refetchInterval={60} 
      refetchOnWindowFocus={true}
    >
      {children}
    </SessionProvider>
  );
} 