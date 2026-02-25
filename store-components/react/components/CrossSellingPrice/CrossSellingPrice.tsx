import React, { useMemo } from 'react';
import { useCssHandles } from 'vtex.css-handles';

import CrossSellingPriceHandles from './CrossSellingPrice.handles';
import { useCrossSelling } from '../../context/CrossSellingContext';
import type { CrossSellingPriceProps } from './CrossSellingPrice.types';
import formatMoney from '../../utils/formatMoney';
import { CrossSellingPriceSchema } from './CrossSellingPrice.schema';

function CrossSellingPrice({
  message = '{value}',
  classes,
}: CrossSellingPriceProps) {
  const { handles } = useCssHandles(CrossSellingPriceHandles, { classes });
  const { sellingPrice } = useCrossSelling();

  const content = useMemo(() => {
    if (!sellingPrice) return;

    const subMessages = message.split('{value}');

    const firstPart = subMessages.shift();
    const after = subMessages.join('');

    return (
      <>
        {firstPart}
        <span className={handles.crossSellingPriceValue}>
          {formatMoney(sellingPrice)}
        </span>
        {after}
      </>
    );
  }, [handles.crossSellingPriceValue, message, sellingPrice]);

  return <span className={handles.crossSellingPrice}>{content}</span>;
}

CrossSellingPrice.getSchema = () => CrossSellingPriceSchema;

export default CrossSellingPrice;
