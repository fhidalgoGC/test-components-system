import { LoginCard as LoginCardWeb } from './web';
import type { LoginCardProps } from './web/types';

export const LoginCard = (props: LoginCardProps) => {
  return <LoginCardWeb {...props} />;
};

export type { LoginCardProps, LoginProvider, LoginConfig } from './web/types';
export { useLoginCardContext } from './web';
