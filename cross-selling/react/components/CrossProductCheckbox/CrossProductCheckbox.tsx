import React from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { useProduct } from 'vtex.product-context'
import { Checkbox } from 'vtex.styleguide'

import { useCrossProduct } from '../../context/CrossSellingContext'
import CrossProductCheckboxHandles from './CrossProductCheckbox.handles'
import type { CrossProductCheckboxProps } from './CrossProductCheckbox.types'

/**
 * Toggles selection of context product.
 *
 * @param {boolean} preventUncheckingMainProduct Whether checkbox should be hidden from main product
 */
function CrossProductCheckbox({
  preventUncheckingMainProduct,
  classes,
}: CrossProductCheckboxProps) {
  const { handles } = useCssHandles(CrossProductCheckboxHandles, { classes })
  const productContext = useProduct()
  const { product, isSelected, toggleProduct } = useCrossProduct()

  if (
    preventUncheckingMainProduct &&
    productContext?.product?.productId === product?.productId
  )
    return null

  return (
    <div className={handles.crossProductCheckboxContainer}>
      <Checkbox checked={isSelected} onChange={toggleProduct} />
    </div>
  )
}

export default CrossProductCheckbox
