import type {
  ControlDataState,
  StateKey,
  StateTransformer,
  MapParamsAdapter,
  FetchFunction,
  ControlDataContextValue,
} from '../ControlDataProvider/index.types';

export type SourceConfig<TParams = unknown, TResponse = unknown> = {
  fetchFn: FetchFunction<TParams, TResponse>;
  mapParams: MapParamsAdapter<TParams>;
  defaultState?: Partial<ControlDataState>;
  debounceMs?: number;
};

export type SourcesMap = {
  [sourceKey: string]: SourceConfig<any, any>;
};

export const MAIN_SOURCE_KEY = 'main';

export type MultiControlDataContextValue = {
  getSource: <TData = unknown>(sourceKey: string) => ControlDataContextValue<TData>;
  getSources: () => string[];
  setActiveSource: (sourceKey: string | null) => void;
  getActiveSource: () => string | null;
};

export type MultiControlDataProviderProps = {
  children: React.ReactNode;
  sources: SourcesMap;
};

export type {
  ControlDataState,
  StateKey,
  StateTransformer,
  ControlDataContextValue,
};
