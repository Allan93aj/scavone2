const InstitutionalMenuSchema = {
  title: 'Menu institucional',
  type: 'object',
  properties: {
    items: {
      title: 'Itens',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          label: {
            title: 'Nome',
            type: 'string',
          },
          href: {
            title: 'URL',
            type: 'string',
          },
        },
      },
    },
  },
};

export { InstitutionalMenuSchema };
