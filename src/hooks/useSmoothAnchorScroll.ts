'use client';

import { useEffect } from 'react';

/**
 * Smooth-scroll in-page anchor links (`<a href="#section">`) without a global
 * `scroll-behavior: smooth`, which makes wheel/trackpad scrolling feel rubbery.
 * `onNavigate` runs before scrolling so the app can switch back to the main view.
 */
export function useSmoothAnchorScroll(onNavigate?: () => void) {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement | null)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;

      const id = anchor.getAttribute('href')?.slice(1);
      if (!id) return;

      onNavigate?.();

      const target = document.getElementById(id);
      if (!target) return; // let the browser handle it (section may render after a view change)

      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
      window.history.replaceState(null, '', `#${id}`);
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [onNavigate]);
}
