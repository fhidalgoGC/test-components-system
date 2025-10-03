import { useState, useEffect, useCallback, useRef, useContext } from "react";
import type { SessionData, SessionValidatorProps } from "../types";
import {
  getSessionFromStorage,
  isSessionExpired,
  hasValidSession,
  updateLastActivity,
} from "../utils";
import { environment } from "@/lib/ui-library/enviorments/enviroment";
import { ConfigContext } from "@/lib/ui-library/providers/AppEnviromentProvider/index.hook";

function useOptionalConfig() {
  const configContext = useContext(ConfigContext);
  return configContext?.config || null;
}

export function useSessionValidator({
  enabled = false,
  sessionDuration,
  checkInterval,
  autoActivateIfSession = true,
  onSessionInvalid,
}: Omit<SessionValidatorProps, "children">) {
  const optionalConfig = useOptionalConfig();
  
  const finalSessionDuration = sessionDuration ?? 
    optionalConfig?.SESSION_CONFIG?.SESSION_DURATION ?? 
    environment.SESSION_CONFIG.SESSION_DURATION;
    
  const finalCheckInterval = checkInterval ?? 
    optionalConfig?.SESSION_CONFIG?.VALIDATION_INTERVAL ?? 
    environment.SESSION_CONFIG.VALIDATION_INTERVAL;
  const [sessionData, setSessionData] = useState<SessionData | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const hasCalledInvalidRef = useRef(false);

  // Determine if validation should be active
  const isActive = enabled || (autoActivateIfSession && hasValidSession());

  // Initialize session from storage
  useEffect(() => {
    if (!isActive) return;

    const storedSession = getSessionFromStorage();

    if (storedSession) {
      setSessionData(storedSession);
    } else {
      // No session in storage, mark as invalid
      if (!hasCalledInvalidRef.current) {
        hasCalledInvalidRef.current = true;
        onSessionInvalid?.();
      }
    }
  }, [isActive, onSessionInvalid]);

  // Validation function
  const validateSession = useCallback(() => {
    if (!isActive) return;

    console.log('[SessionValidator] Validando sesión...', new Date().toLocaleTimeString());

    setIsValidating(true);

    const storedSession = getSessionFromStorage();

    if (!storedSession) {
      // Session missing - invalid
      if (!hasCalledInvalidRef.current) {
        hasCalledInvalidRef.current = true;
        onSessionInvalid?.();
      }
      setIsValidating(false);
      return;
    }

    // Check if session is expired
    if (isSessionExpired(storedSession, finalSessionDuration)) {
      if (!hasCalledInvalidRef.current) {
        hasCalledInvalidRef.current = true;
        onSessionInvalid?.();
      }
      setIsValidating(false);
      return;
    }

    // Session is valid - update activity
    updateLastActivity();
    setSessionData(storedSession);
    setIsValidating(false);
  }, [isActive, finalSessionDuration, onSessionInvalid]);

  // Start validation interval
  useEffect(() => {
    if (!isActive) {
      // Clear interval if not active
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      // Reset flag
      hasCalledInvalidRef.current = false;
      return;
    }

    // Initial validation
    validateSession();

    // Setup interval
    intervalRef.current = setInterval(() => {
      validateSession();
    }, finalCheckInterval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isActive, finalCheckInterval, validateSession]);

  return {
    isActive,
    sessionData,
    isValidating,
  };
}
