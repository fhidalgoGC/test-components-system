import { useEffect, useRef } from 'react';
import { useAppAuth } from '../hooks';
import type { PublicRouteProps } from '../types';

export function PublicRoute({ children }: PublicRouteProps) {
  const { isAuthenticated, logout, triggerSessionInvalid, autoLogoutDelay } = useAppAuth();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  console.log('[PublicRoute] RENDER', { isAuthenticated });

  useEffect(() => {
    console.log('[PublicRoute] MONTADO (useEffect)', { isAuthenticated });
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      console.log(`[PublicRoute] Sesión activa → timer auto-logout iniciado (${autoLogoutDelay}ms)`);
      timerRef.current = setTimeout(() => {
        console.log('[PublicRoute] Timer expiró → triggerSessionInvalid() + logout()');
        triggerSessionInvalid();
        logout();
      }, autoLogoutDelay);
    }

    return () => {
      if (timerRef.current) {
        console.log('[PublicRoute] Timer cancelado (cleanup)');
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isAuthenticated, autoLogoutDelay, logout, triggerSessionInvalid]);

  return <>{children}</>;
}
