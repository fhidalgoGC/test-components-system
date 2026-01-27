import type { ReactNode } from 'react';
import type { VerticalAlign, HorizontalAlign } from './cells.type';

export interface HeaderCellConfig {
  verticalAlign?: VerticalAlign;
  horizontalAlign?: HorizontalAlign;
  sortKey?: string;
  sortable?: boolean;
  render?: ReactNode;
  clickable?: boolean;
}

export interface HeadersDefaultConfig {
  enabled?: boolean;
  dividers?: boolean;
  cell?: HeaderCellConfig;
}
