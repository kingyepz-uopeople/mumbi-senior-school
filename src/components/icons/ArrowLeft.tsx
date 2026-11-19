import type { IconProps } from './types';

/** UXWing: arrow-left.svg — https://uxwing.com/arrow-left-icon/ */
export default function ArrowLeft({ size = 24, ...props }: IconProps) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 122.433" width={size} height={size} fill="currentColor" aria-hidden="true" focusable="false">
      <g><polygon fillRule="evenodd" clipRule="evenodd" points="0,61.217 63.673,122.433 63.673,83.029 122.88,83.029 122.88,39.399 63.673,39.399 63.673,0 0,61.217"/></g>
    </svg>
  );
}
