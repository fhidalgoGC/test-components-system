import { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import type { InternalAccordionProps, AccordionHandlers } from '../../shared';

type UseAccordionOptions = Pick<InternalAccordionProps, 'id' | 'isOpen' | 'defaultOpen' | 'controller' | 'callbacks'> & {
  body: { behaviors?: { scroll?: boolean; renderComponentStrategy?: 'once' | 'always' } };
};

export function useAccordion(options: UseAccordionOptions) {
  const { id, isOpen: controlledIsOpen, defaultOpen = false, controller, callbacks, body } = options;
  
  const isControlled = controlledIsOpen !== undefined;
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const [renderKey, setRenderKey] = useState(0);
  const [hasRenderedOnce, setHasRenderedOnce] = useState(false);
  
  const currentOpenState = isControlled ? controlledIsOpen : internalOpen;
  const prevOpenRef = useRef(currentOpenState);

  const open = useCallback(() => {
    if (!isControlled) {
      setInternalOpen(true);
    }
    callbacks?.onToggleAccordion?.(id, true);
  }, [id, isControlled, callbacks]);

  const close = useCallback(() => {
    if (!isControlled) {
      setInternalOpen(false);
    }
    callbacks?.onToggleAccordion?.(id, false);
  }, [id, isControlled, callbacks]);

  const toggle = useCallback(() => {
    const newState = !currentOpenState;
    if (!isControlled) {
      setInternalOpen(newState);
    }
    callbacks?.onToggleAccordion?.(id, newState);
  }, [id, isControlled, currentOpenState, callbacks]);

  const forceRenderBody = useCallback(() => {
    setRenderKey(prev => prev + 1);
  }, []);

  const isOpenFn = useCallback(() => currentOpenState, [currentOpenState]);

  useEffect(() => {
    if (currentOpenState && !hasRenderedOnce) {
      setHasRenderedOnce(true);
    }
  }, [currentOpenState, hasRenderedOnce]);

  useEffect(() => {
    if (currentOpenState && prevOpenRef.current !== currentOpenState) {
      callbacks?.onRenderBody?.(id);
    }
    prevOpenRef.current = currentOpenState;
  }, [currentOpenState, id, callbacks]);

  useEffect(() => {
    if (controller) {
      const handlers: AccordionHandlers = {
        open,
        close,
        toggle,
        forceRenderBody,
        isOpen: isOpenFn,
      };
      controller._register(id, handlers);

      return () => {
        controller._unregister(id);
      };
    }
  }, [controller, id, open, close, toggle, forceRenderBody, isOpenFn]);

  const shouldRenderBody = useMemo(() => {
    const strategy = body?.behaviors?.renderComponentStrategy || 'once';
    
    if (strategy === 'always') {
      return currentOpenState;
    }
    
    return currentOpenState || hasRenderedOnce;
  }, [currentOpenState, hasRenderedOnce, body?.behaviors?.renderComponentStrategy]);

  const shouldShowBody = currentOpenState;

  return {
    isOpen: currentOpenState,
    toggle,
    open,
    close,
    renderKey,
    shouldRenderBody,
    shouldShowBody,
  };
}
