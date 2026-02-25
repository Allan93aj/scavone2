const ImageSchema = {
  title: 'Imagem',
  type: 'object',
  properties: {
    heading: {
      title: 'Título',
      description: 'Um título que servirá de H1 para páginas de categoria',
      type: 'string',
    },
    width: {
      title: 'Largura',
      type: 'number',
    },
    height: {
      title: 'Altura',
      type: 'number',
    },
    widthMobile: {
      title: 'Largura (mobile)',
      type: 'number',
    },
    heightMobile: {
      title: 'Altura (mobile)',
      type: 'number',
    },
    src: {
      title: 'Imagem',
      type: 'string',
      widget: {
        'ui:widget': 'image-uploader',
      },
    },
    srcMobile: {
      title: 'Imagem (mobile)',
      type: 'string',
      widget: {
        'ui:widget': 'image-uploader',
      },
    },
    alt: {
      title: 'Texto alternativo',
      description:
        'Texto usado para SEO da imagem (deixar em branco para imagens decorativas)',
      type: 'string',
    },
  },
};

export { ImageSchema };
