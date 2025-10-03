import { useContext } from "react";
import { useAppLanguage } from "../../AppLanguageProvider/index.hook";
import { useLibI18n } from "../../AppLanguageLibUiProvider/index.hook";
import { ConfigContext } from "../../AppEnviromentProvider/index.hook";
import type { ResolvedLanguageProvider } from "./index.types";

export function useLanguageProviderResolver(): ResolvedLanguageProvider {
  // Obtener config merged del ConfigProvider
  const configContext = useContext(ConfigContext);
  const mergedConfig = configContext?.config;

  // Prioridad 1: Intentar LibI18nProvider (provider hijo/librería)
  let libI18n;
  try {
    libI18n = useLibI18n();
  } catch {
    libI18n = null;
  }

  // Prioridad 2: Intentar AppLanguageProvider (provider padre)
  const appLang = useAppLanguage();

  // Determinar qué provider usar y extraer configuración

  // LibI18nProvider está disponible - usar su idioma
  if (libI18n) {
    const lang = libI18n.lang;
    const languageConfig = mergedConfig?.LANGUAGE_CONFIG?.[lang];

    if (languageConfig) {
      return {
        lang,
        config: languageConfig,
      };
    }
  }

  // AppLanguageProvider está disponible - usar su idioma
  if (appLang) {
    const lang = appLang.lang;
    const languageConfig = mergedConfig?.LANGUAGE_CONFIG?.[lang];

    if (languageConfig) {
      return {
        lang,
        config: languageConfig,
      };
    }
  }

  // Fallback: usar valores por defecto del ConfigProvider merged
  const defaultLang = mergedConfig?.DEFAULT_LANGUAGE || "en";
  const defaultConfig = mergedConfig?.LANGUAGE_CONFIG?.[defaultLang];

  if (defaultConfig) {
    return {
      lang: defaultLang,
      config: defaultConfig,
    };
  }

  // Fallback final si nada existe (no debería pasar en condiciones normales)
  return {
    lang: "en",
    config: {},
  };
}
