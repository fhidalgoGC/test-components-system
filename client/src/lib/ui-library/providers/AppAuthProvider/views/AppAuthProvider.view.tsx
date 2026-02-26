import {
  createContext,
  useState,
  useCallback,
  useRef,
  useEffect,
  useContext,
} from "react";
import SessionValidator from "../../../components/SessionValidator";
import {
  saveSessionToStorage,
  clearSessionFromStorage,
  getSessionFromStorage,
  isSessionExpired,
  updateLastActivity,
} from "../../../components/SessionValidator/utils";
import type { AppAuthContextValue, AppAuthProviderProps } from "../types";
import { environment } from "../../../enviorments/enviroment";
import { ConfigContext } from "../../AppEnviromentProvider/index.hook";

export const AppAuthContext = createContext<AppAuthContextValue | null>(null);

const DEFAULT_SESSION_DATA_KEY = "app_auth_session_data";

function generateSessionId(): string {
  return `session-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

function useOptionalConfig() {
  const configContext = useContext(ConfigContext);
  return configContext?.config || null;
}

function loadSessionData(key: string): unknown | null {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function saveSessionData(key: string, data: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {
  }
}

function clearSessionData(key: string): void {
  localStorage.removeItem(key);
}

export function AppAuthProvider({
  children,
  sessionDuration,
  validationInterval,
  sessionDataKey = DEFAULT_SESSION_DATA_KEY,
  autoLogoutDelay = 30000,
  onLogging,
  onLogout,
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
  const [sessionInvalidated, setSessionInvalidated] = useState(false);
  const [sessionData, setSessionData] = useState<unknown | null>(null);
  const isLoggingOut = useRef(false);
  const isProcessingEvent = useRef(false);
  const isMountedRef = useRef(false);
  const broadcastChannel = useRef<BroadcastChannel | null>(null);
  const onLoggingRef = useRef(onLogging);
  const onLogoutRef = useRef(onLogout);
  const onSessionInvalidRef = useRef(onSessionInvalid);

  const pendingCallbackRef = useRef<{
    type: 'login' | 'logout';
    data?: unknown;
    shouldCallInvalid?: boolean;
  } | null>(null);

  useEffect(() => {
    onLoggingRef.current = onLogging;
  }, [onLogging]);

  useEffect(() => {
    onLogoutRef.current = onLogout;
  }, [onLogout]);

  useEffect(() => {
    onSessionInvalidRef.current = onSessionInvalid;
  }, [onSessionInvalid]);

  useEffect(() => {
    if (!isMountedRef.current) {
      isMountedRef.current = true;
      return;
    }

    if (pendingCallbackRef.current === null) return;

    const pending = pendingCallbackRef.current;
    pendingCallbackRef.current = null;

    if (pending.type === 'login') {
      onLoggingRef.current?.(pending.data);
    } else if (pending.type === 'logout') {
      onLogoutRef.current?.(pending.data);
      if (pending.shouldCallInvalid) {
        onSessionInvalidRef.current?.();
      }
    }
  }, [isAuthenticated, sessionInvalidated]);

  const login = useCallback((data?: unknown, fromBroadcastChannel: boolean = false) => {
    const sessionId = generateSessionId();

    saveSessionToStorage({
      sessionId,
      sessionStartTime: Date.now(),
      lastActivityTime: Date.now(),
    });

    if (data !== undefined) {
      saveSessionData(sessionDataKey, data);
    }

    pendingCallbackRef.current = { type: 'login', data };

    if (data !== undefined) {
      setSessionData(data);
    } else {
      const existing = loadSessionData(sessionDataKey);
      setSessionData(existing);
    }
    setIsAuthenticated(true);
    setSessionInvalidated(false);
    isLoggingOut.current = false;

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
  }, [sessionDataKey]);

  const logout = useCallback((fromBroadcastChannel: boolean = false, shouldCallInvalidCallback: boolean = false, logoutData?: unknown) => {
    if (isLoggingOut.current) {
      return;
    }
    isLoggingOut.current = true;

    clearSessionFromStorage();
    clearSessionData(sessionDataKey);

    pendingCallbackRef.current = { type: 'logout', data: logoutData, shouldCallInvalid: shouldCallInvalidCallback };

    setIsAuthenticated(false);
    setSessionData(null);
    if (shouldCallInvalidCallback) {
      setSessionInvalidated(true);
    }

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
  }, [sessionDataKey]);

  useEffect(() => {
    broadcastChannel.current = new BroadcastChannel("app_auth_channel");

    const handleMessage = (event: MessageEvent) => {
      const { type } = event.data;

      if (type === "session_login") {
        isProcessingEvent.current = true;
        const existingSession = getSessionFromStorage();
        if (
          existingSession &&
          !isSessionExpired(existingSession, finalSessionDuration)
        ) {
          login(undefined, true);
          isLoggingOut.current = false;
        }
        isProcessingEvent.current = false;
      } else if (type === "session_logout") {
        isProcessingEvent.current = true;
        logout(true, false);
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
      login(undefined, true);
    } else if (existingSession) {
      logout(true, true);
    } else {
      logout(true, true);
    }
  }, []);

  const handleSessionValidatorInvalid = useCallback(() => {
    logout(false, true);
  }, [logout]);

  const publicLogin = useCallback((data?: unknown) => {
    login(data, false);
  }, [login]);

  const publicLogout = useCallback((data?: unknown) => {
    logout(false, false, data);
  }, [logout]);

  const refreshActivity = useCallback(() => {
    if (isAuthenticated) {
      updateLastActivity();
    }
  }, [isAuthenticated]);

  const triggerSessionInvalid = useCallback(() => {
    setSessionInvalidated(true);
    onSessionInvalidRef.current?.();
  }, []);

  const contextValue: AppAuthContextValue = {
    isAuthenticated,
    sessionInvalidated,
    sessionData,
    login: publicLogin,
    logout: publicLogout,
    refreshActivity,
    triggerSessionInvalid,
    autoLogoutDelay,
  };

  return (
    <AppAuthContext.Provider value={contextValue}>
      <SessionValidator
        enabled={isAuthenticated}
        sessionDuration={finalSessionDuration}
        checkInterval={finalValidationInterval}
        onSessionInvalid={handleSessionValidatorInvalid}
      >
        {children}
      </SessionValidator>
    </AppAuthContext.Provider>
  );
}
