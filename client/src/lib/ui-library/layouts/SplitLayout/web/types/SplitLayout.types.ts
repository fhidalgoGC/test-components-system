import { ReactNode } from 'react';

export type SizeMode = 'full' | 'auto' | 'fixed' | 'percentage';
export type VerticalAlign = 'middle' | 'top' | 'bottom';
export type HorizontalAlign = 'left' | 'center' | 'right';

export type ComponentMainAlign = 'left' | 'right';

export interface LayoutConfig {
  componentMainAlign?: ComponentMainAlign;
  widthMode?: SizeMode;
  width?: string | number;
  minWidth?: number;
  heightMode?: SizeMode;
  height?: string | number;
  minHeight?: number;
}

export interface PanelAlign {
  vertical?: VerticalAlign;
  horizontal?: HorizontalAlign;
}

export interface PanelScroll {
  vertical?: boolean;
  horizontal?: boolean;
}

export type BackgroundRenderType = 'src' | 'component';

export interface PanelBackgroundImage {
  renderType: BackgroundRenderType;
  src?: string;
  render?: ReactNode;
  opacity?: number;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none';
  objectPosition?: string;
  overlayColor?: string;
}

export interface PanelConfig {
  renderType?: 'component';
  render: ReactNode;
  widthMode?: SizeMode;
  width?: string | number;
  minWidth?: number;
  heightMode?: SizeMode;
  height?: string | number;
  minHeight?: number;
  align?: PanelAlign;
  scroll?: PanelScroll;
  backgroundImage?: PanelBackgroundImage;
}

export interface SplitLayoutProps {
  layout?: LayoutConfig;
  main: PanelConfig;
  secondary: PanelConfig;
}
