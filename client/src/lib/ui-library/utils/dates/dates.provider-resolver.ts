import { useContext } from 'react';
import { useAppLanguage } from '../../providers/AppLanguageProvider/index.hook';
import { useLibI18n } from '../../providers/AppLanguageLibUiProvider/index.hook';
import { ConfigContext } from '../../providers/AppEnviromentProvider/index.hook';

/**
 * Configuración de fecha resuelta desde un provider
 */
export interface ResolvedDateConfig {
  dateFormat: string;
  twoDigits: boolean;
  lang: string;
}

/**
 * Hook que resuelve qué provider de idioma usar y extrae la configuración de fecha.
 * 
 * Prioridad:
 * 1. LibI18nProvider (provider de la librería) - si existe
 * 2. AppLanguageProvider (provider padre) - si existe
 * 3. ConfigProvider merged - como fallback
 * 
 * La configuración SIEMPRE viene del ConfigProvider merged.
 */
export function useLanguageProviderResolver(): ResolvedDateConfig {
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

  // Determinar qué provider usar
  if (libI18n) {
    // LibI18nProvider está disponible - usar su idioma
    const lang = libI18n.lang;
    const languageConfig = mergedConfig?.LANGUAGE_CONFIG?.[lang];
    
    if (languageConfig) {
      return {
        dateFormat: languageConfig.dateFormat,
        twoDigits: languageConfig.twoDigits,
        lang,
      };
    }
  }

  if (appLang) {
    // AppLanguageProvider está disponible - ya tiene los valores procesados
    return {
      dateFormat: appLang.dateFormat,
      twoDigits: appLang.twoDigits,
      lang: appLang.lang,
    };
  }

  // Fallback: usar valores por defecto del ConfigProvider merged
  const defaultLang = mergedConfig?.DEFAULT_LANGUAGE || 'en';
  const defaultConfig = mergedConfig?.LANGUAGE_CONFIG?.[defaultLang];

  if (defaultConfig) {
    return {
      dateFormat: defaultConfig.dateFormat,
      twoDigits: defaultConfig.twoDigits,
      lang: defaultLang,
    };
  }

  // Fallback final si nada existe (no debería pasar)
  return {
    dateFormat: 'MM/dd/yyyy',
    twoDigits: true,
    lang: 'en',
  };
}
