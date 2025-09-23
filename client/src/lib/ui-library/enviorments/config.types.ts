// Configuration types for hybrid environment management
export interface LibraryConfig {
  // API Config
  API_LIMIT: number;

  // Base URLs
  CRM_BASE_URL?: string;
  TRM_BASE_URL?: string;
  IDENTITY_BASE_URL?: string;
  UNIT_CONVERSIONS_ENDPOINT: string;
  CRAFTMYPDF_BASE_URL?: string;
  SSM_BASE_URL?: string;

  // Origins for CORS
  CONTRACTS_ORIGIN?: string;

  // Auth0 Config
  AUTH0_URL?: string;
  AUTH0_AUDIENCE?: string;
  AUTH0_GRANT_TYPE?: string;
  AUTH0_REALM?: string;
  AUTH0_CLIENT_ID?: string;
  AUTH0_SCOPE: string;

  // Currency
  DEFAULT_CURRENCY: string;

  // CraftMyPDF Config
  TEMPLATE_ID?: string;
  CRAFTMYPDF_API_KEY?: string;

  // Number Formatting
  NUMBER_FORMAT_PATTERN: string;
  NUMBER_ROUND_MODE: string;
  NUMBER_LOCATE: string;
  NUMBER_MIN_DECIMALS: number;
  NUMBER_MAX_DECIMALS: number;

  // Price Thresholds
  PRICE_THRESHOLD_MIN: number;
  PRICE_THRESHOLD_MAX: number;
  SHOW_THRESHOLDS: boolean;

  // Session timeout configuration (in minutes)
  MAX_SESSION_DURATION_MINUTES: number;
  INACTIVITY_TIMEOUT_MINUTES: number;

  // Development environment detection
  IS_DEVELOPMENT: boolean;
}

// Priority levels for configuration merging
export type ConfigPriority = 'parent' | 'library' | 'auto';

// Configuration provider props
export interface ConfigProviderProps {
  children: React.ReactNode;
  parentConfig?: Partial<LibraryConfig>;
  priority?: ConfigPriority;
  enableOverrides?: boolean;
}

// Configuration context type
export interface ConfigContextType {
  config: LibraryConfig;
  updateConfig: (newConfig: Partial<LibraryConfig>) => void;
  resetConfig: () => void;
  priority: ConfigPriority;
}