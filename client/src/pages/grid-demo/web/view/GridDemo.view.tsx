import { BasicGridExample } from '../components/BasicGridExample';
import { InfiniteScrollExample } from '../components/InfiniteScrollExample';
import { StatesExample } from '../components/StatesExample';
import styles from '../css/GridDemo.module.css';

export function GridDemoWebView() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title} data-testid="text-page-title">Grid Component</h1>
      <p className={styles.subtitle}>
        Grid Engine declarativo y agnóstico. Solo organiza layout, calcula capacidad y detecta final de scroll.
      </p>

      <BasicGridExample />
      <InfiniteScrollExample />
      <StatesExample />
    </div>
  );
}
