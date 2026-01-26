import { useState, useCallback, useMemo } from 'react';
import type { TableState, TableStateContext } from '../types';

export interface UseTableStateOptions {
  initialState?: TableState;
  initialData?: any[];
}

export function useTableState(options: UseTableStateOptions = {}): TableStateContext {
  const { initialState = 'idle', initialData = [] } = options;

  const [state, setStateInternal] = useState<TableState>(initialState);
  const [data, setDataInternal] = useState<any[]>(initialData);
  const [error, setErrorInternal] = useState<string | undefined>(undefined);

  const setState = useCallback((newState: TableState) => {
    setStateInternal(newState);
  }, []);

  const setData = useCallback((newData: any[]) => {
    setDataInternal(newData);
  }, []);

  const setError = useCallback((newError: string) => {
    setErrorInternal(newError);
  }, []);

  const setLoading = useCallback(() => {
    setStateInternal('loading');
    setErrorInternal(undefined);
  }, []);

  const setSuccess = useCallback((newData: any[]) => {
    setDataInternal(newData);
    setStateInternal(newData.length > 0 ? 'success' : 'empty');
    setErrorInternal(undefined);
  }, []);

  const setErrorState = useCallback((errorMessage: string) => {
    setStateInternal('error');
    setErrorInternal(errorMessage);
  }, []);

  const setEmpty = useCallback(() => {
    setStateInternal('empty');
    setDataInternal([]);
    setErrorInternal(undefined);
  }, []);

  const reset = useCallback(() => {
    setStateInternal('idle');
    setDataInternal([]);
    setErrorInternal(undefined);
  }, []);

  return useMemo(() => ({
    state,
    data,
    error,
    setState,
    setData,
    setError,
    setLoading,
    setSuccess,
    setErrorState,
    setEmpty,
    reset,
  }), [state, data, error, setState, setData, setError, setLoading, setSuccess, setErrorState, setEmpty, reset]);
}
