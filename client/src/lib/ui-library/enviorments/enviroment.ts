import type { LanguageConfig } from "./enviroment.types";

// Default hardcoded values for the library
// These can be overridden by the consuming application via ConfigProvider

// Available languages configuration
const AVAILABLE_LANGUAGES = ["es", "en"];

// Default language
const DEFAULT_LANGUAGE = "en";

// Language configurations
const LANGUAGE_CONFIG: Record<string, LanguageConfig> = {
  es: {
    locale: "es",
    dateFormat: "dd/MM/yyyy",
    twoDigits: true,
  },
  en: {
    locale: "en",
    dateFormat: "MM/dd/yyyy",
    twoDigits: true,
  },
  // You can add more languages here that are available in translation files
  // but only those defined in AVAILABLE_LANGUAGES will be active
};

// Number format configuration
const NUMBER_FORMAT_CONFIG = {
  NUMBER_FORMAT_PATTERN: "0,000.00" as const,
  NUMBER_ROUND_MODE: "truncate" as const,
  NUMBER_LOCATE: "en-US",
  NUMBER_MIN_DECIMALS: 2,
  NUMBER_MAX_DECIMALS: 4,
};

// Session configuration
export const SESSION_CONFIG = {
  SESSION_DURATION: 8 * (60 * 60 * 1000), // 8 hours in milliseconds
  VALIDATION_INTERVAL: 60 * 1000, // 1 minute in milliseconds
};

export const environment = {
  // Language Configuration
  AVAILABLE_LANGUAGES,
  DEFAULT_LANGUAGE,
  LANGUAGE_CONFIG,
  NUMBER_FORMAT_CONFIG,
  SESSION_CONFIG,
  // Development environment detection - defaults to false in production
  IS_DEVELOPMENT: false,
};

export const APP_CONFIG = environment;
