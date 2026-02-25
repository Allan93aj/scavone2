import React from 'react';
import { useCssHandles } from 'vtex.css-handles';
import classNames from 'classnames';
import { useProduct } from 'vtex.product-context';
import { useDevice } from 'vtex.device-detector';
import './style.global.css';

import DescriptionCustomHandles from './DescriptionCustom.handles';

function DescriptionCustom() {
  const { handles } = useCssHandles(DescriptionCustomHandles);
  const { isMobile } = useDevice();
  const productContext = useProduct();
  const productDescription = productContext?.product?.description;

  return (
    <div
      className={classNames(handles.DescriptionCustomContainer)}
      id="description"
    >
      {!isMobile && (
        <h3 className={classNames(handles.DescriptionCustomTitle)}>
          Descrição
        </h3>
      )}

      {productDescription && (
        <div
          className={classNames(handles.DescriptionCustomText)}
          dangerouslySetInnerHTML={{ __html: productDescription }}
        />
      )}
    </div>
  );
}

export default DescriptionCustom;
