import React from 'react';
import { useCssHandles } from 'vtex.css-handles';
import { SliderLayout } from 'vtex.slider-layout';

import CollectionCard from './CollectionCard';
import type { CollectionListProps } from './CollectionList.types';
import CollectionListHandles from './CollectionList.handles';
import { CollectionListSchema } from './CollectionList.Schema';

function CollectionCardList({ items, infinite }: CollectionListProps) {
  const { handles } = useCssHandles(CollectionListHandles);

  return (
    <>
      {!!items?.length && (
        <div className={handles.collectionList}>
          <SliderLayout infinite={infinite} itemsPerPage={1}>
            {items.map((props) => (
              <CollectionCard key={props.text} {...props} />
            ))}
          </SliderLayout>
        </div>
      )}
    </>
  );
}

CollectionCardList.getSchema = () => CollectionListSchema;

export default CollectionCardList;
