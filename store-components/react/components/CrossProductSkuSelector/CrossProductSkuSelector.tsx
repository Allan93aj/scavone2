import React from 'react';
import type { ProductTypes } from 'vtex.product-context';
import { applyModifiers, useCssHandles } from 'vtex.css-handles';
import classNames from 'classnames';

import { useCrossProduct } from '../../context/CrossSellingContext';
import toKebabCase from '../../utils/toKebabCase';
import type { CrossProductSkuSelectorProps } from './CrossProductSkuSelector.types';
import CrossProductSkuSelectorHandles from './CrossProductSkuSelector.handles';

function CrossProductSkuSelector({ classes }: CrossProductSkuSelectorProps) {
  const { handles } = useCssHandles(CrossProductSkuSelectorHandles, {
    classes,
  });

  const { product, selectedItem, setSelectedItem } = useCrossProduct();

  const isSelected = (
    field: ProductTypes.SkuSpecificationField,
    value: ProductTypes.SkuSpecificationValues,
  ) => {
    const [property] = selectedItem[field.name as 'name'];

    return value.name === property;
  };

  const isAvailable = (
    field: ProductTypes.SkuSpecificationField,
    value: ProductTypes.SkuSpecificationValues,
  ) => {
    const isCombinationPossible = product?.items.some((item) => {
      const [property] = item[field.name as 'name'];

      const areOtherSpecificationsMatching = product?.skuSpecifications?.every(
        (specification) => {
          const [prev] = selectedItem[specification.field.name as 'name'];
          const [current] = item[specification.field.name as 'name'];

          return prev === current || specification.field.name === field.name;
        },
      );

      return property === value.name && areOtherSpecificationsMatching;
    });

    return isCombinationPossible;
  };

  return (
    <div className={handles.crossProductSkuSelector}>
      {product?.skuSpecifications.map((specification) => (
        <div
          key={specification.field.name}
          className={classNames(
            applyModifiers(handles.fieldset, specification.field.name),
            'bn',
            specification.field.name === 'Tamanho'
              ? handles.fieldsetSizeKitLook
              : handles.fieldsetColorKitLook,
          )}
        >
          <div className={handles.legend}>{specification.field.name}</div>
          {specification.values.map((value) => (
            <label
              key={value.name}
              className={applyModifiers(handles.label, [
                toKebabCase(value.name),
                !isAvailable ? 'unavailable' : '',
                isSelected(specification.field, value) ? 'selected' : '',
              ])}
            >
              <input
                type="radio"
                checked={isSelected(specification.field, value)}
                disabled={!isAvailable(specification.field, value)}
                onChange={() =>
                  setSelectedItem(specification.field.name, value.name)
                }
                className={classNames(handles.input, 'dn')}
              />{' '}
              {value.name}
            </label>
          ))}
        </div>
      ))}
    </div>
  );
}

export default CrossProductSkuSelector;
