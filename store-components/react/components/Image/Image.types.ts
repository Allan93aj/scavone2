import type { CssHandlesTypes } from 'vtex.css-handles';

import type ImageHandles from './Image.handles';

interface ImageProps {
  heading?: string;
  src: string;
  srcMobile?: string;
  width?: number;
  height?: number;
  widthMobile?: number;
  heightMobile?: number;
  alt?: string;
  classes?: CssHandlesTypes.CustomClasses<typeof ImageHandles>;
}

export type { ImageProps };
