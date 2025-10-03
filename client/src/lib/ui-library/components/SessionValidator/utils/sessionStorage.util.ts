import type { SessionData } from '../types';

const SESSION_STORAGE_KEY = 'app_session_data';

export function saveSessionToStorage(sessionData: SessionData): void {
  try {
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessionData));
  } catch (error) {
    console.error('Failed to save session to storage:', error);
  }
}

export function getSessionFromStorage(): SessionData | null {
  try {
    const data = localStorage.getItem(SESSION_STORAGE_KEY);
    if (!data) return null;
    
    const parsed = JSON.parse(data) as SessionData;
    
    if (!parsed.sessionId || !parsed.sessionStartTime || !parsed.lastActivityTime) {
      return null;
    }
    
    return parsed;
  } catch (error) {
    console.error('Failed to get session from storage:', error);
    return null;
  }
}

export function clearSessionFromStorage(): void {
  try {
    localStorage.removeItem(SESSION_STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear session from storage:', error);
  }
}

export function updateLastActivity(): void {
  const session = getSessionFromStorage();
  if (session) {
    saveSessionToStorage({
      ...session,
      lastActivityTime: Date.now(),
    });
  }
}

export function isSessionExpired(sessionData: SessionData, duration: number): boolean {
  const now = Date.now();
  const elapsed = now - sessionData.sessionStartTime;
  return elapsed > duration;
}

export function hasValidSession(): boolean {
  const session = getSessionFromStorage();
  return session !== null && !!session.sessionId;
}
