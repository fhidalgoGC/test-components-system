import { useEffect, useRef } from 'react';
import { useAppAuth } from '../hooks';
import type { PublicRouteProps } from '../types';

export function PublicRoute({ children }: PublicRouteProps) {
  const { isAuthenticated, logout, triggerSessionInvalid, autoLogoutDelay } = useAppAuth();
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
