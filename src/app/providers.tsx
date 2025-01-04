'use client';

import { PropsWithChildren } from 'react';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { EmailStoreProvider } from '@/store/emailStore';

export function Providers({ children }: PropsWithChildren) {
  return (
    <ErrorBoundary>
      <EmailStoreProvider>
        {children}
      </EmailStoreProvider>
    </ErrorBoundary>
  );
}