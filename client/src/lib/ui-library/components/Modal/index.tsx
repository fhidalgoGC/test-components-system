import { useIsMobile } from '../../hooks';
import { Modal as ModalMobile } from './mobile';
import { Modal as ModalWeb } from './web';
import type { ModalProps } from './types';

export const Modal = (props: ModalProps) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <ModalMobile {...props} />;
  }

  return <ModalWeb {...props} />;
};

export type { ModalProps };
export { useModalController } from './hooks';
export type { ModalControllerReturn, ModalState, OverlayConfig, CloseButtonConfig, LayoutConfig, SectionConfig, StateConfig, StatesComponents, ModalCallbacks, ModalDataItem } from './types';
