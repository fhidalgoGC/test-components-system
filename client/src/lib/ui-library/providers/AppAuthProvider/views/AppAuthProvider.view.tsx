import { createContext, useState, useCallback, useRef, useEffect, useContext } from "react";
import SessionValidator from "@/lib/ui-library/components/SessionValidator";
import {
  saveSessionToStorage,
  clearSessionFromStorage,
  getSessionFromStorage,
  isSessionExpired,
} from "@/lib/ui-library/components/SessionValidator/utils";
import type { AppAuthContextValue, AppAuthProviderProps } from "../types";
import { environment } from "@/lib/ui-library/enviorments/enviroment";
import { ConfigContext } from "../../AppEnviromentProvider/index.hook";

export const AppAuthContext = createContext<AppAuthContextValue | null>(null);

function generateSessionId(): string {
  return `session-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

function useOptionalConfig() {
  const configContext = useContext(ConfigContext);
  return configContext?.config || null;
}

export function AppAuthProvider({
  children,
  sessionDuration,
  validationInterval,
  onLogging,
  onSessionInvalid,
}: AppAuthProviderProps) {
  const optionalConfig = useOptionalConfig();
  
  const finalSessionDuration = 
    sessionDuration ?? 
    optionalConfig?.SESSION_CONFIG?.SESSION_DURATION ?? 
    environment.SESSION_CONFIG.SESSION_DURATION;
    
  const finalValidationInterval = 
    validationInterval ?? 
    optionalConfig?.SESSION_CONFIG?.VALIDATION_INTERVAL ?? 
    environment.SESSION_CONFIG.VALIDATION_INTERVAL;
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const isLoggingOut = useRef(false);
  const isProcessingEvent = useRef(false);
  const broadcastChannel = useRef<BroadcastChannel | null>(null);

  const login = useCallback((fromBroadcastChannel: boolean = false) => {
    const sessionId = generateSessionId();

    saveSessionToStorage({
      sessionId,
      sessionStartTime: Date.now(),
      lastActivityTime: Date.now(),
    });

    setIsAuthenticated(true);
    isLoggingOut.current = false;
    onLogging?.();

    if (
      !fromBroadcastChannel &&
      !isProcessingEvent.current &&
      broadcastChannel.current
    ) {
      broadcastChannel.current.postMessage({
        type: "session_login",
        sessionId,
        timestamp: Date.now(),
      });
    }
  }, [onLogging]);

  const logout = useCallback((fromBroadcastChannel: boolean = false) => {
    if (isLoggingOut.current) return;
    isLoggingOut.current = true;

    clearSessionFromStorage();
    setIsAuthenticated(false);
    onSessionInvalid?.();

    if (
      !fromBroadcastChannel &&
      !isProcessingEvent.current &&
      broadcastChannel.current
    ) {
      broadcastChannel.current.postMessage({
        type: "session_logout",
        timestamp: Date.now(),
      });
    }
  }, [onSessionInvalid]);

  useEffect(() => {
    broadcastChannel.current = new BroadcastChannel("app_auth_channel");

    const handleMessage = (event: MessageEvent) => {
      const { type } = event.data;

      if (type === "session_login") {
        isProcessingEvent.current = true;
        const existingSession = getSessionFromStorage();
        if (existingSession) {
          login(true);
          isLoggingOut.current = false;
        }
        isProcessingEvent.current = false;
      } else if (type === "session_logout") {
        isProcessingEvent.current = true;
        logout(true);
        isProcessingEvent.current = false;
      }
    };

    broadcastChannel.current.onmessage = handleMessage;

    return () => {
      if (broadcastChannel.current) {
        broadcastChannel.current.close();
        broadcastChannel.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const existingSession = getSessionFromStorage();
    if (
      existingSession &&
      !isSessionExpired(existingSession, finalSessionDuration)
    ) {
      setIsAuthenticated(true);
      isLoggingOut.current = false;
      login(true);
    } else if (existingSession) {
      logout(true);
    }
  }, [finalSessionDuration, logout]);

  const contextValue: AppAuthContextValue = {
    isAuthenticated,
    login,
    logout,
  };

  return (
    <AppAuthContext.Provider value={contextValue}>
      <SessionValidator
        enabled={isAuthenticated}
        sessionDuration={finalSessionDuration}
        checkInterval={finalValidationInterval}
        onSessionInvalid={logout}
      >
        {children}
      </SessionValidator>
    </AppAuthContext.Provider>
  );
}
