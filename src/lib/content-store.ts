import 'server-only';

import { promises as fs } from 'fs';
import path from 'path';
import type { SiteContent } from '@/types';
import { DEFAULT_CONTENT } from '@/data/defaultContent';
import { siteContentSchema } from './content-schema';

/**
 * CONTENT STORE
 * -------------
 * Site content lives in a single JSON file on disk (gitignored). This works
 * anywhere the app runs on a persistent filesystem (`next start` on a VPS,
 * Docker volume, etc.). To move to a database later, only this file changes.
 */
const CONTENT_DIR = path.join(process.cwd(), 'content');
const CONTENT_FILE = path.join(CONTENT_DIR, 'site-content.json');

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
    const raw = await fs.readFile(CONTENT_FILE, 'utf8');
    const merged = mergeWithDefaults(DEFAULT_CONTENT, JSON.parse(raw));
    const parsed = siteContentSchema.safeParse(merged);
    if (parsed.success) return parsed.data as SiteContent;
    console.error('Stored site content is invalid, falling back to defaults:', parsed.error.issues);
    return DEFAULT_CONTENT;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
      console.error('Could not read site content, falling back to defaults:', error);
    }
    return DEFAULT_CONTENT;
  }
}

export async function saveSiteContent(content: SiteContent): Promise<void> {
  await fs.mkdir(CONTENT_DIR, { recursive: true });
  // Write to a temp file then rename so a crash mid-write never leaves a half file.
  const tmp = `${CONTENT_FILE}.${process.pid}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(content, null, 2), 'utf8');
  await fs.rename(tmp, CONTENT_FILE);
}

export async function resetSiteContent(): Promise<void> {
  await fs.rm(CONTENT_FILE, { force: true });
}
