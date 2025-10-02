import { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { LANGUAGE_CONFIG, AVAILABLE_LANGUAGES, DEFAULT_LANGUAGE } from '../../enviorments/enviroment';
import { ConfigContext } from '../AppEnviromentProvider/index.hook';
import type { AppLanguage, AppLanguageContextValue, LanguageConfig } from './index.types';

// Hook para intentar obtener configuración de ConfigProvider (opcional)
// Retorna null si ConfigProvider no está disponible
function useOptionalConfig() {
  const configContext = useContext(ConfigContext);
  return configContext?.config || null;
}

// Context
export const AppLanguageContext = createContext<AppLanguageContextValue | undefined>(undefined);

// Hook to use AppLanguage context
export function useAppLanguage() {
  return useContext(AppLanguageContext);
}

// Hook para validar y manejar el idioma inicial
export function useValidatedLanguage(initial?: AppLanguage) {
  const initialLang = initial || DEFAULT_LANGUAGE;
  
  const validatedInitial = AVAILABLE_LANGUAGES.includes(initialLang) 
    ? initialLang 
    : DEFAULT_LANGUAGE;
  
  const [lang, setLang] = useState<AppLanguage>(validatedInitial);

  // Custom setLang that validates against available languages
  const setValidatedLang = useCallback((nextLang: AppLanguage) => {
    if (AVAILABLE_LANGUAGES.includes(nextLang)) {
      setLang(nextLang);
    } else {
      console.warn(`Language "${nextLang}" is not in AVAILABLE_LANGUAGES. Staying with "${lang}".`);
    }
  }, [lang]);

  return { lang, setValidatedLang };
}

// Hook para obtener la configuración del idioma
export function useLanguageConfig(lang: AppLanguage) {
  // Intentar obtener LANGUAGE_CONFIG del ConfigProvider merged
  const optionalConfig = useOptionalConfig();
  
  return useMemo(() => {
    // Usar LANGUAGE_CONFIG del config merged si existe, sino usar el interno
    const languageConfigSource = optionalConfig?.LANGUAGE_CONFIG || LANGUAGE_CONFIG;
    const availableLanguagesSource = optionalConfig?.AVAILABLE_LANGUAGES || AVAILABLE_LANGUAGES;
    
    const config: LanguageConfig = languageConfigSource[lang] || languageConfigSource[DEFAULT_LANGUAGE];
    return {
      dateFormat: config.dateFormat,
      twoDigits: config.twoDigits,
      config,
      availableLanguages: availableLanguagesSource,
    };
  }, [lang, optionalConfig]);
}
