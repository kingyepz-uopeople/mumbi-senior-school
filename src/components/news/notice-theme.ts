import type { NewsItem } from '@/types';

export const NOTICE_OPEN_KEY = 'mumbi-notice-open-slug';

export const NOTE_TILTS = [-1.8, 1.4, -1, 1.8] as const;

export type NoteTone = 'blue' | 'yellow' | 'mint' | 'pink' | 'lilac';
export type NoteAttachment = 'pin' | 'tape-center' | 'tape-corners';
export type TapeHue = 'pink' | 'teal' | 'yellow' | 'sky';

const TONES: NoteTone[] = ['blue', 'yellow', 'mint', 'pink', 'lilac'];
const ATTACHMENTS: NoteAttachment[] = ['pin', 'tape-center', 'tape-corners'];
const TAPE_HUES: TapeHue[] = ['pink', 'teal', 'yellow', 'sky'];

export function noteTone(item: NewsItem): NoteTone {
  return TONES[Math.abs(item.id) % TONES.length];
}

export function noteTilt(index = 0): number {
  return NOTE_TILTS[Math.abs(index) % NOTE_TILTS.length];
}

export function noteAttachment(item: NewsItem): NoteAttachment {
  return ATTACHMENTS[Math.abs(item.id) % ATTACHMENTS.length];
}

export function tapeHue(item: NewsItem): TapeHue {
  return TAPE_HUES[Math.abs(item.id + 2) % TAPE_HUES.length];
}

export function noticeViewName(slug: string): string {
  return `news-note-${slug}`;
}

let returningSlug: string | null | undefined;
const returningListeners = new Set<() => void>();

export function rememberOpenSlug(slug: string) {
  returningSlug = slug;
  try {
    sessionStorage.setItem(NOTICE_OPEN_KEY, slug);
  } catch {
    /* private mode */
  }
  returningListeners.forEach((listener) => listener());
}

function readStoredSlug(): string | null {
  if (returningSlug !== undefined) return returningSlug;
  try {
    returningSlug = sessionStorage.getItem(NOTICE_OPEN_KEY);
  } catch {
    returningSlug = null;
  }
  return returningSlug;
}

export function subscribeReturningSlug(onStoreChange: () => void) {
  returningListeners.add(onStoreChange);
  return () => {
    returningListeners.delete(onStoreChange);
  };
}

export function getReturningSlugSnapshot() {
  return readStoredSlug();
}

export function getReturningSlugServerSnapshot() {
  return null;
}

/** Drop the one-shot return flag after the press-down animation has played. */
export function consumeReturningSlug() {
  returningSlug = null;
  try {
    sessionStorage.removeItem(NOTICE_OPEN_KEY);
  } catch {
    /* private mode */
  }
}
