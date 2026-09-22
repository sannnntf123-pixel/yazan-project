import 'server-only';

import { promises as fs } from 'fs';
import path from 'path';
import type { ContentStore } from './types';

/**
 * JSON file on disk. Works for local dev and any host with a persistent,
 * writable filesystem (VPS, Docker volume). Not usable on serverless hosts.
 */
export function createFileStore(): ContentStore {
  const dir = path.join(process.cwd(), 'content');
  const file = path.join(dir, 'site-content.json');

  return {
    name: 'local file',

    async read() {
      try {
        return JSON.parse(await fs.readFile(file, 'utf8'));
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code === 'ENOENT') return null;
        throw error;
      }
    },

    async write(content) {
      await fs.mkdir(dir, { recursive: true });
      // Write to a temp file then rename so a crash mid-write never leaves a half file.
      const tmp = `${file}.${process.pid}.tmp`;
      await fs.writeFile(tmp, JSON.stringify(content, null, 2), 'utf8');
      await fs.rename(tmp, file);
    },

    async clear() {
      await fs.rm(file, { force: true });
    },
  };
}
