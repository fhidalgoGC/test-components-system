import { createContext, useContext, useState } from 'react';
import type { LoginCardContext } from '../types';
import { useI18nMerge } from '../hooks';
import { ConfigContext } from '../../../../providers/AppEnviromentProvider/index.hook';
import { LOGINCARD_CONFIG as environment } from './../environment';

const LoginCardCtx = createContext<LoginCardContext | undefined>(undefined);

// Hook to safely access ConfigProvider (optional)
function useOptionalConfig() {
  const configContext = useContext(ConfigContext);
  return configContext ? { environment: configContext.environment } : null;
}

export const useLoginCardContext = () => {
  const context = useContext(LoginCardCtx);
  if (!context) {
    throw new Error('useLoginCardContext must be used within LoginCardProvider');
  }
  return context;
};

export const LoginCardProvider = ({ 
  children,
  langOverride,
  i18nOrder = 'local-first',
  config,
  providers,
  onProviderSelect,
  onEmailLogin,
  onForgotPassword,
  onShowAllProviders
}: { 
  children: React.ReactNode;
  langOverride?: string;
  i18nOrder?: 'global-first' | 'local-first';
  config: 'with-credentials' | 'providers-only';
  providers: Array<{ provider: string; data?: any; icon?: React.ReactNode; label?: string }>;
  onProviderSelect?: (provider: any) => void;
  onEmailLogin?: (email: string, password: string, rememberMe: boolean) => void;
  onForgotPassword?: () => void;
  onShowAllProviders?: () => void;
}) => {
  const { lang, t } = useI18nMerge(langOverride, { order: i18nOrder });
  
  // Access ConfigProvider if available
  const optionalConfig = useOptionalConfig();

  const value: LoginCardContext = {
    t,
    lang,
    config,
    providers,
    onProviderSelect,
    onEmailLogin,
    onForgotPassword,
    onShowAllProviders
  };

  return (
    <LoginCardCtx.Provider value={value}>
      {children}
    </LoginCardCtx.Provider>
  );
};
