/* eslint-disable */
import React, { useState } from 'react';
import classNames from 'classnames';
import { useCssHandles } from 'vtex.css-handles';
import InteractiveBannerHandles from './InteractiveBanner.handles';
import type { InteractiveBannerProps } from './Interactive.types';
import InteractiveBannerSchema from './InteractiveBanner.schema';
// import type { ProductTypes } from 'vtex.product-context';
// import axios from 'axios';
import CrossSellingProvider from '../../CrossSellingProvider';

function InteractiveBanner({ image, items, children }: InteractiveBannerProps) {
  if (items == undefined || items.length == 0) {
    return null;
  }

  const { handles } = useCssHandles(InteractiveBannerHandles);

  const [productToSearch, setProductToSearch] = useState(
    `?fq=productId:${items[0].productId}`,
  );

  const formatSpacingValue = (input: string) => {
    const spacingValueNoSimbols = input.replace(/[^\d.]/g, '');
    let value = parseFloat(spacingValueNoSimbols);

    if (isNaN(value) || value < 0) {
      value = 0;
    } else if (value > 100) {
      value = 100;
    }

    value = Math.round(value);
    return value;
  };

  const handleButtonClick = (index: any) => {
    const target = index.target as HTMLElement;

    setProductToSearch(`?fq=${target.classList[1]}`);

    const buttons = document.querySelectorAll(
      `.${handles.InteractiveBannerButton}`,
    );
    buttons.forEach((button) => {
      button.classList.remove(handles.InteractiveBannerButtonCurrent);
    });

    let valorLeft = parseInt(
      (target.style as CSSStyleDeclaration).getPropertyValue('left'),
    );

    if (valorLeft > 50) {
      target.classList.add(handles.flagToRight);
    } else if (valorLeft < 50) {
      target.classList.add(handles.flagToLeft);
    }
    target.classList.add(handles.InteractiveBannerButtonCurrent);
  };

  return (
    <>
      <div className={classNames(handles.InteractiveBanner_section)}>
        <CrossSellingProvider
          endPoint={`/api/catalog_system/pub/products/search/${productToSearch}`}
          excludeMainProduct={true}
          hasManyProducts={true}
        >
          <div
            className={classNames(handles.InteractiveBanner)}
            id="interactiveBanner"
          >
            <div className={classNames(handles.InteractiveBannerMap)}>
              <img
                src={image}
                alt=""
                className={handles.InteractiveBannerImage}
              />
              {items?.map((item: any, index: any) => {
                const formattedSpacingTop = formatSpacingValue(item.spacingTop);
                const formattedSpacingLeft = formatSpacingValue(
                  item.spacingLeft,
                );

                return (
                  <div
                    className={classNames(
                      handles.InteractiveBannerButton,
                      `productId:${item.productId}`,
                      index === 0 ? handles.InteractiveBannerButtonCurrent : '',
                    )}
                    key={index}
                    style={{
                      top: `${formattedSpacingTop}%`,
                      left: `${formattedSpacingLeft}%`,
                    }}
                    onClick={(index: any) => handleButtonClick(index)}
                  >
                    +
                  </div>
                );
              })}
            </div>
          </div>
          {children}
        </CrossSellingProvider>
      </div>
    </>
  );
}

InteractiveBanner.getSchema = () => InteractiveBannerSchema;

export default InteractiveBanner;
