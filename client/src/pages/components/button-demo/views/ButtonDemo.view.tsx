import ComponentLayout from '@/layouts/component-layout';
import { useButtonDemo } from '../hooks/ButtonDemo.hook';
import styles from '../css/ButtonDemo.module.css';
import { containerClasses } from '../css/ButtonDemo.module';

export function ButtonDemoView() {
  const { t, currentTheme } = useButtonDemo();

  return (
    <div className={`${containerClasses(currentTheme)} ${styles.container}`} data-testid="button-demo">
      <ComponentLayout
        componentName={t('componentName')}
        componentDescription={t('componentDescription')}
      />
    </div>
  );
}