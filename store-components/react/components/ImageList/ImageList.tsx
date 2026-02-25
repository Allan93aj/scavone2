import React, { useMemo } from 'react';
import { Link } from 'vtex.render-runtime';
import { useCssHandles } from 'vtex.css-handles';
import classNames from 'classnames';

import type { ImageListProps } from './ImageList.types';
import { ImageListSchema } from './ImageList.schema';
import ImageListHandles from './ImageList.handles';

function ImageList({ images, height, width, classes }: ImageListProps) {
  const { handles } = useCssHandles(ImageListHandles, { classes });
  const renderedImages = useMemo(() => {
    return images.map(({ href, ...props }) => {
      const { alt, width: imageWidth, height: imageHeight, ...rest } = props;

      const imgElement = (
        <img
          alt={alt ?? ''}
          width={imageWidth ?? width}
          height={imageHeight ?? height}
          {...rest}
        />
      );

      if (href) {
        return <Link to={href}>{imgElement}</Link>;
      }

      return imgElement;
    });
  }, [images, height, width]);

  return (
    <div className={classNames('flex', handles.imageList)}>
      {renderedImages}
    </div>
  );
}

ImageList.getSchema = () => ImageListSchema;

export default ImageList;
