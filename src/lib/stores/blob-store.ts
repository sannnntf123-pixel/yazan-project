import 'server-only';

import { del, get, put } from '@vercel/blob';
import type { ContentStore } from './types';

const PATHNAME = 'cms/site-content.json';

/**
 * Vercel Blob (private). Used automatically when BLOB_READ_WRITE_TOKEN is set,
 * which Vercel injects once a Blob store is connected to the project.
 */
export function createBlobStore(): ContentStore {
  return {
    name: 'Vercel Blob',

    async read() {
      // useCache: false reads from origin so a save is visible on the very next request.
      const result = await get(PATHNAME, { access: 'private', useCache: false });
      if (!result || result.statusCode !== 200) return null;
      return JSON.parse(await new Response(result.stream).text());
    },

    async write(content) {
      await put(PATHNAME, JSON.stringify(content), {
        access: 'private',
        contentType: 'application/json',
        addRandomSuffix: false,
        allowOverwrite: true,
      });
    },

    async clear() {
      await del(PATHNAME);
    },
  };
}
