import React from 'react';
import { useCssHandles } from 'vtex.css-handles';

import { useCrossSelling } from '../../context/CrossSellingContext';
import type { BuyTogetherInstallmentsProps } from './BuyTogetherInstallments.types';
import BuyTogetherInstallmentsHandles from './BuyTogetherInstallments.handles';
import formatMoney from '../../utils/formatMoney';

function BuyTogetherInstallments({ classes }: BuyTogetherInstallmentsProps) {
  const { handles } = useCssHandles(BuyTogetherInstallmentsHandles, {
    classes,
  });

  const {
    sellingPrice,
    maxNumberOfInstallmentsWithoutInterest,
  } = useCrossSelling();

  const numberOfInstallments = maxNumberOfInstallmentsWithoutInterest ?? 1;

  if (!sellingPrice || numberOfInstallments <= 1) return null;

  const division = sellingPrice / numberOfInstallments;

  const finalValue = formatMoney(division);

  return (
    <span className={handles.BuyTogetherInstallments}>
      apenas {numberOfInstallments}x de {finalValue}
    </span>
  );
}

export default BuyTogetherInstallments;
