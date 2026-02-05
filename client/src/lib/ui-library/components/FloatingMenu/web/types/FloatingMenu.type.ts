import type { ReactNode } from 'react';

export type WidthMode = 'full' | 'auto' | 'fixed';
export type HeightMode = 'full' | 'auto' | 'fixed';
export type ScrollMode = 'auto' | 'none';
export type RenderType = 'component' | 'none';

export type MenuPosition = 
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end';

export interface FloatingMenuLayout {
  widthMode?: WidthMode;
  width?: number | string;
  minWidth?: number | string;
  maxWidth?: number | string;
  heightMode?: HeightMode;
  height?: number | string;
  minHeight?: number | string;
  maxHeight?: number | string;
}

export interface FloatingMenuSectionConfig {
  renderType?: RenderType;
  render?: () => ReactNode;
  heightMode?: HeightMode;
  height?: number | string;
  minHeight?: number | string;
  maxHeight?: number | string;
  show?: boolean;
}

export interface FloatingMenuItemConfig {
  heightMode?: HeightMode;
  height?: number | string;
  minHeight?: number | string;
}

export interface FloatingMenuItem<T = unknown> {
  id: string;
  data?: T;
  render: (item: FloatingMenuItem<T>) => ReactNode;
  disabled?: boolean;
}

export interface FloatingMenuProps<T = unknown> {
  items: FloatingMenuItem<T>[];
  layout?: FloatingMenuLayout;
  position?: MenuPosition;
  header?: FloatingMenuSectionConfig;
  footer?: FloatingMenuSectionConfig;
  itemConfig?: FloatingMenuItemConfig;
  scroll?: ScrollMode;
  isOpen?: boolean;
  showBackdrop?: boolean;
  onItemClick?: (item: FloatingMenuItem<T>, index: number) => void;
  onClose?: () => void;
  className?: string;
  itemClassName?: string;
  headerClassName?: string;
  footerClassName?: string;
}
