import type { ReactNode, ComponentType } from 'react';

export type AccordionController = {
  open: (id: string) => void;
  close: (id: string) => void;
  toggle: (id: string) => void;
  forceRenderBody: (id: string) => void;
  isOpen: (id: string) => boolean;
  _register: (id: string, handlers: AccordionHandlers) => void;
  _unregister: (id: string) => void;
};

export type AccordionHandlers = {
  open: () => void;
  close: () => void;
  toggle: () => void;
  forceRenderBody: () => void;
  isOpen: () => boolean;
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

export type AccordionHeader = {
  renderType: 'component';
  render: ReactNode | ComponentType;
  heightMode?: 'full' | 'auto' | 'fixed';
  height?: number | 'auto';
  minHeight?: number;
};

export type AccordionBody = {
  renderType: 'component';
  render: ReactNode | ComponentType;
  heightMode?: 'full' | 'auto' | 'fixed';
  height?: number | 'auto';
  minHeight?: number;
  behaviors?: {
    scroll?: boolean;
    renderComponentStrategy?: 'once' | 'always';
  };
};

export type AccordionProps = {
  id: string;
  controller?: AccordionController;
  isOpen?: boolean;
  defaultOpen?: boolean;
  callbacks?: AccordionCallbacks;
  layout?: AccordionLayout;
  header: AccordionHeader;
  body: AccordionBody;
};
