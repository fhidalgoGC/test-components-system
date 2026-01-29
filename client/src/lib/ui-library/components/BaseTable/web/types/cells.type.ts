import type { ReactNode } from 'react';

export type VerticalAlign = 'top' | 'middle' | 'bottom';
export type HorizontalAlign = 'left' | 'center' | 'right';
export type MaxSize = number | 'stretch' | 'container';
export type CellHeightMode = 'fixed' | 'auto';
export type IconPosition = 'left' | 'right';

export interface CellConfig {
  verticalAlign?: VerticalAlign;
  horizontalAlign?: HorizontalAlign;
  height?: number | string;
  heightMode?: CellHeightMode;
  render?: ReactNode | ((value: any, rowData: any, columnId: string) => ReactNode);
}

export interface CellsDefaultConfig {
  verticalAlign?: VerticalAlign;
  horizontalAlign?: HorizontalAlign;
  height?: number | string;
  heightMode?: CellHeightMode;
  render?: ReactNode | ((value: any, rowData: any, columnId: string) => ReactNode);
}
