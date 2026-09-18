'use client';

import { useCallback, useEffect, useState } from 'react';

export type AppView = 'main' | 'registration-success';

const SUCCESS_HASH = '#registration-success';

/**
 * Tiny hash-based router: `#registration-success` shows the success page,
 * anything else shows the main landing page.
 */
export function useHashView() {
  const [view, setView] = useState<AppView>('main');

  useEffect(() => {
    const syncFromHash = () => {
      setView(window.location.hash === SUCCESS_HASH ? 'registration-success' : 'main');
    };
    syncFromHash();
    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
  }, []);

  const showSuccess = useCallback(() => {
    setView('registration-success');
    window.location.hash = SUCCESS_HASH;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const showMain = useCallback(() => {
    setView('main');
    window.location.hash = '#home';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return { view, showMain, showSuccess, setView };
}
