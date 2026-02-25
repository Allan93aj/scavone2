import { useMemo } from 'react';
import { useProduct } from 'vtex.product-context';

import MeasurementChartSchema from './MeasurementChart.schema';
import type { MeasurementChartProps } from './MeasurementChart.types';

function MeasurementChart({ categories, children }: MeasurementChartProps) {
  const productContext = useProduct();

  const shouldAppear = useMemo(() => {
    return !categories.some(({ category }) => {
      return productContext?.product?.categoryTree?.some((contextCategory) => {
        return contextCategory?.name.toLowerCase().includes(category);
      });
    });
  }, [productContext?.product?.categoryTree, categories]);

  return shouldAppear ? children : null;
}

MeasurementChart.getSchema = () => MeasurementChartSchema;

export default MeasurementChart;
