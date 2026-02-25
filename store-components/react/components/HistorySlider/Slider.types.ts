import type { CssHandlesTypes } from 'vtex.css-handles';

import type SliderListHandles from './Slider.handles';

interface SliderProps {
  image: string;
  imageMobile: string;
  alt?: string;
  description: string;
}

interface SliderListProps {
  images: SliderProps[];
  title: string;
  subtitle: string;
  classes?: CssHandlesTypes.CustomClasses<typeof SliderListHandles>;
}

interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export { SliderProps, SliderListProps, ArrowProps };
