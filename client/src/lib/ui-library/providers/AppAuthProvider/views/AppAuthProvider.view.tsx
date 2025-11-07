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
} from "../../../components/SessionValidator/utils";
import type { AppAuthContextValue, AppAuthProviderProps } from "../types";
import { environment } from "../../../enviorments/enviroment";
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
  skipInitialValidation = false,
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
  const isLoggingOut = useRef(false);
  const isProcessingEvent = useRef(false);
  const broadcastChannel = useRef<BroadcastChannel | null>(null);
  const onLoggingRef = useRef(onLogging);
  const onLogoutRef = useRef(onLogout);
  const onSessionInvalidRef = useRef(onSessionInvalid);

  useEffect(() => {
    onLoggingRef.current = onLogging;
  }, [onLogging]);

  useEffect(() => {
    onLogoutRef.current = onLogout;
  }, [onLogout]);

  useEffect(() => {
    onSessionInvalidRef.current = onSessionInvalid;
  }, [onSessionInvalid]);

  const login = useCallback((fromBroadcastChannel: boolean = false) => {
    const sessionId = generateSessionId();

    saveSessionToStorage({
      sessionId,
      sessionStartTime: Date.now(),
      lastActivityTime: Date.now(),
    });

    setIsAuthenticated(true);
    isLoggingOut.current = false;
    onLoggingRef.current?.();

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
  }, []);

  const logout = useCallback((fromBroadcastChannel: boolean = false, shouldCallInvalidCallback: boolean = false) => {
    if (isLoggingOut.current) return;
    isLoggingOut.current = true;

    clearSessionFromStorage();
    setIsAuthenticated(false);
    
    // SIEMPRE llamar onLogout cuando hay un logout (manual o automático)
    onLogoutRef.current?.();
    
    // Solo llamar onSessionInvalid si es una invalidación real (expiración o no existe sesión)
    // NO llamar si es un logout manual del usuario
    if (shouldCallInvalidCallback) {
      onSessionInvalidRef.current?.();
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
  }, []);

  useEffect(() => {
    broadcastChannel.current = new BroadcastChannel("app_auth_channel");

    const handleMessage = (event: MessageEvent) => {
      const { type } = event.data;

      console.log("recibiendo eventos");
      if (type === "session_login") {
        isProcessingEvent.current = true;
        const existingSession = getSessionFromStorage();
        if (
          existingSession &&
          !isSessionExpired(existingSession, finalSessionDuration)
        ) {
          login(true);
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
    if (skipInitialValidation) {
      return;
    }

    const existingSession = getSessionFromStorage();
    if (
      existingSession &&
      !isSessionExpired(existingSession, finalSessionDuration)
    ) {
      console.log("useEffect-getSessionFromStorage");
      login(true);
    } else if (existingSession) {
      // Caso 2: Hay sesión pero expiró - SÍ llamar onSessionInvalid
      logout(true, true);
    } else {
      // Caso 3: No hay sesión en localStorage - SÍ llamar onSessionInvalid
      logout(true, true);
    }
  }, [skipInitialValidation]);

  // Función específica para cuando SessionValidator detecta expiración
  const handleSessionValidatorInvalid = useCallback(() => {
    logout(false, true); // SÍ llamar onSessionInvalid porque es expiración real
  }, [logout]);

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
        onSessionInvalid={handleSessionValidatorInvalid}
      >
        {children}
      </SessionValidator>
    </AppAuthContext.Provider>
  );
}
