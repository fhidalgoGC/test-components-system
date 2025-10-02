import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { ConfigContextType, LibraryConfig, ConfigProviderProps, ConfigPriority } from './index.types';
import { defaultLibraryConfig, mergeConfigs } from './index.utils';

// Create context
export const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

// Hook to use configuration
export function useConfig(): ConfigContextType {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error("useConfig must be used within a ConfigProvider");
  }
  return context;
}

// Hook to get specific config value with fallback
export function useConfigValue<K extends keyof LibraryConfig>(
  key: K,
  fallback?: LibraryConfig[K],
): LibraryConfig[K] {
  const { config } = useConfig();
  return config[key] ?? fallback ?? defaultLibraryConfig[key];
}

// Hook para manejar el estado de configuración
export function useConfigState(
  parentConfig: Partial<LibraryConfig>,
  priority: ConfigPriority,
  enableOverrides: boolean
) {
  const [config, setConfig] = useState<LibraryConfig>(() =>
    mergeConfigs(defaultLibraryConfig, parentConfig, priority),
  );

  // Update config when parent config or priority changes
  useEffect(() => {
    if (enableOverrides) {
      setConfig(mergeConfigs(defaultLibraryConfig, parentConfig, priority));
    }
  }, [parentConfig, priority, enableOverrides]);

  return { config, setConfig };
}

// Hook para manejar las funciones de configuración
export function useConfigHandlers(
  setConfig: React.Dispatch<React.SetStateAction<LibraryConfig>>,
  parentConfig: Partial<LibraryConfig>,
  priority: ConfigPriority,
  enableOverrides: boolean
) {
  const updateConfig = useCallback((newConfig: Partial<LibraryConfig>) => {
    if (enableOverrides) {
      setConfig((prev: LibraryConfig) => mergeConfigs(prev, newConfig, "parent"));
    }
  }, [enableOverrides, setConfig]);

  const resetConfig = useCallback(() => {
    setConfig(mergeConfigs(defaultLibraryConfig, parentConfig, priority));
  }, [parentConfig, priority, setConfig]);

  return { updateConfig, resetConfig };
}
