'use server';

import { headers } from 'next/headers';
import { revalidatePath, updateTag } from 'next/cache';
import { z } from 'zod';
import {
  clearAttempts,
  createSession,
  destroySession,
  isAuthenticated,
  isLockedOut,
  recordFailedAttempt,
  verifyCredentials,
} from '@/lib/auth';
import {
  CONTENT_CACHE_TAG,
  contentStoreName,
  contentStoreWarning,
  getSiteContent,
  resetSiteContent,
  saveSiteContent,
} from '@/lib/content-store';
import { siteContentSchema } from '@/lib/content-schema';
import type { SiteContent } from '@/types';

export type ActionResult = { ok: true } | { ok: false; error: string };

async function clientKey(): Promise<string> {
  const h = await headers();
  return h.get('x-forwarded-for')?.split(',')[0]?.trim() || h.get('x-real-ip') || 'local';
}

const loginSchema = z.object({ username: z.string().min(1).max(100), password: z.string().min(1).max(200) });

export async function login(_prev: ActionResult | null, formData: FormData): Promise<ActionResult> {
  const parsed = loginSchema.safeParse({ username: formData.get('username'), password: formData.get('password') });
  if (!parsed.success) return { ok: false, error: 'Please enter your username and password.' };

  const key = await clientKey();
  if (isLockedOut(key)) return { ok: false, error: 'Too many failed attempts. Try again in 15 minutes.' };

  if (!verifyCredentials(parsed.data.username, parsed.data.password)) {
    recordFailedAttempt(key);
    return { ok: false, error: 'Incorrect username or password.' };
  }

  clearAttempts(key);
  await createSession();
  revalidatePath('/admin');
  return { ok: true };
}

export async function logout(): Promise<void> {
  await destroySession();
  revalidatePath('/admin');
}

export async function saveContent(content: SiteContent): Promise<ActionResult> {
  if (!(await isAuthenticated())) return { ok: false, error: 'Your session has expired. Please sign in again.' };

  const parsed = siteContentSchema.safeParse(content);
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    return { ok: false, error: `${issue.path.join(' › ') || 'content'}: ${issue.message}` };
  }

  try {
    await saveSiteContent(parsed.data as SiteContent);
  } catch (error) {
    console.error('Saving site content failed:', error);
    return { ok: false, error: storageErrorMessage(error) };
  }

  updateTag(CONTENT_CACHE_TAG);
  revalidatePath('/');
  return { ok: true };
}

export async function resetContent(): Promise<ActionResult> {
  if (!(await isAuthenticated())) return { ok: false, error: 'Your session has expired. Please sign in again.' };

  try {
    await resetSiteContent();
  } catch (error) {
    console.error('Resetting site content failed:', error);
    return { ok: false, error: storageErrorMessage(error) };
  }

  updateTag(CONTENT_CACHE_TAG);
  revalidatePath('/');
  revalidatePath('/admin');
  return { ok: true };
}

/** Turn a storage failure into something the admin can act on. */
function storageErrorMessage(error: unknown): string {
  // Vercel surfaces its read-only filesystem as ENOENT/EROFS on mkdir.
  if (contentStoreWarning) return contentStoreWarning;
  return `Could not save to ${contentStoreName}: ${error instanceof Error ? error.message : 'unknown error'}`;
}

export async function loadContent(): Promise<SiteContent> {
  return getSiteContent();
}
