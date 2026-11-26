'use client';

import type { ComponentType, CSSProperties, ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import type { IconProps } from '@/components/icons';
import { useReducedMotion } from '@/components/shared/motion-utils';

export type CoreValueItem = {
  id: string;
  title: string;
  description: string;
  Icon: ComponentType<IconProps>;
};

type CoreValuesRevealProps = {
  headingId: string;
  heading: ReactNode;
  items: CoreValueItem[];
};

/**
 * One-shot staggered reveal for the About core-values list.
 * Plays when the section enters the viewport; stays settled after.
 */
export default function CoreValuesReveal({
  headingId,
  heading,
  items,
}: CoreValuesRevealProps) {
  const rootRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const [armed, setArmed] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (reducedMotion) {
      setArmed(true);
      setRevealed(true);
      return;
    }

    const root = rootRef.current;
    if (!root || !('IntersectionObserver' in window)) {
      setArmed(true);
      setRevealed(true);
      return;
    }

    setArmed(true);

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;
        setRevealed(true);
        observer.disconnect();
      },
      { root: null, rootMargin: '0px 0px -12% 0px', threshold: 0.12 }
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <section
      ref={rootRef}
      id="core-values"
      aria-labelledby={headingId}
      data-core-values={armed ? (revealed ? 'in' : 'out') : undefined}
      className="scroll-mt-4 bg-[#F8FAFC] text-[#0C3D6E]"
    >
      <h3
        id={headingId}
        data-core-values-heading=""
        className="mb-6 font-serif text-xl font-bold sm:text-2xl"
      >
        {heading}
      </h3>
      <ol role="list" className="border-t border-[#115191]/20">
        {items.map((value, idx) => {
          const Icon = value.Icon;
          return (
            <li
              key={value.id}
              data-core-value=""
              style={{ '--core-value-i': idx } as CSSProperties}
              className="grid min-w-0 grid-cols-[1.25rem_minmax(0,1fr)] items-start gap-x-4 gap-y-2 border-b border-[#115191]/20 py-6 sm:grid-cols-[1.25rem_minmax(12rem,1fr)_minmax(0,2fr)] sm:gap-x-6 sm:py-7"
            >
              <Icon
                className="mt-1 size-5 text-[#115191]"
                strokeWidth={1.75}
                aria-hidden="true"
                data-core-value-icon=""
              />
              <h4 className="font-serif text-lg font-bold" data-core-value-title="">
                {value.title}
              </h4>
              <p
                className="col-start-2 text-sm leading-relaxed sm:col-start-3 sm:text-base"
                data-core-value-copy=""
              >
                {value.description}
              </p>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
