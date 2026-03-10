import { useRef } from 'react';
import type { GridController, InternalGridController, GridState } from '../types';

export function useGridController(): GridController {
  const storeRef = useRef<{
    state: GridState;
    refreshTrigger: number;
    subscribers: Set<() => void>;
  }>({
    state: 'idle',
    refreshTrigger: 0,
    subscribers: new Set(),
  });

  const controllerRef = useRef<InternalGridController | null>(null);

  if (!controllerRef.current) {
    const store = storeRef.current;

    const notifySubscribers = () => {
      store.subscribers.forEach((callback) => callback());
    };

    controllerRef.current = {
      setState: (state: GridState) => {
        store.state = state;
        notifySubscribers();
      },
      getState: (): GridState => store.state,
      refreshLayout: () => {
        store.refreshTrigger++;
        notifySubscribers();
      },
      _subscribe: (callback: () => void): (() => void) => {
        store.subscribers.add(callback);
        return () => {
          store.subscribers.delete(callback);
        };
      },
      _getState: (): GridState => store.state,
      _getRefreshTrigger: (): number => store.refreshTrigger,
    };
  }

  return controllerRef.current as GridController;
}
