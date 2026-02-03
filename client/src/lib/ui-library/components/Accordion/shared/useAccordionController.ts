import { useCallback, useRef } from 'react';
import type { InternalAccordionController, AccordionHandlers } from './Accordion.types';

export function useAccordionController(): InternalAccordionController {
  const registryRef = useRef<Map<string, AccordionHandlers>>(new Map());

  const _register = useCallback((id: string, handlers: AccordionHandlers) => {
    registryRef.current.set(id, handlers);
  }, []);

  const _unregister = useCallback((id: string) => {
    registryRef.current.delete(id);
  }, []);

  const open = useCallback((id: string) => {
    const handlers = registryRef.current.get(id);
    if (handlers) {
      handlers.open();
    }
  }, []);

  const close = useCallback((id: string) => {
    const handlers = registryRef.current.get(id);
    if (handlers) {
      handlers.close();
    }
  }, []);

  const toggle = useCallback((id: string) => {
    const handlers = registryRef.current.get(id);
    if (handlers) {
      handlers.toggle();
    }
  }, []);

  const forceRenderBody = useCallback((id: string) => {
    const handlers = registryRef.current.get(id);
    if (handlers) {
      handlers.forceRenderBody();
    }
  }, []);

  const isOpen = useCallback((id: string): boolean => {
    const handlers = registryRef.current.get(id);
    if (handlers) {
      return handlers.isOpen();
    }
    return false;
  }, []);

  return {
    open,
    close,
    toggle,
    forceRenderBody,
    isOpen,
    _register,
    _unregister,
  };
}
