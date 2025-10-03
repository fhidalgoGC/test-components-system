import type { ReactNode } from 'react';

export interface AppAuthContextValue {
  isAuthenticated: boolean;
  login: () => void;
  loginCallback: (customOnLogging?: () => void, fromBroadcastChannel?: boolean) => void;
  logout: () => void;
  logoutCallback: (customOnSessionInvalid?: () => void, fromBroadcastChannel?: boolean) => void;
}

export interface AppAuthProviderProps {
  children: ReactNode;
  sessionDuration?: number;
  validationInterval?: number;
  onLogging?: () => void;
  onSessionInvalid?: () => void;
}
