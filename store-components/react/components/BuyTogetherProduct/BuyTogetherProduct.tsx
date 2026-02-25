import React from 'react';
import { useProduct } from 'vtex.product-context';
import { useCssHandles } from 'vtex.css-handles';

import BuyTogetherProductHandles from './BuyTogetherProduct.handles';

function BuyTogetherProduct() {
  const { handles } = useCssHandles(BuyTogetherProductHandles);

  const productContext = useProduct();

  return (
    <div className={handles.BuyTogetherProduct}>
      <img
        src={productContext?.selectedItem?.images[0].imageUrl}
        alt=""
        className={handles.BuyTogetherProductImage}
      />
      <h3 className={handles.BuyTogetherProductName}>
        {productContext?.product?.productName}
      </h3>
    </div>
  );
}

export default BuyTogetherProduct;
