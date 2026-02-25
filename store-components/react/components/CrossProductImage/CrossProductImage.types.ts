import type { CssHandlesTypes } from 'vtex.css-handles';

import type CrossProductImageHandles from './CrossProductImage.handles';

export interface CrossProductImageProps {
  width?: number;
  height?: number;
  classes?: CssHandlesTypes.CustomClasses<typeof CrossProductImageHandles>;
}
