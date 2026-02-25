import type { ReactNode } from 'react';
import React from 'react';
import { useProduct } from 'vtex.product-context';

import style from './style.module.css';

interface Props {
  linkText: string;
  children?: ReactNode;
}

function ProductLink({ linkText, children }: Props) {
  const productContext = useProduct();
  const productLink = productContext?.product?.link;

  return (
    <div>
      <a
        href={productLink}
        target="_blank"
        className={style['link-button']}
        rel="noreferrer"
      >
        {children ?? linkText}
      </a>
    </div>
  );
}

export default ProductLink;
