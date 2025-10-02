import { createContext, useState, useCallback } from 'react';
import SessionValidator from '@/lib/ui-library/components/SessionValidator';
import { saveSessionToStorage, clearSessionFromStorage } from '@/lib/ui-library/components/SessionValidator/utils';
import type { AppAuthContextValue, AppAuthProviderProps } from '../types';

export const AppAuthContext = createContext<AppAuthContextValue | null>(null);

function generateSessionId(): string {
  return `session-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

export function AppAuthProvider({
  children,
  sessionDuration = 3600000,
  onSessionInvalid,
}: AppAuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = useCallback(() => {
    const sessionId = generateSessionId();
    
    saveSessionToStorage({
      sessionId,
      sessionStartTime: Date.now(),
      lastActivityTime: Date.now(),
    });

    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    clearSessionFromStorage();
    setIsAuthenticated(false);
    onSessionInvalid?.();
  }, [onSessionInvalid]);

  const contextValue: AppAuthContextValue = {
    isAuthenticated,
    login,
    logout,
  };

  return (
    <AppAuthContext.Provider value={contextValue}>
      <SessionValidator
        enabled={isAuthenticated}
        sessionDuration={sessionDuration}
        onSessionInvalid={logout}
      >
        {children}
      </SessionValidator>
    </AppAuthContext.Provider>
  );
}
