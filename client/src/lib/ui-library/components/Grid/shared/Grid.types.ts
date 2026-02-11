import type { ReactNode, ComponentType } from 'react';

export type GridState = 'idle' | 'loading' | 'empty' | 'error';

export type WidthMode = 'full' | 'auto' | 'fixed';
export type HeightMode = 'full' | 'auto' | 'fixed';
export type VerticalAlign = 'top' | 'middle' | 'bottom';
export type HorizontalAlign = 'left' | 'center' | 'right';

export interface GridLayout {
  widthMode?: WidthMode;
  width?: number;
  minWidth?: number;
  heightMode?: HeightMode;
  height?: number;
  minHeight?: number;
}

export interface GridConfig {
  minColumns?: number;
  maxColumns?: number;
  minRows?: number;
  maxRows?: number;
  minCardWidth?: number;
  minCardHeight?: number;
  rowGap?: number;
  columnGap?: number;
}

export interface GridItemConfig<T> {
  renderType: 'component';
  render: (item: T, index: number) => ReactNode;
}

export interface GridScrollConfig {
  enabled?: boolean;
  threshold?: number;
}

export interface GridStateComponent {
  renderType: 'component' | 'self';
  render?: ReactNode | ComponentType;
  verticalAlign?: VerticalAlign;
  horizontalAlign?: HorizontalAlign;
}

export interface GridStatesComponents {
  idle?: GridStateComponent;
  loading?: GridStateComponent;
  empty?: GridStateComponent;
  error?: GridStateComponent;
}

export interface GridCapacityInfo {
  columns: number;
  rows: number;
  visibleItems: number;
}

export interface GridLayoutInfo {
  width: number;
  height: number;
}

export interface GridCallbacks {
  onCapacityChange?: (info: GridCapacityInfo) => void;
  onReachEnd?: () => void;
  onLayoutChange?: (info: GridLayoutInfo) => void;
  onStateChange?: (newState: GridState) => void;
}

export interface GridProps<T = any> {
  id?: string;
  data?: T[];
  layout?: GridLayout;
  grid?: GridConfig;
  item: GridItemConfig<T>;
  scroll?: GridScrollConfig;
  statesComponents?: GridStatesComponents;
  callbacks?: GridCallbacks;
  controller?: GridController;
  className?: string;
}

export interface GridController {
  setState: (state: GridState) => void;
  getState: () => GridState;
  refreshLayout: () => void;
}

export interface InternalGridController extends GridController {
  _subscribe: (callback: () => void) => () => void;
  _getState: () => GridState;
  _getRefreshTrigger: () => number;
}
