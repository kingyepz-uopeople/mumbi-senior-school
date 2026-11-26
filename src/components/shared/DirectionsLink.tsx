'use client';

import { MapPin } from 'lucide-react';
import { schoolInfo } from '@/data/mock-school-data';
import { useLocale } from '@/i18n/locale-context';

interface DirectionsLinkProps {
  /** `dark` for deep-blue panels, `light` for white or pale surfaces. */
  tone?: 'light' | 'dark';
  /** Text link beside an address, or a pill button in a call-to-action row. */
  variant?: 'text' | 'button';
  className?: string;
}

export default function DirectionsLink({
  tone = 'light',
  variant = 'text',
  className = '',
}: DirectionsLinkProps) {
  const { dict } = useLocale();

  const toneClass =
    variant === 'button'
      ? tone === 'dark'
        ? 'bg-white text-primary hover:bg-blue-50'
        : 'bg-primary text-white hover:bg-primary-dark'
      : tone === 'dark'
        ? 'text-white hover:text-blue-100'
        : 'text-primary hover:text-primary-dark';

  const variantClass =
    variant === 'button'
      ? 'inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold'
      : 'inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold underline underline-offset-4';

  return (
    <a
      href={schoolInfo.mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`${variantClass} ${toneClass} ${className}`}
      aria-label={`${dict.common.getDirections} — ${schoolInfo.name}`}
    >
      <MapPin strokeWidth={1.75} className="size-4 shrink-0" aria-hidden="true" />
      <span>{dict.common.getDirections}</span>
      <span className="sr-only">{dict.common.opensNewTab}</span>
    </a>
  );
}