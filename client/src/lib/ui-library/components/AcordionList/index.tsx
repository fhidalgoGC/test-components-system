import { useIsMobile } from '../../hooks';
import { AcordionList as AcordionListMobile } from './mobile';
import { AcordionList as AcordionListWeb } from './web';
import type { AcordionListProps } from './web/types';

export const AcordionList = (props: AcordionListProps) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <AcordionListMobile {...props} />;
  }

  return <AcordionListWeb {...props} />;
};

export type { AcordionListProps };
