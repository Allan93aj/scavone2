const CollectionCardSchema = {
  title: 'Coleção',
  type: 'object',
  properties: {
    href: {
      title: 'Link',
      type: 'string',
    },
    subTitle: {
      title: 'Subtítulo',
      type: 'string',
    },
    title: {
      title: 'Título',
      type: 'string',
    },
    text: {
      title: 'Texto',
      type: 'string',
    },
    buttonLabel: {
      title: 'Texto do botão',
      type: 'string',
    },
    image: {
      title: 'Imagem',
      type: 'string',
      widget: {
        'ui:widget': 'image-uploader',
      },
    },
    imageMobile: {
      title: 'Imagem (mobile)',
      type: 'string',
      widget: {
        'ui:widget': 'image-uploader',
      },
    },
  },
};

const CollectionListSchema = {
  title: 'Lista de coleção',
  type: 'object',
  properties: {
    items: {
      title: 'Cards',
      type: 'array',
      items: CollectionCardSchema,
    },
    infinite: {
      title: 'Slider infinito?',
      type: 'boolean',
    },
  },
};

export { CollectionCardSchema, CollectionListSchema };
