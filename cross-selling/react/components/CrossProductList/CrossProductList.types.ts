import type { CssHandlesTypes } from 'vtex.css-handles'

import type CrossProductListHandles from './CrossProductList.handles'

export interface CrossProductListProps {
  hideMainProduct?: boolean
  classes?: CssHandlesTypes.CustomClasses<typeof CrossProductListHandles>
}
