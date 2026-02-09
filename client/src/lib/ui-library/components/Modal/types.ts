import type { ReactNode } from 'react';

export type ModalState = 'idle' | 'loading' | 'success' | 'empty' | 'error';

export type VerticalAlign = 'top' | 'middle' | 'bottom';
export type HorizontalAlign = 'left' | 'center' | 'right';
export type WidthMode = 'full' | 'auto' | 'fixed';
export type HeightMode = 'full' | 'auto' | 'fixed';

export interface OverlayConfig {
  enabled: boolean;
  opacity?: number;
  color?: string;
  blur?: boolean;
  closeOnClick?: boolean;
}

export interface CloseButtonConfig {
  visible: boolean;
  position?: 'top-left' | 'top-right';
  render?: ReactNode;
}

export interface LayoutConfig {
  widthMode?: WidthMode;
  width?: number;
  minWidth?: number;
  heightMode?: HeightMode;
  height?: number;
  minHeight?: number;
}

export interface SectionConfig {
  render: ReactNode;
  heightMode?: HeightMode;
  height?: number;
  minHeight?: number;
  verticalAlign?: VerticalAlign;
  horizontalAlign?: HorizontalAlign;
}

export interface StateConfig {
  renderType: 'component' | 'self';
  render?: ReactNode;
  widthMode?: WidthMode;
  width?: number;
  minWidth?: number;
  heightMode?: HeightMode;
  height?: number;
  minHeight?: number;
  verticalAlign?: VerticalAlign;
  horizontalAlign?: HorizontalAlign;
}

export interface StatesComponents {
  idle?: StateConfig;
  loading?: StateConfig;
  success?: StateConfig;
  empty?: StateConfig;
  error?: StateConfig;
}

export interface ModalCallbacks {
  onClose?: () => void;
  onConfirm?: <T>(data: T) => void;
}

export interface ModalDataItem {
  id: string;
  [key: string]: unknown;
}

export interface ModalProps {
  isOpen: boolean;
  state?: ModalState;
  overlay?: OverlayConfig;
  closeButton?: CloseButtonConfig;
  layout?: LayoutConfig;
  header?: SectionConfig;
  body?: SectionConfig;
  footer?: SectionConfig;
  statesComponents?: StatesComponents;
  callbacks?: ModalCallbacks;
  data?: ModalDataItem[];
  className?: string;
  langOverride?: string;
  i18nOrder?: 'global-first' | 'local-first';
}

export interface ModalControllerReturn<T = unknown> {
  isOpen: boolean;
  state: ModalState;
  open: () => void;
  close: () => void;
  closeWithData: (data: T) => void;
  setState: (state: ModalState) => void;
  setSelectedData: (data: T) => void;
  selectedData?: T;
}
