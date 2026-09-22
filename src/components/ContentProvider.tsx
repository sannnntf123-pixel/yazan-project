'use client';

import { createContext, useContext, type ReactNode } from 'react';
import type { SiteContent } from '@/types';

const ContentContext = createContext<SiteContent | null>(null);

export function ContentProvider({ content, children }: { content: SiteContent; children: ReactNode }) {
  return <ContentContext.Provider value={content}>{children}</ContentContext.Provider>;
}

/** Read the CMS-managed site content anywhere inside <App />. */
export function useContent(): SiteContent {
  const content = useContext(ContentContext);
  if (!content) throw new Error('useContent must be used inside <ContentProvider>');
  return content;
}
