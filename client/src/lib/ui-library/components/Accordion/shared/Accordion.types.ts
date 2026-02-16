import type { ReactNode, ComponentType } from 'react';

export type AccordionController = {
  open: (id: string) => void;
  close: (id: string) => void;
  toggle: (id: string) => void;
  forceRenderBody: (id: string) => void;
  isOpen: (id: string) => boolean;
};

export type AccordionHandlers = {
  open: () => void;
  close: () => void;
  toggle: () => void;
  forceRenderBody: () => void;
  isOpen: () => boolean;
};

export type InternalAccordionController = AccordionController & {
  _register: (id: string, handlers: AccordionHandlers) => void;
  _unregister: (id: string) => void;
};

export type AccordionCallbacks = {
  onToggleAccordion?: (id: string, isOpen: boolean) => void;
  onRenderBody?: (id: string) => void;
};

export type AccordionLayout = {
  widthMode?: 'full' | 'auto' | 'fixed';
  width?: number;
  minWidth?: number;
  heightMode?: 'full' | 'auto' | 'fixed';
  height?: number | 'auto';
  minHeight?: number;
};

export type AccordionItemDataProps<T = unknown> = {
  itemData: T;
};

export type AccordionHeader<T = unknown> = {
  renderType: 'component';
  render: ReactNode | ComponentType<AccordionItemDataProps<T>>;
  heightMode?: 'full' | 'auto' | 'fixed';
  height?: number | 'auto';
  minHeight?: number;
  arrowPosition?: 'left' | 'right' | 'none';
};

export type AccordionBody<T = unknown> = {
  renderType: 'component';
  render: ReactNode | ComponentType<AccordionItemDataProps<T>>;
  heightMode?: 'full' | 'auto' | 'fixed';
  height?: number | 'auto';
  minHeight?: number;
  behaviors?: {
    scroll?: boolean;
    renderComponentStrategy?: 'once' | 'always';
  };
};

export type AccordionProps<T = unknown> = {
  id: string;
  itemData?: T;
  controller?: AccordionController;
  isOpen?: boolean;
  defaultOpen?: boolean;
  callbacks?: AccordionCallbacks;
  layout?: AccordionLayout;
  header: AccordionHeader<T>;
  body: AccordionBody<T>;
};

export type InternalAccordionProps<T = unknown> = Omit<AccordionProps<T>, 'controller'> & {
  controller?: InternalAccordionController;
};
