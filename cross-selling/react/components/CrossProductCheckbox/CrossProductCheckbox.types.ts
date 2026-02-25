import type { CssHandlesTypes } from 'vtex.css-handles'

import type CrossProductCheckboxHandles from './CrossProductCheckbox.handles'

export interface CrossProductCheckboxProps {
  preventUncheckingMainProduct?: boolean
  classes?: CssHandlesTypes.CustomClasses<typeof CrossProductCheckboxHandles>
}
