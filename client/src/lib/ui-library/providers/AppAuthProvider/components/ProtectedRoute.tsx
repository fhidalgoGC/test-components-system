import { useEffect } from 'react';
import { useAppAuth } from '../hooks';
import type { ProtectedRouteProps } from '../types';

export function ProtectedRoute({ children, onUnauthorized, fallback }: ProtectedRouteProps) {
  const { isAuthenticated, refreshActivity } = useAppAuth();

  useEffect(() => {
    if (isAuthenticated) {
      refreshActivity();
    }
  }, [isAuthenticated, refreshActivity]);

  useEffect(() => {
    if (!isAuthenticated) {
      onUnauthorized();
    }
  }, [isAuthenticated, onUnauthorized]);

  if (!isAuthenticated) {
    return fallback ? <>{fallback}</> : null;
  }

  return <>{children}</>;
}
