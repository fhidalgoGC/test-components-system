// ---------------------------------------------
// AppLanguageLibUiProvider (PROVIDER HIJO - DENTRO DE LA LIBRERÍA)
// ---------------------------------------------
import React, { useMemo } from 'react';
import type { LibI18nContextValue, LibI18nProviderProps } from './index.types';
import { 
  LibI18nContext, 
  useEffectiveLanguage, 
  useTranslationLoader, 
  useTranslator, 
  useLanguageHandlers 
} from './index.hook';

/**
 * Comportamiento INDEPENDIENTE:
 * - Si recibe `parentLanguageProvider` (inyectado), usa ese como fuente de verdad
 * - Si NO hay padre pero viene `language` en props, usamos esa prop (controlado por prop)
 * - Si NO hay padre ni `language`, la librería se autogestiona con estado interno
 * - Cuando setLanguage es llamado desde la librería:
 *    - Si hay padre inyectado, le notifica al padre (padre.setLang)
 *    - En su defecto, dispara onLanguageChange si fue provisto
 *    - Y si nada existe, cambia su estado interno
 */

export function LibI18nProvider({ 
  language, 
  onLanguageChange, 
  parentLanguageProvider,
  globalTranslationPaths = [],
  translationPriority = 'component-first',
  children 
}: LibI18nProviderProps) {
  // Hook para manejar el idioma efectivo
  const { effectiveLang, setInternal } = useEffectiveLanguage(language, parentLanguageProvider);

  // Hook para cargar traducciones
  const loadedTranslations = useTranslationLoader(globalTranslationPaths);

  // Hook para crear el traductor
  const { t, getExternalTranslations } = useTranslator(
    loadedTranslations, 
    effectiveLang, 
    translationPriority
  );

  // Hook para manejar las funciones de idioma
  const { setLanguage, resolveLabel } = useLanguageHandlers(
    effectiveLang,
    setInternal,
    parentLanguageProvider,
    onLanguageChange
  );

  const value = useMemo<LibI18nContextValue>(
    () => ({ 
      lang: effectiveLang, 
      t, 
      setLanguage, 
      resolveLabel,
      getExternalTranslations,
      translationPriority 
    }),
    [effectiveLang, t, setLanguage, resolveLabel, getExternalTranslations, translationPriority]
  );

  return <LibI18nContext.Provider value={value}>{children}</LibI18nContext.Provider>;
}
