import React, { useMemo } from 'react';
import { useCssHandles } from 'vtex.css-handles';

import { useCrossSelling } from '../../context/CrossSellingContext';
import CrossSellingItemsQuantityHandles from './CrossSellingItemsQuantity.handles';
import type { CrossSellingItemsQuantityProps } from './CrossSellingItemsQuantity.types';

function CrossSellingItemsQuantity({
  message = '{quantity}',
  classes,
}: CrossSellingItemsQuantityProps) {
  const { handles } = useCssHandles(CrossSellingItemsQuantityHandles, {
    classes,
  });

  const { selectedProducts } = useCrossSelling();

  const quantity = selectedProducts?.length ?? 0;

  const content = useMemo(() => {
    const subMessages = message.split('{quantity}');

    const firstPart = subMessages.shift();
    const after = subMessages.join('');

    return (
      <>
        {firstPart}
        <span className={handles.crossSellingItemsQuantityValue}>
          {quantity - 1}
        </span>{' '}
        {quantity > 1 ? 'produtos' : 'produto'}
        {after}
      </>
    );
  }, [handles.crossSellingItemsQuantityValue, message, quantity]);

  return <span className={handles.crossSellingItemsQuantity}>{content}</span>;
}

export default CrossSellingItemsQuantity;
