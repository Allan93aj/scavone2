import React from 'react';
import { useCssHandles } from 'vtex.css-handles';

import type { CrossProductInstallmentsProps } from './CrossProductInstallments.types';
import {
  useCrossSelling,
  useCrossProduct,
} from '../../context/CrossSellingContext';
import CrossProductInstallmentsHandles from './CrossProductInstallments.handles';
import formatMoney from '../../utils/formatMoney';

function CrossProductInstallments({
  message = 'Ou {numberOfInstallments}X de {value}',
  classes,
}: CrossProductInstallmentsProps) {
  const { handles } = useCssHandles(CrossProductInstallmentsHandles, {
    classes,
  });

  const { maxNumberOfInstallmentsWithoutInterest } = useCrossSelling();
  const { selectedItem } = useCrossProduct();

  const numberOfInstallments = maxNumberOfInstallmentsWithoutInterest ?? 0;
  const installmentValue =
    selectedItem.sellers[0].commertialOffer.Price / numberOfInstallments;

  if (numberOfInstallments <= 1) return null;

  const content = message
    .replace('{value}', formatMoney(installmentValue))
    .replace('{numberOfInstallments}', numberOfInstallments.toString());

  return <span className={handles.crossProductInstallments}>{content}</span>;
}

export default CrossProductInstallments;
