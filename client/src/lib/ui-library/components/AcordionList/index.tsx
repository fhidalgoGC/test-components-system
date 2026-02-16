import { useIsMobile } from '../../hooks';
import { AcordionList as AcordionListMobile } from './mobile';
import { AcordionList as AcordionListWeb } from './web';
import type { AcordionListProps } from './shared';

export { useAcordionListController } from './shared';
export type {
  AcordionListProps,
  AcordionListController,
  AcordionListItemDataProps,
  AcordionListCallbacks,
  AcordionListBehaviors,
  AcordionListLayout,
  AcordionListItemHeader,
  AcordionListItemBody,
} from './shared';

export const AcordionList = <T = any, R = any>(props: AcordionListProps<T, R>) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <AcordionListMobile {...props as any} />;
  }

  return <AcordionListWeb {...props as any} />;
};
