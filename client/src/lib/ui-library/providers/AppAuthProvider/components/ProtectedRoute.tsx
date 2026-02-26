import { useEffect, useRef } from 'react';
import { useAppAuth } from '../hooks';
import type { ProtectedRouteProps } from '../types';

export function ProtectedRoute({ children, onUnauthorized, fallback }: ProtectedRouteProps) {
  const { isAuthenticated, refreshActivity, triggerSessionInvalid } = useAppAuth();
  const hasHandledUnauthorized = useRef(false);

  useEffect(() => {
    if (isAuthenticated) {
      refreshActivity();
      hasHandledUnauthorized.current = false;
    }
  }, [isAuthenticated, refreshActivity]);

  useEffect(() => {
    if (!isAuthenticated && !hasHandledUnauthorized.current) {
      hasHandledUnauthorized.current = true;
      triggerSessionInvalid();
      onUnauthorized?.();
    }
  }, [isAuthenticated, onUnauthorized, triggerSessionInvalid]);

  if (!isAuthenticated) {
    return fallback ? <>{fallback}</> : null;
  }

  return <>{children}</>;
}
