import React, { useMemo } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import {
  ProductSummaryContext,
  ProductSummaryTypes,
} from 'vtex.product-summary-context'
import { ProductContextProvider, ProductTypes } from 'vtex.product-context'

import { CrossProductProvider } from '../../context/CrossSellingContext'
import CrossProductSummaryHandles from './CrossProductSummary.handles'
import type { CrossProductSummaryProps } from './CrossProductSummary.types'

interface FixedSkuSpecification {
  field: ProductTypes.SkuSpecificationField & { originalName: string }
  values: Array<ProductTypes.SkuSpecificationValues & { originalName: string }>
}

function Content({ product, children }: CrossProductSummaryProps) {
  const summary = ProductSummaryContext.useProductSummary()

  return (
    <ProductContextProvider
      product={(summary.product as unknown) as ProductTypes.Product}
      query={{ skuId: summary.selectedItem?.itemId }}
    >
      <CrossProductProvider product={product}>{children}</CrossProductProvider>
    </ProductContextProvider>
  )
}

/**
 * Provides a `CrossProductContext` for the children nodes to use.
 *
 * This component is used by `CrossSellingList` to render each product.
 *
 * @param {number} productIndex Product index.
 */
function CrossProductSummary({
  product: indexedProduct,
  children,
  classes,
}: CrossProductSummaryProps) {
  const { withModifiers } = useCssHandles(CrossProductSummaryHandles, {
    classes,
  })

  /** Parsed cross-selling selected item object into ProductSummaryContext's */
  const selectedItem:
    | ProductSummaryTypes.SingleSKU
    | undefined = useMemo(() => {
    if (!indexedProduct?.selectedItem) return undefined

    const { images, referenceId, ...rest } = indexedProduct.selectedItem

    const cachedImages = images.map((image) => ({
      cacheId: image.imageId,
      ...image,
    }))

    rest.variations = rest.variations.map((variation) => {
      if (typeof variation !== 'string') return variation

      return {
        name: variation,
        values: rest[variation] as string[],
      }
    })

    return {
      images: cachedImages,
      image: cachedImages[0],
      seller: indexedProduct.selectedItem.sellers[0],
      referenceId: referenceId.map((ref) => ({ Value: ref.Value })) as [
        { Value: string }
      ],
      ...rest,
    }
  }, [indexedProduct?.selectedItem])

  /** Parsed cross-selling product object into ProductSummaryContext's */
  const product: ProductSummaryTypes.Product | undefined = useMemo(() => {
    if (!indexedProduct?.product) return

    const {
      brandId,
      items: rawItems,
      skuSpecifications: rawSkuSpecs,
      ...rest
    } = indexedProduct.product

    const selectedProperties = indexedProduct.selectedItem?.variations?.map(
      (variation) => ({
        key: variation.name,
        value: variation.values?.[0],
      })
    )

    const skuSpecifications: FixedSkuSpecification[] = rawSkuSpecs.map(
      (item) => {
        return {
          field: {
            ...item.field,
            originalName: item.field.name,
          },
          values: item.values.map((value) => ({
            ...value,
            originalName: value.name,
          })),
        }
      }
    )

    const items = rawItems.map((item) => {
      item.variations = item.variations.map((variation) => {
        if (typeof variation !== 'string') return variation

        return {
          name: variation,
          values: item[variation] as string[],
        }
      })

      return item
    })

    return {
      brandId: Number(brandId),
      referenceId:
        (indexedProduct.selectedItem?.referenceId.map((ref) => ({
          Value: ref.Value,
        })) as [{ Value: string }]) ?? [],
      ...rest,
      sku: selectedItem ?? {
        ...items[0],
        image: items[0].images[0],
      },
      selectedProperties,
      skuSpecifications,
      items: (items as unknown) as ProductSummaryTypes.SKU[],
    } as ProductSummaryTypes.Product
  }, [indexedProduct, selectedItem])

  if (!product) return null

  return (
    <div
      className={withModifiers(
        'crossProductSummary',
        indexedProduct?.isSelected ? 'checked' : 'unchecked'
      )}
      style={{ flex: 1 }}
    >
      <ProductSummaryContext.ProductSummaryProvider product={product}>
        <Content product={indexedProduct}>{children}</Content>
      </ProductSummaryContext.ProductSummaryProvider>
    </div>
  )
}

export default CrossProductSummary
