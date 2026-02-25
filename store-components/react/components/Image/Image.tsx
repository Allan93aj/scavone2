import React from 'react';
import { useDevice } from 'vtex.device-detector';
import { useCssHandles } from 'vtex.css-handles';

import type { ImageProps } from './Image.types';
import { ImageSchema } from './Image.schema';
import ImageHandles from './Image.handles';

function Image({
  heading,
  src,
  srcMobile,
  width,
  height,
  widthMobile,
  heightMobile,
  classes,
  alt,
}: ImageProps) {
  const { isMobile } = useDevice();
  const { handles } = useCssHandles(ImageHandles, { classes });

  return (
    <div className={handles.imageContainer}>
      {isMobile && srcMobile ? (
        <>
          <img
            src={srcMobile}
            width={widthMobile}
            height={heightMobile}
            alt={alt ?? ''}
            className={handles.imageElement}
          />

          {heading ? <h1 className={handles.imageHeading}>{heading}</h1> : null}
        </>
      ) : (
        <>
          <img
            src={src}
            width={width}
            height={height}
            alt={alt ?? ''}
            className={handles.imageElement}
          />

          {heading ? <h1 className={handles.imageHeading}>{heading}</h1> : null}
        </>
      )}
    </div>
  );
}

Image.getSchema = () => ImageSchema;
export default Image;
