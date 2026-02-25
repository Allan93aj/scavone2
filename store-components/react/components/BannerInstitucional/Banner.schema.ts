const BannerSchema = {
  title: 'Banner e descrição',
  type: 'object',
  properties: {
    src: {
      title: 'Imagem',
      type: 'string',
      widget: {
        'ui:widget': 'image-uploader',
      },
    },
    width: {
      title: 'Largura',
      type: 'number',
    },
    height: {
      title: 'Height',
      type: 'number',
    },
    srcMobile: {
      title: 'Imagem mobile',
      type: 'string',
      widget: {
        'ui:widget': 'image-uploader',
      },
    },
    widthMobile: {
      title: 'Largura Mobile',
      type: 'number',
    },
    heightMobile: {
      title: 'Height Mobile',
      type: 'number',
    },
    alt: {
      title: 'Descrição da imagem',
      type: 'string',
    },
    title: {
      title: 'Título',
      description: 'H1',
      type: 'string',
    },
    subtitle: {
      title: 'Subtítulo',
      description: 'H2',
      type: 'string',
    },
    description: {
      title: 'Descrição',
      type: 'string',
    },
    textPosition: {
      default: 'right',
      enum: ['left', 'right', 'center'],
      enumNames: ['Esquerda', 'Direita', 'Centro'],
      title: 'Posição do texto',
      type: 'string',
    },
  },
};

export { BannerSchema };
