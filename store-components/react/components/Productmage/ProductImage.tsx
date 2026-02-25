import React, { useMemo } from 'react';
import { useCssHandles } from 'vtex.css-handles';
import { useProduct } from 'vtex.product-context';
import { Image } from 'vtex.store-image';

import productImagesHandles from './ProductImages.handles';
import type { ProductImagesProps } from './ProductImage.types';

interface ProductItem {
  itemId: string;
  images: Array<{ imageUrl: string }>;
}

function ProductImage({ classes }: ProductImagesProps) {
  const { handles } = useCssHandles(productImagesHandles, {
    classes,
  });

  const productContext = useProduct();

  const orderedItems = useMemo(() => {
    return productContext?.product?.items.sort(
      (a: ProductItem, b: ProductItem) => {
        return Number(a.itemId) - Number(b.itemId);
      },
    );
  }, [productContext?.product?.items]);

  const primaryImageUrl = useMemo(() => {
    if (!orderedItems?.length) return '';

    if (!productContext?.skuSelector?.selectedImageVariationSKU?.length) {
      return orderedItems[0].images[0].imageUrl;
    }

    return productContext?.selectedItem?.images[0].imageUrl;
  }, [
    orderedItems,
    productContext?.selectedItem,
    productContext?.skuSelector?.selectedImageVariationSKU,
  ]);

  const secondaryImageUrl = useMemo(() => {
    if (!orderedItems?.length || !orderedItems[0].images[1]?.imageUrl) {
      return orderedItems?.[0]?.images[0]?.imageUrl || '';
    }

    return orderedItems[0].images[1].imageUrl;
  }, [orderedItems]);

  return (
    <div className={handles.imageShelfContainer}>
      <section className={handles.firstImage}>
        <Image
          className={handles.image}
          src={primaryImageUrl}
          alt={`${productContext?.product?.productName} - Imagem 1`}
        />
      </section>
      {secondaryImageUrl && (
        <section className={handles.secondImage}>
          <Image
            className={handles.image}
            src={secondaryImageUrl}
            alt={`${productContext?.product?.productName} - Imagem 2`}
          />
        </section>
      )}
    </div>
  );
}

export default ProductImage;
