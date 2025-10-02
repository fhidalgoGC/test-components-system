import { createContext, useState, useCallback, useRef, useEffect } from 'react';
import SessionValidator from '@/lib/ui-library/components/SessionValidator';
import { saveSessionToStorage, clearSessionFromStorage, getSessionFromStorage, isSessionExpired } from '@/lib/ui-library/components/SessionValidator/utils';
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
  const isLoggingOut = useRef(false);

  useEffect(() => {
    const existingSession = getSessionFromStorage();
    if (existingSession && !isSessionExpired(existingSession, sessionDuration)) {
      setIsAuthenticated(true);
      isLoggingOut.current = false;
    } else if (existingSession) {
      clearSessionFromStorage();
    }
  }, [sessionDuration]);

  const login = useCallback(() => {
    const sessionId = generateSessionId();
    
    saveSessionToStorage({
      sessionId,
      sessionStartTime: Date.now(),
      lastActivityTime: Date.now(),
    });

    setIsAuthenticated(true);
    isLoggingOut.current = false;
  }, []);

  const logout = useCallback(() => {
    if (isLoggingOut.current) return;
    isLoggingOut.current = true;

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
