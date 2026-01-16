import { ReactNode } from 'react';

export type SizeToken = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type SpacingToken = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type SlotGapToken = 'none' | 'xs' | 'sm' | 'md' | 'lg';
export type WidthMode = 'full' | 'auto' | 'fixed';
export type HeightMode = 'auto' | 'fixed';
export type VerticalAlign = 'top' | 'center' | 'bottom' | 'stretch';
export type HorizontalAlign = 'left' | 'center' | 'right';

export interface LayoutRowComponent {
  component: ReactNode;
  align: HorizontalAlign;
  slot: number;
}

export interface LayoutRowProps {
  slots: number;
  widthMode?: WidthMode;
  width?: SizeToken | number;
  heightMode?: HeightMode;
  height?: SizeToken | number;
  paddingX?: SpacingToken;
  paddingY?: SpacingToken;
  marginX?: SpacingToken;
  marginY?: SpacingToken;
  componentVerticalAlign?: VerticalAlign;
  componentGap?: SizeToken;
  slotGap?: SlotGapToken;
  components: LayoutRowComponent[];
  className?: string;
  langOverride?: string;
  i18nOrder?: 'global-first' | 'local-first';
}

export interface LayoutRowContext {
  t: (key: string, params?: Record<string, string | number>) => string;
  lang: string;
}
