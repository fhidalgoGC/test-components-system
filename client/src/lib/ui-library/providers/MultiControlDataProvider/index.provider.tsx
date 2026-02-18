import { useMemo, useRef, useEffect } from 'react';
import { useControlData } from '../ControlDataProvider/index.hook';
import type { ControlDataContextValue } from '../ControlDataProvider/index.types';
import { MultiControlDataContext } from './index.hook';
import type { MultiControlDataProviderProps, SourceConfig, MultiControlDataContextValue } from './index.types';

type SourceRegistry = Map<string, ControlDataContextValue<unknown>>;

const EMPTY_CONTEXT_VALUE: MultiControlDataContextValue = {
  getSource: <TData = unknown,>(_key: string): ControlDataContextValue<TData> => {
    throw new Error('No sources configured in MultiControlDataProvider');
  },
  getSources: () => [],
};

function SourceLayer({
  sourceKey,
  config,
  registry,
  remainingSources,
  sourceKeys,
  children,
}: {
  sourceKey: string;
  config: SourceConfig;
  registry: SourceRegistry;
  remainingSources: [string, SourceConfig][];
  sourceKeys: string[];
  children: React.ReactNode;
}) {
  const controlData = useControlData(
    config.fetchFn,
    config.mapParams,
    config.defaultState,
    config.debounceMs ?? 400,
  );

  registry.set(sourceKey, controlData as ControlDataContextValue<unknown>);

  if (remainingSources.length > 0) {
    const [nextKey, nextConfig] = remainingSources[0];
    const nextRemaining = remainingSources.slice(1);

    return (
      <SourceLayer
        sourceKey={nextKey}
        config={nextConfig}
        registry={registry}
        remainingSources={nextRemaining}
        sourceKeys={sourceKeys}
      >
        {children}
      </SourceLayer>
    );
  }

  const contextValue: MultiControlDataContextValue = {
    getSource: <TData = unknown,>(key: string): ControlDataContextValue<TData> => {
      const source = registry.get(key);
      if (!source) {
        throw new Error(
          `Source "${key}" not found in MultiControlDataProvider. ` +
          `Available sources: [${sourceKeys.join(', ')}]`,
        );
      }
      return source as ControlDataContextValue<TData>;
    },
    getSources: () => [...sourceKeys],
  };

  return (
    <MultiControlDataContext.Provider value={contextValue}>
      {children}
    </MultiControlDataContext.Provider>
  );
}

export function MultiControlDataProvider({ children, sources }: MultiControlDataProviderProps) {
  const sourceKeys = useMemo(() => {
    return Object.keys(sources).sort();
  }, [sources]);

  const initialKeysRef = useRef<string[]>(sourceKeys);

  useEffect(() => {
    const initial = initialKeysRef.current;
    const current = sourceKeys;
    if (initial.length !== current.length || !initial.every((k, i) => k === current[i])) {
      throw new Error(
        `MultiControlDataProvider: source keys must not change after mount. ` +
        `Initial: [${initial.join(', ')}], Current: [${current.join(', ')}]. ` +
        `If you need different sources, unmount and remount the provider with a new key.`,
      );
    }
  }, [sourceKeys]);

  const sourceEntries = useMemo(() => {
    return sourceKeys.map((key) => [key, sources[key]] as [string, SourceConfig]);
  }, [sourceKeys, sources]);

  const registryRef = useRef<SourceRegistry>(new Map());

  if (sourceEntries.length === 0) {
    return (
      <MultiControlDataContext.Provider value={EMPTY_CONTEXT_VALUE}>
        {children}
      </MultiControlDataContext.Provider>
    );
  }

  const [firstKey, firstConfig] = sourceEntries[0];
  const remaining = sourceEntries.slice(1);

  return (
    <SourceLayer
      sourceKey={firstKey}
      config={firstConfig}
      registry={registryRef.current}
      remainingSources={remaining}
      sourceKeys={sourceKeys}
    >
      {children}
    </SourceLayer>
  );
}
