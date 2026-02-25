import React from 'react';
import { useCssHandles } from 'vtex.css-handles';

import CrossProductSellingPriceHandles from './CrossProductSellingPrice.handles';
import { useCrossProduct } from '../../context/CrossSellingContext';
import type { CrossProductSellingPriceProps } from './CrossProductSellingPrice.types';
import formatMoney from '../../utils/formatMoney';
import { CrossProductSellingPriceSchema } from './CrossProductSellingPrice.schema';

function CrossProductSellingPrice({
  message = '{value}',
  classes,
}: CrossProductSellingPriceProps) {
  const { handles } = useCssHandles(CrossProductSellingPriceHandles, {
    classes,
  });

  const { selectedItem } = useCrossProduct();

  const content = message.replace(
    '{value}',
    formatMoney(selectedItem.sellers[0].commertialOffer.Price),
  );

  return <span className={handles.crossProductSellingPrice}>{content}</span>;
}

CrossProductSellingPrice.getSchema = () => CrossProductSellingPriceSchema;

export default CrossProductSellingPrice;
