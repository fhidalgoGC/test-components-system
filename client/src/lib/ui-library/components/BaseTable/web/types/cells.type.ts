import type { ReactNode } from 'react';

export type TextWrap = 'nowrap' | 'wrap' | 'break-word' | 'truncate' | 'auto' | 'component';
export type VerticalAlign = 'top' | 'middle' | 'bottom';
export type HorizontalAlign = 'left' | 'center' | 'right';
export type RenderType = 'text' | 'component';
export type MaxSize = number | 'stretch' | 'container';

export interface CellConfig {
  textWrap?: TextWrap;
  verticalAlign?: VerticalAlign;
  horizontalAlign?: HorizontalAlign;
  renderType?: RenderType;
  render?: ReactNode | ((value: any, rowData: any, columnId: string) => ReactNode);
}

export interface CellsDefaultConfig {
  textWrap?: TextWrap;
  verticalAlign?: VerticalAlign;
  horizontalAlign?: HorizontalAlign;
  renderType?: RenderType;
  render?: ReactNode | ((value: any, rowData: any, columnId: string) => ReactNode);
}
