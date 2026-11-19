import type { IconProps } from './types';

/** UXWing: pause.svg — https://uxwing.com/pause-icon/ */
export default function Pause({ size = 24, ...props }: IconProps) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 87.72 122.88" width={size} height={size} fill="currentColor" aria-hidden="true" focusable="false">
      <g><path d="M0,0h35.54v122.88l-35.54,0V0L0,0z M52.18,0h35.54v122.88l-35.54,0V0L52.18,0z" fillRule="evenodd" clipRule="evenodd"/></g>
    </svg>
  );
}
