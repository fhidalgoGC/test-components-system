// Configuration types for hybrid environment management
export interface LibraryConfig {
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
