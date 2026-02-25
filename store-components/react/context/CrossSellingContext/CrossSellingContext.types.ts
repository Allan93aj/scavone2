import type { ProductTypes } from 'vtex.product-context';

export interface CrossSellingProduct {
  product?: ProductTypes.Product;
  selectedItem: ProductTypes.Item;
  isSelected: boolean;
}

export interface CrossSellingContextType {
  isLoading: boolean;
  products?: CrossSellingProduct[];
  selectedProducts?: CrossSellingProduct[];
  sellingPrice?: number;
  maxNumberOfInstallmentsWithoutInterest?: number;
  maxInstallmentValueWithoutInterest?: number;
  toggleProductByIndex: (productIndex: number) => void;
  setSelectedItemByIndex: (
    productIndex: number,
    field: string,
    value: string,
  ) => void;
}

export interface CrossSellingProviderProps {
  endPoint: string;
  excludeMainProduct: boolean;
  hasManyProducts?: boolean;
  syncVariation?: string;
  children?: React.ReactNode;
}

export interface CrossProductProviderProps {
  productIndex: number;
  children?: React.ReactNode;
}

export interface CrossProductContextType extends CrossSellingProduct {
  toggleProduct: () => void;
  setSelectedItem: (field: string, value: string) => void;
}
