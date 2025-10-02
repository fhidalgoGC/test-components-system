// ---------------------------------------------
// AppLanguageProvider (PROVIDER PADRE - APLICACIÓN)
// ---------------------------------------------
import React, { createContext, useContext, useMemo, useState } from 'react';

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

const LANGUAGE_CONFIG: Record<AppLanguage, LanguageConfig> = {
  es: {
    locale: 'es',
    dateFormat: 'dd/MM/yyyy',
    twoDigits: true,
  },
  en: {
    locale: 'en',
    dateFormat: 'MM/dd/yyyy',
    twoDigits: true,
  },
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