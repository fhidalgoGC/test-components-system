export type TableState = 'idle' | 'loading' | 'success' | 'error' | 'empty' | 'loadingMore';

export interface TableStateContext {
  state: TableState;
  data: any[];
  error?: string;
  setState: (state: TableState) => void;
  setData: (data: any[]) => void;
  setError: (error: string) => void;
  setLoading: () => void;
  setSuccess: (data: any[]) => void;
  setErrorState: (error: string) => void;
  setEmpty: () => void;
  reset: () => void;
}
