import { ReactNode } from 'react';

export type SizeToken = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type HeightToken = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type SpacingToken = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type GapToken = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type SlotGapToken = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type WidthMode = 'full' | 'auto' | 'fixed';
export type HeightMode = 'auto' | 'fixed';
export type VerticalAlign = 'top' | 'center' | 'bottom' | 'stretch';
export type HorizontalAlign = 'left' | 'center' | 'right';

export interface LayoutRowComponent {
  component: ReactNode;
  align: HorizontalAlign;
  slot: number;
  hide?: boolean;
}

export interface LayoutRowProps {
  slots: number;
  widthMode?: WidthMode;
  width?: SizeToken | number;
  heightMode?: HeightMode;
  height?: HeightToken | number;
  paddingX?: SpacingToken | number;
  paddingY?: SpacingToken | number;
  marginX?: SpacingToken | number;
  marginY?: SpacingToken | number;
  componentVerticalAlign?: VerticalAlign;
  componentGap?: GapToken | number;
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
