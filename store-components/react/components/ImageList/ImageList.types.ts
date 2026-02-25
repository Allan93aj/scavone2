import type { CssHandlesTypes } from 'vtex.css-handles';

import type ImageListHandles from './ImageList.handles';

interface ImageProps {
  src: string;
  width?: number;
  height?: number;
  alt?: string;
  href?: string;
}

interface ImageListProps {
  images: ImageProps[];
  height?: number | string;
  width?: number | string;
  classes?: CssHandlesTypes.CustomClasses<typeof ImageListHandles>;
}

export { ImageListProps, ImageProps };
