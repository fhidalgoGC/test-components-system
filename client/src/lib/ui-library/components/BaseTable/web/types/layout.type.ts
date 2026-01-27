export type WidthMode = 'full' | 'auto' | 'fixed';
export type HeightMode = 'full' | 'auto' | 'fixed';

export interface LayoutConfig {
  widthMode?: WidthMode;
  width?: number | string;
  heightMode?: HeightMode;
  height?: number | string;
  minWidth?: number;
  minHeight?: number;
  stickyHeader?: boolean;
  verticalScroll?: boolean;
}
