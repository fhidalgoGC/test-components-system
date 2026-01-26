import type { ReactNode } from 'react';
import type { MaxSize, RenderType, TextWrap, VerticalAlign, HorizontalAlign } from './cells.type';

export interface ColumnMetadata {
  columnId: string;
  order?: number;
}

export interface ColumnCellConfig {
  textWrap?: TextWrap;
  verticalAlign?: VerticalAlign;
  horizontalAlign?: HorizontalAlign;
  renderType?: RenderType;
  render?: ReactNode | ((value: any, rowData: any, columnId: string) => ReactNode);
}

export interface ColumnHeaderCellConfig {
  textWrap?: TextWrap;
  verticalAlign?: VerticalAlign;
  horizontalAlign?: HorizontalAlign;
  sortKey?: string;
  sortable?: boolean;
  renderType?: RenderType;
  render?: ReactNode;
  clickable?: boolean;
}

export interface ColumnHeaderConfig {
  cell?: ColumnHeaderCellConfig;
}

export interface ColumnConfig {
  metadata: ColumnMetadata;
  header?: ColumnHeaderConfig;
  cell?: ColumnCellConfig;
  visible?: boolean;
  minWidth?: number;
  maxWidth?: MaxSize;
  sortable?: boolean;
}

export interface ColumnsDefaultConfig {
  maxVisibleColumns?: number;
  scroll?: boolean;
  minWidth?: number;
  maxWidth?: MaxSize;
  sortable?: boolean;
  visible?: boolean;
}
