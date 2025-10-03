import type { LanguageConfig } from "./enviroment.types";

// Available languages configuration - can be overridden via environment
const availableLanguagesEnv =
  import.meta.env.VITE_AVAILABLE_LANGUAGES || "es,en";
export const AVAILABLE_LANGUAGES = availableLanguagesEnv
  .split(",")
  .map((lang: string) => lang.trim());

// Default language - can be overridden via environment
export const DEFAULT_LANGUAGE = import.meta.env.VITE_DEFAULT_LANGUAGE || "en";

// Language configurations
export const LANGUAGE_CONFIG: Record<string, LanguageConfig> = {
  es: {
    locale: import.meta.env.VITE_LOCALE_ES || "es",
    dateFormat: import.meta.env.VITE_DATE_FORMAT_ES || "dd/MM/yyyy",
    twoDigits: import.meta.env.VITE_DATE_TWO_DIGITS_ES !== "false",
  },
  en: {
    locale: import.meta.env.VITE_LOCALE_EN || "en",
    dateFormat: import.meta.env.VITE_DATE_FORMAT_EN || "MM",
    twoDigits: import.meta.env.VITE_DATE_TWO_DIGITS_EN !== "false",
  },
  // Puedes agregar más idiomas aquí que estén disponibles en los archivos de traducción
  // pero solo los definidos en AVAILABLE_LANGUAGES estarán activos
};

export const SESSION_CONFIG = {
  SESSION_DURATION: Number(import.meta.env.VITE_SESSION_DURATION) || 8 * 60 * 60 * 1000, // 8 horas
  VALIDATION_INTERVAL:
    Number(import.meta.env.VITE_VALIDATION_INTERVAL) || 10000,
};

export const environment = {
  // Language Configuration
  AVAILABLE_LANGUAGES,
  DEFAULT_LANGUAGE,
  LANGUAGE_CONFIG,
  SESSION_CONFIG,

  // Development environment detection
  IS_DEVELOPMENT:
    import.meta.env.DEV ||
    import.meta.env.VITE_NODE_ENV === "development" ||
    import.meta.env.NODE_ENV === "development",
};

export const APP_CONFIG = environment;
