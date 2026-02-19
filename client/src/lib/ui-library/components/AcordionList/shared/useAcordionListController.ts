import { useRef } from 'react';
import type { AcordionListController, InternalAcordionListController, AcordionListState } from './AcordionList.types';

export function useAcordionListController(): AcordionListController {
  const storeRef = useRef<{
    openIds: Set<string>;
    subscribers: Set<() => void>;
    refreshKey: number;
    itemRefreshKeys: Map<string, number>;
    state: AcordionListState;
  }>({
    openIds: new Set(),
    subscribers: new Set(),
    refreshKey: 0,
    itemRefreshKeys: new Map(),
    state: 'idle',
  });

  const controllerRef = useRef<InternalAcordionListController | null>(null);

  if (!controllerRef.current) {
    const store = storeRef.current;

    const notifySubscribers = () => {
      store.subscribers.forEach((cb) => cb());
    };

    controllerRef.current = {
      open: (id: string) => {
        store.openIds.add(id);
        notifySubscribers();
      },
      close: (id: string) => {
        store.openIds.delete(id);
        notifySubscribers();
      },
      toggle: (id: string) => {
        if (store.openIds.has(id)) {
          store.openIds.delete(id);
        } else {
          store.openIds.add(id);
        }
        notifySubscribers();
      },
      closeAll: () => {
        store.openIds.clear();
        notifySubscribers();
      },
      openAll: () => {
        if ((controllerRef.current as any)?._setAllItemIds) {
          const allIds: string[] = (controllerRef.current as any)._setAllItemIds();
          allIds.forEach((id: string) => store.openIds.add(id));
        }
        notifySubscribers();
      },
      getOpenIds: () => Array.from(store.openIds),
      isOpen: (id: string) => store.openIds.has(id),
      refreshAll: () => {
        store.refreshKey += 1;
        notifySubscribers();
      },
      refreshItem: (id: string) => {
        const current = store.itemRefreshKeys.get(id) || 0;
        store.itemRefreshKeys.set(id, current + 1);
        notifySubscribers();
      },
      setState: (state: AcordionListState) => {
        store.state = state;
        notifySubscribers();
      },
      getState: () => store.state,
      _subscribe: (callback: () => void) => {
        store.subscribers.add(callback);
        return () => {
          store.subscribers.delete(callback);
        };
      },
      _getRefreshKey: () => store.refreshKey,
      _getItemRefreshKey: (id: string) => store.itemRefreshKeys.get(id) || 0,
    };
  }

  return controllerRef.current as AcordionListController;
}
