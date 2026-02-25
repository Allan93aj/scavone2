const StoresSchema = {
  title: 'Item',
  type: 'object',
  properties: {
    src: {
      title: 'Imagem',
      type: 'string',
      widget: {
        'ui:widget': 'image-uploader',
      },
    },
    alt: {
      title: 'Descrição da imagem',
      type: 'string',
    },

    city: {
      title: 'Cidade',
      type: 'string',
    },

    street: {
      title: 'Logradouro',
      type: 'string',
    },
    week: {
      title: 'Dias da semana:',
      type: 'string',
    },
    saturday: {
      title: 'Sábado:',
      type: 'string',
    },
    sunday: {
      title: 'Domingo:',
      type: 'string',
    },
    obs: {
      title: 'Observações',
      type: 'string',
    },
    phone: {
      title: 'Telefones para contato',
      type: 'string',
    },
    whatsappNumber: {
      title: 'Whatsapp',
      type: 'string',
    },
    whatsappUrl: {
      title: 'Link do whatsapp',
      type: 'string',
    },
    googleUrl: {
      title: 'Link do Google',
      type: 'string',
    },
  },
};

const StoresListSchema = {
  title: 'Lojas',
  type: 'object',
  properties: {
    stores: {
      title: 'Loja',
      type: 'array',
      items: StoresSchema,
    },
  },
};

export { StoresListSchema };
