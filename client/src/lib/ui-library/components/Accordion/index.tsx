import { useIsMobile } from '../../hooks';
import { Accordion as AccordionMobile } from './mobile';
import { Accordion as AccordionWeb } from './web';
import type { AccordionProps } from './shared';

export { useAccordionController } from './shared';
export type { AccordionProps, AccordionController, AccordionItemDataProps } from './shared';

export const Accordion = <T = unknown,>(props: AccordionProps<T>) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <AccordionMobile {...props as any} />;
  }

  return <AccordionWeb {...props as any} />;
};
