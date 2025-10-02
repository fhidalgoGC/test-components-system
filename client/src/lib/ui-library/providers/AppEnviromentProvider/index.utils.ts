import { LibraryConfig, ConfigPriority } from './index.types';
import { environment } from '../../enviorments/enviroment';

// Default configuration from library - automatically includes all environment properties
export const defaultLibraryConfig: LibraryConfig = environment;

// Global configuration - automatically includes all environment properties
let globalConfig: LibraryConfig = environment;

// Merge configurations based on priority
// parentConfig can have additional keys beyond LibraryConfig
// Only keys that exist in libraryConfig will be overridden
export function mergeConfigs(
  libraryConfig: LibraryConfig,
  parentConfig: Record<string, any> = {},
  priority: ConfigPriority = "auto",
): LibraryConfig {
  switch (priority) {
    case "parent":
      // Parent always wins when defined (only for keys that exist in library)
      const parentMerged = { ...libraryConfig };
      Object.keys(libraryConfig).forEach((key) => {
        if (key in parentConfig && parentConfig[key] !== undefined) {
          (parentMerged as any)[key] = parentConfig[key];
        }
      });
      return parentMerged;

    case "library":
      // Library always wins, parent is ignored
      return libraryConfig;

    case "auto":
    default:
      // Intelligent merging: parent wins only for defined non-empty values
      // and only for keys that exist in libraryConfig
      const merged = { ...libraryConfig };
      Object.keys(libraryConfig).forEach((key) => {
        if (key in parentConfig) {
          const value = parentConfig[key];
          // Check if value is defined and not null
          if (value !== undefined && value !== null) {
            // For string values, also check if not empty
            if (typeof value === 'string' && value === "") {
              return; // Skip empty strings
            }
            (merged as any)[key] = value;
          }
        }
      });
      return merged;
  }
}

// Get current configuration (non-React access)
export function getConfig(): LibraryConfig {
  return { ...globalConfig };
}

// Get specific config value (non-React access)
export function getConfigValue<K extends keyof LibraryConfig>(
  key: K
): LibraryConfig[K] {
  return globalConfig[key];
}

// Update global configuration (used internally by ConfigProvider)
// Only keys that exist in LibraryConfig will be updated
export function updateGlobalConfig(newConfig: Record<string, any>): void {
  const filtered: Partial<LibraryConfig> = {};
  Object.keys(globalConfig).forEach((key) => {
    if (key in newConfig && newConfig[key] !== undefined) {
      (filtered as any)[key] = newConfig[key];
    }
  });
  globalConfig = { ...globalConfig, ...filtered };
}

// Reset to default configuration
export function resetGlobalConfig(): void {
  globalConfig = environment;
}

// Legacy export for backward compatibility
export const config = globalConfig;
export { globalConfig as APP_CONFIG };
