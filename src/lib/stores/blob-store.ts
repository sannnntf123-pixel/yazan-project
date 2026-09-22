import 'server-only';

import { del, get, put } from '@vercel/blob';
import type { ContentStore } from './types';

const PATHNAME = 'cms/site-content.json';

export interface BlobCredentials {
  /** Read-write token (BLOB_READ_WRITE_TOKEN, possibly with a custom prefix). */
  token?: string;
  /** Store id for OIDC auth (BLOB_STORE_ID) — Vercel supplies VERCEL_OIDC_TOKEN at runtime. */
  storeId?: string;
}

function envWithSuffix(suffix: string): string | undefined {
  if (process.env[suffix]) return process.env[suffix];
  const key = Object.keys(process.env).find((name) => name.endsWith(suffix));
  return key ? process.env[key] : undefined;
}

/**
 * Connecting a Blob store injects either BLOB_READ_WRITE_TOKEN or, on newer
 * projects, BLOB_STORE_ID (authenticated with Vercel's OIDC token). A custom
 * prefix may have been chosen while connecting, so match on the suffix.
 */
export function findBlobCredentials(): BlobCredentials | null {
  const token = envWithSuffix('BLOB_READ_WRITE_TOKEN');
  const storeId = envWithSuffix('BLOB_STORE_ID');
  if (!token && !storeId) return null;
  return { ...(token && { token }), ...(storeId && { storeId }) };
}

/** Names (not values) of any BLOB-related env vars, for the admin diagnostics banner. */
export function blobEnvNames(): string[] {
  return Object.keys(process.env).filter((name) => name.includes('BLOB')).sort();
}

/** Vercel Blob (private). Used automatically when credentials are present. */
export function createBlobStore(credentials: BlobCredentials): ContentStore {
  return {
    name: 'Vercel Blob',

    async read() {
      // useCache: false reads from origin so a save is visible on the very next request.
      const result = await get(PATHNAME, { access: 'private', useCache: false, ...credentials });
      if (!result || result.statusCode !== 200) return null;
      return JSON.parse(await new Response(result.stream).text());
    },

    async write(content) {
      await put(PATHNAME, JSON.stringify(content), {
        access: 'private',
        contentType: 'application/json',
        addRandomSuffix: false,
        allowOverwrite: true,
        ...credentials,
      });
    },

    async clear() {
      await del(PATHNAME, { ...credentials });
    },
  };
}
