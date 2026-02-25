import React from 'react'
import { useCssHandles } from 'vtex.css-handles'

import { useCrossSelling } from '../../context/CrossSellingContext'
import type { CrossSellingInstallmentsProps } from './CrossSellingInstallments.types'
import CrossSellingInstallmentsHandles from './CrossSellingInstallments.handles'
import formatMoney from '../../utils/formatMoney'

/**
 * Renders installments of cross selling selection.
 */
function CrossSellingInstallments({ classes }: CrossSellingInstallmentsProps) {
  const { handles } = useCssHandles(CrossSellingInstallmentsHandles, {
    classes,
  })

  const {
    sellingPrice,
    maxNumberOfInstallmentsWithoutInterest,
  } = useCrossSelling()

  const numberOfInstallments = maxNumberOfInstallmentsWithoutInterest ?? 1

  if (!sellingPrice || numberOfInstallments <= 1) return null

  const division = sellingPrice / numberOfInstallments

  const finalValue = formatMoney(division)

  return (
    <span className={handles.BuyTogetherInstallments}>
      apenas {numberOfInstallments}x de {finalValue}
    </span>
  )
}

export default CrossSellingInstallments
