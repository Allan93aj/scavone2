const MinicartFreightBarSchema = {
  title: 'Barra de frete grátis',
  type: 'object',
  properties: {
    minValue: {
      title: 'Valor mínimo',
      type: 'number',
      description: 'Valor mínimo para frete grátis',
    },
  },
};

export default MinicartFreightBarSchema;
