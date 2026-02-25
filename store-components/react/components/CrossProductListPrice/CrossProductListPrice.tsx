import React from 'react';
import { useCssHandles } from 'vtex.css-handles';

import CrossProductListPriceHandles from './CrossProductListPrice.handles';
import { useCrossProduct } from '../../context/CrossSellingContext';
import type { CrossProductListPriceProps } from './CrossProductListPrice.types';
import formatMoney from '../../utils/formatMoney';
import { CrossProductListPriceSchema } from './CrossProductListPrice.schema';

function CrossProductListPrice({
  message = '{value}',
  classes,
}: CrossProductListPriceProps) {
  const { handles } = useCssHandles(CrossProductListPriceHandles, {
    classes,
  });

  const { selectedItem } = useCrossProduct();

  const { Price, ListPrice } = selectedItem.sellers[0].commertialOffer;

  if (Price === ListPrice) return null;

  const content = message.replace('{value}', formatMoney(ListPrice));

  return <span className={handles.crossProductListPrice}>{content}</span>;
}

CrossProductListPrice.getSchema = () => CrossProductListPriceSchema;

export default CrossProductListPrice;
