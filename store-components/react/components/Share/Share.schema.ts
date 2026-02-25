const ShareOptionSchema = {
  title: 'Link de compartilhamento',
  type: 'object',
  properties: {
    title: {
      title: 'Nome',
      type: 'string',
    },
    href: {
      title: 'URL',
      description:
        'Use o marcador {pageUrl} para definir onde o link de página vai.',
      type: 'string',
    },
    icon: {
      title: 'Ícone',
      type: 'string',
      widget: {
        'ui:widget': 'image-uploader',
      },
    },
  },
};

const ShareSchema = {
  title: 'Botão Compartilhar',
  type: 'object',
  properties: {
    options: {
      title: 'Opções',
      type: 'array',
      items: 'array',
    },
  },
};

export { ShareSchema, ShareOptionSchema };
