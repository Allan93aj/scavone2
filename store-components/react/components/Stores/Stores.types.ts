import type { CssHandlesTypes } from 'vtex.css-handles';

import type { ImageProps } from '../Image/Image.types';
import type StoresListHandles from './Stores.handles';

interface StoreProps extends ImageProps {
  city: string;
  street: string;
  saturday: string;
  sunday: string;
  week: string;
  obs: string;
  phone: string;
  whatsappNumber: string;
  whatsappUrl: string;
  googleUrl: string;
  classes?: CssHandlesTypes.CustomClasses<typeof StoresListHandles>;
}

interface StoresListProps {
  stores: StoreProps[];
  classes?: CssHandlesTypes.CustomClasses<typeof StoresListHandles>;
}

export { StoreProps, StoresListProps };
