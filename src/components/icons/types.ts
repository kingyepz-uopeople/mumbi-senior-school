import type { SVGProps } from 'react';

/** Local UXWing icons inherit text color; label the surrounding control. */
export type IconProps = Omit<SVGProps<SVGSVGElement>, 'width' | 'height' | 'children' | 'fill'> & {
  size?: number | string;
};
