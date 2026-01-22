import { useIsMobile } from '../../hooks';
import { UniversalCard as UniversalCardWeb } from './web';
import { UniversalCard as UniversalCardMobile } from './mobile';
import type { UniversalCardProps } from './web/types';

export const UniversalCard = (props: UniversalCardProps) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <UniversalCardMobile />;
  }

  return <UniversalCardWeb {...props} />;
};

export type { UniversalCardProps, SizeValue, CardStyles } from './web/types';
