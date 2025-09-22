// ---------------------------------------------
// AppLanguageProvider (PROVIDER PADRE - APLICACIÓN)
// ---------------------------------------------
import React, { createContext, useContext, useMemo, useState } from 'react';

type AppLanguage = 'es' | 'en';

type AppLanguageContextValue = {
  lang: AppLanguage;
  setLang: (next: AppLanguage) => void;
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
  const value = useMemo(() => ({ lang, setLang }), [lang]);

  return <AppLanguageContext.Provider value={value}>{children}</AppLanguageContext.Provider>;
}