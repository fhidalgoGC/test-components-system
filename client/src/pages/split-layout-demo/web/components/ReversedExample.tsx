import { SplitLayout } from '@/lib/ui-library/layouts/SplitLayout';
import styles from '../css/SplitLayoutDemo.module.css';

function FormContent() {
  return (
    <div className={styles.formPanel}>
      <h2 className={styles.formTitle}>Create Account</h2>
      <p className={styles.formSubtitle}>Join our platform today</p>
      <input className={styles.formInput} type="text" placeholder="Full Name" data-testid="input-name-reversed" />
      <input className={styles.formInput} type="email" placeholder="Email" data-testid="input-email-reversed" />
      <input className={styles.formInput} type="password" placeholder="Password" data-testid="input-password-reversed" />
      <button className={styles.formButton} data-testid="button-signup">Create Account</button>
    </div>
  );
}

function HeroContent() {
  return (
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
      <div style={{ color: 'white', maxWidth: 400 }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 12 }}>Start your journey</h1>
        <p style={{ fontSize: 14, opacity: 0.85, lineHeight: 1.6 }}>
          Access powerful tools to manage your workflow, collaborate with your team, and grow your business.
        </p>
      </div>
    </div>
  );
}

export function ReversedExample() {
  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle} data-testid="text-reversed-title">Main a la derecha (componentMainAlign: right)</h2>
      <p className={styles.sectionDescription}>
        El panel principal (formulario) aparece a la derecha usando componentMainAlign: 'right'. El panel secundario (hero) queda a la izquierda. Layout con heightMode fixed a 500px.
      </p>
      <a href="/layouts/split-layout/preview/reversed" target="_blank" rel="noopener noreferrer" className={styles.previewLink} data-testid="link-preview-reversed">
        <svg className={styles.previewLinkIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
        Abrir en nueva pestaña
      </a>
      <div className={styles.demoWrapper}>
        <SplitLayout
          layout={{ componentMainAlign: 'right', heightMode: 'fixed', height: 500 }}
          main={{
            render: <FormContent />,
            widthMode: 'percentage',
            width: 45,
          }}
          secondary={{
            render: <HeroContent />,
          }}
        />
      </div>
    </div>
  );
}
