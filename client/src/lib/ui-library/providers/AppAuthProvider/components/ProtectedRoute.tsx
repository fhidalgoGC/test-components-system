import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { useAppAuth } from '../hooks';
import type { ProtectedRouteProps } from '../types';

export function ProtectedRoute({ children, redirectTo, fallback }: ProtectedRouteProps) {
  const { isAuthenticated } = useAppAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      setLocation(redirectTo);
    }
  }, [isAuthenticated, redirectTo, setLocation]);

  if (!isAuthenticated) {
    return fallback ? <>{fallback}</> : null;
  }

  return <>{children}</>;
}
