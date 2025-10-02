import { LibraryConfig, ConfigPriority } from './index.types';
import { environment } from '../../enviorments/enviroment';

// Default configuration from library - automatically includes all environment properties
export const defaultLibraryConfig: LibraryConfig = environment;

// Global configuration - automatically includes all environment properties
let globalConfig: LibraryConfig = environment;

// Merge configurations based on priority
export function mergeConfigs(
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
export function updateGlobalConfig(newConfig: Partial<LibraryConfig>): void {
  globalConfig = { ...globalConfig, ...newConfig };
}

// Reset to default configuration
export function resetGlobalConfig(): void {
  globalConfig = environment;
}

// Legacy export for backward compatibility
export const config = globalConfig;
export { globalConfig as APP_CONFIG };
