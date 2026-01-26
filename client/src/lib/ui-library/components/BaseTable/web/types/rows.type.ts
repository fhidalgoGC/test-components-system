import type { MaxSize } from './cells.type';

export interface RowsDefaultConfig {
  minHeight?: number;
  maxHeight?: MaxSize;
  maxVisibleRows?: number;
  scroll?: boolean;
  hoverable?: boolean;
}
