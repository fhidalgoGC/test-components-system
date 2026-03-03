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
import { deepMerge } from "../utils";

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
      console.log('[AppAuth] 4. useEffect post-render → isAuthenticated ya es true → llamando onLogging callback', { data: pending.data, isAuthenticated });
      onLoggingRef.current?.(pending.data);
      console.log('[AppAuth] 5. onLogging callback terminó');
    } else if (pending.type === 'logout') {
      console.log('[AppAuth] 4. useEffect post-render → isAuthenticated ya es false → llamando onLogout callback', { data: pending.data, isAuthenticated });
      onLogoutRef.current?.(pending.data);
      if (pending.shouldCallInvalid) {
        console.log('[AppAuth] 5. Llamando onSessionInvalid callback');
        onSessionInvalidRef.current?.();
      }
    }
  }, [isAuthenticated, sessionInvalidated]);

  const login = useCallback((data?: unknown, fromBroadcastChannel: boolean = false) => {
    console.log('[AppAuth] 1. login() llamado', { data, fromBroadcastChannel });

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

    console.log('[AppAuth] 2. setState → isAuthenticated=true, sessionInvalidated=false (encolado, aún NO aplicado)');
    if (data !== undefined) {
      setSessionData(data);
    } else {
      const existing = loadSessionData(sessionDataKey);
      setSessionData(existing);
    }
    setIsAuthenticated(true);
    setSessionInvalidated(false);
    isLoggingOut.current = false;

    console.log('[AppAuth] 3. login() terminó → React hará render → luego useEffect llamará callback');

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
      console.log('[AppAuth] logout() ignorado (ya en proceso)');
      return;
    }
    console.log('[AppAuth] 1. logout() llamado', { fromBroadcastChannel, shouldCallInvalidCallback, logoutData });
    isLoggingOut.current = true;

    clearSessionFromStorage();
    clearSessionData(sessionDataKey);

    pendingCallbackRef.current = { type: 'logout', data: logoutData, shouldCallInvalid: shouldCallInvalidCallback };

    console.log('[AppAuth] 2. setState → isAuthenticated=false' + (shouldCallInvalidCallback ? ', sessionInvalidated=true' : '') + ' (encolado, aún NO aplicado)');
    setIsAuthenticated(false);
    setSessionData(null);
    if (shouldCallInvalidCallback) {
      setSessionInvalidated(true);
    }

    console.log('[AppAuth] 3. logout() terminó → React hará render → luego useEffect llamará callback');

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
    console.log('[AppAuth] PROVIDER MONTADO → verificando sesión en localStorage');
    const existingSession = getSessionFromStorage();
    if (
      existingSession &&
      !isSessionExpired(existingSession, finalSessionDuration)
    ) {
      console.log('[AppAuth] Sesión válida encontrada → restaurando');
      login(undefined, true);
    } else if (existingSession) {
      console.log('[AppAuth] Sesión expirada → limpiando');
      logout(true, true);
    } else {
      console.log('[AppAuth] Sin sesión previa → estado inicial');
      logout(true, true);
    }
  }, []);

  const handleSessionValidatorInvalid = useCallback(() => {
    console.log('[AppAuth] SessionValidator → sesión expirada por inactividad');
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
      console.log('[AppAuth] refreshActivity() → lastActivityTime renovado');
      updateLastActivity();
    }
  }, [isAuthenticated]);

  const triggerSessionInvalid = useCallback(() => {
    console.log('[AppAuth] triggerSessionInvalid()');
    setSessionInvalidated(true);
    onSessionInvalidRef.current?.();
  }, []);

  const getSessionData = useCallback(<T = unknown,>(): T | null => {
    return sessionData as T | null;
  }, [sessionData]);

  const updateSessionData = useCallback((data: Record<string, unknown>) => {
    if (!isAuthenticated) {
      console.warn('[AppAuth] updateSessionData ignorado: no hay sesión activa. Debes llamar login() primero.');
      return;
    }

    setSessionData(prev => {
      const currentData: Record<string, unknown> =
        prev !== null && typeof prev === 'object' && !Array.isArray(prev)
          ? (prev as Record<string, unknown>)
          : {};

      const newData = deepMerge(currentData, data);
      saveSessionData(sessionDataKey, newData);
      return newData;
    });
  }, [isAuthenticated, sessionDataKey]);

  const contextValue: AppAuthContextValue = {
    isAuthenticated,
    sessionInvalidated,
    sessionData,
    getSessionData,
    updateSessionData,
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
