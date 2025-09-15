import React, { createContext, useContext, useMemo } from 'react';
import type { ReactNode } from 'react';
import type { ButtonContext, VisibilityConfig } from '../types';
import { useThemeSafe, useI18nMerge, useVisibility } from '../hook';

const Ctx = createContext<ButtonContext | null>(null);

export function useButtonContext() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('ButtonProvider not mounted');
  return ctx;
}

export const ButtonProvider: React.FC<{
  children: ReactNode;
  config?: VisibilityConfig;
  langOverride?: string;
  i18nOrder?: 'global-first' | 'local-first';
}> = ({ children, config, langOverride, i18nOrder = 'local-first' }) => {
  const { theme } = useThemeSafe();
  const { t } = useI18nMerge(langOverride, { order: i18nOrder });
  const { cfg: visibilityConfig, width, device, orientation, isVisible } = useVisibility(config);

  const value = useMemo<ButtonContext>(() => ({
    theme, t, visibilityConfig, isVisible, device, orientation, width
  }), [theme, t, visibilityConfig, isVisible, device, orientation, width]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};
