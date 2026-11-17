import Image from 'next/image';
import { Camera } from 'lucide-react';

interface PhotoSlotProps {
  /** Root-relative path under `public/`, e.g. `/images/principal.jpg` */
  src: string;
  /** Whether the image file currently exists on disk */
  exists: boolean;
  /** Accessible alt text when the photograph is present */
  alt: string;
  width: number;
  height: number;
  sizes: string;
  /** Tailwind aspect-ratio utility, e.g. `aspect-4/5` or `aspect-16/9` */
  aspectClassName?: string;
  /** Short caption displayed beneath the frame */
  caption?: string;
  /** Short placeholder label shown until the photo is supplied */
  placeholderLabel?: string;
  priority?: boolean;
}

export default function PhotoSlot({
  src,
  exists,
  alt,
  width,
  height,
  sizes,
  aspectClassName = 'aspect-3/2',
  caption,
  placeholderLabel = 'Photo coming soon',
  priority = false,
}: PhotoSlotProps) {
  return (
    <figure className="m-0">
      {exists ? (
        <div
          className={`relative w-full ${aspectClassName} overflow-hidden bg-slate-100 border border-slate-300`}
        >
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            sizes={sizes}
            priority={priority}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div
          role="img"
          aria-label={`${placeholderLabel}${caption ? ` — ${caption}` : ''}`}
          className={`relative w-full ${aspectClassName} bg-slate-100 border border-slate-300 flex flex-col items-center justify-center p-6 text-center`}
        >
          <div
            aria-hidden="true"
            className="absolute inset-2.5 border border-slate-200 pointer-events-none"
          />
          <Camera
            className="w-5 h-5 text-slate-500 mb-2.5 stroke-[1.5]"
            aria-hidden="true"
          />
          <span className="text-xs font-medium uppercase tracking-widest text-slate-600">
            {placeholderLabel}
          </span>
        </div>
      )}

      {caption && (
        <figcaption className="mt-2.5 text-xs text-slate-600 leading-relaxed">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
