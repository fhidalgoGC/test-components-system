import { ReactNode, CSSProperties } from 'react';

export type MainSide = 'left' | 'right';
export type VerticalAlign = 'top' | 'center' | 'bottom';
export type HorizontalAlign = 'left' | 'center' | 'right';
export type SpacingToken = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface PanelConfig {
  content: ReactNode;
  verticalAlign?: VerticalAlign;
  horizontalAlign?: HorizontalAlign;
  padding?: SpacingToken;
  background?: PanelBackground;
  style?: CSSProperties;
  className?: string;
}

export interface PanelBackground {
  color?: string;
  image?: string;
  gradient?: string;
  size?: string;
  position?: string;
  overlay?: string;
}

export interface SplitLayoutProps {
  mainPanel: PanelConfig;
  secondaryPanel: PanelConfig;
  mainSide?: MainSide;
  mainWidthPercent?: number;
  collapseBreakpoint?: number;
  gap?: SpacingToken;
  fullHeight?: boolean;
  height?: string;
  className?: string;
  style?: CSSProperties;
}
