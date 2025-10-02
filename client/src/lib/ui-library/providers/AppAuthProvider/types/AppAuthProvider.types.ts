import type { ReactNode } from 'react';

export interface AppAuthContextValue {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

export interface AppAuthProviderProps {
  children: ReactNode;
  sessionDuration?: number;
  onSessionInvalid?: () => void;
}
