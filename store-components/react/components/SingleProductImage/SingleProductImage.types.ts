import type { CssHandlesTypes } from 'vtex.css-handles';

import type SingleProductImageHandles from './SingleProductImage.handles';

export interface SingleProductImageProps {
  width?: number;
  height?: number;
  classes?: CssHandlesTypes.CustomClasses<typeof SingleProductImageHandles>;
}
