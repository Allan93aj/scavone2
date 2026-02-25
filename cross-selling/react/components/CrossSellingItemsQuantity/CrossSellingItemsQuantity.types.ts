import type { CssHandlesTypes } from 'vtex.css-handles'

import type CrossSellingItemsQuantityHandles from './CrossSellingItemsQuantity.handles'

export interface CrossSellingItemsQuantityProps {
  message?: string
  countMainProduct: boolean
  classes?: CssHandlesTypes.CustomClasses<
    typeof CrossSellingItemsQuantityHandles
  >
}
