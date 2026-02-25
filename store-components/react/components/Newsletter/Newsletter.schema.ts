const NewsletterSchema = {
  title: 'Newsletter',
  type: 'object',
  properties: {
    title: {
      title: 'Título',
      type: 'string',
    },
    subtitle: {
      title: 'Subtítulo',
      type: 'string',
    },
  },
};

export default NewsletterSchema;
