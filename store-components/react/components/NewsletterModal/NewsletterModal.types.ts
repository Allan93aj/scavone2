import type { ImageProps } from '../Image/Image.types';
import type { ImageProps as ImageListProps } from '../ImageList/ImageList.types';

interface NewsletterModalProps extends ImageProps {
  enabled: boolean;
  title?: string;
  subtitle?: string;
  texto?: string;
  termos?: string;
  socialMedia: ImageListProps[];
  banner: ImageProps;
}

export type { NewsletterModalProps };
