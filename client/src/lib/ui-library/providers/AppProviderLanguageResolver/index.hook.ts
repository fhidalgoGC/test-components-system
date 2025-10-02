import { useContext } from 'react';
import { useAppLanguage } from '../AppLanguageProvider/index.hook';
import { useLibI18n } from '../AppLanguageLibUiProvider/index.hook';
import { ConfigContext } from '../AppEnviromentProvider/index.hook';
import type { ResolvedLanguageProvider } from './index.types';

/**
 * Hook que resuelve qué provider de idioma usar y extrae su configuración.
 * 
 * Este hook determina automáticamente qué provider de idioma está disponible
 * y devuelve el idioma actual junto con su configuración completa desde el
 * ConfigProvider merged.
 * 
 * **Prioridad de resolución:**
 * 1. `LibI18nProvider` (provider de la librería) - si existe
 * 2. `AppLanguageProvider` (provider padre/aplicación) - si existe
 * 3. `ConfigProvider` merged - como fallback
 * 
 * **La configuración SIEMPRE viene del ConfigProvider merged**, garantizando que
 * las configuraciones externas de la aplicación padre sobrescriban las internas
 * de la librería.
 * 
 * @returns {ResolvedLanguageProvider} Objeto con el idioma actual y su configuración completa
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { lang, config } = useLanguageProviderResolver();
 *   
 *   // Usar el idioma actual
 *   console.log(lang); // 'en' o 'es'
 *   
 *   // Acceder a la configuración del idioma
 *   const dateFormat = config.dateFormat;
 *   const currency = config.currency;
 *   const locale = config.locale;
 * }
 * ```
 */
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
  const defaultLang = mergedConfig?.DEFAULT_LANGUAGE || 'en';
  const defaultConfig = mergedConfig?.LANGUAGE_CONFIG?.[defaultLang];

  if (defaultConfig) {
    return {
      lang: defaultLang,
      config: defaultConfig,
    };
  }

  // Fallback final si nada existe (no debería pasar en condiciones normales)
  return {
    lang: 'en',
    config: {},
  };
}
