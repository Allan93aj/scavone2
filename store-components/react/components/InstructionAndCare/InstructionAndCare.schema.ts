const InstructionAndCare = {
  title: 'Instruções e cuidados',
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
          text: {
            title: 'texto',
            type: 'string',
          },
        },
      },
    },
  },
};

export default InstructionAndCare;
