import { environment } from './enviroment';

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
