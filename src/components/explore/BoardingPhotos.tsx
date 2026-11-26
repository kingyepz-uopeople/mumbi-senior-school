'use client';

import Image from 'next/image';
import { useLocale } from '@/i18n/locale-context';

export default function BoardingPhotos() {
  const { dict } = useLocale();
  const e = dict.explore;

  const boardingPhotos = [
    {
      src: '/images/school/boarding-1.jpg',
      label: e.boardingPhoto1Label,
      caption: e.boardingPhoto1Caption,
      alt: e.boardingPhoto1Alt,
    },
    {
      src: '/images/school/boarding-2.jpg',
      label: e.boardingPhoto2Label,
      caption: e.boardingPhoto2Caption,
      alt: e.boardingPhoto2Alt,
    },
    {
      src: '/images/school/school-bus.jpg',
      label: e.boardingPhoto3Label,
      caption: e.boardingPhoto3Caption,
      alt: e.boardingPhoto3Alt,
    },
  ];

  return (
    <section aria-labelledby="boarding-photos-heading">
      <h3
        id="boarding-photos-heading"
        className="mb-4 font-serif text-xl font-bold text-slate-900 sm:text-2xl"
      >
        {e.boardingPhotos}
      </h3>
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
        {boardingPhotos.map(({ src, label, caption, alt }) => (
          <figure
            key={src}
            className="m-0 overflow-hidden rounded-3xl border border-t-2 border-slate-200 border-t-primary bg-white shadow-sm"
          >
            <Image
              src={src}
              alt={alt}
              width={1600}
              height={900}
              sizes="(max-width: 639px) calc(100vw - 32px), (max-width: 1279px) 50vw, 604px"
              className="block h-auto w-full"
            />
            <figcaption className="flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-slate-200 px-4 py-3 text-sm font-medium text-slate-800">
              <span className="rounded-full border border-slate-200 bg-white/85 px-3 py-1 text-xs font-semibold text-primary-dark shadow-sm backdrop-blur-md">
                {label}
              </span>
              {caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
