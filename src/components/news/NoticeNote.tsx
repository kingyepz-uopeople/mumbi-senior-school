'use client';

import {
  useCallback,
  useEffect,
  useRef,
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
} from 'react';
import { ViewTransition } from 'react';
import { useReducedMotion } from '@/components/shared/motion-utils';
import LocaleLink from '@/i18n/LocaleLink';
import { toIsoDate } from '@/lib/utils';
import type { NewsItem } from '@/types';
import {
  noteAttachment,
  noteTilt,
  noteTone,
  noticeViewName,
  rememberOpenSlug,
  tapeHue,
  tapeTilt,
  type NoteAttachment,
  type TapeHue,
  type TapePlacement,
} from '@/components/news/notice-theme';

function PushPin() {
  return (
    <span className="notice-pin" aria-hidden="true">
      <span className="notice-pin__shadow" />
      <span className="notice-pin__needle" />
      <span className="notice-pin__collar" />
      <span className="notice-pin__head" />
    </span>
  );
}

function Tape({
  placement,
  hue,
  tilt,
}: {
  placement: TapePlacement;
  hue: TapeHue;
  tilt: number;
}) {
  return (
    <span
      className={`notice-tape notice-tape--${hue} notice-tape--${placement}`}
      style={{ '--tape-tilt': `${tilt}deg` } as CSSProperties}
      aria-hidden="true"
    />
  );
}

function Attachments({
  attachment,
  item,
}: {
  attachment: NoteAttachment;
  item: NewsItem;
}) {
  const hue = tapeHue(item);
  if (attachment === 'pin') return <PushPin />;
  if (attachment === 'tape-center') {
    return (
      <Tape placement="center" hue={hue} tilt={tapeTilt(item, 'center')} />
    );
  }
  return (
    <>
      <Tape placement="tl" hue={hue} tilt={tapeTilt(item, 'tl')} />
      <Tape placement="tr" hue={hue} tilt={tapeTilt(item, 'tr')} />
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
  const reducedMotion = useReducedMotion();
  const slotRef = useRef<HTMLDivElement>(null);

  const tone = noteTone(item);
  const tilt = expanded ? 0 : noteTilt(index);
  const attachment = noteAttachment(item);
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

      rememberOpenSlug(item.slug);

      if (reducedMotion) return;

      // Peel and pin-pull run alongside navigation. Do not preventDefault or
      // delay the LocaleLink, and do not clear data-opening here so the tape
      // does not snap back before the next page takes over.
      slotRef.current?.setAttribute('data-opening', 'true');
    },
    [item.slug, reducedMotion]
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

  const body = (
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
  );

  if (expanded) {
    return (
      <ViewTransition
        name={noticeViewName(item.slug)}
        share="news-note-morph"
        default="none"
      >
        <article className={paperClass} style={paperStyle} data-light-surface="">
          {body}
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
      data-returning={returning ? 'true' : undefined}
    >
      <div className="notice-cluster">
        <Attachments attachment={attachment} item={item} />
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
            onClick={handleClick}
          >
            {body}
          </LocaleLink>
        </ViewTransition>
      </div>
    </div>
  );
}
