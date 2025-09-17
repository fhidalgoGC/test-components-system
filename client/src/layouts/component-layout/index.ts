export { ComponentLayoutView } from './ComponentLayout.view';
export { useComponentLayout } from './ComponentLayout.hook';
export type { ComponentLayoutProps, TabConfig } from './ComponentLayout.types';
export * from './ComponentLayout.utils';
export * from './ComponentLayout.module';

// Default export for backwards compatibility
import { ComponentLayoutView } from './ComponentLayout.view';
export default ComponentLayoutView;