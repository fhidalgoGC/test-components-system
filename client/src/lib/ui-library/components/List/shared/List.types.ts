import type { ReactNode, ComponentType, CSSProperties } from 'react';
import type { ItemActionEvent } from '../../WrapperItemsSelected/types';

export type RenderState =
  | 'renderIdle'
  | 'renderLoading'
  | 'renderComplete'
  | 'renderEmpty'
  | 'renderError';

export type ScrollBehavior = 'normal' | 'infinityScroll' | 'none';
export type WidthMode = 'full' | 'auto' | 'fixed';
export type HeightMode = 'full' | 'auto' | 'fixed';
export type LoadingPosition = 'top' | 'bottom' | 'over';

export interface ListLayout {
  widthMode?: WidthMode;
  width?: number;
  minWidth?: number;
  heightMode?: HeightMode;
  height?: number | 'auto';
  minHeight?: number;
  gap?: number | string;
}

export interface ListCallbacks {
  onScroll?: (id: string) => void;
  onScrollInfinity?: (page: number) => void;
}

export interface ListPaginator {
  maxItem: number;
}

export interface ListBehaviors {
  scroll?: ScrollBehavior;
  paginator?: ListPaginator;
}

export interface ListLoading {
  renderType?: 'component' | 'self';
  render?: ReactNode | ComponentType;
  position?: LoadingPosition;
}

export interface ListEmpty {
  renderType?: 'component' | 'self';
  render?: ReactNode | ComponentType;
  position?: 'center' | 'over';
}

export interface ListItemConfig<T> {
  renderType: 'component';
  render: (item: T, index: number) => ReactNode;
  heightMode?: HeightMode;
  height?: number | 'auto';
  minHeight?: number;
}

export interface SelectionStyle {
  border?: string;
  borderRadius?: string | number;
  backgroundColor?: string;
  boxShadow?: string;
  outline?: string;
  custom?: CSSProperties;
}

export interface SelectionConfig<T = any> {
  getItemId: (item: T, index: number) => string;
  multiSelect?: boolean;
  selectedIds?: string[];
  defaultSelectedIds?: string[];
  onSelectionChange?: (selectedIds: string[]) => void;
  onItemAction?: (event: ItemActionEvent) => void;
  selectionStyle?: SelectionStyle;
}

export interface ListProps<T = any> {
  id: string;
  layout?: ListLayout;
  callbacks?: ListCallbacks;
  behaviors?: ListBehaviors;
  loading?: ListLoading;
  empty?: ListEmpty;
  item: ListItemConfig<T>;
  data?: T[];
  controller?: ListController<T>;
  selectionConfig?: SelectionConfig<T>;
  className?: string;
  langOverride?: string;
  i18nOrder?: 'global-first' | 'local-first';
  renderIdle?: ComponentType | (() => ReactNode);
  renderLoading?: ComponentType | (() => ReactNode);
  renderComplete?: ComponentType | (() => ReactNode);
  renderError?: ComponentType | (() => ReactNode);
}

export interface ListController<T = any> {
  setData: (data: T[]) => void;
  appendData: (data: T[]) => void;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  setTotalItems: (total: number) => void;
  setRenderState: (state: RenderState) => void;
  getRenderState: () => RenderState;
  reload: () => void;
  getPage: () => number;
  getPageSize: () => number;
  getTotalItems: () => number;
  getTotalPages: () => number;
  getNextPage: () => number;
  getLoadedItems: () => number;
}

export interface InternalListController<T = any> extends ListController<T> {
  _getData: () => T[];
  _subscribe: (callback: () => void) => () => void;
  _register: (id: string) => void;
  _unregister: (id: string) => void;
}

export interface ListState<T = any> {
  data: T[];
  page: number;
  pageSize: number;
  renderState: RenderState;
}
