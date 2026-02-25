import React from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { ButtonPlain } from 'vtex.styleguide'
import { Image } from 'vtex.store-image'

import CrossProductRefreshButtonHandles from './CrossProductRefreshButton.handles'
import type { CrossProductRefreshButtonProps } from './CrossProductRefreshButton.types'
import { useCrossProduct } from '../../context/CrossSellingContext'

function CrossProductRefreshButton({
  allowRefreshingMainProduct,
  icon,
  text,
  classes,
}: CrossProductRefreshButtonProps) {
  const { handles } = useCssHandles(CrossProductRefreshButtonHandles, {
    classes,
  })

  const { refreshProduct, isMainProduct } = useCrossProduct()

  if (isMainProduct && !allowRefreshingMainProduct) return null

  return (
    <div className={handles.refreshButtonContainer}>
      <ButtonPlain onClick={refreshProduct}>
        {icon ? <Image {...icon} /> : null}
        {text ? (
          <span className={handles.refreshButtonLabel}>{text}</span>
        ) : null}
      </ButtonPlain>
    </div>
  )
}

export default CrossProductRefreshButton
