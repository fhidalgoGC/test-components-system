import { LibraryConfig } from './config.types';
import { environment } from './enviroment';

// Single point of access for configuration
// This file provides the configuration without requiring React context
// Useful for utility functions and non-component code

let globalConfig: LibraryConfig = {
  // Language Configuration
  AVAILABLE_LANGUAGES: environment.AVAILABLE_LANGUAGES,
  DEFAULT_LANGUAGE: environment.DEFAULT_LANGUAGE,
  LANGUAGE_CONFIG: environment.LANGUAGE_CONFIG,
  
  // Development environment
  IS_DEVELOPMENT: environment.IS_DEVELOPMENT || false,
};

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
  globalConfig = {
    // Language Configuration
    AVAILABLE_LANGUAGES: environment.AVAILABLE_LANGUAGES,
    DEFAULT_LANGUAGE: environment.DEFAULT_LANGUAGE,
    LANGUAGE_CONFIG: environment.LANGUAGE_CONFIG,
    
    // Development environment
    IS_DEVELOPMENT: environment.IS_DEVELOPMENT || false,
  };
}

// Legacy export for backward compatibility
export const config = globalConfig;
export { globalConfig as APP_CONFIG };