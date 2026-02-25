import React from 'react';
import { useCssHandles } from 'vtex.css-handles';

import CategoryBullet from './CategoryBullet';
import type { CategoryBulletListProps } from './CategoryBullet.types';
import CategoryBulletHandles from './CategoryBullet.handles';
import { CategoryBulletListSchema } from './CategoryBullet.schema';

function CategoryBulletList({ items }: CategoryBulletListProps) {
  const { handles } = useCssHandles(CategoryBulletHandles);

  return (
    <>
      {!!items?.length && (
        <div className={handles.categoryBulletListContainer}>
          <div className={handles.categoryBulletList}>
            {items.map((props) => (
              <CategoryBullet key={props.text} {...props} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

CategoryBulletList.getSchema = () => CategoryBulletListSchema;

export default CategoryBulletList;
