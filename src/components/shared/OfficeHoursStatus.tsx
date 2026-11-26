'use client';

import { useEffect, useMemo, useState } from 'react';
import { fill } from '@/i18n/fill';
import { useLocale } from '@/i18n/locale-context';
import { getOfficeStatus } from '@/lib/office-hours';

type OfficeStatusVariant = 'bar' | 'hero';

interface OfficeHoursStatusProps {
  /**
   * `bar` — compact line for the slim utility bar above the footer.
   * `hero` — larger hero line used on /contact.
   */
  variant?: OfficeStatusVariant;
  className?: string;
}

const DOT_TONE: Record<string, string> = {
  neutral: 'bg-slate-400',
  open: 'bg-emerald-400',
  soon: 'bg-amber-400',
  closed: 'bg-slate-400',
};

const TEXT_TONE: Record<string, string> = {
  neutral: 'text-white/85',
  open: 'text-white',
  soon: 'text-white',
  closed: 'text-white/85',
};

/**
 * Live "open now / closes soon / closed" indicator for the school office.
 *
 * The server (and the very first client render) always paints the neutral
 * schedule so the markup hydrates without a mismatch; the Nairobi-time
 * status is measured in an effect and refreshed every 60 seconds.
 */
export default function OfficeHoursStatus({
  variant = 'bar',
  className = '',
}: OfficeHoursStatusProps) {
  const { dict } = useLocale();
  const scheduleLabel = dict.officeHours.schedule;

  const [status, setStatus] = useState<ReturnType<
    typeof getOfficeStatus
  > | null>(null);

  useEffect(() => {
    const sync = () => setStatus(getOfficeStatus(new Date()));
    sync();

    const timer = window.setInterval(sync, 60_000);

    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') sync();
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      window.clearInterval(timer);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  const tone = status?.tone ?? 'neutral';
  const message = status
    ? fill(dict.officeHours[status.messageKey], { time: status.time })
    : scheduleLabel;

  const dot = useMemo(
    () => (
      <span
        aria-hidden="true"
        className={`office-status-dot ${DOT_TONE[tone] ?? DOT_TONE.neutral} ${
          tone === 'open' ? 'office-status-dot--open' : ''
        } ${variant === 'hero' ? 'office-status-dot--lg' : ''}`}
      />
    ),
    [tone, variant]
  );

  if (variant === 'hero') {
    return (
      <p className={`flex flex-wrap items-center gap-x-3 gap-y-1.5 ${className}`}>
        {dot}
        <span
          aria-live="polite"
          className={`font-serif text-lg font-semibold sm:text-xl ${
            TEXT_TONE[tone] ?? TEXT_TONE.neutral
          }`}
        >
          {message}
        </span>
        {status && (
          <span className="text-xs font-medium tracking-wide text-blue-100/80 tabular-nums">
            {scheduleLabel}
          </span>
        )}
      </p>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-2 ${className}`}
      title={scheduleLabel}
    >
      {dot}
      <span aria-live="polite" className={TEXT_TONE[tone] ?? TEXT_TONE.neutral}>
        {message}
      </span>
    </span>
  );
}