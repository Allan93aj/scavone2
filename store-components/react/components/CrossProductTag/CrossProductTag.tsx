import React from 'react';
import { useCssHandles } from 'vtex.css-handles';
import { useProduct } from 'vtex.product-context';
import classNames from 'classnames';

import CrossProductTagHandles from './CrossProductTag.handles';
import { useCrossProduct } from '../../context/CrossSellingContext';
import type { CrossProductTagProps } from './CrossProductTag.types';
import { CrossProductTagSchema } from './CrossProductTag.schema';

function CrossProductTag({ text, classes }: CrossProductTagProps) {
  const { handles } = useCssHandles(CrossProductTagHandles, {
    classes,
  });

  const productContext = useProduct();
  const { product } = useCrossProduct();

  return (
    productContext?.product?.productId === product?.productId && (
      <span className={classNames(handles.crossProductTag, 'dib')}>{text}</span>
    )
  );
}

CrossProductTag.getSchema = () => CrossProductTagSchema;

export default CrossProductTag;
