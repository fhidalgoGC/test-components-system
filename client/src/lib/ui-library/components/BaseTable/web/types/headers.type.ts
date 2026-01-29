import type { ReactNode } from 'react';
import type { VerticalAlign, HorizontalAlign, CellHeightMode, IconPosition } from './cells.type';

export interface HeaderCellConfig {
  verticalAlign?: VerticalAlign;
  horizontalAlign?: HorizontalAlign;
  height?: number | string;
  heightMode?: CellHeightMode;
  sortKey?: string;
  sortable?: boolean;
  render?: ReactNode;
  clickable?: boolean;
  iconPosition?: IconPosition;
}

export interface HeadersDefaultConfig {
  enabled?: boolean;
  dividers?: boolean;
  height?: number | string;
  heightMode?: CellHeightMode;
  cell?: HeaderCellConfig;
}
