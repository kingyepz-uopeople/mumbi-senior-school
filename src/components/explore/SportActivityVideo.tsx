'use client';

import { useEffect, useRef } from 'react';

/** Muted, looping sport clip that only plays the first `endSeconds`. */
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

    const keepSilent = () => {
      video.muted = true;
      video.defaultMuted = true;
      video.volume = 0;
    };

    const enforceTrimmedLoop = () => {
      if (video.currentTime >= endSeconds) {
        video.currentTime = 0.05;
        void video.play().catch(() => {});
      }
    };

    keepSilent();
    video.addEventListener('play', keepSilent);
    video.addEventListener('volumechange', keepSilent);
    video.addEventListener('timeupdate', enforceTrimmedLoop);
    video.addEventListener('ended', () => {
      video.currentTime = 0.05;
      void video.play().catch(() => {});
    });

    return () => {
      video.removeEventListener('play', keepSilent);
      video.removeEventListener('volumechange', keepSilent);
      video.removeEventListener('timeupdate', enforceTrimmedLoop);
    };
  }, [endSeconds, src]);

  return (
    <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-slate-950">
      <video
        ref={videoRef}
        className="aspect-video w-full bg-black object-cover"
        controls
        controlsList="nodownload noplaybackrate"
        disablePictureInPicture
        playsInline
        muted
        preload="metadata"
        aria-label={label}
        src={`${src}#t=0,${endSeconds}`}
      />
    </div>
  );
}
