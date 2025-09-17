export { ComponentLayoutView } from './ComponentLayout.view';
export { useComponentLayout } from './hooks/ComponentLayout.hook';
export type { ComponentLayoutProps, TabConfig } from './types/ComponentLayout.types';
export * from './utils/ComponentLayout.utils';
export * from './css/ComponentLayout.module';

// Default export for backwards compatibility
import { ComponentLayoutView } from './ComponentLayout.view';
export default ComponentLayoutView;