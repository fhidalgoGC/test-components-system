export { ComponentDemoView } from './views/ComponentDemo.view';
export { useComponentDemo } from './hooks/ComponentDemo.hook';
export * from './css/ComponentDemo.module';
export * from './i18n';

// Default export for backwards compatibility
import { ComponentDemoView } from './views/ComponentDemo.view';
export default ComponentDemoView;