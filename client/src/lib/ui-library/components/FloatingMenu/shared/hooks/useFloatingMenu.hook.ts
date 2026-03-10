import { useRef } from 'react';
import type { FloatingMenuController, InternalFloatingMenuController } from '../types';

export const useFloatingMenu = (): FloatingMenuController => {
  const storeRef = useRef<{
    selectedId: string | null;
    subscribers: Set<() => void>;
  }>({
    selectedId: null,
    subscribers: new Set(),
  });

  const controllerRef = useRef<InternalFloatingMenuController | null>(null);

  if (!controllerRef.current) {
    const store = storeRef.current;

    const notifySubscribers = () => {
      store.subscribers.forEach((cb) => cb());
    };

    controllerRef.current = {
      getSelectedId: () => store.selectedId,
      clearSelection: () => {
        store.selectedId = null;
        notifySubscribers();
      },
      _subscribe: (callback: () => void) => {
        store.subscribers.add(callback);
        return () => {
          store.subscribers.delete(callback);
        };
      },
      _setSelectedId: (id: string | null) => {
        store.selectedId = id;
        notifySubscribers();
      },
      _getSelectedId: () => store.selectedId,
    };
  }

  return controllerRef.current as FloatingMenuController;
};
