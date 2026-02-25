import React from 'react';
import { useProduct } from 'vtex.product-context';

import type { ProductPriceConditionLayoutProps } from './ProductPriceConditionLayout.types';

function ProductPriceConditionLayout({
  HasBestPrice,
  Else,
}: ProductPriceConditionLayoutProps) {
  const productContext = useProduct();

  const commertialOffer =
    productContext?.selectedItem?.sellers[0].commertialOffer;

  const hasDiscount = commertialOffer?.Price !== commertialOffer?.ListPrice;

  if (hasDiscount) return <HasBestPrice />;

  return Else ? <Else /> : null;
}

export default ProductPriceConditionLayout;
