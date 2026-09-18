'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Copy text to the clipboard and remember which item was copied for
 * `resetAfterMs`, so the UI can show a transient "Copied!" state.
 */
export function useCopyToClipboard<K extends string = string>(resetAfterMs = 2500) {
  const [copiedKey, setCopiedKey] = useState<K | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  const copy = useCallback(
    async (text: string, key: K) => {
      try {
        await navigator.clipboard.writeText(text);
        setCopiedKey(key);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => setCopiedKey(null), resetAfterMs);
      } catch (error) {
        console.error('Clipboard write failed:', error);
      }
    },
    [resetAfterMs]
  );

  return { copiedKey, copy };
}
