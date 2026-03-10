import { useIsMobile } from '../../../hooks';
import { BottomSheetWrapperMobileView } from './mobile';
import { NotImplemented } from '../../NotImplemented';
import type { BottomSheetWrapperProps } from './mobile/types';

export const BottomSheetWrapper = (props: BottomSheetWrapperProps) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <BottomSheetWrapperMobileView {...props} />;
  }

  return <NotImplemented platform="Web" componentName="BottomSheetWrapper" />;
};

export type { BottomSheetWrapperProps, BottomSheetHeightMode } from './mobile/types';
