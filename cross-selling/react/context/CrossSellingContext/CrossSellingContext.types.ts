import type { ProductTypes } from 'vtex.product-context'

export interface CrossSellingProduct {
  index: number
  product?: ProductTypes.Product
  selectedItem: ProductTypes.Item | null | undefined
  skuSelector?: Partial<ProductTypes.SkuSelectorContextState>
  isSelected: boolean
  isShowing: boolean
  justRefreshed: boolean
  isMainProduct: boolean
}

export interface CrossSellingContextType {
  isLoading: boolean
  products?: CrossSellingProduct[]
  selectedProducts?: CrossSellingProduct[]
  sellingPrice?: number
  maxVisibleProducts: number
  maxNumberOfInstallmentsWithoutInterest?: number
  maxInstallmentValueWithoutInterest?: number
  updateProduct: (index: number, fields: Partial<CrossSellingProduct>) => void
  refreshProductByIndex: (productIndex: number) => void
  minProductCount: number
}

export interface CrossSellingProviderProps {
  endPoint: string
  excludeMainProduct?: boolean
  syncVariations?: string
  maxVisibleProducts?: number
  children?: React.ReactNode
}

export interface CrossProductProviderProps {
  product: CrossSellingProduct
  children?: React.ReactNode
}

export interface CrossProductContextType extends CrossSellingProduct {
  toggleProduct: () => void
  refreshProduct: () => void
  isMainProduct: boolean
}
