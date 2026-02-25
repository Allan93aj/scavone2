import React from 'react';
import { ExtensionPoint } from 'vtex.render-runtime';
import { useCssHandles } from 'vtex.css-handles';

import { useCrossSelling } from '../../context/CrossSellingContext';
import CrossProductListHandles from './CrossProductList.handles';
import type { CrossProductListProps } from './CrossProductList.types';

function CrossProductList({ classes }: CrossProductListProps) {
  const { handles } = useCssHandles(CrossProductListHandles, { classes });
  const { products } = useCrossSelling();

  return (
    <div className={handles.crossProductList}>
      {products?.map(({ product }, productIndex) => (
        <ExtensionPoint
          key={product?.productId}
          id="scavone-cross-product-summary"
          blockProps={{ productIndex }}
        />
      ))}
    </div>
  );
}

export default CrossProductList;
