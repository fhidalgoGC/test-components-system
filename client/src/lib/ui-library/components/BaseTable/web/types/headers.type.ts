import type { ReactNode } from 'react';
import type { TextWrap, VerticalAlign, HorizontalAlign, RenderType } from './cells.type';

export interface HeaderCellConfig {
  textWrap?: TextWrap;
  verticalAlign?: VerticalAlign;
  horizontalAlign?: HorizontalAlign;
  sortKey?: string;
  sortable?: boolean;
  renderType?: RenderType;
  render?: ReactNode;
  clickable?: boolean;
}

export interface HeadersDefaultConfig {
  enabled?: boolean;
  dividers?: boolean;
  cell?: HeaderCellConfig;
}
