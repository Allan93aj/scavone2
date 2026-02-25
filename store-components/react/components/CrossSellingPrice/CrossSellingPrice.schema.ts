export const CrossSellingPriceSchema = {
  title: 'Preço de venda',
  type: 'object',
  properties: {
    message: {
      title: 'Mensagem',
      description:
        'Use o marcador {value} para definir onde o valor deve ser exibido',
      type: 'string',
    },
  },
};
