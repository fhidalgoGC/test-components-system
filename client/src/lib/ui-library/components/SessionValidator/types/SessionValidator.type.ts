import type { ReactNode } from 'react';

export interface SessionData {
  sessionId: string;
  sessionStartTime: number;
  lastActivityTime: number;
}

export interface SessionValidatorProps {
  children: ReactNode;
  enabled?: boolean;
  sessionDuration?: number;
  checkInterval?: number;
  autoActivateIfSession?: boolean;
  onSessionExpired?: () => void;
  onSessionInvalid?: () => void;
  onSessionValidated?: (sessionData: SessionData) => void;
}

export interface SessionValidatorState {
  isActive: boolean;
  sessionData: SessionData | null;
  isValidating: boolean;
}
