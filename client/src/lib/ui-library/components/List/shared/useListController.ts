import { useRef, useCallback, useMemo } from 'react';
import type { ListController, InternalListController, RenderState } from './List.types';

export function useListController<T = any>(): ListController<T> {
  const dataRef = useRef<T[]>([]);
  const pageRef = useRef<number>(1);
  const pageSizeRef = useRef<number>(10);
  const renderStateRef = useRef<RenderState>('renderIdle');
  const subscribersRef = useRef<Set<() => void>>(new Set());
  const registeredIdsRef = useRef<Set<string>>(new Set());

  const notifySubscribers = useCallback(() => {
    subscribersRef.current.forEach((callback) => callback());
  }, []);

  const setData = useCallback((data: T[]) => {
    dataRef.current = data;
    pageRef.current = 1;
    notifySubscribers();
  }, [notifySubscribers]);

  const appendData = useCallback((data: T[]) => {
    dataRef.current = [...dataRef.current, ...data];
    pageRef.current = pageRef.current + 1;
    notifySubscribers();
  }, [notifySubscribers]);

  const setPage = useCallback((page: number) => {
    pageRef.current = page;
    notifySubscribers();
  }, [notifySubscribers]);

  const setPageSize = useCallback((size: number) => {
    pageSizeRef.current = size;
    notifySubscribers();
  }, [notifySubscribers]);

  const setRenderState = useCallback((state: RenderState) => {
    renderStateRef.current = state;
    notifySubscribers();
  }, [notifySubscribers]);

  const getRenderState = useCallback((): RenderState => {
    return renderStateRef.current;
  }, []);

  const reload = useCallback(() => {
    dataRef.current = [];
    pageRef.current = 1;
    renderStateRef.current = 'renderIdle';
    notifySubscribers();
  }, [notifySubscribers]);

  const getPage = useCallback((): number => {
    return pageRef.current;
  }, []);

  const getPageSize = useCallback((): number => {
    return pageSizeRef.current;
  }, []);

  const getTotalItems = useCallback((): number => {
    return dataRef.current.length;
  }, []);

  const _getData = useCallback((): T[] => {
    return dataRef.current;
  }, []);

  const _subscribe = useCallback((callback: () => void): (() => void) => {
    subscribersRef.current.add(callback);
    return () => {
      subscribersRef.current.delete(callback);
    };
  }, []);

  const _register = useCallback((id: string) => {
    registeredIdsRef.current.add(id);
  }, []);

  const _unregister = useCallback((id: string) => {
    registeredIdsRef.current.delete(id);
  }, []);

  const controller = useMemo((): InternalListController<T> => ({
    setData,
    appendData,
    setPage,
    setPageSize,
    setRenderState,
    getRenderState,
    reload,
    getPage,
    getPageSize,
    getTotalItems,
    _getData,
    _subscribe,
    _register,
    _unregister,
  }), [
    setData,
    appendData,
    setPage,
    setPageSize,
    setRenderState,
    getRenderState,
    reload,
    getPage,
    getPageSize,
    getTotalItems,
    _getData,
    _subscribe,
    _register,
    _unregister,
  ]);

  return controller as ListController<T>;
}
