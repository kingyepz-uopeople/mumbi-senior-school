import type { CSSProperties } from 'react';

interface HeroMaskedTitleProps {
  id?: string;
  text: string;
  className?: string;
  /** Delay before the first word slides up from its clipped baseline (ms) */
  baseDelayMs?: number;
  /** Stagger interval between consecutive words (ms) */
  staggerMs?: number;
}

/**
 * Word-by-word baseline mask-reveal heading shared by the homepage hero and
 * all inner page heroes. Renders as a pure Server Component using CSS
 * transform-only keyframes, keeping literal spaces between words for natural
 * line wrapping, copy-paste, and screen-reader pronunciation.
 */
export default function HeroMaskedTitle({
  id,
  text,
  className,
  baseDelayMs = 95,
  staggerMs = 70,
}: HeroMaskedTitleProps) {
  const words = text.trim().split(/\s+/);

  return (
    <h1 id={id} className={className}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`}>
          <span className="hero-word-mask">
            <span
              className="hero-word"
              style={
                {
                  '--word-delay': `${baseDelayMs + index * staggerMs}ms`,
                } as CSSProperties
              }
            >
              {word}
            </span>
          </span>
          {index < words.length - 1 ? ' ' : null}
        </span>
      ))}
    </h1>
  );
}
