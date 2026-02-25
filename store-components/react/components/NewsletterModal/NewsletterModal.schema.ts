import { ImageSchema } from '../Image/Image.schema';
import { ImageListSchema } from '../ImageList/ImageList.schema';

const NewsletterModalSchema = {
  title: 'Newsletter',
  type: 'object',
  properties: {
    enabled: {
      title: 'Ativo?',
      type: 'boolean',
    },
    title: {
      title: 'Título',
      type: 'string',
    },
    subtitle: {
      title: 'Subtítulo',
      type: 'string',
    },
    question: {
      title: 'Texto',
      type: 'string',
    },
    termos: {
      title: 'Termos',
      type: 'string',
    },
    image: ImageSchema,
    socialMedia: {
      ...ImageListSchema,
      title: 'Redes sociais',
    },
  },
};

export default NewsletterModalSchema;
