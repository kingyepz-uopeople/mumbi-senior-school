import type { IconProps } from './types';

/** UXWing: clock.svg — https://uxwing.com/clock-icon/ */
export default function Clock({ size = 24, ...props }: IconProps) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 122.88" width={size} height={size} fill="currentColor" aria-hidden="true" focusable="false">
      <g><path d="M61.44,0c33.93,0,61.44,27.51,61.44,61.44c0,33.93-27.51,61.44-61.44,61.44C27.51,122.88,0,95.37,0,61.44 C0,27.51,27.51,0,61.44,0L61.44,0z M52.92,30.52h7.51c1.37,0,2.5,1.13,2.5,2.5v28.94h26.41c1.38,0,2.5,1.13,2.5,2.5v7.51 c0,1.38-1.13,2.5-2.5,2.5H50.41V33.02C50.41,31.64,51.54,30.52,52.92,30.52L52.92,30.52z M61.44,13.95 c26.23,0,47.49,21.26,47.49,47.49c0,26.23-21.26,47.49-47.49,47.49c-26.23,0-47.49-21.26-47.49-47.49 C13.95,35.22,35.21,13.95,61.44,13.95L61.44,13.95z" fillRule="evenodd" clipRule="evenodd"/></g>
    </svg>
  );
}
