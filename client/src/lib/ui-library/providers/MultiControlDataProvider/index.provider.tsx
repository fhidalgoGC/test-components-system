import { useMemo, useRef, useEffect } from 'react';
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
  children,
}: {
  sourceKey: string;
  config: SourceConfig;
  registry: SourceRegistry;
  remainingSources: [string, SourceConfig][];
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
      >
        {children}
      </SourceLayer>
    );
  }

  return <>{children}</>;
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

  const contextValue = useMemo(() => ({
    getSource: <TData = unknown,>(sourceKey: string): ControlDataContextValue<TData> => {
      const source = registryRef.current.get(sourceKey);
      if (!source) {
        throw new Error(
          `Source "${sourceKey}" not found in MultiControlDataProvider. ` +
          `Available sources: [${sourceKeys.join(', ')}]`,
        );
      }
      return source as ControlDataContextValue<TData>;
    },
    getSources: () => [...sourceKeys],
  }), [sourceKeys]);

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
      >
        {children}
      </SourceLayer>
    </MultiControlDataContext.Provider>
  );
}
