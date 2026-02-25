import React, { useCallback, useState } from 'react';
import { OrderItems } from 'vtex.order-items';
import { useCssHandles } from 'vtex.css-handles';
import { usePixel } from 'vtex.pixel-manager';
import classNames from 'classnames';

import Spinner from '../Spinner';
import { useCrossSelling } from '../../context/CrossSellingContext';
import type { CrossAddToCartButtonProps } from './CrossAddToCartButton.types';
import CrossAddToCartButtonHandles from './CrossAddToCart.handles';

function CrossAddToCartButton({
  text = 'Adicionar ao carrinho',
  classes,
}: CrossAddToCartButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const { handles } = useCssHandles(CrossAddToCartButtonHandles, { classes });
  const { selectedProducts } = useCrossSelling();
  const { addItems } = OrderItems.useOrderItems();
  const { push } = usePixel();

  const handleAddToCart = useCallback(async () => {
    const items = selectedProducts?.map(({ selectedItem }) => ({
      id: selectedItem.itemId,
      quantity: 1,
      seller: selectedItem.sellers[0].sellerId,
    }));

    setIsLoading(true);

    await addItems(items);

    push({
      id: 'addToCart',
      event: 'addToCart',
    });

    setIsLoading(false);
  }, [addItems, push, selectedProducts]);

  return (
    <button
      className={classNames(
        handles.crossAddToCartButton,
        'flex items-center justify-center',
      )}
      onClick={handleAddToCart}
      disabled={isLoading}
    >
      {isLoading ? <Spinner /> : text}
    </button>
  );
}

export default CrossAddToCartButton;
