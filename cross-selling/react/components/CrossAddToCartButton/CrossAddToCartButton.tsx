import React, { useCallback, useState } from 'react'
import { OrderItems } from 'vtex.order-items'
import { useCssHandles } from 'vtex.css-handles'
import { usePixel } from 'vtex.pixel-manager'
import classNames from 'classnames'
import { Button } from 'vtex.styleguide'
import { FormattedMessage } from 'react-intl'

import { useCrossSelling } from '../../context/CrossSellingContext'
import type { CrossAddToCartButtonProps } from './CrossAddToCartButton.types'
import CrossAddToCartButtonHandles from './CrossAddToCart.handles'

/**
 * Adds all selected items to cart.
 *
 * @param {string} text Button text content
 */
function CrossAddToCartButton({ text, classes }: CrossAddToCartButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const { handles } = useCssHandles(CrossAddToCartButtonHandles, { classes })
  const { selectedProducts } = useCrossSelling()
  const { addItems } = OrderItems.useOrderItems()
  const { push } = usePixel()

  const disabled = !selectedProducts?.every(
    ({ skuSelector }) => skuSelector?.areAllVariationsSelected
  )

  const handleAddToCart = useCallback(async () => {
    const items = selectedProducts
      ?.map(({ selectedItem }) => ({
        id: selectedItem?.itemId,
        quantity: 1,
        seller: selectedItem?.sellers[0].sellerId,
      }))
      .filter((item) => item.id && item.seller)

    setIsLoading(true)

    await addItems(items)

    push({
      id: 'addToCart',
      event: 'addToCart',
    })

    setIsLoading(false)
  }, [addItems, push, selectedProducts])

  return (
    <div className={handles.crossAddToCart}>
      <Button
        className={classNames(
          handles.crossAddToCartButton,
          'flex items-center justify-center'
        )}
        onClick={handleAddToCart}
        isLoading={isLoading}
        disabled={disabled}
      >
        {text ?? (
          <FormattedMessage id="store/cross-add-to-cart-button.add-to-cart" />
        )}
      </Button>
    </div>
  )
}

export default CrossAddToCartButton
