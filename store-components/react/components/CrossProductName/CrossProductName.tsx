import React from 'react';
import { useCssHandles } from 'vtex.css-handles';

import type { CrossProductNameProps } from './CrossProductName.types';
import { useCrossProduct } from '../../context/CrossSellingContext';
import CrossProductNameHandles from './CrossProductName.handles';
import Link from '../Link';

function CrossProductName({ classes }: CrossProductNameProps) {
  const { handles } = useCssHandles(CrossProductNameHandles, { classes });
  const { product } = useCrossProduct();

  return (
    <Link className={handles.crossProductName} href={product?.link}>
      {product?.productName}
    </Link>
  );
}

export default CrossProductName;
