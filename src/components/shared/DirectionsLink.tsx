import { MapPin } from 'lucide-react';
import { schoolInfo } from '@/data/mock-school-data';

interface DirectionsLinkProps {
  /** `dark` for deep-blue panels, `light` for white or pale surfaces. */
  tone?: 'light' | 'dark';
  /** Text link beside an address, or a pill button in a call-to-action row. */
  variant?: 'text' | 'button';
  className?: string;
}

/**
 * Opens the school's shared Google Maps pin so visitors can get directions.
 */
export default function DirectionsLink({
  tone = 'light',
  variant = 'text',
  className = '',
}: DirectionsLinkProps) {
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
      aria-label="Get directions to Mumbi Girls Senior School on Google Maps"
    >
      <MapPin strokeWidth={1.75} className="size-4 shrink-0" aria-hidden="true" />
      <span>Get directions</span>
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
