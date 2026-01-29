export type ControlDataFilters = Record<string, unknown>;

export type SortDirection = 'asc' | 'desc';

export type ControlDataSort = {
  field: string;
  direction: SortDirection;
} | null;

export type ControlDataState = {
  page: number;
  filters: ControlDataFilters;
  sort: ControlDataSort;
};

export type FilterTransformer<T = unknown> = (rawData: T) => ControlDataFilters;

export type MapParamsAdapter<TOutput = unknown> = (state: ControlDataState) => TOutput;

export type FetchFunction<TParams = unknown, TResponse = unknown> = (params: TParams) => Promise<TResponse>;

export type ControlDataContextValue<TData = unknown> = {
  data: TData | null;
  loading: boolean;
  error: Error | null;
  state: ControlDataState;
  applyFilter: <T = unknown>(transformer: FilterTransformer<T>, rawData: T) => void;
  setPage: (page: number) => void;
  setSort: (sort: ControlDataSort) => void;
  resetFilters: () => void;
  reload: () => void;
};

export type ControlDataProviderProps<TParams = unknown, TResponse = unknown> = {
  children: React.ReactNode;
  fetchFn: FetchFunction<TParams, TResponse>;
  mapParams: MapParamsAdapter<TParams>;
  initialState?: Partial<ControlDataState>;
  debounceMs?: number;
};
