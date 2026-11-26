'use client';

import { MessageCircle } from '@/components/icons';
import { fill } from '@/i18n/fill';
import { useLocale } from '@/i18n/locale-context';

interface PhoneActionsProps {
  /** E.164-style number, e.g. `+254711461192`. */
  phone: string;
  /** `dark` for deep-blue panels, `light` for white surfaces. */
  tone?: 'light' | 'dark';
  className?: string;
  /** Show the dialled number next to the "Call" label. */
  showNumber?: boolean;
}

/**
 * Two accessible actions for a single school phone number:
 *  - Call  → `tel:` in +254 format (unchanged from the source value)
 *  - WhatsApp → `https://wa.me/254…` with the leading 0 dropped, opened in a
 *    new tab.
 * Both carry explicit, screen-reader-friendly labels.
 */
export default function PhoneActions({
  phone,
  tone = 'light',
  className = '',
  showNumber = true,
}: PhoneActionsProps) {
  const { dict } = useLocale();
  const p = dict.phone;
  const digits = phone.replace(/[^0-9]/g, '');
  // Drop a leading 0 and prefix the Kenyan country code for a valid wa.me link.
  const waDigits = digits.startsWith('0') ? `254${digits.slice(1)}` : digits;
  const waUrl = `https://wa.me/${waDigits}`;
  const linkTone =
    tone === 'dark'
      ? 'text-white hover:text-blue-100'
      : 'text-primary hover:text-primary-dark';
  const iconTone = tone === 'dark' ? 'text-blue-100' : 'text-primary';

  return (
    <span className={`inline-flex flex-wrap items-center gap-x-4 gap-y-2 ${className}`}>
      <a
        href={`tel:${phone}`}
        className={`inline-flex items-center gap-1.5 font-semibold underline underline-offset-4 ${linkTone}`}
        aria-label={fill(p.callAria, { phone })}
      >
        <span>
          {p.call}
          {showNumber ? ` ${phone}` : ''}
        </span>
      </a>
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-1.5 font-semibold underline underline-offset-4 ${linkTone}`}
        aria-label={p.whatsappAria}
      >
        <MessageCircle className={`size-4 shrink-0 ${iconTone}`} aria-hidden="true" />
        <span>{p.whatsapp}</span>
      </a>
    </span>
  );
}
