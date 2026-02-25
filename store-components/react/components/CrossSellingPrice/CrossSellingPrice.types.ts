import type { CssHandlesTypes } from 'vtex.css-handles';

import type CrossSellingPriceHandles from './CrossSelligPrice.handles';

export interface CrossSellingPriceProps {
  message?: string;
  classes?: CssHandlesTypes.CustomClasses<typeof CrossSellingPriceHandles>;
}
