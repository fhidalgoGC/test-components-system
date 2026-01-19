import { ReactNode } from 'react';

export type SizeToken = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type HeightToken = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type SpacingToken = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type GapToken = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type SlotGapToken = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type WidthMode = 'full' | 'auto' | 'fixed';
export type HeightMode = 'full' | 'auto' | 'fixed';
export type VerticalAlign = 'top' | 'center' | 'bottom';
export type ComponentSizeMode = 'auto' | 'full';

export type DividerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type DividerColor = 'white' | 'gray' | 'light' | 'dark' | 'primary';
export type DividerStyle = 'solid' | 'dashed' | 'dotted';
export type SlotDividerToken = `${DividerSize}-${DividerColor}`;
export type SlotAlignDividerToken = `${DividerSize}-${DividerColor}-${DividerStyle}`;

export interface LayoutColumnComponent {
  id?: string;
  component: ReactNode;
  align: VerticalAlign;
  slot: number;
  hide?: boolean;
  sizeMode?: ComponentSizeMode;
  height?: HeightToken | number;
}

export interface UseLayoutColumnOptions {
  components: LayoutColumnComponent[];
  slots: number;
}

export interface UseLayoutColumnReturn {
  visibleComponents: LayoutColumnComponent[];
  allComponents: LayoutColumnComponent[];
  visibleSlots: number;
  hideComponent: (id: string) => void;
  showComponent: (id: string) => void;
  toggleComponent: (id: string) => void;
  hideSlot: (slotIndex: number) => void;
  showSlot: (slotIndex: number) => void;
  toggleSlot: (slotIndex: number) => void;
  isComponentVisible: (id: string) => boolean;
  isSlotVisible: (slotIndex: number) => boolean;
  isSlotEmpty: (slotIndex: number) => boolean;
  resetVisibility: () => void;
}

export interface LayoutColumnProps {
  slots: number;
  widthMode?: WidthMode;
  width?: SizeToken | number;
  heightMode?: HeightMode;
  height?: HeightToken | number;
  paddingX?: SpacingToken | number;
  paddingY?: SpacingToken | number;
  marginX?: SpacingToken | number;
  marginY?: SpacingToken | number;
  componentGap?: GapToken | number;
  slotGap?: SlotGapToken;
  slotDivider?: SlotDividerToken;
  slotAlignDivider?: SlotAlignDividerToken;
  components: LayoutColumnComponent[];
  className?: string;
  langOverride?: string;
  i18nOrder?: 'global-first' | 'local-first';
}

export interface LayoutColumnContext {
  t: (key: string, params?: Record<string, string | number>) => string;
  lang: string;
}
