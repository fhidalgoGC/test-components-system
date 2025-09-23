import { createContext, useContext, useState, useEffect } from 'react';
import { ConfigProviderProps, ConfigContextType, LibraryConfig, ConfigPriority } from './config.types';
import { environment } from './enviroment';

// Default configuration from library with safe fallbacks
const defaultLibraryConfig: LibraryConfig = {
  // API Config
  API_LIMIT: environment.API_LIMIT || 100,

  // Base URLs
  CRM_BASE_URL: environment.CRM_BASE_URL,
  TRM_BASE_URL: environment.TRM_BASE_URL,
  IDENTITY_BASE_URL: environment.IDENTITY_BASE_URL,
  UNIT_CONVERSIONS_ENDPOINT: environment.UNIT_CONVERSIONS_ENDPOINT || "/unit-conversions/units",
  CRAFTMYPDF_BASE_URL: environment.CRAFTMYPDF_BASE_URL,
  SSM_BASE_URL: environment.SSM_BASE_URL,

  // Origins for CORS
  CONTRACTS_ORIGIN: environment.CONTRACTS_ORIGIN,

  // Auth0 Config
  AUTH0_URL: environment.AUTH0_URL,
  AUTH0_AUDIENCE: environment.AUTH0_AUDIENCE,
  AUTH0_GRANT_TYPE: environment.AUTH0_GRANT_TYPE,
  AUTH0_REALM: environment.AUTH0_REALM,
  AUTH0_CLIENT_ID: environment.AUTH0_CLIENT_ID,
  AUTH0_SCOPE: environment.AUTH0_SCOPE || "openid offline_access",

  // Currency
  DEFAULT_CURRENCY: environment.DEFAULT_CURRENCY || "usd",

  // CraftMyPDF Config
  TEMPLATE_ID: environment.TEMPLATE_ID,
  CRAFTMYPDF_API_KEY: environment.CRAFTMYPDF_API_KEY,

  // Number Formatting
  NUMBER_FORMAT_PATTERN: environment.NUMBER_FORMAT_PATTERN || "0,000.00",
  NUMBER_ROUND_MODE: environment.NUMBER_ROUND_MODE || "truncate",
  NUMBER_LOCATE: environment.NUMBER_LOCATE || "en-US",
  NUMBER_MIN_DECIMALS: environment.NUMBER_MIN_DECIMALS || 2,
  NUMBER_MAX_DECIMALS: environment.NUMBER_MAX_DECIMALS || 4,

  // Price Thresholds
  PRICE_THRESHOLD_MIN: environment.PRICE_THRESHOLD_MIN || 0,
  PRICE_THRESHOLD_MAX: environment.PRICE_THRESHOLD_MAX || 0,
  SHOW_THRESHOLDS: environment.SHOW_THRESHOLDS || false,

  // Session timeout
  MAX_SESSION_DURATION_MINUTES: environment.MAX_SESSION_DURATION_MINUTES || 1440,
  INACTIVITY_TIMEOUT_MINUTES: environment.INACTIVITY_TIMEOUT_MINUTES || 480,

  // Development environment
  IS_DEVELOPMENT: environment.IS_DEVELOPMENT || false,
};

// Create context
const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

// Merge configurations based on priority
function mergeConfigs(
  libraryConfig: LibraryConfig,
  parentConfig: Partial<LibraryConfig> = {},
  priority: ConfigPriority = 'auto'
): LibraryConfig {
  switch (priority) {
    case 'parent':
      // Parent always wins when defined
      return { ...libraryConfig, ...parentConfig };
    
    case 'library':
      // Library always wins, parent is ignored
      return libraryConfig;
    
    case 'auto':
    default:
      // Intelligent merging: parent wins only for defined non-empty values
      const merged = { ...libraryConfig };
      Object.entries(parentConfig).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
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
  priority = 'auto',
  enableOverrides = true
}: ConfigProviderProps) {
  const [config, setConfig] = useState<LibraryConfig>(() =>
    mergeConfigs(defaultLibraryConfig, parentConfig, priority)
  );

  // Update config when parent config or priority changes
  useEffect(() => {
    if (enableOverrides) {
      setConfig(mergeConfigs(defaultLibraryConfig, parentConfig, priority));
    }
  }, [parentConfig, priority, enableOverrides]);

  const updateConfig = (newConfig: Partial<LibraryConfig>) => {
    if (enableOverrides) {
      setConfig(prev => mergeConfigs(prev, newConfig, 'parent'));
    }
  };

  const resetConfig = () => {
    setConfig(mergeConfigs(defaultLibraryConfig, parentConfig, priority));
  };

  const contextValue: ConfigContextType = {
    config,
    updateConfig,
    resetConfig,
    priority
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
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return context;
}

// Hook to get specific config value with fallback
export function useConfigValue<K extends keyof LibraryConfig>(
  key: K,
  fallback?: LibraryConfig[K]
): LibraryConfig[K] {
  const { config } = useConfig();
  return config[key] ?? fallback ?? defaultLibraryConfig[key];
}