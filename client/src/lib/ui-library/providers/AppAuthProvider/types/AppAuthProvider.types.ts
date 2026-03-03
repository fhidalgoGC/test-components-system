import type { ReactNode } from 'react';

export interface AppAuthContextValue {
  isAuthenticated: boolean;
  sessionInvalidated: boolean;
  sessionData: unknown | null;
  getSessionData: <T = unknown>() => T | null;
  updateSessionData: (data: Record<string, unknown>) => void;
  login: (data?: unknown) => void;
  logout: (data?: unknown) => void;
  refreshActivity: () => void;
  triggerSessionInvalid: () => void;
  autoLogoutDelay: number;
}

export interface AppAuthProviderProps {
  children: ReactNode;
  sessionDuration?: number;
  validationInterval?: number;
  sessionDataKey?: string;
  autoLogoutDelay?: number;
  onLogging?: (data?: unknown) => void;
  onLogout?: (data?: unknown) => void;
  onSessionInvalid?: () => void;
}

export interface ProtectedRouteProps {
  children: ReactNode;
  onUnauthorized?: () => void;
  fallback?: ReactNode;
}

export interface PublicRouteProps {
  children: ReactNode;
}
