import { SplitLayout } from '@/lib/ui-library/components/SplitLayout';
import heroImg from '@assets/Screenshot_2026-02-13_at_12.11.37_p.m._1771006299518.png';
import styles from '../css/SplitLayoutDemo.module.css';

function HeroContent() {
  return (
    <div className={styles.heroPanel}>
      <h1 className={styles.heroTitle}>
        <span className={styles.heroTitleAccent}>Simplified</span> logistics management
      </h1>
      <p className={styles.heroText}>
        Coordinate and manage the transportation of your commodities from the collection point to final delivery.
      </p>
      <p className={styles.heroCopyright}>&copy; 2026 FarmChain All Rights Reserved.</p>
    </div>
  );
}

function FormContent() {
  return (
    <div className={styles.formPanel}>
      <div className={styles.formLogo}>F</div>
      <h2 className={styles.formTitle}>Welcome</h2>
      <p className={styles.formSubtitle}>Log in to access your space</p>
      <input className={styles.formInput} type="email" placeholder="Email address" data-testid="input-email-standalone" />
      <input className={styles.formInput} type="password" placeholder="Password" data-testid="input-password-standalone" />
      <div className={styles.formRow}>
        <label className={styles.formCheckbox}>
          <input type="checkbox" data-testid="checkbox-remember-standalone" />
          Remember me
        </label>
        <a href="#" className={styles.formLink}>Forgot your password?</a>
      </div>
      <button className={styles.formButton} data-testid="button-login-standalone">Log in</button>
      <div className={styles.formFooter}>
        <span>Don't have an account?</span>
        <a href="#" className={styles.formFooterLink}>Sign up here</a>
      </div>
    </div>
  );
}

export default function BasicStandalone() {
  return (
    <SplitLayout
      mainPanel={{
        content: <FormContent />,
        verticalAlign: 'center',
        horizontalAlign: 'center',
        padding: 'lg',
      }}
      secondaryPanel={{
        content: <HeroContent />,
        verticalAlign: 'bottom',
        horizontalAlign: 'left',
        padding: 'lg',
        background: {
          image: heroImg,
          size: 'cover',
          position: 'center',
          overlay: 'rgba(0, 0, 0, 0.5)',
        },
      }}
      mainSide="right"
      mainWidthPercent={45}
      fullHeight={true}
    />
  );
}
