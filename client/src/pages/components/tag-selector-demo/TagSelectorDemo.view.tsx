import ComponentLayout from '@/layouts/component-layout';
import { useTagSelectorDemo } from './hooks/TagSelectorDemo.hook';
import styles from './css/TagSelectorDemo.module.css';
import { containerClasses } from './css/TagSelectorDemo.module';

export function TagSelectorDemoView() {
  const { t, currentTheme } = useTagSelectorDemo();

  return (
    <div className={`${containerClasses(currentTheme)} ${styles.container}`} data-testid="tag-selector-demo">
      <ComponentLayout
        componentName={t('componentName')}
        componentDescription={t('componentDescription')}
      />
    </div>
  );
}