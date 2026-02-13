import { SplitLayout } from '@/lib/ui-library/components/SplitLayout';
import styles from '../css/SplitLayoutDemo.module.css';

function LeftFormContent() {
  return (
    <div className={styles.formPanel}>
      <h2 className={styles.formTitle}>Create Account</h2>
      <p className={styles.formSubtitle}>Join our platform today</p>
      <input className={styles.formInput} type="text" placeholder="Full Name" data-testid="input-name-standalone" />
      <input className={styles.formInput} type="email" placeholder="Email" data-testid="input-email-standalone" />
      <input className={styles.formInput} type="password" placeholder="Password" data-testid="input-password-standalone" />
      <button className={styles.formButton} data-testid="button-signup-standalone">Create Account</button>
    </div>
  );
}

function RightHeroContent() {
  return (
    <div style={{ color: 'white', maxWidth: 400 }}>
      <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 12 }}>Start your journey</h1>
      <p style={{ fontSize: 14, opacity: 0.85, lineHeight: 1.6 }}>
        Access powerful tools to manage your workflow, collaborate with your team, and grow your business.
      </p>
    </div>
  );
}

export default function ReversedStandalone() {
  return (
    <SplitLayout
      mainPanel={{
        content: <LeftFormContent />,
        verticalAlign: 'center',
        horizontalAlign: 'center',
        padding: 'lg',
        background: { color: '#ffffff' },
      }}
      secondaryPanel={{
        content: <RightHeroContent />,
        verticalAlign: 'center',
        horizontalAlign: 'center',
        padding: 'xl',
        background: {
          gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        },
      }}
      mainSide="left"
      mainWidthPercent={45}
      fullHeight={true}
    />
  );
}
