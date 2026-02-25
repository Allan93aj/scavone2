import React from 'react';
import { Image } from 'vtex.store-image';
import { useCssHandles } from 'vtex.css-handles';
import { useProduct } from 'vtex.product-context';

import type { SingleProductImageProps } from './SingleProductImage.types';
import SingleProductImageHandles from './SingleProductImage.handles';
import Link from '../Link';

function SingleProductImage({
  width,
  height,
  classes,
}: SingleProductImageProps) {
  const { handles } = useCssHandles(SingleProductImageHandles, { classes });
  const productContext = useProduct();
  const image = productContext?.product?.items[0].images[0];
  const link = productContext?.product?.link;

  return (
    <Link className={handles.singleProductImageContainer} href={link}>
      <Image
        src={image?.imageUrl}
        width={width}
        height={height}
        alt={image?.imageText}
      />
    </Link>
  );
}

export default SingleProductImage;
