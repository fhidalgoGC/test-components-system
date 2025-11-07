import type { ReactNode } from 'react';

export interface AppAuthContextValue {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

export interface AppAuthProviderProps {
  children: ReactNode;
  sessionDuration?: number;
  validationInterval?: number;
  skipInitialValidation?: boolean;
  onLogging?: () => void;
  onLogout?: () => void;
  onSessionInvalid?: () => void;
}
