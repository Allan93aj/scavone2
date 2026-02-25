import type { CssHandlesTypes } from 'vtex.css-handles';

import type ProductImagesHandles from './ProductImages.handles';

export interface ProductImagesProps {
  classes?: CssHandlesTypes.CustomClasses<typeof ProductImagesHandles>;
}
