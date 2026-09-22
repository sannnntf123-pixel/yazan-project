import 'server-only';

import type { SiteContent } from '@/types';
import { DEFAULT_CONTENT } from '@/data/defaultContent';
import { siteContentSchema } from './content-schema';
import { createBlobStore } from './stores/blob-store';
import { createFileStore } from './stores/file-store';
import type { ContentStore } from './stores/types';

/**
 * CONTENT STORE
 * -------------
 * The CMS persists one JSON document. The backend is picked from the
 * environment: Vercel Blob when its token is present (serverless hosts have
 * a read-only filesystem), otherwise a JSON file on disk.
 */
function selectStore(): ContentStore {
  if (process.env.BLOB_READ_WRITE_TOKEN) return createBlobStore();
  return createFileStore();
}

const store = selectStore();

export const contentStoreName = store.name;

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/** Fill any fields missing from `stored` with the defaults (arrays are taken as-is). */
function mergeWithDefaults<T>(defaults: T, stored: unknown): T {
  if (!isPlainObject(defaults) || !isPlainObject(stored)) {
    return (stored === undefined ? defaults : stored) as T;
  }
  const out: Record<string, unknown> = { ...defaults };
  for (const key of Object.keys(defaults)) {
    if (key in stored) out[key] = mergeWithDefaults((defaults as Record<string, unknown>)[key], stored[key]);
  }
  return out as T;
}

export async function getSiteContent(): Promise<SiteContent> {
  try {
    const stored = await store.read();
    if (stored === null) return DEFAULT_CONTENT;

    const parsed = siteContentSchema.safeParse(mergeWithDefaults(DEFAULT_CONTENT, stored));
    if (parsed.success) return parsed.data as SiteContent;

    console.error('Stored site content is invalid, falling back to defaults:', parsed.error.issues);
    return DEFAULT_CONTENT;
  } catch (error) {
    console.error(`Could not read site content from ${store.name}, falling back to defaults:`, error);
    return DEFAULT_CONTENT;
  }
}

export async function saveSiteContent(content: SiteContent): Promise<void> {
  await store.write(content);
}

export async function resetSiteContent(): Promise<void> {
  await store.clear();
}
