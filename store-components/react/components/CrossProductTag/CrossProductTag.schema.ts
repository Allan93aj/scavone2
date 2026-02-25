export const CrossProductTagSchema = {
  title: 'Tag de Produto Atual',
  type: 'object',
  properties: {
    text: {
      title: 'Texto de Produto Atual',
      description:
        'Digite o texto que deve aparecer na tag produto atual. Exemplo: "Você está vendo"',
      type: 'string',
    },
  },
};
