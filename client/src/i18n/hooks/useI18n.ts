import { useState, useEffect, useMemo } from 'react';
import { getGlobalTranslations } from '../index';

type Language = 'es' | 'en';

interface I18nHookOptions<T = any> {
  language?: Language;
  localTranslations?: Record<Language, T>;
  fallbackToGlobal?: boolean;
}

/**
 * Hierarchical i18n hook that merges local translations with global translations
 * Local translations take priority over global translations
 * @param localTranslations - Local translations object with language keys
 * @param fallbackToGlobal - Whether to fallback to global translations (default: true)
 * @returns Merged translations, language management, and translate function
 */
export function useI18n<T = any>(
  localTranslations?: Record<Language, T>,
  fallbackToGlobal: boolean = true
) {
  // Language state management
  const [language, setLanguage] = useState<Language>(() => {
    // Try to get from localStorage
    const saved = localStorage.getItem('app-language');
    return (saved === 'es' || saved === 'en') ? saved : 'es';
  });

  // Update localStorage when language changes
  useEffect(() => {
    localStorage.setItem('app-language', language);
  }, [language]);

  // Get global translations
  const globalTranslations = fallbackToGlobal ? getGlobalTranslations(language) : null;

  // Get local translations for current language
  const currentLocalTranslations = localTranslations?.[language];

  // Merge translations with local taking priority
  const mergedTranslations = useMemo(() => {
    if (!fallbackToGlobal) {
      return currentLocalTranslations || {};
    }

    if (!currentLocalTranslations) {
      return globalTranslations || {};
    }

    if (!globalTranslations) {
      return currentLocalTranslations;
    }

    // Deep merge with local taking priority
    return mergeDeep(globalTranslations, currentLocalTranslations);
  }, [globalTranslations, currentLocalTranslations, fallbackToGlobal]);

  // Function to get nested translation with fallback
  const translate = useMemo(() => 
    (path: string): string => {
      const keys = path.split('.');
      let result: any = mergedTranslations;
      
      for (const key of keys) {
        result = result?.[key];
      }
      
      return typeof result === 'string' ? result : path;
    },
    [mergedTranslations]
  );

  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
  };

  return {
    language,
    t: mergedTranslations,
    translate,
    changeLanguage,
    globalTranslations,
    localTranslations: currentLocalTranslations
  };
}

/**
 * Deep merge two objects, with the second object taking priority
 */
function mergeDeep<T extends Record<string, any>>(target: T, source: Partial<T>): T {
  const result = { ...target };

  for (const key in source) {
    if (source[key] !== undefined) {
      if (
        typeof source[key] === 'object' && 
        source[key] !== null && 
        !Array.isArray(source[key]) &&
        typeof result[key] === 'object' && 
        result[key] !== null && 
        !Array.isArray(result[key])
      ) {
        result[key] = mergeDeep(result[key], source[key]);
      } else {
        result[key] = source[key] as T[typeof key];
      }
    }
  }

  return result;
}

// Re-export for convenience
export type { Language };