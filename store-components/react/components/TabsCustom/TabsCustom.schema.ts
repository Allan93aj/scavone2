const TabsCustomSchema = {
  title: 'Tabs Custom',
  type: 'object',
  properties: {
    items: {
      title: 'Items',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          title: {
            title: 'Titulo',
            type: 'string',
          },
          link: {
            title: 'Link',
            type: 'string',
          },
        },
      },
    },
  },
};

export default TabsCustomSchema;
