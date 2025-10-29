import { useState } from 'react';
import type { LoginCardProps } from '../types';
import { useLoginCardContext } from '../providers';
import type { MultiLanguageLabel } from '@/lib/ui-library/types/language.types';
import { WithCredentialsLayout, ProvidersOnlyLayout } from '../layouts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Lock, Plus } from 'lucide-react';
import styles from '../css/LoginCard.module.css';

export const LoginCardView = (props: LoginCardProps) => {
  const { 
    className, 
    dataTestId = 'logincard',
    title,
    subtitle,
    icon,
    onSignInDifferentRegion,
    onResetPassword
  } = props;
  
  const { 
    t, 
    lang,
    config, 
    providers, 
    onProviderSelect, 
    onEmailLogin,
    onForgotPassword,
    onShowAllProviders
  } = useLoginCardContext();

  // Helper function to resolve MultiLanguageLabel
  const resolveLabel = (label: MultiLanguageLabel | undefined, fallback: string): string => {
    if (!label) return fallback;
    return label[lang] || label.default || fallback;
  };

  const [showAllProviders, setShowAllProviders] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const hasMoreProviders = providers.length > 4;
  const visibleProviders = showAllProviders 
    ? providers 
    : hasMoreProviders ? providers.slice(0, 3) : providers;

  const handleEmailLogin = () => {
    if (onEmailLogin && email && password) {
      onEmailLogin(email, password, rememberMe);
    }
  };

  const handleShowAllProviders = () => {
    if (onShowAllProviders) {
      onShowAllProviders();
    } else {
      setShowAllProviders(true);
    }
  };

  const handleBackToMain = () => {
    setShowAllProviders(false);
  };

  // All Providers View (when user clicks "more providers")
  if (showAllProviders && !onShowAllProviders) {
    return (
      <div className={`${styles.loginCard} ${className}`} data-testid={dataTestId}>
        <div className={styles.header}>
          <div className={styles.iconContainer}>
            <Lock className={styles.icon} data-testid="icon-lock" />
          </div>
          <h2 className={styles.title} data-testid="text-title">
            {resolveLabel(title, t('logincard.selectProvider'))}
          </h2>
          {subtitle && (
            <p className={styles.subtitle} data-testid="text-subtitle">{resolveLabel(subtitle, '')}</p>
          )}
        </div>

        <div className={styles.providersGrid}>
          {providers.map((provider, index) => (
            <button
              key={`${provider.provider}-${index}`}
              className={styles.providerButton}
              onClick={() => onProviderSelect?.(provider)}
              data-testid={`button-provider-${provider.provider.toLowerCase()}`}
            >
              {provider.icon && <span className={styles.providerIcon}>{provider.icon}</span>}
              <span className={styles.providerLabel}>{provider.label ? resolveLabel(provider.label, provider.provider) : t('logincard.continueWith', { provider: provider.provider })}</span>
            </button>
          ))}
        </div>

        <Button
          variant="ghost"
          className={styles.backButton}
          onClick={handleBackToMain}
          data-testid="button-back"
        >
          ← {t('logincard.back') || 'Back'}
        </Button>
      </div>
    );
  }

  // Render Providers Section
  const renderProvidersSection = () => (
    <div className={styles.providersSection}>
      <div className={config === 'providers-only' ? styles.providersListVertical : styles.providersGrid}>
        {visibleProviders.map((provider, index) => (
          <button
            key={`${provider.provider}-${index}`}
            className={config === 'providers-only' ? styles.providerButtonLarge : styles.providerButton}
            onClick={() => onProviderSelect?.(provider)}
            data-testid={`button-provider-${provider.provider.toLowerCase()}`}
          >
            {provider.icon && <span className={styles.providerIcon}>{provider.icon}</span>}
            <span className={styles.providerLabel}>{provider.label ? resolveLabel(provider.label, provider.provider) : provider.provider}</span>
          </button>
        ))}
        
        {hasMoreProviders && (
          <button
            className={config === 'providers-only' ? styles.moreButtonLarge : styles.moreButton}
            onClick={handleShowAllProviders}
            data-testid="button-more-providers"
          >
            {config === 'providers-only' ? (
              <span>{t('logincard.moreProviders') || 'Más Proveedores'}</span>
            ) : (
              <Plus className="w-5 h-5" />
            )}
          </button>
        )}
      </div>
    </div>
  );

  // Render Credentials Section
  const renderCredentialsSection = () => (
    <div className={styles.credentialsSection}>
      <div className={styles.inputGroup}>
        <label className={styles.label} htmlFor="email" data-testid="label-email">
          {t('logincard.email')}
        </label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@email.com"
          className={styles.input}
          data-testid="input-email"
        />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label} htmlFor="password" data-testid="label-password">
          {t('logincard.password')}
        </label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className={styles.input}
          data-testid="input-password"
        />
      </div>

      <div className={styles.formOptions}>
        {onForgotPassword && (
          <button
            onClick={onForgotPassword}
            className={styles.forgotPassword}
            data-testid="button-forgot-password"
          >
            {t('logincard.forgotPassword')}
          </button>
        )}
      </div>

      <div className={styles.checkboxGroup}>
        <Checkbox
          id="remember-me"
          checked={rememberMe}
          onCheckedChange={(checked) => setRememberMe(checked as boolean)}
          data-testid="checkbox-remember-me"
        />
        <label htmlFor="remember-me" className={styles.checkboxLabel} data-testid="label-remember-me">
          {t('logincard.rememberMe')}
        </label>
      </div>

      <div className={styles.buttonGroup}>
        <button
          onClick={handleEmailLogin}
          className={styles.continueButton}
          data-testid="button-continue-email"
        >
          {t('logincard.continueWithEmail')}
        </button>
      </div>
    </div>
  );

  // Render Icon + Title Section
  const renderHeaderSection = () => (
    <div className={styles.header}>
      {icon && (
        <div className={styles.iconContainer} data-testid="container-icon">
          {icon}
        </div>
      )}
      <h2 className={styles.title} data-testid="text-title">
        {resolveLabel(title, config === 'providers-only' ? t('logincard.title', { appName: 'App' }) : t('logincard.title', { appName: 'Miro' }))}
      </h2>
      {subtitle && (
        <p className={styles.subtitle} data-testid="text-subtitle">{resolveLabel(subtitle, '')}</p>
      )}
    </div>
  );

  // Main render with layout
  return (
    <div className={`${styles.loginCard} ${className}`} data-testid={dataTestId}>
      {config === 'with-credentials' ? (
        <WithCredentialsLayout
          headerSection={renderHeaderSection()}
          credentialsSection={renderCredentialsSection()}
          providersSection={renderProvidersSection()}
          orText={t('logincard.or')}
        />
      ) : (
        <ProvidersOnlyLayout
          headerSection={renderHeaderSection()}
          providersSection={renderProvidersSection()}
        />
      )}
    </div>
  );
};
