import { LibraryConfig } from './config.types';
import { environment } from './enviroment';

// Single point of access for configuration
// This file provides the configuration without requiring React context
// Useful for utility functions and non-component code

let globalConfig: LibraryConfig = {
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
    // Reset to environment defaults with fallbacks
    API_LIMIT: environment.API_LIMIT || 100,
    CRM_BASE_URL: environment.CRM_BASE_URL,
    TRM_BASE_URL: environment.TRM_BASE_URL,
    IDENTITY_BASE_URL: environment.IDENTITY_BASE_URL,
    UNIT_CONVERSIONS_ENDPOINT: environment.UNIT_CONVERSIONS_ENDPOINT || "/unit-conversions/units",
    CRAFTMYPDF_BASE_URL: environment.CRAFTMYPDF_BASE_URL,
    SSM_BASE_URL: environment.SSM_BASE_URL,
    CONTRACTS_ORIGIN: environment.CONTRACTS_ORIGIN,
    AUTH0_URL: environment.AUTH0_URL,
    AUTH0_AUDIENCE: environment.AUTH0_AUDIENCE,
    AUTH0_GRANT_TYPE: environment.AUTH0_GRANT_TYPE,
    AUTH0_REALM: environment.AUTH0_REALM,
    AUTH0_CLIENT_ID: environment.AUTH0_CLIENT_ID,
    AUTH0_SCOPE: environment.AUTH0_SCOPE || "openid offline_access",
    DEFAULT_CURRENCY: environment.DEFAULT_CURRENCY || "usd",
    TEMPLATE_ID: environment.TEMPLATE_ID,
    CRAFTMYPDF_API_KEY: environment.CRAFTMYPDF_API_KEY,
    NUMBER_FORMAT_PATTERN: environment.NUMBER_FORMAT_PATTERN || "0,000.00",
    NUMBER_ROUND_MODE: environment.NUMBER_ROUND_MODE || "truncate",
    NUMBER_LOCATE: environment.NUMBER_LOCATE || "en-US",
    NUMBER_MIN_DECIMALS: environment.NUMBER_MIN_DECIMALS || 2,
    NUMBER_MAX_DECIMALS: environment.NUMBER_MAX_DECIMALS || 4,
    PRICE_THRESHOLD_MIN: environment.PRICE_THRESHOLD_MIN || 0,
    PRICE_THRESHOLD_MAX: environment.PRICE_THRESHOLD_MAX || 0,
    SHOW_THRESHOLDS: environment.SHOW_THRESHOLDS || false,
    MAX_SESSION_DURATION_MINUTES: environment.MAX_SESSION_DURATION_MINUTES || 1440,
    INACTIVITY_TIMEOUT_MINUTES: environment.INACTIVITY_TIMEOUT_MINUTES || 480,
    IS_DEVELOPMENT: environment.IS_DEVELOPMENT || false,
  };
}

// Legacy export for backward compatibility
export const config = globalConfig;
export { globalConfig as APP_CONFIG };