import { createContext, useContext } from 'react'

import type { CrossSellingContextType } from './CrossSellingContext.types'

export const CrossSellingContext = createContext({} as CrossSellingContextType)
export const useCrossSelling = () => useContext(CrossSellingContext)
