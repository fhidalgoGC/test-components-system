import { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { LANGUAGE_CONFIG, AVAILABLE_LANGUAGES, DEFAULT_LANGUAGE } from '../../enviorments/enviroment';
import type { AppLanguage, AppLanguageContextValue, LanguageConfig } from './index.types';

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
  return useMemo(() => {
    const config: LanguageConfig = LANGUAGE_CONFIG[lang] || LANGUAGE_CONFIG[DEFAULT_LANGUAGE];
    return {
      dateFormat: config.dateFormat,
      twoDigits: config.twoDigits,
      config,
      availableLanguages: AVAILABLE_LANGUAGES,
    };
  }, [lang]);
}
