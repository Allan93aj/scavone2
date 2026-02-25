const SliderSchema = {
  title: 'Item',
  type: 'object',
  properties: {
    image: {
      title: 'Imagem',
      type: 'string',
      widget: {
        'ui:widget': 'image-uploader',
      },
    },
    imageMobile: {
      title: 'Imagem mobile',
      type: 'string',
      widget: {
        'ui:widget': 'image-uploader',
      },
    },
    alt: {
      title: 'Descrição da imagem',
      type: 'string',
    },
    description: {
      title: 'Descrição',
      type: 'string',
    },
  },
};

const SliderListSchema = {
  title: 'Galeria de Fotos',
  type: 'object',
  properties: {
    title: {
      title: 'Título da seção',
      type: 'string',
    },
    subtitle: {
      title: 'Subtitulo da seção',
      type: 'string',
    },
    images: {
      title: 'Item',
      type: 'array',
      items: SliderSchema,
    },
  },
};

export { SliderListSchema };
