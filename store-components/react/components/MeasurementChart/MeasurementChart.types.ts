import type React from 'react';

interface CategoryType {
  category: string;
}

interface MeasurementChartProps {
  categories: CategoryType[];
  children: React.ReactNode;
}

export type { MeasurementChartProps };
