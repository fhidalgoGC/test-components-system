import { useIsMobile } from '../../hooks';
import { Accordion as AccordionMobile } from './mobile';
import { Accordion as AccordionWeb } from './web';
import type { AccordionProps } from './shared';

export { useAccordionController } from './shared';
export type { AccordionProps, AccordionController } from './shared';

export const Accordion = (props: AccordionProps) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <AccordionMobile {...props} />;
  }

  return <AccordionWeb {...props} />;
};
