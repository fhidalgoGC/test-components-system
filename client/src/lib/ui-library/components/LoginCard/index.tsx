import { useIsMobile } from '../../hooks';
import { LoginCard as LoginCardMobile } from './mobile';
import { LoginCard as LoginCardWeb } from './web';
import type { LoginCardProps } from './mobile/types';

export const LoginCard = (props: LoginCardProps) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <LoginCardMobile {...props} />;
  }

  return <LoginCardWeb {...props} />;
};

export type { LoginCardProps, LoginProvider, LoginConfig } from './mobile/types';
export { useLoginCardContext } from './mobile';
