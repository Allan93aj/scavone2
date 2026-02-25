import React from 'react';
import { useCssHandles } from 'vtex.css-handles';

import type { StoresListProps } from './Stores.types';
import { StoresListSchema } from './Stores.schema';
import StoresListHandles from './Stores.handles';
import Store from './Store';

function Stores({ stores, classes }: StoresListProps) {
  const { handles } = useCssHandles(StoresListHandles, { classes });

  return (
    <section className={handles.stores}>
      <ul className={handles.storesList}>
        {stores?.map((store) => (
          <Store key={store.street} {...store} />
        ))}
      </ul>
    </section>
  );
}

Stores.getSchema = () => StoresListSchema;

export default Stores;
