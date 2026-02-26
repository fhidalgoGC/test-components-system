import { useEffect, useRef } from 'react';
import { useAppAuth } from '../hooks';
import type { PublicRouteProps } from '../types';

const DEFAULT_AUTO_LOGOUT_DELAY = 30000;

export function PublicRoute({ children, autoLogoutDelay = DEFAULT_AUTO_LOGOUT_DELAY }: PublicRouteProps) {
  const { isAuthenticated, logout, triggerSessionInvalid } = useAppAuth();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      timerRef.current = setTimeout(() => {
        triggerSessionInvalid();
        logout();
      }, autoLogoutDelay);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isAuthenticated, autoLogoutDelay, logout, triggerSessionInvalid]);

  return <>{children}</>;
}
