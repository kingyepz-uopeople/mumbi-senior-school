'use client';

import { useEffect, useRef } from 'react';

/** Play muted, looped sport clips and stop (reloop) at endSeconds. */
export default function SportActivityVideo({
  src,
  label,
  endSeconds = 32,
}: {
  src: string;
  label: string;
  endSeconds?: number;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const keepMuted = () => {
      video.muted = true;
      video.volume = 0;
    };

    const clampAndLoop = () => {
      if (video.currentTime >= endSeconds) {
        video.currentTime = 0;
        void video.play().catch(() => {});
      }
    };

    keepMuted();
    video.addEventListener('volumechange', keepMuted);
    video.addEventListener('timeupdate', clampAndLoop);
    video.addEventListener('loadedmetadata', () => {
      if (video.duration > endSeconds) {
        // Hint duration UI toward the trimmed length where supported.
        try {
          video.currentTime = 0;
        } catch {
          /* ignore seek errors before ready */
        }
      }
    });

    return () => {
      video.removeEventListener('volumechange', keepMuted);
      video.removeEventListener('timeupdate', clampAndLoop);
    };
  }, [endSeconds, src]);

  return (
    <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-slate-950">
      <video
        ref={videoRef}
        className="aspect-video w-full bg-black object-cover"
        controls
        playsInline
        muted
        loop
        preload="metadata"
        aria-label={label}
        src={`${src}#t=0,${endSeconds}`}
      />
    </div>
  );
}
