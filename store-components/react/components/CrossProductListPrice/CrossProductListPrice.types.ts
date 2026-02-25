import type { CssHandlesTypes } from 'vtex.css-handles';

import type CrossProductListPriceHandles from './CrossProductListPrice.handles';

export interface CrossProductListPriceProps {
  message?: string;
  classes?: CssHandlesTypes.CustomClasses<typeof CrossProductListPriceHandles>;
}
