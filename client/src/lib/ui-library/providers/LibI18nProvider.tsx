// ---------------------------------------------
// LibI18nProvider (PROVIDER HIJO - DENTRO DE LA LIBRERÍA)
// ---------------------------------------------
import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { useAppLanguage } from '../../../providers/AppLanguageProvider';

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
  children: React.ReactNode;
};

/**
 * Comportamiento:
 * - Si existe AppLanguageContext (padre), usamos padre.lang como fuente de verdad.
 * - Si NO existe padre y viene `language` en props, usamos esa prop (controlado por prop).
 * - Si NO existe padre ni `language`, la librería se autogestiona con estado interno.
 * - Cuando setLanguage es llamado dentro de la librería:
 *    - Si hay padre, le pedimos al padre cambiar (padre.setLang).
 *    - En su defecto, disparamos onLanguageChange si fue provisto.
 *    - Y si nada de lo anterior existe, cambiamos nuestro estado interno.
 */
export function LibI18nProvider({ language, onLanguageChange, children }: LibI18nProviderProps) {
  const appLang = useAppLanguage(); // puede ser undefined si la librería se usa "sola"
  const [internal, setInternal] = useState<Lang>(language ?? 'en');

  // Determinar la fuente de verdad (prioridad: padre > prop controlada > interno)
  const effectiveLang: Lang = appLang?.lang ?? language ?? internal;

  // Si la prop `language` cambia desde afuera y no hay padre, reflejamos en interno para mantener consistencia
  useEffect(() => {
    if (!appLang && language && language !== internal) setInternal(language);
  }, [appLang, language, internal]);

  const t = (key: keyof typeof DICT) => DICT[key]?.[effectiveLang] ?? key;

  const resolveLabel = (label: { [key: string]: string; default: string }) => {
    return label[effectiveLang] ?? label.default;
  };

  const setLanguage = (next: Lang) => {
    if (appLang?.setLang) {
      // Empujar hacia el provider padre
      appLang.setLang(next);
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