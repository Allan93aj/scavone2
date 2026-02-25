const InteractiveBannerSchema = {
  title: 'Banner Interativo',
  type: 'object',
  properties: {
    image: {
      title: 'Imagem ambiente',
      type: 'string',
      widget: {
        'ui:widget': 'image-uploader',
      },
    },
    items: {
      title: 'Botões Ver Mais',
      type: 'array',
      items: {
        title: 'Botão',
        type: 'object',
        properties: {
          __editorItemTitle: {
            // now change name is available
            default: 'Botão - Produto',
            title: 'Nome do botão',
            type: 'string',
          },
          spacingTop: {
            title: 'Distância do topo',
            description: 'Em porcentagem (%)',
            default: '50',
            type: 'string',
          },
          spacingLeft: {
            title: 'Distância da esquerda',
            description: 'Em porcentagem (%)',
            default: '50',
            type: 'string',
          },
          productId: {
            title: 'ID do produto',
            description: 'Aparecerá na shelf ao clicar no botão',
            type: 'string',
          },
        },
      },
    },
  },
};

export default InteractiveBannerSchema;
