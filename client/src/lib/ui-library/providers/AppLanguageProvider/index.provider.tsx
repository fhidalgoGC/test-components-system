// ---------------------------------------------
// AppLanguageProvider (PROVIDER PADRE - APLICACIÓN)
// ---------------------------------------------
import React, { useMemo } from 'react';
import { AppLanguageContext, useValidatedLanguage, useLanguageConfig } from './index.hook';
import type { AppLanguageProviderProps, AppLanguageContextValue } from './index.types';

export function AppLanguageProvider({ initial, children }: AppLanguageProviderProps) {
  // Hook para validar el idioma
  const { lang, setValidatedLang } = useValidatedLanguage(initial);
  
  // Hook para obtener la configuración
  const languageConfig = useLanguageConfig(lang);

  const value = useMemo<AppLanguageContextValue>(() => ({
    lang,
    setLang: setValidatedLang,
    ...languageConfig,
  }), [lang, setValidatedLang, languageConfig]);

  return <AppLanguageContext.Provider value={value}>{children}</AppLanguageContext.Provider>;
}
