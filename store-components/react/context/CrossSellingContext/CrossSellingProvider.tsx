import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useProduct } from 'vtex.product-context';
import type { ProductTypes } from 'vtex.product-context';
import axios from 'axios';

import { pickMaxInstallmentsOptionWithoutInterest } from '../../utils/installments';
import type {
  CrossSellingProviderProps,
  CrossSellingProduct,
} from './CrossSellingContext.types';
import { CrossSellingContext } from './CrossSellingContext';

function CrossSellingProvider({
  endPoint,
  excludeMainProduct,
  syncVariation,
  hasManyProducts,
  children,
}: CrossSellingProviderProps) {
  const [products, setProducts] = useState<CrossSellingProduct[]>();
  const [isLoading, setIsLoading] = useState(true);

  const productContext = useProduct();

  const selectedProducts = useMemo(() => {
    return products?.filter(({ isSelected }) => isSelected);
  }, [products]);

  const toggleProductByIndex = useCallback(
    (productIndex: number) => {
      const mininumProducts = excludeMainProduct ? 1 : 2;

      setProducts((state) => {
        return state?.map((product, index) => {
          if (index !== productIndex) return product;

          if (
            product.isSelected &&
            selectedProducts &&
            selectedProducts?.length <= mininumProducts
          )
            return product;

          return {
            ...product,
            isSelected: !product.isSelected,
          };
        });
      });
    },
    [excludeMainProduct, selectedProducts],
  );

  const setSelectedItemByIndex = useCallback(
    (productIndex: number, field: string, value: string) => {
      setProducts((state) => {
        return state?.map((product, index) => {
          if (index !== productIndex) return product;

          const selectedItem = product?.product?.items.find((item) => {
            const [property] = item[field as 'name'];

            const areOtherSpecificationsMatching = product.product?.skuSpecifications?.every(
              (specification) => {
                const [prev] = product.selectedItem[
                  specification.field.name as 'name'
                ];

                const [current] = item[specification.field.name as 'name'];

                return prev === current || specification.field.name === field;
              },
            );

            return property === value && areOtherSpecificationsMatching;
          });

          if (!selectedItem) return product;

          return {
            ...product,
            selectedItem,
          };
        });
      });
    },
    [],
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const productId = productContext?.product?.productId;

    if (!productId) return;

    const fetchProducts = async () => {
      setIsLoading(true);

      const url = hasManyProducts
        ? endPoint
        : endPoint.replace('{productId}', productId);

      const { data } = await axios.get<ProductTypes.Product[]>(url);

      if (!excludeMainProduct && productContext?.product)
        data.unshift(productContext.product);

      const uniqueProducts = [
        ...new Map(
          data.map((product) => [product.productId, product]),
        ).values(),
      ];

      const similarProductsWithSkus = await Promise.all(
        uniqueProducts.map(async (product) => {
          const response = await axios.get<ProductTypes.Product[]>(
            `/api/catalog_system/pub/products/search/?fq=productId:${product.productId}`,
          );

          return response.data[0];
        }),
      );

      const selectedSize = productContext?.selectedItem?.variations.find(
        ({ name }) => name === 'Tamanho',
      );

      const selectedColor = productContext?.selectedItem?.variations.find(
        ({ name }) => name === 'Cor',
      );

      const crossSellingProducts = similarProductsWithSkus.map((product) => {
        const selectedItem = (() => {
          const withSyncVariation = syncVariation && selectedSize;

          if (!withSyncVariation) {
            return product.items[0];
          }

          const skusWithTheSameSize = product.items.filter((item) => {
            // ProductTypes.Item does not have proper specifications typings.
            const [itemSize] = ((item as unknown) as Record<
              string,
              string[]
            >).Tamanho;

            if (selectedSize?.values[0]) {
              return itemSize?.includes(selectedSize.values[0]);
            }

            return false;
          });

          const skusWithTheSameColor = product.items.filter((item) => {
            const [itemColor] = ((item as unknown) as Record<
              string,
              string[]
            >).Cor;

            if (!selectedColor) return;

            if (!selectedSize?.values[0]) return;

            return itemColor?.includes(selectedColor.values[0]);
          });

          const skuThatMatch = skusWithTheSameSize.find((item) => {
            const itemWithSpecs = (item as unknown) as Record<string, string[]>;

            const [color] = itemWithSpecs.Cor;
            const [size] = itemWithSpecs.Tamanho;

            const equivalentProduct = skusWithTheSameColor.find((otherItem) => {
              const otherItemWithSpecs = (otherItem as unknown) as Record<
                string,
                string[]
              >;

              const [otherColor] = otherItemWithSpecs.Cor;
              const [otherSize] = otherItemWithSpecs.Tamanho;

              const isAMatch = color === otherColor && size === otherSize;

              return isAMatch;
            });

            return equivalentProduct;
          });

          if (skuThatMatch) {
            return skuThatMatch;
          }

          if (skusWithTheSameColor.length) {
            return skusWithTheSameColor[0];
          }

          if (skusWithTheSameSize.length) {
            return skusWithTheSameSize[0];
          }

          return product.items[0];
        })();

        return {
          product,
          isSelected: true,
          selectedItem,
        };
      });

      setProducts(crossSellingProducts);
    };

    fetchProducts();
    setIsLoading(false);
  }, [
    endPoint,
    excludeMainProduct,
    productContext?.product,
    productContext?.product?.productId,
    productContext?.selectedItem?.variations,
    syncVariation,
  ]);

  const sellingPrice = useMemo(() => {
    const amount = selectedProducts?.reduce((acc, curr) => {
      return acc + curr.selectedItem.sellers[0].commertialOffer.Price;
    }, 0);

    return amount;
  }, [selectedProducts]);

  const maxNumberOfInstallmentsWithoutInterest = useMemo(() => {
    const maxInstallmentsList = selectedProducts?.map(({ selectedItem }) => {
      const itemInstallments =
        selectedItem.sellers[0].commertialOffer.Installments;

      const installments = pickMaxInstallmentsOptionWithoutInterest(
        itemInstallments,
        null,
      );

      return installments;
    });

    const maxNumberOfInstallments = maxInstallmentsList?.reduce((acc, curr) => {
      if (!curr) return acc;

      return Math.min(acc, curr.NumberOfInstallments);
    }, 99);

    return maxNumberOfInstallments;
  }, [selectedProducts]);

  const maxInstallmentValueWithoutInterest = useMemo(() => {
    if (!sellingPrice || !maxNumberOfInstallmentsWithoutInterest) return;

    return sellingPrice / maxNumberOfInstallmentsWithoutInterest;
  }, [sellingPrice, maxNumberOfInstallmentsWithoutInterest]);

  return (
    <CrossSellingContext.Provider
      value={{
        products,
        selectedProducts,
        sellingPrice,
        maxNumberOfInstallmentsWithoutInterest,
        maxInstallmentValueWithoutInterest,
        toggleProductByIndex,
        setSelectedItemByIndex,
        isLoading,
      }}
    >
      {/* {products?.length && products.length > 1 ? children : null} */}
      {/* {products?.length ? children : null} */}
      {children}
    </CrossSellingContext.Provider>
  );
}

export default CrossSellingProvider;
