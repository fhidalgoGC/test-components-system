import { createContext, useContext, useMemo } from 'react';
import type { ReactNode } from 'react';
import type { LoadingContext } from '../types/Loading.type';
import { useI18nMerge } from '../hooks';

const Ctx = createContext<LoadingContext | null>(null);

export function useLoadingContext() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('LoadingProvider not mounted');
  return ctx;
}

export const LoadingComponentProvider: React.FC<{
  children: ReactNode;
  langOverride?: string;
  i18nOrder?: 'global-first' | 'local-first';
}> = ({ children, langOverride, i18nOrder = 'local-first' }) => {
  const { t, lang } = useI18nMerge(langOverride, { order: i18nOrder });

  const value = useMemo<LoadingContext>(() => ({
    t, lang
  }), [t, lang]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};
