import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { makeTranslator, type TranslationOrder } from '../../utils';
import type { LibI18nContextValue, Lang, GlobalTranslationPath } from './index.types';
import type { GenericLanguageProvider } from '../../types/language.types';
import { ConfigContext } from '../AppEnviromentProvider/index.hook';

// Context - exported for provider usage
export const LibI18nContext = createContext<LibI18nContextValue | undefined>(undefined);

// Hook to use LibI18n context
export function useLibI18n() {
  const ctx = useContext(LibI18nContext);
  if (!ctx) throw new Error('useLibI18n must be used within LibI18nProvider');
  return ctx;
}

// Hook conveniente para inyectar automáticamente el proveedor padre
export function useParentLanguageInjection(parentProvider: GenericLanguageProvider | null) {
  return parentProvider ? { parentLanguageProvider: parentProvider } : {};
}

// Hook para intentar obtener configuración de ConfigProvider (opcional)
// Retorna null si ConfigProvider no está disponible
export function useOptionalConfig() {
  const configContext = useContext(ConfigContext);
  return configContext?.config || null;
}

// Hook para manejar el idioma efectivo y su sincronización
export function useEffectiveLanguage(
  language: Lang | undefined,
  parentLanguageProvider: GenericLanguageProvider | undefined
) {
  // Intentar obtener configuración de ConfigProvider si está disponible
  const externalConfig = useOptionalConfig();
  const defaultLangFromConfig = externalConfig?.DEFAULT_LANGUAGE as Lang | undefined;
  
  const [internal, setInternal] = useState<Lang>(
    language ?? defaultLangFromConfig ?? 'en'
  );
  
  // Determinar la fuente de verdad
  // Prioridad: parentLanguageProvider > language prop > config externa > internal
  const effectiveLang: Lang = (parentLanguageProvider?.lang as Lang) ?? language ?? internal;

  // Sincronizar con prop language cuando cambia
  useEffect(() => {
    if (!parentLanguageProvider && language && language !== internal) {
      setInternal(language);
    }
  }, [parentLanguageProvider, language, internal]);

  // Sincronizar con configuración externa cuando cambia
  useEffect(() => {
    if (!parentLanguageProvider && !language && defaultLangFromConfig && defaultLangFromConfig !== internal) {
      setInternal(defaultLangFromConfig);
    }
  }, [parentLanguageProvider, language, defaultLangFromConfig, internal]);

  return { effectiveLang, internal, setInternal };
}

// Función auxiliar para aplanar JSON anidado
const flattenTranslations = (obj: Record<string, any>, prefix = ''): Record<string, string> => {
  const flattened: Record<string, string> = {};
  
  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}.${key}` : key;
    
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      Object.assign(flattened, flattenTranslations(value, newKey));
    } else if (typeof value === 'string') {
      flattened[newKey] = value;
    }
  }
  
  return flattened;
};

// Hook para cargar traducciones dinámicamente
export function useTranslationLoader(globalTranslationPaths: GlobalTranslationPath[]) {
  const [loadedTranslations, setLoadedTranslations] = useState<Record<string, Record<string, any>>>({});

  useEffect(() => {
    const loadTranslations = async () => {
      const loaded: Record<string, Record<string, any>> = {};
      
      for (const translationPath of globalTranslationPaths) {
        try {
          const module = await import(/* @vite-ignore */ translationPath.path);
          loaded[translationPath.lang] = module.default || module;
        } catch (error) {
          console.warn(`Failed to load translation file for ${translationPath.lang} from ${translationPath.path}:`, error);
          loaded[translationPath.lang] = {};
        }
      }
      
      setLoadedTranslations(loaded);
    };

    if (globalTranslationPaths.length > 0) {
      loadTranslations();
    }
  }, [globalTranslationPaths]);

  return loadedTranslations;
}

// Hook para procesar y crear el traductor
export function useTranslator(
  loadedTranslations: Record<string, Record<string, any>>,
  effectiveLang: Lang,
  translationPriority: 'component-first' | 'external-first'
) {
  // Procesar traducciones globales
  const processedGlobalTranslations = useMemo(() => {
    const globalTranslationsForLang = loadedTranslations[effectiveLang];
    if (!globalTranslationsForLang) return {};
    return flattenTranslations(globalTranslationsForLang);
  }, [loadedTranslations, effectiveLang]);

  // Crear traductor
  const t = useMemo(() => {
    const order: TranslationOrder = translationPriority === 'component-first' ? 'local-first' : 'global-first';
    const localTranslations: Record<string, string> = {};
    return makeTranslator(localTranslations, processedGlobalTranslations, order);
  }, [processedGlobalTranslations, translationPriority]);

  const getExternalTranslations = useCallback(() => processedGlobalTranslations, [processedGlobalTranslations]);

  return { t, getExternalTranslations, processedGlobalTranslations };
}

// Hook para manejar funciones de idioma
export function useLanguageHandlers(
  effectiveLang: Lang,
  setInternal: (lang: Lang) => void,
  parentLanguageProvider: GenericLanguageProvider | undefined,
  onLanguageChange: ((next: Lang) => void) | undefined
) {
  const setLanguage = useCallback((next: Lang) => {
    if (parentLanguageProvider?.setLang) {
      parentLanguageProvider.setLang(next);
      return;
    }
    if (onLanguageChange) {
      onLanguageChange(next);
      return;
    }
    setInternal(next);
  }, [parentLanguageProvider, onLanguageChange, setInternal]);

  const resolveLabel = useCallback((label: { [key: string]: string; default: string }) => {
    return label[effectiveLang] ?? label.default;
  }, [effectiveLang]);

  return { setLanguage, resolveLabel };
}
