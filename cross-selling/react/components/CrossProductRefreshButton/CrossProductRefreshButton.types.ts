import type { CssHandlesTypes } from 'vtex.css-handles'
import { Image } from 'vtex.store-image'

import type CrossProductRefreshButtonHandles from './CrossProductRefreshButton.handles'

interface CrossProductRefreshButtonProps {
  allowRefreshingMainProduct?: boolean
  icon?: React.ComponentProps<typeof Image>
  text?: string
  classes?: CssHandlesTypes.CustomClasses<
    typeof CrossProductRefreshButtonHandles
  >
}

export { CrossProductRefreshButtonProps }
