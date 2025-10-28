import { LoginCardProvider } from './providers';
import { LoginCardView } from './views';
import type { LoginCardProps } from './types';

export const LoginCard = (props: LoginCardProps) => {
  const {
    langOverride,
    i18nOrder,
    config,
    providers,
    onProviderSelect,
    onEmailLogin,
    onForgotPassword,
    onShowAllProviders,
    ...rest
  } = props;

  return (
    <LoginCardProvider
      langOverride={langOverride}
      i18nOrder={i18nOrder}
      config={config}
      providers={providers}
      onProviderSelect={onProviderSelect}
      onEmailLogin={onEmailLogin}
      onForgotPassword={onForgotPassword}
      onShowAllProviders={onShowAllProviders}
    >
      <LoginCardView 
        config={config}
        providers={providers}
        onProviderSelect={onProviderSelect}
        onEmailLogin={onEmailLogin}
        onForgotPassword={onForgotPassword}
        onShowAllProviders={onShowAllProviders}
        {...rest} 
      />
    </LoginCardProvider>
  );
};

export type { LoginCardProps } from './types';
export { useLoginCardContext } from './providers';
