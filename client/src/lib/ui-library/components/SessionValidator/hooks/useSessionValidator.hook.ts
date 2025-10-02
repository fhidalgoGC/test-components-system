import { useState, useEffect, useCallback, useRef } from 'react';
import type { SessionData, SessionValidatorProps } from '../types';
import {
  getSessionFromStorage,
  saveSessionToStorage,
  clearSessionFromStorage,
  isSessionExpired,
  hasValidSession,
  updateLastActivity,
} from '../utils';

const DEFAULT_SESSION_DURATION = 3600000; // 1 hour
const DEFAULT_CHECK_INTERVAL = 60000; // 1 minute

export function useSessionValidator({
  enabled = false,
  sessionDuration = DEFAULT_SESSION_DURATION,
  checkInterval = DEFAULT_CHECK_INTERVAL,
  autoActivateIfSession = true,
  onSessionInvalid,
}: Omit<SessionValidatorProps, 'children'>) {
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
        clearSessionFromStorage();
        onSessionInvalid?.();
      }
    }
  }, [isActive, onSessionInvalid]);

  // Validation function
  const validateSession = useCallback(() => {
    if (!isActive) return;

    setIsValidating(true);

    const storedSession = getSessionFromStorage();

    if (!storedSession) {
      // Session missing - invalid
      if (!hasCalledInvalidRef.current) {
        hasCalledInvalidRef.current = true;
        clearSessionFromStorage();
        onSessionInvalid?.();
      }
      setIsValidating(false);
      return;
    }

    // Check if session is expired
    if (isSessionExpired(storedSession, sessionDuration)) {
      if (!hasCalledInvalidRef.current) {
        hasCalledInvalidRef.current = true;
        clearSessionFromStorage();
        onSessionInvalid?.();
      }
      setIsValidating(false);
      return;
    }

    // Session is valid - update activity
    updateLastActivity();
    setSessionData(storedSession);
    setIsValidating(false);
  }, [isActive, sessionDuration, onSessionInvalid]);

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
    }, checkInterval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isActive, checkInterval, validateSession]);

  // Public API for initializing session
  const initializeSession = useCallback((sessionId: string) => {
    const newSession: SessionData = {
      sessionId,
      sessionStartTime: Date.now(),
      lastActivityTime: Date.now(),
    };

    saveSessionToStorage(newSession);
    setSessionData(newSession);
    
    // Reset flag when initializing new session
    hasCalledInvalidRef.current = false;
  }, []);

  // Public API for clearing session
  const clearSession = useCallback(() => {
    clearSessionFromStorage();
    setSessionData(null);
  }, []);

  return {
    isActive,
    sessionData,
    isValidating,
    initializeSession,
    clearSession,
  };
}
