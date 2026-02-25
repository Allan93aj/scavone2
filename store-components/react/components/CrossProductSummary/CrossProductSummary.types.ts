import type { CssHandlesTypes } from 'vtex.css-handles';

import type CrossProductSummaryHandles from './CrossProductSummary.handles';

export interface CrossProductSummaryProps {
  productIndex?: number;
  classes?: CssHandlesTypes.CustomClasses<typeof CrossProductSummaryHandles>;
  children?: React.ReactNode;
}
