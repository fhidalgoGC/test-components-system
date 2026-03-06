import type { PanelConfig, SizeMode } from '../../web/types';

export interface MobileLayoutConfig {
  widthMode?: SizeMode;
  width?: string | number;
  minWidth?: number;
  heightMode?: SizeMode;
  height?: string | number;
  minHeight?: number;
}

export interface SplitLayoutMobileProps {
  layout?: MobileLayoutConfig;
  main: PanelConfig;
}
