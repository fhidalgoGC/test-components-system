import { useEffect } from 'react';
import { useAppAuth } from '../hooks';
import type { ProtectedRouteProps } from '../types';

export function ProtectedRoute({ children, onUnauthorized, fallback }: ProtectedRouteProps) {
  const { isAuthenticated, sessionInvalidated, refreshActivity, triggerSessionInvalid } = useAppAuth();

  console.log('[ProtectedRoute] RENDER', { isAuthenticated, sessionInvalidated });

  useEffect(() => {
    console.log('[ProtectedRoute] MONTADO (useEffect)', { isAuthenticated, sessionInvalidated });
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      console.log('[ProtectedRoute] Sesión activa → refreshActivity()');
      refreshActivity();
    }
  }, [isAuthenticated, refreshActivity]);

  useEffect(() => {
    if (!isAuthenticated && !sessionInvalidated) {
      console.log('[ProtectedRoute] Sin sesión + no invalidada → triggerSessionInvalid() + onUnauthorized()');
      triggerSessionInvalid();
      onUnauthorized?.();
    } else if (!isAuthenticated && sessionInvalidated) {
      console.log('[ProtectedRoute] Sin sesión + ya invalidada → NO dispara callbacks (duplicado evitado)');
    }
  }, [isAuthenticated, sessionInvalidated, onUnauthorized, triggerSessionInvalid]);

  if (!isAuthenticated) {
    console.log('[ProtectedRoute] Renderizando fallback (no autenticado)');
    return fallback ? <>{fallback}</> : null;
  }

  console.log('[ProtectedRoute] Renderizando children (autenticado)');
  return <>{children}</>;
}
