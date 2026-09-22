/** Minimal persistence contract for the CMS: one JSON document. */
export interface ContentStore {
  /** Human-readable backend name, shown in the admin UI. */
  readonly name: string;
  /** Returns the raw stored JSON, or null when nothing has been saved yet. */
  read(): Promise<unknown | null>;
  write(content: unknown): Promise<void>;
  clear(): Promise<void>;
}
