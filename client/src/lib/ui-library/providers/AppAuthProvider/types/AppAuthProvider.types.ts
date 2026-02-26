import type { ReactNode } from 'react';

export interface AppAuthContextValue {
  isAuthenticated: boolean;
  sessionData: unknown | null;
  login: (data?: unknown) => void;
  logout: (data?: unknown) => void;
  refreshActivity: () => void;
  triggerSessionInvalid: () => void;
}

export interface AppAuthProviderProps {
  children: ReactNode;
  sessionDuration?: number;
  validationInterval?: number;
  sessionDataKey?: string;
  onLogging?: (data?: unknown) => void;
  onLogout?: (data?: unknown) => void;
  onSessionInvalid?: () => void;
}

export interface ProtectedRouteProps {
  children: ReactNode;
  onUnauthorized: () => void;
  fallback?: ReactNode;
}

export interface PublicRouteProps {
  children: ReactNode;
}
