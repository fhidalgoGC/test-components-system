import type { ReactNode } from 'react';

export type VerticalAlign = 'top' | 'middle' | 'bottom';
export type HorizontalAlign = 'left' | 'center' | 'right';
export type MaxSize = number | 'stretch' | 'container';

export interface CellConfig {
  verticalAlign?: VerticalAlign;
  horizontalAlign?: HorizontalAlign;
  render?: ReactNode | ((value: any, rowData: any, columnId: string) => ReactNode);
}

export interface CellsDefaultConfig {
  verticalAlign?: VerticalAlign;
  horizontalAlign?: HorizontalAlign;
  render?: ReactNode | ((value: any, rowData: any, columnId: string) => ReactNode);
}
