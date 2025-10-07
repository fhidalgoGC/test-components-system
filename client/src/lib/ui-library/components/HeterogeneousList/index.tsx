// Export web version as default
export { default } from './web';
export { HeterogeneousList } from './web';
export type { HeterogeneousListProps } from './web/types';

// Also export mobile version
export { HeterogeneousList as HeterogeneousListMobile } from './mobile';
export type { HeterogeneousListProps as HeterogeneousListMobileProps } from './mobile/types';
