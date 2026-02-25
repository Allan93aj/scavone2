import React, { createContext, useContext, useCallback } from 'react';

import type {
  CrossProductProviderProps,
  CrossProductContextType,
  CrossSellingProduct,
} from './CrossSellingContext.types';
import { useCrossSelling } from './CrossSellingContext';

export const CrossProductContext = createContext({} as CrossProductContextType);

export const useCrossProduct = () => useContext(CrossProductContext);
export function CrossProductProvider({
  productIndex,
  children,
}: CrossProductProviderProps) {
  const {
    products,
    toggleProductByIndex,
    setSelectedItemByIndex,
  } = useCrossSelling();

  const product = products?.[productIndex];

  const toggleProduct = useCallback(() => {
    toggleProductByIndex(productIndex);
  }, [productIndex, toggleProductByIndex]);

  const setSelectedItem = useCallback(
    (field: string, value: string) => {
      setSelectedItemByIndex(productIndex, field, value);
    },
    [productIndex, setSelectedItemByIndex],
  );

  return (
    <CrossProductContext.Provider
      value={{
        ...(product as CrossSellingProduct),
        toggleProduct,
        setSelectedItem,
      }}
    >
      {children}
    </CrossProductContext.Provider>
  );
}
