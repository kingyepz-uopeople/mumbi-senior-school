import type { IconProps } from './types';

/** UXWing: arrow-right.svg — https://uxwing.com/arrow-right-icon/ */
export default function ArrowRight({ size = 24, ...props }: IconProps) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 122.433" width={size} height={size} fill="currentColor" aria-hidden="true" focusable="false">
      <g><polygon fillRule="evenodd" clipRule="evenodd" points="122.88,61.217 59.207,122.433 59.207,83.029 0,83.029 0,39.399 59.207,39.399 59.207,0 122.88,61.217"/></g>
    </svg>
  );
}
