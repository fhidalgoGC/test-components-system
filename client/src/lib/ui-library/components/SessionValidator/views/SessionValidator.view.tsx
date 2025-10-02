import type { SessionValidatorProps } from '../types';
import { useSessionValidator } from '../hooks';

export const SessionValidatorView = ({
  children,
  enabled = false,
  sessionDuration,
  checkInterval,
  autoActivateIfSession = true,
  onSessionExpired,
  onSessionInvalid,
  onSessionValidated,
}: SessionValidatorProps) => {
  useSessionValidator({
    enabled,
    sessionDuration,
    checkInterval,
    autoActivateIfSession,
    onSessionExpired,
    onSessionInvalid,
    onSessionValidated,
  });

  return <>{children}</>;
};
