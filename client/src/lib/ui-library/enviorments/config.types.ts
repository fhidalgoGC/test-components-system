// Language configuration type
export type LanguageConfig = {
  locale: string;
  dateFormat: string;
  twoDigits: boolean;
};

// Configuration types for hybrid environment management
export interface LibraryConfig {
  // Language Configuration
  AVAILABLE_LANGUAGES: string[];
  DEFAULT_LANGUAGE: string;
  LANGUAGE_CONFIG: Record<string, LanguageConfig>;
  
  // Development environment detection
  IS_DEVELOPMENT: boolean;
}

// Priority levels for configuration merging
export type ConfigPriority = "parent" | "library" | "auto";

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
