// ---------------------------------------------
// LibI18nProvider (PROVIDER HIJO - DENTRO DE LA LIBRERÍA)
// ---------------------------------------------
import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import type { GenericLanguageProvider } from '../types/language-provider';

type Lang = 'es' | 'en';

type Dict = Record<string, Record<Lang, string>>;
const DICT: Dict = {
  all: { es: 'Todos', en: 'All' },
  loading: { es: 'Cargando...', en: 'Loading...' },
  no_tags: { es: 'No hay etiquetas', en: 'No tags' },
  hello: { es: 'Hola', en: 'Hello' },
  bye: { es: 'Adiós', en: 'Bye' },
};

type LibI18nContextValue = {
  lang: Lang;
  t: (key: keyof typeof DICT) => string;
  setLanguage: (next: Lang) => void;
  resolveLabel: (label: { [key: string]: string; default: string }) => string;
};

// Nota: el default es opcional; usamos undefined para forzar el uso dentro del provider
const LibI18nContext = createContext<LibI18nContextValue | undefined>(undefined);

export function useLibI18n() {
  const ctx = useContext(LibI18nContext);
  if (!ctx) throw new Error('useLibI18n must be used within LibI18nProvider');
  return ctx;
}

type LibI18nProviderProps = {
  /** Si lo pasas, la librería se vuelve controlada por props (o por el padre si existe) */
  language?: Lang;
  /** Callback para cambios de idioma disparados desde la librería */
  onLanguageChange?: (next: Lang) => void;
  /** Proveedor padre inyectado (opcional) - permite conectar con cualquier sistema de idioma */
  parentLanguageProvider?: GenericLanguageProvider;
  children: React.ReactNode;
};

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
  children 
}: LibI18nProviderProps) {
  const [internal, setInternal] = useState<Lang>(language ?? 'en');

  // Determinar la fuente de verdad (prioridad: padre inyectado > prop controlada > interno)
  const effectiveLang: Lang = (parentLanguageProvider?.lang as Lang) ?? language ?? internal;

  // Si la prop `language` cambia desde afuera y no hay padre, reflejamos en interno para mantener consistencia
  useEffect(() => {
    if (!parentLanguageProvider && language && language !== internal) {
      setInternal(language);
    }
  }, [parentLanguageProvider, language, internal]);

  const t = (key: keyof typeof DICT) => DICT[key]?.[effectiveLang] ?? key;

  const resolveLabel = (label: { [key: string]: string; default: string }) => {
    return label[effectiveLang] ?? label.default;
  };

  const setLanguage = (next: Lang) => {
    if (parentLanguageProvider?.setLang) {
      // Empujar hacia el provider padre inyectado
      parentLanguageProvider.setLang(next);
      return;
    }
    if (onLanguageChange) {
      // Avisar a quien controla por props
      onLanguageChange(next);
      return;
    }
    // Modo autónomo
    setInternal(next);
  };

  const value = useMemo<LibI18nContextValue>(
    () => ({ lang: effectiveLang, t, setLanguage, resolveLabel }),
    [effectiveLang]
  );

  return <LibI18nContext.Provider value={value}>{children}</LibI18nContext.Provider>;
}

// Hook conveniente para inyectar automáticamente el proveedor padre
// Este hook puede ser usado por la app padre para conectar su sistema de idioma
export function useParentLanguageInjection(parentProvider: GenericLanguageProvider | null) {
  return parentProvider ? { parentLanguageProvider: parentProvider } : {};
}