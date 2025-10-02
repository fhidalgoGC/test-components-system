// ---------------------------------------------
// AppLanguageProvider (PROVIDER PADRE - APLICACIÓN)
// ---------------------------------------------
import React, { createContext, useContext, useMemo, useState } from 'react';
import { LANGUAGE_CONFIG } from '../enviorments/enviroment';

type AppLanguage = 'es' | 'en';

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
};

const AppLanguageContext = createContext<AppLanguageContextValue | undefined>(undefined);

export function useAppLanguage() {
  return useContext(AppLanguageContext);
}

export function AppLanguageProvider({
  initial = 'en',
  children,
}: {
  initial?: AppLanguage;
  children: React.ReactNode;
}) {
  const [lang, setLang] = useState<AppLanguage>(initial);
  
  const value = useMemo(() => {
    const config = LANGUAGE_CONFIG[lang];
    return {
      lang,
      setLang,
      dateFormat: config.dateFormat,
      twoDigits: config.twoDigits,
      config,
    };
  }, [lang]);

  return <AppLanguageContext.Provider value={value}>{children}</AppLanguageContext.Provider>;
}