const CategoryBulletSchema = {
  title: 'Bullet de categoria',
  type: 'object',
  properties: {
    href: {
      title: 'Link',
      type: 'string',
    },
    text: {
      title: 'Texto',
      type: 'string',
    },
    image: {
      title: 'Imagem',
      type: 'string',
      widget: {
        'ui:widget': 'image-uploader',
      },
    },
  },
};

const CategoryBulletListSchema = {
  title: 'Lista de bullet de categoria',
  type: 'object',
  properties: {
    items: {
      title: 'Bullets',
      type: 'array',
      items: CategoryBulletSchema,
    },
  },
};

export { CategoryBulletSchema, CategoryBulletListSchema };
