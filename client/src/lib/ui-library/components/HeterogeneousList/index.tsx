import { useIsMobile } from '../../hooks';
import { HeterogeneousList as HeterogeneousListMobile } from './mobile';
import { HeterogeneousList as HeterogeneousListWeb } from './web';
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

export const HeterogeneousList = (props: HeterogeneousListProps) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <HeterogeneousListMobile {...props} />;
  }

  // Web version
  return <HeterogeneousListWeb {...props} />;
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
