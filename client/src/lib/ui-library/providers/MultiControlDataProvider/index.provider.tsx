import { useMemo, useRef } from 'react';
import { useControlData } from '../ControlDataProvider/index.hook';
import type { ControlDataContextValue } from '../ControlDataProvider/index.types';
import { MultiControlDataContext } from './index.hook';
import type { MultiControlDataProviderProps, SourceConfig } from './index.types';

type SourceRegistry = Map<string, ControlDataContextValue<unknown>>;

function SourceLayer({
  sourceKey,
  config,
  registry,
  remainingSources,
  allSources,
  children,
}: {
  sourceKey: string;
  config: SourceConfig;
  registry: SourceRegistry;
  remainingSources: [string, SourceConfig][];
  allSources: MultiControlDataProviderProps['sources'];
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
        allSources={allSources}
      >
        {children}
      </SourceLayer>
    );
  }

  return <>{children}</>;
}

export function MultiControlDataProvider({ children, sources }: MultiControlDataProviderProps) {
  const sourceEntries = useMemo(() => {
    return Object.entries(sources).sort(([a], [b]) => a.localeCompare(b));
  }, [sources]);

  const registryRef = useRef<SourceRegistry>(new Map());

  const contextValue = useMemo(() => ({
    getSource: <TData = unknown,>(sourceKey: string): ControlDataContextValue<TData> => {
      const source = registryRef.current.get(sourceKey);
      if (!source) {
        throw new Error(
          `Source "${sourceKey}" not found in MultiControlDataProvider. Available sources: [${Array.from(registryRef.current.keys()).join(', ')}]`,
        );
      }
      return source as ControlDataContextValue<TData>;
    },
    getSources: () => Array.from(registryRef.current.keys()),
  }), []);

  if (sourceEntries.length === 0) {
    return (
      <MultiControlDataContext.Provider value={contextValue}>
        {children}
      </MultiControlDataContext.Provider>
    );
  }

  const [firstKey, firstConfig] = sourceEntries[0];
  const remaining = sourceEntries.slice(1);

  return (
    <MultiControlDataContext.Provider value={contextValue}>
      <SourceLayer
        sourceKey={firstKey}
        config={firstConfig}
        registry={registryRef.current}
        remainingSources={remaining}
        allSources={sources}
      >
        {children}
      </SourceLayer>
    </MultiControlDataContext.Provider>
  );
}
