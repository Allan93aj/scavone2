import type { CssHandlesTypes } from 'vtex.css-handles';

import type CrossProductSellingPriceHandles from './CrossProductSellingPrice.handles';

export interface CrossProductSellingPriceProps {
  message?: string;
  classes?: CssHandlesTypes.CustomClasses<
    typeof CrossProductSellingPriceHandles
  >;
}
