interface CategoryBulletProps {
  image: string;
  text: string;
  href: string;
}

interface CategoryBulletListProps {
  items?: CategoryBulletProps[];
}

export type { CategoryBulletProps, CategoryBulletListProps };
