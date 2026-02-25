import type { ReactNode } from 'react';

export interface AppAuthContextValue {
  isAuthenticated: boolean;
  sessionData: unknown | null;
  login: (data?: unknown) => void;
  logout: () => void;
}

export interface AppAuthProviderProps {
  children: ReactNode;
  sessionDuration?: number;
  validationInterval?: number;
  skipInitialValidation?: boolean;
  sessionDataKey?: string;
  onLogging?: () => void;
  onLogout?: () => void;
  onSessionInvalid?: () => void;
}

export interface ProtectedRouteProps {
  children: ReactNode;
  redirectTo: string;
  fallback?: ReactNode;
}

export interface PublicRouteProps {
  children: ReactNode;
  redirectTo: string;
  fallback?: ReactNode;
}
