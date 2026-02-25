import type { CssHandlesTypes } from 'vtex.css-handles';

import type CrossProductTagHandles from './CrossProductTag.handles';

export interface CrossProductTagProps {
  text?: string;
  classes?: CssHandlesTypes.CustomClasses<typeof CrossProductTagHandles>;
}
