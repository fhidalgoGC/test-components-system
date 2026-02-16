import type { ReactNode, ComponentType, CSSProperties } from 'react';

export type AcordionListItemDataProps<R = unknown> = {
  itemData: R;
};

export type AcordionListItemHeaderSelf = {
  renderType: 'self';
  getHeaderLabel: (item: any) => string;
  heightMode?: 'full' | 'auto' | 'fixed';
  height?: number | 'auto';
  minHeight?: number;
  arrowPosition?: 'left' | 'right' | 'none';
};

export type AcordionListItemHeaderComponent<R = unknown> = {
  renderType: 'component';
  render: ComponentType<AcordionListItemDataProps<R>>;
  heightMode?: 'full' | 'auto' | 'fixed';
  height?: number | 'auto';
  minHeight?: number;
  arrowPosition?: 'left' | 'right' | 'none';
};

export type AcordionListItemHeader<R = unknown> =
  | AcordionListItemHeaderSelf
  | AcordionListItemHeaderComponent<R>;

export type AcordionListItemBody<R = unknown> = {
  renderType: 'component';
  render: ComponentType<AcordionListItemDataProps<R>>;
  heightMode?: 'full' | 'auto' | 'fixed';
  height?: number | 'auto';
  minHeight?: number;
  behaviors?: {
    scroll?: boolean;
    renderComponentStrategy?: 'once' | 'always';
  };
};

export type AcordionListLayout = {
  widthMode?: 'full' | 'auto' | 'fixed';
  width?: number;
  minWidth?: number;
  heightMode?: 'full' | 'auto' | 'fixed';
  height?: number | 'auto';
  minHeight?: number;
  gap?: number;
};

export type AcordionListBehaviors = {
  mode?: 'single' | 'multiple';
  defaultOpenIds?: string[];
  openIds?: string[];
};

export type AcordionListCallbacks = {
  onToggle?: (id: string, isOpen: boolean) => void;
  onOpenChange?: (openIds: string[]) => void;
};

export type AcordionListController = {
  open: (id: string) => void;
  close: (id: string) => void;
  toggle: (id: string) => void;
  closeAll: () => void;
  openAll: () => void;
  getOpenIds: () => string[];
  isOpen: (id: string) => boolean;
  refreshAll: () => void;
  refreshItem: (id: string) => void;
};

export type InternalAcordionListController = AcordionListController & {
  _subscribe: (callback: () => void) => () => void;
  _getRefreshKey: () => number;
  _getItemRefreshKey: (id: string) => number;
};

export type AcordionListProps<T = any, R = any> = {
  id: string;
  data: T[];
  getItemId: (item: T, index: number) => string;
  getItemData: (item: T, index: number) => R;
  itemHeader: AcordionListItemHeader<R>;
  itemBody: AcordionListItemBody<R>;
  layout?: AcordionListLayout;
  behaviors?: AcordionListBehaviors;
  callbacks?: AcordionListCallbacks;
  controller?: AcordionListController;
  className?: string;
};
