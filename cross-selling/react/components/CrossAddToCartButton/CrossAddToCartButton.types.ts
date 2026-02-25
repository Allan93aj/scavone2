import type { CssHandlesTypes } from 'vtex.css-handles'

import type CrossAddToCartButtonHandles from './CrossAddToCart.handles'

export interface CrossAddToCartButtonProps {
  text?: string
  classes?: CssHandlesTypes.CustomClasses<typeof CrossAddToCartButtonHandles>
}
