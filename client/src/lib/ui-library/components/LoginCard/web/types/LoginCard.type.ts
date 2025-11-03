import { MultiLanguageLabel } from '@/lib/ui-library/types/language.types';

export type LoginProvider = {
  provider: string;
  data?: Record<string, any>;
  icon?: React.ReactNode;
  component?: React.ReactNode;
  label?: MultiLanguageLabel;
  redirect?: {
    external: boolean;
    url: string;
    newTab: boolean;
  };
};

export type LoginConfig = 'with-credentials' | 'providers-only';

export interface LoginCardProps {
  config: LoginConfig;
  providers: LoginProvider[];
  onProviderSelect?: (provider: LoginProvider) => void;
  onEmailLogin?: (email: string, password: string, rememberMe: boolean) => void;
  onForgotPassword?: () => void;
  onSignInDifferentRegion?: () => void;
  onResetPassword?: () => void;
  onShowAllProviders?: () => void;
  className?: string;
  langOverride?: string;
  i18nOrder?: 'global-first' | 'local-first';
  dataTestId?: string;
  title?: MultiLanguageLabel;
  subtitle?: MultiLanguageLabel;
  icon?: React.ReactNode;
}

export interface LoginCardContext {
  t: (key: string, params?: Record<string, string | number>) => string;
  lang: string;
  config: LoginConfig;
  providers: LoginProvider[];
  onProviderSelect?: (provider: LoginProvider) => void;
  onEmailLogin?: (email: string, password: string, rememberMe: boolean) => void;
  onForgotPassword?: () => void;
  onShowAllProviders?: () => void;
}
