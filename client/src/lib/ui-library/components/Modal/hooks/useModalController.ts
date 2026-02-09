import { useState, useCallback } from 'react';
import type { ModalState, ModalControllerReturn } from '../types';

export function useModalController<T = unknown>(): ModalControllerReturn<T> {
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState<ModalState>('idle');
  const [selectedData, setSelectedData] = useState<T | undefined>(undefined);

  const open = useCallback(() => {
    setIsOpen(true);
    setState('idle');
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setState('idle');
    setSelectedData(undefined);
  }, []);

  const closeWithData = useCallback((data: T) => {
    setSelectedData(data);
    setIsOpen(false);
  }, []);

  return {
    isOpen,
    state,
    open,
    close,
    closeWithData,
    setState,
    setSelectedData,
    selectedData,
  };
}
