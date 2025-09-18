import esTranslations from './es.json';
import enTranslations from './en.json';
import { useI18n } from './hooks/useI18n';

export type SupportedLanguage = 'en' | 'es';

export const globalTranslations = {
  es: esTranslations,
  en: enTranslations
};

export const getGlobalTranslations = (language: SupportedLanguage = 'es') => {
  return globalTranslations[language] || globalTranslations.es;
};

// Utilidad para obtener traducción anidada usando path con notación de punto
export const getNestedTranslation = (
  translations: any, 
  path: string, 
  fallbackTranslations?: any
): string => {
  const keys = path.split('.');
  let result = translations;
  
  for (const key of keys) {
    result = result?.[key];
  }
  
  // Si no se encuentra en las traducciones locales, buscar en fallback (global)
  if (typeof result !== 'string' && fallbackTranslations) {
    let fallback = fallbackTranslations;
    for (const key of keys) {
      fallback = fallback?.[key];
    }
    result = fallback;
  }
  
  return typeof result === 'string' ? result : path;
};

// Hook personalizado para traducciones jerárquicas - REACTIVO
export const useHierarchicalTranslations = (
  localTranslationsRecord: Record<SupportedLanguage, any>
) => {
  // Usar el hook reactivo de i18n para manejar el estado del idioma
  const { language, changeLanguage } = useI18n(localTranslationsRecord, true);
  
  const localTranslations = localTranslationsRecord[language];
  const global = getGlobalTranslations(language);
  
  const t = (path: string): string => {
    return getNestedTranslation(localTranslations, path, global);
  };
  
  return { 
    t, 
    language, 
    changeLanguage, 
    global, 
    local: localTranslations 
  };
};

// Export new hooks
export { useI18n } from './hooks/useI18n';
export type { Language } from './hooks/useI18n';