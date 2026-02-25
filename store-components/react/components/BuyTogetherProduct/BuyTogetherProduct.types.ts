import type { CssHandlesTypes } from 'vtex.css-handles';

import type BuyTogetherProductHandles from './BuyTogetherProduct.handles';

interface BuyTogetherProductProps {
  classes?: CssHandlesTypes.CustomClasses<typeof BuyTogetherProductHandles>;
}

export { BuyTogetherProductProps };
