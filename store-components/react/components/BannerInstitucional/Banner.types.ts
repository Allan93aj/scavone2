import type { CssHandlesTypes } from 'vtex.css-handles';

import type { ImageProps } from '../Image/Image.types';
import type BannerHandles from './Banner.handles';

interface BannerProps extends ImageProps {
  title: string;
  subtitle: string;
  description: string;
  textPosition: string;
  grid: string;
  classes?: CssHandlesTypes.CustomClasses<typeof BannerHandles>;
}

export { BannerProps };
