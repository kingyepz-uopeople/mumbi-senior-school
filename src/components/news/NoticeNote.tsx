'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type MouseEvent,
  type PointerEvent,
  type ReactNode,
} from 'react';
import { useRouter } from 'next/navigation';
import { ViewTransition } from 'react';
import { useReducedMotion } from '@/components/shared/motion-utils';
import LocaleLink from '@/i18n/LocaleLink';
import { useLocale } from '@/i18n/locale-context';
import { toIsoDate } from '@/lib/utils';
import type { NewsItem } from '@/types';
import {
  noteAttachment,
  noteTilt,
  noteTone,
  noticeViewName,
  rememberOpenSlug,
  tapeHue,
  type NoteAttachment,
  type TapeHue,
} from '@/components/news/notice-theme';

const OPEN_MS = 380;

function subscribeFineHover(onChange: () => void) {
  const query = window.matchMedia('(hover: hover) and (pointer: fine)');
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
}

function fineHoverSnapshot() {
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
}

function useFineHover() {
  return useSyncExternalStore(subscribeFineHover, fineHoverSnapshot, () => true);
}

function PushPin() {
  return (
    <span className="notice-pin" aria-hidden="true">
      <span className="notice-pin__head" />
      <span className="notice-pin__needle" />
      <span className="notice-pin__shadow" />
    </span>
  );
}

function Tape({
  placement,
  hue,
}: {
  placement: 'center' | 'tl' | 'tr';
  hue: TapeHue;
}) {
  return (
    <span
      className={`notice-tape notice-tape--${hue} notice-tape--${placement}`}
      aria-hidden="true"
    />
  );
}

function Attachments({
  attachment,
  hue,
}: {
  attachment: NoteAttachment;
  hue: TapeHue;
}) {
  if (attachment === 'pin') return <PushPin />;
  if (attachment === 'tape-center') {
    return <Tape placement="center" hue={hue} />;
  }
  return (
    <>
      <Tape placement="tl" hue={hue} />
      <Tape placement="tr" hue={hue} />
    </>
  );
}

export default function NoticeNote({
  item,
  index,
  compact = false,
  expanded = false,
  returning = false,
  headingAs,
  readMoreLabel,
  children,
}: {
  item: NewsItem;
  index: number;
  compact?: boolean;
  expanded?: boolean;
  returning?: boolean;
  headingAs?: 'h1' | 'h2' | 'h3';
  readMoreLabel?: string;
  children?: ReactNode;
}) {
  const router = useRouter();
  const { href: localize } = useLocale();
  const reducedMotion = useReducedMotion();
  const fineHover = useFineHover();
  const [lifted, setLifted] = useState(false);
  const slotRef = useRef<HTMLDivElement>(null);
  const pointerTypeRef = useRef<string>('mouse');

  const tone = noteTone(item);
  const tilt = expanded ? 0 : noteTilt(index);
  const attachment = noteAttachment(item);
  const hue = tapeHue(item);
  const Heading = headingAs ?? (expanded ? 'h1' : compact ? 'h3' : 'h2');
  const href = `/news/${item.slug}`;

  useEffect(() => {
    const slot = slotRef.current;
    const resetOpen = () => {
      slot?.removeAttribute('data-opening');
    };
    resetOpen();
    window.addEventListener('pageshow', resetOpen);
    window.addEventListener('popstate', resetOpen);
    return () => {
      resetOpen();
      window.removeEventListener('pageshow', resetOpen);
      window.removeEventListener('popstate', resetOpen);
    };
  }, [item.slug]);

  const handlePointerDown = useCallback(
    (event: PointerEvent<HTMLAnchorElement>) => {
      pointerTypeRef.current = event.pointerType;
    },
    []
  );

  const handleClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      if (reducedMotion) return;

      const fromReadMore = Boolean(
        (event.target as HTMLElement | null)?.closest('[data-read-more]')
      );

      if (
        !fineHover &&
        !lifted &&
        !fromReadMore &&
        pointerTypeRef.current === 'touch'
      ) {
        event.preventDefault();
        setLifted(true);
        return;
      }

      event.preventDefault();
      slotRef.current?.setAttribute('data-opening', 'true');
      rememberOpenSlug(item.slug);
      const url = localize(href);
      window.setTimeout(() => {
        router.push(url, { transitionTypes: ['news-open'] });
        slotRef.current?.removeAttribute('data-opening');
        setLifted(false);
      }, OPEN_MS);
    },
    [fineHover, href, item.slug, lifted, localize, reducedMotion, router]
  );

  const paperClass = [
    'notice-paper',
    `notice-paper--${tone}`,
    expanded ? 'notice-paper--expanded' : '',
    compact ? 'notice-paper--compact' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const paperStyle = {
    '--note-tilt': `${tilt}deg`,
  } as CSSProperties;

  const inner = (
    <>
      {!expanded ? <Attachments attachment={attachment} hue={hue} /> : null}
      <div className="notice-paper__body">
        <span className="notice-pill">{item.category}</span>
        <time dateTime={toIsoDate(item.date)} className="notice-date">
          {item.date}
        </time>
        <Heading className="notice-title">{item.title}</Heading>
        {item.excerpt ? <p className="notice-excerpt">{item.excerpt}</p> : null}
        {children}
        {!expanded && readMoreLabel ? (
          <span className="notice-readmore" data-read-more="">
            {readMoreLabel}
          </span>
        ) : null}
      </div>
    </>
  );

  if (expanded) {
    return (
      <ViewTransition
        name={noticeViewName(item.slug)}
        share="news-note-morph"
        default="none"
      >
        <article className={paperClass} style={paperStyle} data-light-surface="">
          {inner}
        </article>
      </ViewTransition>
    );
  }

  return (
    <div
      ref={slotRef}
      className="notice-slot"
      style={
        {
          '--note-tilt': `${tilt}deg`,
          '--note-delay': `${Math.min(index, 8) * 55}ms`,
        } as CSSProperties
      }
      data-lifted={lifted && !returning ? 'true' : undefined}
      data-returning={returning ? 'true' : undefined}
    >
      <ViewTransition
        name={noticeViewName(item.slug)}
        share="news-note-morph"
        default="none"
      >
        <LocaleLink
          href={href}
          className={paperClass}
          style={paperStyle}
          transitionTypes={['news-open']}
          onPointerDown={handlePointerDown}
          onClick={handleClick}
          onBlur={() => setLifted(false)}
        >
          {inner}
        </LocaleLink>
      </ViewTransition>
    </div>
  );
}
