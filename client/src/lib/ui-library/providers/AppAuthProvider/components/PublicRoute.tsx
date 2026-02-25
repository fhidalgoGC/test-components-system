import { useAppAuth } from '../hooks';
import type { PublicRouteProps } from '../types';

export function PublicRoute({ children }: PublicRouteProps) {
  const { isAuthenticated } = useAppAuth();

  if (isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
