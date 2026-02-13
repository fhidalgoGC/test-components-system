import { SplitLayout } from '@/layouts/split-layout-component';
import styles from '../css/SplitLayoutDemo.module.css';
import heroImg from '@assets/Screenshot_2026-02-13_at_12.11.37_p.m._1771006299518.png';

function HeroContent() {
  return (
    <div className={styles.heroPanel}>
      <h1 className={styles.heroTitle}>
        <span className={styles.heroTitleAccent}>Simplified</span> logistics management
      </h1>
      <p className={styles.heroText}>
        Coordinate and manage the transportation of your commodities from the collection point to final delivery.
      </p>
      <p className={styles.heroCopyright}>© 2026 FarmChain All Rights Reserved.</p>
    </div>
  );
}

function FormContent() {
  return (
    <div className={styles.formPanel}>
      <div className={styles.formLogo}>F</div>
      <h2 className={styles.formTitle}>Welcome</h2>
      <p className={styles.formSubtitle}>Log in to access your space</p>
      <input className={styles.formInput} type="email" placeholder="Email address" data-testid="input-email" />
      <input className={styles.formInput} type="password" placeholder="Password" data-testid="input-password" />
      <div className={styles.formRow}>
        <label className={styles.formCheckbox}>
          <input type="checkbox" data-testid="checkbox-remember" />
          Remember me
        </label>
        <a href="#" className={styles.formLink}>Forgot your password?</a>
      </div>
      <button className={styles.formButton} data-testid="button-login">Log in</button>
      <div className={styles.formFooter}>
        <span>Don't have an account?</span>
        <a href="#" className={styles.formFooterLink}>Sign up here</a>
      </div>
      <div className={styles.formHelp}>
        Having trouble with your account?
        <br />
        <a href="#" className={styles.formHelpLink}>Contact Support</a>
      </div>
    </div>
  );
}

export function BasicExample() {
  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle} data-testid="text-basic-title">Login Layout (Form a la derecha)</h2>
      <p className={styles.sectionDescription}>
        Layout tipo login con imagen de fondo a la izquierda y formulario a la derecha. El panel izquierdo desaparece en pantallas menores a 768px.
      </p>
      <a href="/layouts/split-layout/preview/login" target="_blank" rel="noopener noreferrer" className={styles.previewLink} data-testid="link-preview-basic">
        <svg className={styles.previewLinkIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
        Abrir en nueva pestaña
      </a>
      <div className={styles.demoWrapper}>
        <SplitLayout
          mainPanel={{
            content: <FormContent />,
          }}
          secondPanel={{
            content: <HeroContent />,
            verticalAlign: 'bottom',
            horizontalAlign: 'left',
            background: {
              image: heroImg,
              size: 'cover',
              position: 'center',
              overlay: 'rgba(0, 0, 0, 0.5)',
            },
          }}
          mainSide="right"
          mainWidthPercent={45}
        />
      </div>
    </div>
  );
}
