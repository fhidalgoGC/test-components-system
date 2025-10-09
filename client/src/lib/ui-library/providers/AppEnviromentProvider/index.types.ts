import { environment } from '../../enviorments/enviroment';

// Language configuration type
export type LanguageConfig = {
  locale: string;
  dateFormat: string;
  twoDigits: boolean;
};

// Configuration types for hybrid environment management
// Automatically inferred from environment - no manual typing needed!
export type LibraryConfig = typeof environment;

// Priority levels for configuration merging
export type ConfigPriority = "parent" | "library" | "auto";

// Configuration provider props
// parentConfig can have additional keys beyond LibraryConfig
// Only keys that exist in LibraryConfig will be merged
export interface ConfigProviderProps {
  children: React.ReactNode;
  parentConfig?: Record<string, any>; // Accepts any keys, merge will filter
  priority?: ConfigPriority;
  enableOverrides?: boolean;
}

// Configuration context type
export interface ConfigContextType {
  config: LibraryConfig;
  environment: LibraryConfig; // Exposes the full merged config as 'environment'
  updateConfig: (newConfig: Record<string, any>) => void; // Accepts any keys, merge will filter
  resetConfig: () => void;
  priority: ConfigPriority;
}
