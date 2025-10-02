import { createContext, useContext, useState, useEffect } from "react";
import {
  ConfigProviderProps,
  ConfigContextType,
  LibraryConfig,
  ConfigPriority,
} from "../enviorments/config.types";
import { environment } from "../enviorments/enviroment";

// Default configuration from library - automatically includes all environment properties
const defaultLibraryConfig: LibraryConfig = environment;

// Create context
const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

// Merge configurations based on priority
function mergeConfigs(
  libraryConfig: LibraryConfig,
  parentConfig: Partial<LibraryConfig> = {},
  priority: ConfigPriority = "auto",
): LibraryConfig {
  switch (priority) {
    case "parent":
      // Parent always wins when defined
      return { ...libraryConfig, ...parentConfig };

    case "library":
      // Library always wins, parent is ignored
      return libraryConfig;

    case "auto":
    default:
      // Intelligent merging: parent wins only for defined non-empty values
      const merged = { ...libraryConfig };
      Object.entries(parentConfig).forEach(([key, value]) => {
        // Check if value is defined and not null
        if (value !== undefined && value !== null) {
          // For string values, also check if not empty
          if (typeof value === 'string' && value === "") {
            return; // Skip empty strings
          }
          (merged as any)[key] = value;
        }
      });
      return merged;
  }
}

// Provider component
export function ConfigProvider({
  children,
  parentConfig = {},
  priority = "auto",
  enableOverrides = true,
}: ConfigProviderProps) {
  const [config, setConfig] = useState<LibraryConfig>(() =>
    mergeConfigs(defaultLibraryConfig, parentConfig, priority),
  );

  // Update config when parent config or priority changes
  useEffect(() => {
    if (enableOverrides) {
      setConfig(mergeConfigs(defaultLibraryConfig, parentConfig, priority));
    }
  }, [parentConfig, priority, enableOverrides]);

  const updateConfig = (newConfig: Partial<LibraryConfig>) => {
    if (enableOverrides) {
      setConfig((prev) => mergeConfigs(prev, newConfig, "parent"));
    }
  };

  const resetConfig = () => {
    setConfig(mergeConfigs(defaultLibraryConfig, parentConfig, priority));
  };

  const contextValue: ConfigContextType = {
    config,
    updateConfig,
    resetConfig,
    priority,
  };

  return (
    <ConfigContext.Provider value={contextValue}>
      {children}
    </ConfigContext.Provider>
  );
}

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
