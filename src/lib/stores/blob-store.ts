import 'server-only';

import { del, get, put } from '@vercel/blob';
import type { ContentStore } from './types';

const PATHNAME = 'cms/site-content.json';

/**
 * Vercel injects BLOB_READ_WRITE_TOKEN when a Blob store is connected — unless
 * a custom prefix was chosen while connecting (e.g. MYSTORE_BLOB_READ_WRITE_TOKEN),
 * so accept any variable with that suffix.
 */
export function findBlobToken(): string | undefined {
  if (process.env.BLOB_READ_WRITE_TOKEN) return process.env.BLOB_READ_WRITE_TOKEN;
  const key = Object.keys(process.env).find((name) => name.endsWith('BLOB_READ_WRITE_TOKEN'));
  return key ? process.env[key] : undefined;
}

/** Vercel Blob (private). Used automatically when a read-write token is present. */
export function createBlobStore(token: string): ContentStore {
  return {
    name: 'Vercel Blob',

    async read() {
      // useCache: false reads from origin so a save is visible on the very next request.
      const result = await get(PATHNAME, { access: 'private', useCache: false, token });
      if (!result || result.statusCode !== 200) return null;
      return JSON.parse(await new Response(result.stream).text());
    },

    async write(content) {
      await put(PATHNAME, JSON.stringify(content), {
        access: 'private',
        contentType: 'application/json',
        addRandomSuffix: false,
        allowOverwrite: true,
        token,
      });
    },

    async clear() {
      await del(PATHNAME, { token });
    },
  };
}
