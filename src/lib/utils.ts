// ============================================================
// Utility Helpers
// ============================================================

import type { BeforeInstallPromptEvent } from '@/types';

/**
 * Type guard for the non-standard PWA beforeinstallprompt event
 */
export function isBeforeInstallPromptEvent(
  event: Event
): event is BeforeInstallPromptEvent {
  return (
    'prompt' in event &&
    typeof (event as BeforeInstallPromptEvent).prompt === 'function'
  );
}

/**
 * Format a Date to DD/MM/YYYY (Kenyan convention)
 */
export function formatDateKE(date: Date): string {
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

/**
 * Parse a DD/MM/YYYY string to a UTC Date object
 */
export function parseDateKE(dateStr: string): Date {
  const [dd, mm, yyyy] = dateStr.split('/').map(Number);
  return new Date(Date.UTC(yyyy, mm - 1, dd));
}

/**
 * Convert a DD/MM/YYYY string into ISO YYYY-MM-DD for HTML <time dateTime> attributes
 */
export function toIsoDate(dateStr: string): string {
  const [dd, mm, yyyy] = dateStr.split('/');
  return `${yyyy}-${mm}-${dd}`;
}

/**
 * Merge Tailwind class names, filtering out falsy values
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
