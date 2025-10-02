import type { SessionValidatorProps } from '../types';
import { useSessionValidator } from '../hooks';

export const SessionValidatorView = ({
  children,
  enabled = false,
  sessionDuration,
  checkInterval,
  autoActivateIfSession = true,
  onSessionInvalid,
}: SessionValidatorProps) => {
  useSessionValidator({
    enabled,
    sessionDuration,
    checkInterval,
    autoActivateIfSession,
    onSessionInvalid,
  });

  return <>{children}</>;
};
