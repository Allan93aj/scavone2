import React, { useMemo } from 'react'
import { useCssHandles } from 'vtex.css-handles'

import { useCrossSelling } from '../../context/CrossSellingContext'
import CrossSellingItemsQuantityHandles from './CrossSellingItemsQuantity.handles'
import type { CrossSellingItemsQuantityProps } from './CrossSellingItemsQuantity.types'

/**
 * Renders a message telling how many items are selected.
 *
 * ## Markers
 *
 * Use these markers around a block to display dynamic values.
 *
 * - `quantity` - Quantity of items
 */
function CrossSellingItemsQuantity({
  message = '{quantity}',
  countMainProduct,
  classes,
}: CrossSellingItemsQuantityProps) {
  const { handles } = useCssHandles(CrossSellingItemsQuantityHandles, {
    classes,
  })

  const { selectedProducts } = useCrossSelling()

  const countedProducts = countMainProduct
    ? selectedProducts
    : selectedProducts?.filter(({ isMainProduct }) => !isMainProduct)

  const quantity = countedProducts?.length ?? 0

  const content = useMemo(() => {
    const subMessages = message.split('{quantity}')

    const firstPart = subMessages.shift()
    const after = subMessages.join('')

    return (
      <>
        {firstPart}
        <span className={handles.crossSellingItemsQuantityValue}>
          {quantity}
        </span>{' '}
        {quantity > 1 ? 'produtos' : 'produto'}
        {after}
      </>
    )
  }, [handles.crossSellingItemsQuantityValue, message, quantity])

  return <span className={handles.crossSellingItemsQuantity}>{content}</span>
}

export default CrossSellingItemsQuantity
