import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { useAppAuth } from '../hooks';
import type { PublicRouteProps } from '../types';

export function PublicRoute({ children, redirectTo, fallback }: PublicRouteProps) {
  const { isAuthenticated } = useAppAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (isAuthenticated) {
      setLocation(redirectTo);
    }
  }, [isAuthenticated, redirectTo, setLocation]);

  if (isAuthenticated) {
    return fallback ? <>{fallback}</> : null;
  }

  return <>{children}</>;
}
