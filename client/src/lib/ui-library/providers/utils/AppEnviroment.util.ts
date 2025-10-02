import { LibraryConfig } from '../types/AppEnviroment.types';
import { environment } from '../../enviorments/enviroment';

// Single point of access for configuration
// This file provides the configuration without requiring React context
// Useful for utility functions and non-component code

// Global configuration - automatically includes all environment properties
let globalConfig: LibraryConfig = environment;

// Get current configuration
export function getConfig(): LibraryConfig {
  return { ...globalConfig };
}

// Get specific config value
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