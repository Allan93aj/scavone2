const MeasurementChartSchema = {
  title: 'Tabela de medidas',
  type: 'object',
  properties: {
    categories: {
      title: 'Categorias',
      type: 'array',
      categories: {
        title: 'Categoria',
        type: 'object',
        properties: {
          category: {
            type: 'string',
            title: 'Categoria',
            description:
              'Define uma categoria deve ser mostrado a tabela de medidas.',
          },
        },
      },
    },
  },
};

export default MeasurementChartSchema;
