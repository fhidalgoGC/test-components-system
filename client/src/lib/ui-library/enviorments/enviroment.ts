import type { LanguageConfig } from "./enviroment.types";

// Available languages configuration - can be overridden via environment
const availableLanguagesEnv =
  import.meta.env.VITE_AVAILABLE_LANGUAGES || "es,en";
const AVAILABLE_LANGUAGES = availableLanguagesEnv
  .split(",")
  .map((lang: string) => lang.trim());

// Default language - can be overridden via environment
const DEFAULT_LANGUAGE = import.meta.env.VITE_DEFAULT_LANGUAGE || "en";

// Language configurations
const LANGUAGE_CONFIG: Record<string, LanguageConfig> = {
  es: {
    locale: import.meta.env.VITE_LOCALE_ES || "es",
    dateFormat: import.meta.env.VITE_DATE_FORMAT_ES || "dd/MM/yyyy",
    twoDigits: import.meta.env.VITE_DATE_TWO_DIGITS_ES !== "false",
  },
  en: {
    locale: import.meta.env.VITE_LOCALE_EN || "en",
    dateFormat: import.meta.env.VITE_DATE_FORMAT_EN || "MM/dd/yyyy",
    twoDigits: import.meta.env.VITE_DATE_TWO_DIGITS_EN !== "false",
  },
  // Puedes agregar más idiomas aquí que estén disponibles en los archivos de traducción
  // pero solo los definidos en AVAILABLE_LANGUAGES estarán activos
};

// Number format configuration
const NUMBER_FORMAT_CONFIG = {
  NUMBER_FORMAT_PATTERN:
    import.meta.env.VITE_NUMBER_FORMAT_PATTERN || ("0,000.00" as const),
  NUMBER_ROUND_MODE:
    import.meta.env.VITE_NUMBER_ROUND_MODE || ("truncate" as const),

  NUMBER_LOCATE: import.meta.env.VITE_NUMBER_LOCATE || "en-US",

  NUMBER_MIN_DECIMALS: Number(import.meta.env.VITE_NUMBER_MIN_DECIMALS) || 2,

  NUMBER_MAX_DECIMALS: Number(import.meta.env.VITE_NUMBER_MAX_DECIMALS) || 4,
};

// Session configuration
export const SESSION_CONFIG = {
  SESSION_DURATION:
    Number(import.meta.env.VITE_SESSION_DURATION) || 8 * (60 * 60 * 1000),
  VALIDATION_INTERVAL:
    Number(import.meta.env.VITE_VALIDATION_INTERVAL) || 60 * 1000,
};

// Import component-specific configurations
import { BottomNavigationBar_environment } from '../components/BottomNavigationBar/mobile/environment';

export const environment = {
  // Language Configuration
  AVAILABLE_LANGUAGES,
  DEFAULT_LANGUAGE,
  LANGUAGE_CONFIG,
  NUMBER_FORMAT_CONFIG,
  SESSION_CONFIG,
  BottomNavigationBar_environment,
  // Development environment detection
  IS_DEVELOPMENT:
    import.meta.env.DEV ||
    import.meta.env.VITE_NODE_ENV === "development" ||
    import.meta.env.NODE_ENV === "development",
};

export const APP_CONFIG = environment;
