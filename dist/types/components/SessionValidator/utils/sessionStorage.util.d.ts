import type { SessionData } from '../types';
export declare function saveSessionToStorage(sessionData: SessionData): void;
export declare function getSessionFromStorage(): SessionData | null;
export declare function clearSessionFromStorage(): void;
export declare function updateLastActivity(): void;
export declare function isSessionExpired(sessionData: SessionData, duration: number): boolean;
export declare function hasValidSession(): boolean;
//# sourceMappingURL=sessionStorage.util.d.ts.map