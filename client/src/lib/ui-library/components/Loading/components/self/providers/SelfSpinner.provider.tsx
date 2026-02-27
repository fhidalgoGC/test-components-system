import { createContext, useContext, useMemo } from 'react';
import type { ReactNode } from 'react';
import type { SelfSpinnerContext } from '../types';
import { useI18nMerge } from '../hooks';

const Ctx = createContext<SelfSpinnerContext | null>(null);

export function useSelfSpinnerContext() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('SelfSpinnerProvider not mounted');
  return ctx;
}

export const SelfSpinnerProvider: React.FC<{
  children: ReactNode;
  langOverride?: string;
  i18nOrder?: 'global-first' | 'local-first';
}> = ({ children, langOverride, i18nOrder = 'local-first' }) => {
  const { t, lang } = useI18nMerge(langOverride, { order: i18nOrder });

  const value = useMemo<SelfSpinnerContext>(() => ({
    t, lang
  }), [t, lang]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};
