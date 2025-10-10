import { useIsMobile } from '../../hooks';
import { HeterogeneousList as HeterogeneousListMobile } from './mobile';
import { NotImplemented } from '../NotImplemented';
import type {
  HeterogeneousListProps,
  RegistryModeProps,
  RenderItemModeProps,
  ElementsModeProps,
  RegistryItem,
  ListMode,
  DividerVariant,
  LoaderParams,
  DataLoaderResponse,
  ElementsLoaderResponse,
} from './mobile';

// Web version placeholder (uncomment when implemented)
// import { HeterogeneousList as HeterogeneousListWeb } from './web';

export const HeterogeneousList = (props: HeterogeneousListProps) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <HeterogeneousListMobile {...props} />;
  }

  // Return web version when implemented
  // return <HeterogeneousListWeb {...props} />;
  
  // Fallback: web version not implemented
  return <NotImplemented platform="Web" componentName="HeterogeneousList" />;
};

// Export types
export type {
  HeterogeneousListProps,
  RegistryModeProps,
  RenderItemModeProps,
  ElementsModeProps,
  RegistryItem,
  ListMode,
  DividerVariant,
  LoaderParams,
  DataLoaderResponse,
  ElementsLoaderResponse,
};

// Also export mobile version explicitly
export { HeterogeneousList as HeterogeneousListMobile } from './mobile';
export type { HeterogeneousListProps as HeterogeneousListMobileProps } from './mobile';

// Default export
export default HeterogeneousList;
