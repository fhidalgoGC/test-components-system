import { useRef } from 'react';
import type { ListController, InternalListController, RenderState } from './List.types';

export function useListController<T = any>(): ListController<T> {
  const storeRef = useRef<{
    data: T[];
    page: number;
    pageSize: number;
    renderState: RenderState;
    subscribers: Set<() => void>;
    registeredIds: Set<string>;
  }>({
    data: [],
    page: 1,
    pageSize: 10,
    renderState: 'renderIdle',
    subscribers: new Set(),
    registeredIds: new Set(),
  });

  const controllerRef = useRef<InternalListController<T> | null>(null);

  if (!controllerRef.current) {
    const store = storeRef.current;

    const notifySubscribers = () => {
      store.subscribers.forEach((callback) => callback());
    };

    controllerRef.current = {
      setData: (data: T[]) => {
        store.data = data;
        store.page = 1;
        notifySubscribers();
      },
      appendData: (data: T[]) => {
        store.data = [...store.data, ...data];
        store.page = store.page + 1;
        notifySubscribers();
      },
      setPage: (page: number) => {
        store.page = page;
        notifySubscribers();
      },
      setPageSize: (size: number) => {
        store.pageSize = size;
        notifySubscribers();
      },
      setRenderState: (state: RenderState) => {
        store.renderState = state;
        notifySubscribers();
      },
      getRenderState: (): RenderState => store.renderState,
      reload: () => {
        store.data = [];
        store.page = 1;
        store.renderState = 'renderIdle';
        notifySubscribers();
      },
      getPage: (): number => store.page,
      getPageSize: (): number => store.pageSize,
      getTotalItems: (): number => store.data.length,
      _getData: (): T[] => store.data,
      _subscribe: (callback: () => void): (() => void) => {
        store.subscribers.add(callback);
        return () => {
          store.subscribers.delete(callback);
        };
      },
      _register: (id: string) => {
        store.registeredIds.add(id);
      },
      _unregister: (id: string) => {
        store.registeredIds.delete(id);
      },
    };
  }

  return controllerRef.current as ListController<T>;
}
