import { MobileBasicExample } from '../components/MobileBasicExample';
import { MobileDataExample } from '../components/MobileDataExample';
import { MobileInfoCard } from '../components/MobileInfoCard';
import styles from '../css/GoogleMapDemo.mobile.module.css';

export function GoogleMapDemoMobileView() {
  return (
    <div className={styles.container} data-testid="googlemap-demo-mobile">
      <MobileInfoCard />
      <div className={styles.divider} />
      <MobileBasicExample />
      <div className={styles.divider} />
      <MobileDataExample />
    </div>
  );
}
