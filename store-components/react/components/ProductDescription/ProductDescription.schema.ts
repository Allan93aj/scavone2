const ProductDescriptionSchema = {
  type: 'object',
  properties: {
    props: {
      type: 'object',
      properties: {
        menu: {
          type: 'array',
          items: [
            {
              type: 'object',
              properties: {
                property: {
                  type: 'string',
                },
              },
              required: ['property'],
            },
            {
              type: 'object',
              properties: {
                property: {
                  type: 'string',
                },
                displayName: {
                  type: 'string',
                },
              },
              required: ['property', 'displayName'],
            },
          ],
        },
      },
      required: ['menu'],
    },
  },
  required: ['props'],
};

export default ProductDescriptionSchema;
