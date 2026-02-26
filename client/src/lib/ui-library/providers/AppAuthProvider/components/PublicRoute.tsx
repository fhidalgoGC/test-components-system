import { useEffect, useRef } from 'react';
import { useAppAuth } from '../hooks';
import type { PublicRouteProps } from '../types';

export function PublicRoute({ children }: PublicRouteProps) {
  const { isAuthenticated, logout, triggerSessionInvalid, autoLogoutDelay } = useAppAuth();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    console.log('[PublicRoute] MONTADO', { isAuthenticated });
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      console.log(`[PublicRoute] Sesión activa → iniciando timer de auto-logout (${autoLogoutDelay}ms)`);
      timerRef.current = setTimeout(() => {
        console.log('[PublicRoute] Timer expiró → triggerSessionInvalid() + logout()');
        triggerSessionInvalid();
        logout();
      }, autoLogoutDelay);
    }

    return () => {
      if (timerRef.current) {
        console.log('[PublicRoute] Timer cancelado (desmontado o cambió estado)');
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isAuthenticated, autoLogoutDelay, logout, triggerSessionInvalid]);

  return <>{children}</>;
}
