import { useResponsive } from '@/lib/ui-library/hooks/useResponsive';
import { ModalDemoWebView } from './web/view/ModalDemo.view';
import { ModalDemoMobileView } from './mobile/view/ModalDemo.view';

const ModalDemo = () => {
  const { isMobile } = useResponsive();

  if (isMobile) {
    return <ModalDemoMobileView />;
  }

  return <ModalDemoWebView />;
};

export default ModalDemo;
