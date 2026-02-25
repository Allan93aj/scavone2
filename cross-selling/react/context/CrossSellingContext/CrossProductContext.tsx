// @ts-nocheck
import React, { createContext, useContext, useCallback, useEffect } from 'react'
import { useProduct, ProductTypes } from 'vtex.product-context'

import type {
  CrossProductProviderProps,
  CrossProductContextType,
  CrossSellingProduct,
} from './CrossSellingContext.types'
import { useCrossSelling } from './CrossSellingContext'

export const CrossProductContext = createContext({} as CrossProductContextType)

export const useCrossProduct = () => useContext(CrossProductContext)

/**
 * Provides context for an individual product of the Cross Selling.
 *
 * ## Important
 *
 * This provider must be a child of `CrossSellingProvider`.
 *
 * @param {CrossSellingProduct} product Informations about the cross-selling product.
 * @see `CrossSellingProvider`
 */
export function CrossProductProvider({
  product: crossProduct,
  children,
}: CrossProductProviderProps) {
  const {
    updateProduct,
    refreshProductByIndex,
    selectedProducts,
    minProductCount,
  } = useCrossSelling()

  const productContext = useProduct()

  /**
   * Toggles product from selected products list.
   */
  const toggleProduct = useCallback(() => {
    const { index, isSelected } = crossProduct

    if (
      isSelected &&
      selectedProducts &&
      selectedProducts?.length <= minProductCount
    )
      return

    updateProduct(index, { isSelected: !isSelected } as { isSelected: boolean })
  }, [crossProduct, minProductCount, selectedProducts, updateProduct])

  /**
   * Marks this product to be replaced.
   *
   * It uses `refreshProductByIndex` under the hood to make this change to the cross-selling context.
   *
   * @see `refreshProductByIndex` method
   */
  const refreshProduct = useCallback(() => {
    refreshProductByIndex(crossProduct.index)
  }, [crossProduct.index, refreshProductByIndex])

  useEffect(() => {
    if (!productContext || !crossProduct?.product) return

    const changeFlags = []

    if (productContext.skuSelector) {
      changeFlags.push(
        productContext.skuSelector &&
          Object.keys(productContext.skuSelector).some((key) => {
            type K = keyof ProductTypes.SkuSelectorContextState

            return (
              productContext?.skuSelector?.[key as K] !==
              crossProduct?.skuSelector?.[key as K]
            )
          })
      )
    }

    changeFlags.push(
      productContext.selectedItem?.itemId !== crossProduct?.selectedItem?.itemId
    )

    changeFlags.push(
      productContext.product?.productId !== crossProduct.product.productId
    )

    if (!changeFlags.some(Boolean)) return // nothing changed

    updateProduct(crossProduct.index, {
      product: productContext.product as ProductTypes.Product | undefined,
      selectedItem: productContext?.selectedItem,
      skuSelector: productContext.skuSelector,
    })
  }, [crossProduct, productContext, crossProduct.index, updateProduct])

  return (
    <CrossProductContext.Provider
      value={{
        ...(crossProduct as CrossSellingProduct),
        toggleProduct,
        refreshProduct,
      }}
    >
      {children}
    </CrossProductContext.Provider>
  )
}
