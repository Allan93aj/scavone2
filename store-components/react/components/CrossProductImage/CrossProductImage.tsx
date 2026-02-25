import React from 'react';
import { Image } from 'vtex.store-image';
import { useCssHandles } from 'vtex.css-handles';

import type { CrossProductImageProps } from './CrossProductImage.types';
import { useCrossProduct } from '../../context/CrossSellingContext';
import CrossProductImageHandles from './CrossProductImage.handles';
import Link from '../Link';

function CrossProductImage({ width, height, classes }: CrossProductImageProps) {
  const { handles } = useCssHandles(CrossProductImageHandles, { classes });
  const { selectedItem, product } = useCrossProduct();

  const [image] = selectedItem.images;

  return (
    <Link className={handles.crossProductImageContainer} href={product?.link}>
      <Image
        src={image.imageUrl}
        width={width}
        height={height}
        alt={image.imageText}
      />
    </Link>
  );
}

export default CrossProductImage;
