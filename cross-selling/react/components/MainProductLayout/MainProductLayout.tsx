import { PropsWithChildren } from 'react'

import { useCrossProduct } from '../../context/CrossSellingContext'

function MainProductLayout({ children }: PropsWithChildren<never>) {
  const { isMainProduct } = useCrossProduct()

  return isMainProduct ? children : null
}

export default MainProductLayout
