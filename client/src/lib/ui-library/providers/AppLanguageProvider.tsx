// ---------------------------------------------
// AppLanguageProvider (PROVIDER PADRE - APLICACIÓN)
// ---------------------------------------------
import React, { createContext, useContext, useMemo, useState } from 'react';
import { LANGUAGE_CONFIG, AVAILABLE_LANGUAGES, DEFAULT_LANGUAGE } from '../enviorments/enviroment';

// Type for available languages (dynamically based on environment config)
type AppLanguage = string;

type LanguageConfig = {
  locale: string;
  dateFormat: string;
  twoDigits: boolean;
};

type AppLanguageContextValue = {
  lang: AppLanguage;
  setLang: (next: AppLanguage) => void;
  dateFormat: string;
  twoDigits: boolean;
  config: LanguageConfig;
  availableLanguages: string[];
};

const AppLanguageContext = createContext<AppLanguageContextValue | undefined>(undefined);

export function useAppLanguage() {
  return useContext(AppLanguageContext);
}

export function AppLanguageProvider({
  initial,
  children,
}: {
  initial?: AppLanguage;
  children: React.ReactNode;
}) {
  // Use environment default if no initial value provided
  const initialLang = initial || DEFAULT_LANGUAGE;
  
  // Validate that initial language is available
  const validatedInitial = AVAILABLE_LANGUAGES.includes(initialLang) 
    ? initialLang 
    : DEFAULT_LANGUAGE;
  
  const [lang, setLang] = useState<AppLanguage>(validatedInitial);
  
  // Custom setLang that validates against available languages
  const setValidatedLang = (nextLang: AppLanguage) => {
    if (AVAILABLE_LANGUAGES.includes(nextLang)) {
      setLang(nextLang);
    } else {
      console.warn(`Language "${nextLang}" is not in AVAILABLE_LANGUAGES. Staying with "${lang}".`);
    }
  };
  
  const value = useMemo(() => {
    const config = LANGUAGE_CONFIG[lang] || LANGUAGE_CONFIG[DEFAULT_LANGUAGE];
    return {
      lang,
      setLang: setValidatedLang,
      dateFormat: config.dateFormat,
      twoDigits: config.twoDigits,
      config,
      availableLanguages: AVAILABLE_LANGUAGES,
    };
  }, [lang]);

  return <AppLanguageContext.Provider value={value}>{children}</AppLanguageContext.Provider>;
}