import type { ReactNode, ComponentType } from 'react';

export type RenderState =
  | 'renderIdle'
  | 'renderLoading'
  | 'renderComplete'
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

export interface ListItemConfig<T> {
  renderType: 'component';
  render: (item: T, index: number) => ReactNode;
  heightMode?: HeightMode;
  height?: number | 'auto';
  minHeight?: number;
}

export interface ListProps<T = any> {
  id: string;
  layout?: ListLayout;
  callbacks?: ListCallbacks;
  behaviors?: ListBehaviors;
  loading?: ListLoading;
  item: ListItemConfig<T>;
  data: T[];
  controller?: ListController<T>;
  className?: string;
  langOverride?: string;
  i18nOrder?: 'global-first' | 'local-first';
}

export interface ListController<T = any> {
  setData: (data: T[]) => void;
  appendData: (data: T[]) => void;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  setRenderState: (state: RenderState) => void;
  getRenderState: () => RenderState;
  reload: () => void;
  getPage: () => number;
  getPageSize: () => number;
  getTotalItems: () => number;
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
