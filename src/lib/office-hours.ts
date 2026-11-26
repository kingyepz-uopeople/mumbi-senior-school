// ============================================================
// School office hours (Africa/Nairobi)
// ------------------------------------------------------------
// The school office keeps Kenyan time regardless of where the
// visitor is, so every boundary below is read from
// Intl.DateTimeFormat with `timeZone: 'Africa/Nairobi'` rather
// than the device clock. Monday to Friday, 08:00 – 17:00; the
// office is closed at the weekend.
// ============================================================

export const OFFICE_TIME_ZONE = 'Africa/Nairobi';

/** 08:00 in minutes from midnight (Nairobi). */
export const OFFICE_OPEN_MINUTES = 8 * 60;

/** 17:00 in minutes from midnight (Nairobi). */
export const OFFICE_CLOSE_MINUTES = 17 * 60;

/** "Closes soon" / "Opens soon" window, in minutes. */
export const OFFICE_SOON_WINDOW_MINUTES = 30;

/**
 * Neutral line rendered on the server and before the first client
 * measurement, so the markup hydrates without a mismatch.
 */
export const OFFICE_SCHEDULE_LABEL = 'Mon to Fri 08:00 to 17:00 EAT';

export type OfficeStatusTone = 'open' | 'soon' | 'closed';

export type OfficeMessageKey =
  | 'openNow'
  | 'closesSoon'
  | 'opensSoon'
  | 'closedOpens';

export interface OfficeStatus {
  tone: OfficeStatusTone;
  messageKey: OfficeMessageKey;
  time: string;
  /** 0 = Sunday … 6 = Saturday, in Nairobi. */
  weekday: number;
}

const WEEKDAY_SHORT = [
  'Sun',
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat',
] as const;

const WEEKDAY_INDEX: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

const nairobiClock = new Intl.DateTimeFormat('en-GB', {
  timeZone: OFFICE_TIME_ZONE,
  weekday: 'short',
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
});

/** Reads the weekday and wall-clock minute of `now` in Nairobi. */
export function readNairobiClock(now: Date): {
  weekday: number;
  minutes: number;
} {
  const parts = nairobiClock.formatToParts(now);
  let weekday = 0;
  let hour = 0;
  let minute = 0;

  for (const part of parts) {
    if (part.type === 'weekday') weekday = WEEKDAY_INDEX[part.value] ?? 0;
    else if (part.type === 'hour') hour = Number(part.value);
    else if (part.type === 'minute') minute = Number(part.value);
  }

  return {
    weekday,
    minutes: (hour % 24) * 60 + minute,
  };
}

/** `480` → `8:00 AM`, `1020` → `5:00 PM`. */
export function formatOfficeClock(minutes: number): string {
  const hour24 = Math.floor(minutes / 60) % 24;
  const minute = minutes % 60;
  const suffix = hour24 >= 12 ? 'PM' : 'AM';
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
  return `${hour12}:${String(minute).padStart(2, '0')} ${suffix}`;
}

function isSchoolWeekday(weekday: number): boolean {
  return weekday >= 1 && weekday <= 5;
}

/**
 * Returns the live office status for `now`, evaluated in Nairobi time.
 *
 *  - open        → "Open now, closes 5:00 PM"
 *  - soon        → "Closes soon, 5:00 PM" (last 30 min)
 *                → "Opens soon, 8:00 AM" (30 min before opening)
 *  - closed      → "Closed, opens Mon 8:00 AM" (correct next opening day)
 */
export function getOfficeStatus(now: Date = new Date()): OfficeStatus {
  const { weekday, minutes } = readNairobiClock(now);

  if (isSchoolWeekday(weekday)) {
    if (minutes >= OFFICE_OPEN_MINUTES && minutes < OFFICE_CLOSE_MINUTES) {
      const closingIn = OFFICE_CLOSE_MINUTES - minutes;
      if (closingIn <= OFFICE_SOON_WINDOW_MINUTES) {
        return {
          tone: 'soon',
          messageKey: 'closesSoon',
          time: formatOfficeClock(OFFICE_CLOSE_MINUTES),
          weekday,
        };
      }
      return {
        tone: 'open',
        messageKey: 'openNow',
        time: formatOfficeClock(OFFICE_CLOSE_MINUTES),
        weekday,
      };
    }

    if (minutes < OFFICE_OPEN_MINUTES) {
      const openingIn = OFFICE_OPEN_MINUTES - minutes;
      if (openingIn <= OFFICE_SOON_WINDOW_MINUTES) {
        return {
          tone: 'soon',
          messageKey: 'opensSoon',
          time: formatOfficeClock(OFFICE_OPEN_MINUTES),
          weekday,
        };
      }
    }
  }

  // Closed: find how many days ahead the next weekday opening sits.
  let daysAhead = 0;
  for (let offset = 0; offset <= 7; offset += 1) {
    const candidate = (weekday + offset) % 7;
    if (!isSchoolWeekday(candidate)) continue;
    // Later the same day only counts when the office has not opened yet.
    if (offset === 0 && minutes >= OFFICE_OPEN_MINUTES) continue;
    daysAhead = offset;
    break;
  }

  const nextWeekday = WEEKDAY_SHORT[(weekday + daysAhead) % 7];
  return {
    tone: 'closed',
    messageKey: 'closedOpens',
    time: `${nextWeekday} ${formatOfficeClock(OFFICE_OPEN_MINUTES)}`,
    weekday,
  };
}
