import type { SessionData, SessionValidatorProps } from "../types";
export declare function useSessionValidator({ enabled, sessionDuration, checkInterval, autoActivateIfSession, onSessionInvalid, }: Omit<SessionValidatorProps, "children">): {
    isActive: boolean;
    sessionData: SessionData | null;
    isValidating: boolean;
};
//# sourceMappingURL=useSessionValidator.hook.d.ts.map