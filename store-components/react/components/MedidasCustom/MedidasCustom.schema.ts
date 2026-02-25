const MedidasCustomSchema = {
  title: 'Medidas',
  type: 'object',
  properties: {
    items: {
      title: 'Items',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          image: {
            title: 'Image',
            type: 'string',
            widget: {
              'ui:widget': 'image-uploader',
            },
          },
          title: {
            title: 'Titulo',
            type: 'string',
          },
          content: {
            title: 'Conteudo',
            type: 'string',
          },
        },
      },
    },
  },
};

export default MedidasCustomSchema;
