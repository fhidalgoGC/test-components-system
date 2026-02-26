import { useEffect } from 'react';
import { useAppAuth } from '../hooks';
import type { ProtectedRouteProps } from '../types';

export function ProtectedRoute({ children, onUnauthorized, fallback }: ProtectedRouteProps) {
  const { isAuthenticated, sessionInvalidated, refreshActivity, triggerSessionInvalid } = useAppAuth();

  useEffect(() => {
    if (isAuthenticated) {
      refreshActivity();
    }
  }, [isAuthenticated, refreshActivity]);

  useEffect(() => {
    if (!isAuthenticated && !sessionInvalidated) {
      triggerSessionInvalid();
      onUnauthorized?.();
    }
  }, [isAuthenticated, sessionInvalidated, onUnauthorized, triggerSessionInvalid]);

  if (!isAuthenticated) {
    return fallback ? <>{fallback}</> : null;
  }

  return <>{children}</>;
}
