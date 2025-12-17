import { createContext, useContext, useMemo } from 'react';
import { useI18nMerge } from 'GC-UI-COMPONENTS';
import { translations } from '../i18n';

type TranslatorFn = (key: string, params?: Record<string, string | number>) => string;

interface {{FEATURE_NAME_PASCAL}}ContextValue {
  t: TranslatorFn;
  lang: string;
}

const {{FEATURE_NAME_PASCAL}}Context = createContext<{{FEATURE_NAME_PASCAL}}ContextValue | null>(null);

interface {{FEATURE_NAME_PASCAL}}ProviderProps {
  children: React.ReactNode;
}

export function {{FEATURE_NAME_PASCAL}}Provider({ children }: {{FEATURE_NAME_PASCAL}}ProviderProps) {
  const { t, lang } = useI18nMerge(translations);

  const value = useMemo(() => ({ t, lang }), [t, lang]);

  return (
    <{{FEATURE_NAME_PASCAL}}Context.Provider value={value}>
      {children}
    </{{FEATURE_NAME_PASCAL}}Context.Provider>
  );
}

export function use{{FEATURE_NAME_PASCAL}}() {
  const context = useContext({{FEATURE_NAME_PASCAL}}Context);
  if (!context) {
    throw new Error('use{{FEATURE_NAME_PASCAL}} must be used within {{FEATURE_NAME_PASCAL}}Provider');
  }
  return context;
}
