import { SplitLayout } from '@/layouts/split-layout-component';
import styles from '../css/SplitLayoutDemo.module.css';

function LongFormContent() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%', maxWidth: 400 }}>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: '#111827' }}>Complete Registration</h2>
      <p style={{ fontSize: 13, color: '#6b7280' }}>Fill in all the fields below to create your account</p>

      <label style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>Full Name</label>
      <input style={{ padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 8, fontSize: 13 }} placeholder="John Doe" data-testid="input-fullname-scroll" />

      <label style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>Email</label>
      <input style={{ padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 8, fontSize: 13 }} type="email" placeholder="john@example.com" data-testid="input-email-scroll" />

      <label style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>Phone</label>
      <input style={{ padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 8, fontSize: 13 }} type="tel" placeholder="+1 (555) 000-0000" data-testid="input-phone-scroll" />

      <label style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>Company</label>
      <input style={{ padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 8, fontSize: 13 }} placeholder="Acme Inc." data-testid="input-company-scroll" />

      <label style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>Role</label>
      <select style={{ padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 8, fontSize: 13, background: 'white' }} data-testid="select-role-scroll">
        <option value="">Select your role</option>
        <option value="developer">Developer</option>
        <option value="designer">Designer</option>
        <option value="manager">Manager</option>
        <option value="other">Other</option>
      </select>

      <label style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>Address</label>
      <input style={{ padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 8, fontSize: 13 }} placeholder="123 Main St" data-testid="input-address-scroll" />

      <label style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>City</label>
      <input style={{ padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 8, fontSize: 13 }} placeholder="New York" data-testid="input-city-scroll" />

      <label style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>Country</label>
      <select style={{ padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 8, fontSize: 13, background: 'white' }} data-testid="select-country-scroll">
        <option value="">Select country</option>
        <option value="us">United States</option>
        <option value="uk">United Kingdom</option>
        <option value="ca">Canada</option>
        <option value="mx">Mexico</option>
      </select>

      <label style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>Password</label>
      <input style={{ padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 8, fontSize: 13 }} type="password" placeholder="Min. 8 characters" data-testid="input-password-scroll" />

      <label style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>Confirm Password</label>
      <input style={{ padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 8, fontSize: 13 }} type="password" placeholder="Repeat password" data-testid="input-confirm-password-scroll" />

      <label style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>Bio</label>
      <textarea style={{ padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 8, fontSize: 13, minHeight: 80, resize: 'vertical' }} placeholder="Tell us about yourself..." data-testid="textarea-bio-scroll" />

      <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#6b7280' }}>
        <input type="checkbox" data-testid="checkbox-terms-scroll" />
        I agree to the Terms of Service and Privacy Policy
      </label>

      <button style={{ padding: 12, background: '#f97316', color: 'white', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer' }} data-testid="button-register-scroll">
        Create Account
      </button>
    </div>
  );
}

function BrandPanel() {
  return (
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #1e3a5f 0%, #0f172a 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
      <div style={{ color: 'white', maxWidth: 360 }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 16, lineHeight: 1.2 }}>Join our community</h1>
        <p style={{ fontSize: 14, opacity: 0.85, lineHeight: 1.7 }}>
          Create your account and get access to all features. Connect with thousands of professionals worldwide.
        </p>
      </div>
    </div>
  );
}

export function ScrollExample() {
  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle} data-testid="text-scroll-title">Scroll vertical (contenido largo)</h2>
      <p className={styles.sectionDescription}>
        Cuando el contenido del panel es mas alto que el espacio disponible, se activa scroll vertical automaticamente (scroll.vertical: true por defecto). El scroll horizontal esta desactivado por defecto.
      </p>
      <a href="/layouts/split-layout/preview/scroll" target="_blank" rel="noopener noreferrer" className={styles.previewLink} data-testid="link-preview-scroll">
        <svg className={styles.previewLinkIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
        Abrir en nueva pestaña
      </a>
      <div className={styles.demoWrapper}>
        <SplitLayout
          layout={{ heightMode: 'fixed', height: 500 }}
          main={{
            render: <LongFormContent />,
            widthMode: 'percentage',
            width: 50,
            scroll: { vertical: true, horizontal: false },
          }}
          secondary={{
            render: <BrandPanel />,
            scroll: { vertical: false },
          }}
        />
      </div>
    </div>
  );
}
