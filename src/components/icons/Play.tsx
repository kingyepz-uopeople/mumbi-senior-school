import type { IconProps } from './types';

/** UXWing: play.svg — https://uxwing.com/play-icon/ */
export default function Play({ size = 24, ...props }: IconProps) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 92.2 122.88" width={size} height={size} fill="currentColor" aria-hidden="true" focusable="false">
      <g><polygon points="92.2,60.97 0,122.88 0,0 92.2,60.97" fillRule="evenodd" clipRule="evenodd"/></g>
    </svg>
  );
}
