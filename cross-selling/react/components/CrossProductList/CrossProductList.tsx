import React from 'react'
import { ExtensionPoint } from 'vtex.render-runtime'
import { useCssHandles } from 'vtex.css-handles'
import { useProduct } from 'vtex.product-context'

import {
  useCrossSelling,
  CrossSellingProduct,
} from '../../context/CrossSellingContext'
import CrossProductListHandles from './CrossProductList.handles'
import type { CrossProductListProps } from './CrossProductList.types'

/**
 * Renders the list of products.
 *
 * Requires `cross-product-summary` block to handle rendering of each item.
 *
 * @param {boolean} hideMainProduct Whether to skip main product (it will still be included on purchase)
 */
function CrossProductList({ hideMainProduct, classes }: CrossProductListProps) {
  const { handles } = useCssHandles(CrossProductListHandles, { classes })
  const productContext = useProduct()
  const { products } = useCrossSelling()

  const renderExtension = (product: CrossSellingProduct) => (
    <ExtensionPoint
      key={product.product?.productId}
      id="cross-product-summary"
      blockProps={{ product }}
    />
  )

  /** Filters out the main product. */
  const renderComplementaryOnly = (crossProduct: CrossSellingProduct) => {
    if (crossProduct.product?.productId === productContext?.product?.productId)
      return null

    return renderExtension(crossProduct)
  }

  return (
    <div className={handles.crossProductList}>
      {products?.map(
        hideMainProduct ? renderComplementaryOnly : renderExtension
      )}
    </div>
  )
}

export default CrossProductList
