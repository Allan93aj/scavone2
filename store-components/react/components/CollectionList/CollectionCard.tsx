import React from 'react';
import { useCssHandles } from 'vtex.css-handles';
import { index as RichText } from 'vtex.rich-text';

import Image from '../Image/Image';
import Link from '../Link';
import type { CollectionCardProps } from './CollectionList.types';
import CollectionListHandles from './CollectionList.handles';
import { CollectionCardSchema } from './CollectionList.Schema';

function CollectionCard({
  text,
  title,
  image,
  imageMobile,
  href,
  buttonLabel,
  subTitle,
  alt,
}: CollectionCardProps) {
  const { handles } = useCssHandles(CollectionListHandles);

  return (
    <div className={handles.collectionContainer}>
      <Image
        srcMobile={imageMobile}
        src={image}
        width={820}
        heightMobile={334}
        widthMobile={375}
        height={456}
        alt={alt}
      />
      <div className={handles.collectionContent}>
        <strong className={handles.collectionStrong}>{subTitle}</strong>
        <div className={handles.collectionText}>
          <RichText text={title} />
          <RichText text={text} />
        </div>
        <Link href={href}>{buttonLabel}</Link>
      </div>
    </div>
  );
}

CollectionCard.getSchema = () => CollectionCardSchema;

export default CollectionCard;
