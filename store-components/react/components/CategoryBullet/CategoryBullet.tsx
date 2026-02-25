import React from 'react';
import { useCssHandles } from 'vtex.css-handles';

import Link from '../Link';
import type { CategoryBulletProps } from './CategoryBullet.types';
import CategoryBulletHandles from './CategoryBullet.handles';
import { CategoryBulletSchema } from './CategoryBullet.schema';
import CategoryArrowNew from '../Icons/CategoryArrowNew';

function CategoryBullet({ text, image, href }: CategoryBulletProps) {
  const { handles } = useCssHandles(CategoryBulletHandles);

  return (
    <Link href={href} className={handles.categoryBullet}>
      <div className={handles.imageContainer}>
        <img
          src={image}
          width={302}
          height={302}
          alt={text}
          className={handles.imageElement}
        />
        <strong className={handles.label}>{text}</strong>
      </div>
      <span className={handles.seeAll}>
        Ver Todos
        <CategoryArrowNew />
      </span>
    </Link>
  );
}

CategoryBullet.getSchema = () => CategoryBulletSchema;

export default CategoryBullet;
