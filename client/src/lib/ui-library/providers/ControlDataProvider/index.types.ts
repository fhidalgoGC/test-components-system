export type SortDirection = 'asc' | 'desc';

export type ControlDataSort = {
  field: string;
  direction: SortDirection;
} | null;

export type ControlDataState = {
  page: number;
  sort: ControlDataSort;
  [key: string]: unknown;
};

export type StateKey = keyof ControlDataState | string;

export type StateTransformer<T = unknown, R = unknown> = (rawData: T) => R;

export type MapParamsAdapter<TOutput = unknown> = (state: ControlDataState) => TOutput;

export type FetchFunction<TParams = unknown, TResponse = unknown> = (params: TParams) => Promise<TResponse>;

export type ControlDataContextValue<TData = unknown> = {
  data: TData | null;
  loading: boolean;
  error: Error | null;
  state: ControlDataState;
  applyToState: <T = unknown, R = unknown>(key: StateKey, transformer: StateTransformer<T, R>, rawData: T) => void;
  setPage: (page: number) => void;
  setSort: (sort: ControlDataSort) => void;
  resetState: () => void;
  reload: () => void;
};

export type ControlDataProviderProps<TParams = unknown, TResponse = unknown> = {
  children: React.ReactNode;
  fetchFn: FetchFunction<TParams, TResponse>;
  mapParams: MapParamsAdapter<TParams>;
  initialState?: Partial<ControlDataState>;
  debounceMs?: number;
};
