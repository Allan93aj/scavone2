import React, { useState, useEffect, useMemo, useCallback } from 'react'
import type { ProductTypes } from 'vtex.product-context'
import { useProduct } from 'vtex.product-context'
import axios from 'axios'

import { pickMaxInstallmentsOptionWithoutInterest } from '../../utils/installments'
import type {
  CrossSellingProviderProps,
  CrossSellingProduct,
} from './CrossSellingContext.types'
import { CrossSellingContext } from './CrossSellingContext'

/**
 * The main context to provide the Cross Selling functionality.
 *
 * @param {string} endPoint From where should the products be requested.
 * @param {boolean} excludeMainProduct Whether to exclude the main product.
 * @param {string} syncVariations Products will listen the main product's matching variation to automatically change selected item.
 * @param {number} maxVisibleExtraProducts Defines the maximum extra products (main product doesn't count)
 */
function CrossSellingProvider({
  endPoint,
  excludeMainProduct,
  syncVariations,
  maxVisibleProducts = 2,
  children,
}: CrossSellingProviderProps) {
  const [productPool, setProductPool] = useState<CrossSellingProduct[]>()
  const [isLoading, setIsLoading] = useState(true)

  const minProductCount = excludeMainProduct ? 1 : 2

  const productContext = useProduct()

  /** List of visible products from pool */
  const products: CrossSellingProduct[] | undefined = useMemo(() => {
    return productPool?.filter(({ isShowing }) => isShowing)
  }, [productPool])

  /** List of products that will be added to cart upon purchase */
  const selectedProducts = useMemo(() => {
    return products?.filter(({ isSelected }) => isSelected)
  }, [products])

  /**
   * Randomnly chooses which products should be shown from a given list.
   *
   * @param {CrossSellingProduct[]} productList Set of products to choose from.
   * @returns {CrossSellingProduct[]} Shuffled list.
   */
  const refresh = useCallback(
    (productList: CrossSellingProduct[]): CrossSellingProduct[] => {
      // Show all products, since there is capacity for all of them
      // to display.
      if (productList.length <= maxVisibleProducts)
        return productList.map((item) => {
          item.isShowing = true

          return item
        })

      // const productsToRefresh = productList.filter(
      //   value => value.selectedItem.sellers[0].commertialOffer.AvailableQuantity > 0
      // )

      while (
        productList.filter(({ isShowing }) => isShowing)?.length <
        maxVisibleProducts
      ) {
        const randomIndex = Math.round(Math.random() * productList.length - 1)

        if (
          !productList[randomIndex] ||
          productList[randomIndex].justRefreshed ||
          productList[randomIndex].isShowing
        )
          continue

        productList[randomIndex].isShowing = true

        const indexToReplace = productList.findIndex(
          ({ justRefreshed }) => justRefreshed
        )

        if (indexToReplace === -1) continue

        const replacedItem = productList[indexToReplace]

        productList[indexToReplace] = productList[randomIndex]
        productList[randomIndex] = replacedItem
      }

      return productList.map((product) => ({
        ...product,
        justRefreshed: false,
      }))
    },
    [maxVisibleProducts]
  )

  /**
   * Partially updates a Cross-selling product.
   *
   * @param {number} index Specify which Product to change by its index.
   * @param {Partial<CrossSellingProduct>} fields Partial fields to update.
   */
  const updateProduct = useCallback(
    (index: number, fields: Partial<CrossSellingProduct>) => {
      setProductPool((state) => {
        return state?.map((original, originalIndex) => {
          if (index !== originalIndex) return original

          return {
            ...original,
            ...fields,
          }
        })
      })
    },
    []
  )

  /**
   * Marks an specific product to be replaced using the `refresh` method.
   *
   * To ensure that the product that just got removed isn't reselected immediatly, the
   * `justRefreshed` property is set to `true`.
   *
   * This method causes side-effects with the product pool state.
   *
   * @see `refresh` method
   */
  const refreshProductByIndex = useCallback(
    (productIndex: number) => {
      const productPoolCopy = Array.from(productPool ?? [])?.map((product) => {
        if (
          products?.[productIndex].product?.productId !==
          product.product?.productId
        )
          return product

        return { ...product, isShowing: false, justRefreshed: true }
      })

      setProductPool(refresh(productPoolCopy))
    },
    [productPool, products, refresh]
  )

  useEffect(() => {
    const productId = productContext?.product?.productId

    if (!productId || !isLoading) return

    const fetchProducts = async () => {
      const url = endPoint.replace('{productId}', productId)

      const { data } = await axios.get<ProductTypes.Product[]>(url)

      if (!excludeMainProduct && productContext?.product)
        data.unshift(productContext.product)

      const uniqueProducts = [
        ...new Map(
          data.map((product) => [product.productId, product])
        ).values(),
      ]

      const similarProductsWithSkus = await Promise.all(
        uniqueProducts.map(async (product) => {
          const response = await axios.get<ProductTypes.Product[]>(
            `/api/catalog_system/pub/products/search/?fq=productId:${product.productId}`
          )

          return response.data[0]
        })
      )

      const crossSellingProducts = similarProductsWithSkus.map(
        (product, index) => {
          const result = {
            index,
            product,
            isSelected: true,
            isMainProduct: product.productId === productId,
            isShowing: product.productId === productId, // Always shows main product initially.
            justRefreshed: false,
            selectedItem: null,
          } as CrossSellingProduct

          if (syncVariations) {
            const selectedVariation = productContext?.selectedItem?.variations.find(
              ({ name }) => name === syncVariations
            )

            result.selectedItem =
              selectedVariation &&
              product.items.find((item) => {
                // ProductTypes.Item does not have proper types for item[variation] accessing.
                const [itemVariation] = ((item as unknown) as Record<
                  string,
                  string[]
                >)[syncVariations]

                return itemVariation === selectedVariation.values[0]
              })
          }

          return result
        }
      )

      setProductPool(refresh(crossSellingProducts))
    }

    fetchProducts().then(() => {
      setIsLoading(false)
    })
  }, [
    endPoint,
    excludeMainProduct,
    isLoading,
    productContext,
    refresh,
    syncVariations,
  ])

  /**
   * Total selling price of product selection.
   */
  const sellingPrice = useMemo(() => {
    const amount = selectedProducts?.reduce((acc, curr) => {
      const item = curr.selectedItem ?? curr.product?.items[0]

      return acc + (item?.sellers[0].commertialOffer.Price ?? 0)
    }, 0)

    return amount
  }, [selectedProducts])

  /**
   * Total number of installments without interest of product selection.
   */
  const maxNumberOfInstallmentsWithoutInterest = useMemo(() => {
    const maxInstallmentsList = selectedProducts
      ?.map(({ selectedItem }) => {
        const itemInstallments =
          selectedItem?.sellers[0].commertialOffer.Installments

        if (!itemInstallments) return null

        const installments = pickMaxInstallmentsOptionWithoutInterest(
          itemInstallments,
          null
        )

        return installments
      })
      .filter(Boolean)

    const maxNumberOfInstallments = maxInstallmentsList?.reduce((acc, curr) => {
      if (!curr) return acc

      return Math.min(acc, curr.NumberOfInstallments)
    }, 99)

    return maxNumberOfInstallments
  }, [selectedProducts])

  /**
   * Total installment value without interest of product selection.
   */
  const maxInstallmentValueWithoutInterest = useMemo(() => {
    if (!sellingPrice || !maxNumberOfInstallmentsWithoutInterest) return

    return sellingPrice / maxNumberOfInstallmentsWithoutInterest
  }, [sellingPrice, maxNumberOfInstallmentsWithoutInterest])

  return (
    <div id="buytogether">
      <CrossSellingContext.Provider
        value={{
          products,
          selectedProducts,
          sellingPrice,
          maxVisibleProducts,
          maxNumberOfInstallmentsWithoutInterest,
          maxInstallmentValueWithoutInterest,
          updateProduct,
          refreshProductByIndex,
          isLoading,
          minProductCount,
        }}
      >
        {productPool?.length && productPool.length > 1 ? children : null}
      </CrossSellingContext.Provider>
    </div>
  )
}

export default CrossSellingProvider
