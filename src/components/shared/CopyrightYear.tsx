'use client';

import { useEffect, useState } from 'react';

/**
 * Renders the current year, computed on the client from `new Date().getFullYear()`.
 *
 * The homepage "For parents" index and footer need a copyright year that rolls
 * over automatically after 31 December. Marking this a client component keeps the
 * value out of static rendering and Cache Components, so it is never frozen at
 * the build date. The read is deferred to an effect: the server prerender emits
 * no year, and the client fills it in at runtime, avoiding a hydration mismatch.
 */
export default function CopyrightYear() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setYear(new Date().getFullYear());
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return <span suppressHydrationWarning>{year ?? ''}</span>;
}
