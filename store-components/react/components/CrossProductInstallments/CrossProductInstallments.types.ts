import type { CssHandlesTypes } from 'vtex.css-handles';

import type CrossProductInstallmentsHandles from './CrossProductInstallments.handles';

export interface CrossProductInstallmentsProps {
  message?: string;
  classes?: CssHandlesTypes.CustomClasses<
    typeof CrossProductInstallmentsHandles
  >;
}
