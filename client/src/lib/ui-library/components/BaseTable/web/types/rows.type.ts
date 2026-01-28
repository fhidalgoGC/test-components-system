import type { MaxSize, CellHeightMode } from './cells.type';

export interface RowsDefaultConfig {
  height?: number | string;
  heightMode?: CellHeightMode;
  minHeight?: number;
  maxHeight?: MaxSize;
  maxVisibleRows?: number;
  scroll?: boolean;
  hoverable?: boolean;
  dividers?: boolean;
}
