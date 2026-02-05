'use client';

import { useEffect } from 'react';

/**
 * Marks when the client-side app has finished hydrating.
 * This allows Playwright tests to wait for interactive components
 * before attempting to click on them.
 */
export function HydrationIndicator() {
  useEffect(() => {
    document.documentElement.dataset.appHydrated = 'true';
    return () => {
      delete document.documentElement.dataset.appHydrated;
    };
  }, []);

  return null;
}
