import type { ReactNode, ComponentType } from 'react';

export type RenderState =
  | 'renderIdle'
  | 'renderLoading'
  | 'renderComplete'
  | 'renderError';

export type ScrollBehavior = 'normal' | 'infinityScroll' | 'none';

export type WidthMode = 'full' | 'auto' | 'fixed';
export type HeightMode = 'full' | 'auto' | 'fixed';

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
  position?: 'top' | 'bottom' | 'over';
}

export interface ListItem<T> {
  renderType: 'component';
  render: (item: T, index: number) => ReactNode;
  heightMode?: HeightMode;
  height?: number | 'auto';
  minHeight?: number;
}

export interface ListProps<T> {
  id: string;
  layout?: ListLayout;
  callbacks?: ListCallbacks;
  behaviors?: ListBehaviors;
  loading?: ListLoading;
  item: ListItem<T>;
  data: T[];
  controller?: ListController<T>;
}

export interface ListController<T> {
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
  _getData: () => T[];
  _subscribe: (callback: () => void) => () => void;
}

export interface InternalListController<T> extends ListController<T> {
  _register: (id: string) => void;
  _unregister: (id: string) => void;
}

export interface ListState<T> {
  data: T[];
  page: number;
  pageSize: number;
  renderState: RenderState;
}
