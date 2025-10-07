// Export mobile version as default
export { default } from './mobile';
export { HeterogeneousList } from './mobile';
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
} from './mobile';

// Also export mobile version explicitly
export { HeterogeneousList as HeterogeneousListMobile } from './mobile';
export type { HeterogeneousListProps as HeterogeneousListMobileProps } from './mobile';

// Web version placeholder (for future implementation)
// export { HeterogeneousList as HeterogeneousListWeb } from './web';
