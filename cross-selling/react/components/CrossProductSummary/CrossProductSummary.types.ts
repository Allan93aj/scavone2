import type { CssHandlesTypes } from 'vtex.css-handles'

import type CrossProductSummaryHandles from './CrossProductSummary.handles'
import { CrossSellingProduct } from '../../context/CrossSellingContext'

export interface CrossProductSummaryProps {
  product: CrossSellingProduct
  classes?: CssHandlesTypes.CustomClasses<typeof CrossProductSummaryHandles>
  children?: React.ReactNode
}
