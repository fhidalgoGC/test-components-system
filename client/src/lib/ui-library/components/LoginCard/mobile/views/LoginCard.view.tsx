import { useState } from 'react';
import type { LoginCardProps } from '../types';
import { useLoginCardContext } from '../providers';
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
    onSignInDifferentRegion,
    onResetPassword
  } = props;
  
  const { 
    t, 
    config, 
    providers, 
    onProviderSelect, 
    onEmailLogin,
    onForgotPassword,
    onShowAllProviders
  } = useLoginCardContext();

  const [showAllProviders, setShowAllProviders] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const maxVisibleProviders = 4;
  const visibleProviders = showAllProviders 
    ? providers 
    : providers.slice(0, maxVisibleProviders - 1);
  
  const hasMoreProviders = providers.length > maxVisibleProviders - 1;

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

  if (showAllProviders && !onShowAllProviders) {
    return (
      <div className={`${styles.loginCard} ${className}`} data-testid={dataTestId}>
        <div className={styles.header}>
          <div className={styles.iconContainer}>
            <Lock className={styles.icon} data-testid="icon-lock" />
          </div>
          <h2 className={styles.title} data-testid="text-title">
            {title || t('logincard.selectProvider')}
          </h2>
          {subtitle && (
            <p className={styles.subtitle} data-testid="text-subtitle">{subtitle}</p>
          )}
        </div>

        <div className={styles.providersGrid}>
          {providers.map((provider, index) => (
            <Button
              key={`${provider.provider}-${index}`}
              variant="outline"
              className={styles.providerButton}
              onClick={() => onProviderSelect?.(provider)}
              data-testid={`button-provider-${provider.provider.toLowerCase()}`}
            >
              {provider.icon && <span className={styles.providerIcon}>{provider.icon}</span>}
              <span>{provider.label || t('logincard.continueWith', { provider: provider.provider })}</span>
            </Button>
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

  return (
    <div className={`${styles.loginCard} ${className}`} data-testid={dataTestId}>
      <div className={styles.header}>
        {config === 'providers-only' && (
          <>
            <div className={styles.iconContainer}>
              <Lock className={styles.icon} data-testid="icon-lock" />
            </div>
            <h2 className={styles.title} data-testid="text-title">
              {title || t('logincard.title', { appName: 'App' })}
            </h2>
            {subtitle && (
              <p className={styles.subtitle} data-testid="text-subtitle">{subtitle}</p>
            )}
          </>
        )}
        
        {config === 'with-credentials' && (
          <h2 className={styles.title} data-testid="text-title">
            {title || t('logincard.title', { appName: 'Miro' })}
          </h2>
        )}
      </div>

      <div className={styles.providersSection}>
        <div className={styles.providersGrid}>
          {visibleProviders.map((provider, index) => (
            <Button
              key={`${provider.provider}-${index}`}
              variant="outline"
              className={styles.providerButton}
              onClick={() => onProviderSelect?.(provider)}
              data-testid={`button-provider-${provider.provider.toLowerCase()}`}
            >
              {provider.icon && <span className={styles.providerIcon}>{provider.icon}</span>}
              <span>{provider.label || provider.provider}</span>
            </Button>
          ))}
          
          {hasMoreProviders && (
            <Button
              variant="outline"
              className={styles.moreButton}
              onClick={handleShowAllProviders}
              data-testid="button-more-providers"
            >
              <Plus className="w-5 h-5" />
            </Button>
          )}
        </div>
      </div>

      {config === 'with-credentials' && (
        <>
          <div className={styles.divider} />

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
                placeholder="••••••••••"
                className={styles.input}
                data-testid="input-password"
              />
            </div>

            {onForgotPassword && (
              <button
                onClick={onForgotPassword}
                className={styles.forgotPassword}
                data-testid="button-forgot-password"
              >
                {t('logincard.forgotPassword')}
              </button>
            )}

            <div className={styles.checkboxContainer}>
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                data-testid="checkbox-remember"
              />
              <label htmlFor="remember" className={styles.checkboxLabel} data-testid="label-remember">
                {t('logincard.rememberMe')}
              </label>
            </div>

            <Button
              className={styles.submitButton}
              onClick={handleEmailLogin}
              disabled={!email || !password}
              data-testid="button-submit"
            >
              {t('logincard.continueWithEmail')}
            </Button>
          </div>

          {(onSignInDifferentRegion || onResetPassword) && (
            <div className={styles.footer}>
              {onSignInDifferentRegion && (
                <button
                  onClick={onSignInDifferentRegion}
                  className={styles.footerLink}
                  data-testid="button-different-region"
                >
                  → {t('logincard.signInDifferentRegion')}
                </button>
              )}
              
              {onResetPassword && (
                <p className={styles.footerText} data-testid="text-trouble">
                  {t('logincard.troubleSigning')}{' '}
                  <button
                    onClick={onResetPassword}
                    className={styles.resetLink}
                    data-testid="button-reset-password"
                  >
                    {t('logincard.resetPassword')}
                  </button>
                  .
                </p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};
