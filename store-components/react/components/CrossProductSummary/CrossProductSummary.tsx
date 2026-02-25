import React from 'react';
import { useCssHandles } from 'vtex.css-handles';

import { CrossProductProvider } from '../../context/CrossSellingContext';
import CrossProductSummaryHandles from './CrossProductSummary.handles';
import type { CrossProductSummaryProps } from './CrossProductSummary.types';

function CrossProductList({
  productIndex,
  children,
  classes,
}: CrossProductSummaryProps) {
  const { handles } = useCssHandles(CrossProductSummaryHandles, { classes });

  if (typeof productIndex !== 'number') return null;

  return (
    <div className={handles.crossProductSummary}>
      <CrossProductProvider productIndex={productIndex}>
        {children}
      </CrossProductProvider>
    </div>
  );
}

export default CrossProductList;
