import { useProduct } from 'vtex.product-context'

/**
 * Renders product SKU selector.
 */
function CrossProductSkuSelector() {
  const productContext = useProduct()

  if (!productContext?.product?.items) return null

  return null
}

export default CrossProductSkuSelector
