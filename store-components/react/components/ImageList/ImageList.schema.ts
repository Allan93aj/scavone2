const ImageSchema = {
  title: 'Imagem',
  type: 'object',
  properties: {
    width: {
      title: 'Largura',
      type: 'number',
    },
    height: {
      title: 'Altura',
      type: 'number',
    },
    src: {
      title: 'Imagem',
      type: 'string',
      widget: {
        'ui:widget': 'image-uploader',
      },
    },
    href: {
      title: 'Link',
      type: 'string',
    },
  },
};

const ImageListSchema = {
  title: 'Lista de imagens',
  type: 'object',
  properties: {
    height: {
      title: 'Altura',
      description:
        'Descreve a altura de todas as imagens (pode ser sobreescrevido passando a altura em uma imagem indivualmente)',
      type: 'number',
    },
    images: {
      title: 'Imagens',
      type: 'array',
      items: ImageSchema,
    },
  },
};

export { ImageSchema, ImageListSchema };
