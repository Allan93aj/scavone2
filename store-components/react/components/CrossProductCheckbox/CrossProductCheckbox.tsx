import React from 'react';
import { applyModifiers, useCssHandles } from 'vtex.css-handles';
import classNames from 'classnames';
import { useProduct } from 'vtex.product-context';

import { CheckIcon } from '../Icons';
import { useCrossProduct } from '../../context/CrossSellingContext';
import CrossProductCheckboxHandles from './CrossProductCheckbox.handles';
import type { CrossProductCheckboxProps } from './CrossProductCheckbox.types';

function CrossProductCheckbox({
  preventUncheckingMainProduct,
  classes,
}: CrossProductCheckboxProps) {
  const { handles } = useCssHandles(CrossProductCheckboxHandles, { classes });
  const productContext = useProduct();
  const { product, isSelected, toggleProduct } = useCrossProduct();

  if (
    preventUncheckingMainProduct &&
    productContext?.product?.productId === product?.productId
  )
    return null;

  return (
    <label
      className={classNames(
        applyModifiers(
          handles.crossProductCheckboxContainer,
          isSelected ? 'selected' : '',
        ),
        'flex items-center justify-center pointer',
      )}
    >
      <input
        className={classNames(handles.checkbox, 'dn')}
        type="checkbox"
        checked={isSelected}
        onChange={toggleProduct}
      />
      {isSelected && <CheckIcon />}
    </label>
  );
}

export default CrossProductCheckbox;
