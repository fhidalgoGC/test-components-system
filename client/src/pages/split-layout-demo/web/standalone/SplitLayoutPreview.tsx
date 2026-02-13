import { useState } from 'react';
import { useParams } from 'wouter';
import { SplitLayout } from '@/layouts/split-layout-component';
import type { SizeMode, VerticalAlign, HorizontalAlign } from '@/layouts/split-layout-component';

type ExampleKey = 'login' | 'reversed' | 'scroll' | 'interactive';
const validExamples: ExampleKey[] = ['login', 'reversed', 'scroll', 'interactive'];

const toolbarStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 9999,
  background: 'rgba(15, 23, 42, 0.95)',
  backdropFilter: 'blur(8px)',
  padding: '10px 20px',
  display: 'flex',
  alignItems: 'center',
  gap: 16,
  flexWrap: 'wrap',
  boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
  color: '#e2e8f0',
  fontSize: 13,
};

const selectStyle: React.CSSProperties = {
  padding: '4px 8px',
  borderRadius: 6,
  border: '1px solid #475569',
  background: '#1e293b',
  color: '#e2e8f0',
  fontSize: 12,
};

const inputStyle: React.CSSProperties = {
  ...selectStyle,
  width: 60,
};

const labelStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  color: '#94a3b8',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.05em',
};

const dividerStyle: React.CSSProperties = {
  width: 1,
  height: 24,
  background: '#334155',
};

function LoginForm() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%', maxWidth: 360 }}>
      <div style={{ width: 40, height: 40, background: '#f97316', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 18, alignSelf: 'flex-end' }}>F</div>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: '#111827' }}>Welcome</h2>
      <p style={{ fontSize: 13, color: '#6b7280', marginTop: -8 }}>Log in to access your space</p>
      <input type="email" placeholder="Email address" style={{ padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 8, fontSize: 13, width: '100%', boxSizing: 'border-box' }} data-testid="input-email-preview" />
      <input type="password" placeholder="Password" style={{ padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 8, fontSize: 13, width: '100%', boxSizing: 'border-box' }} data-testid="input-password-preview" />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12, color: '#6b7280' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}><input type="checkbox" /> Remember me</label>
        <a href="#" style={{ color: '#6b7280', textDecoration: 'none', fontSize: 12 }}>Forgot your password?</a>
      </div>
      <button style={{ padding: 10, background: '#f97316', color: 'white', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer', width: '100%' }} data-testid="button-login-preview">Log in</button>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 16, fontSize: 12, color: '#6b7280' }}>
        <span>Don't have an account?</span>
        <a href="#" style={{ color: '#f97316', textDecoration: 'none', fontWeight: 500 }}>Sign up here</a>
      </div>
    </div>
  );
}

function LoginHero() {
  return (
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #1e3a5f 0%, #0f172a 100%)', display: 'flex', alignItems: 'flex-end', padding: 40 }}>
      <div style={{ color: 'white', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, lineHeight: 1.2 }}>
          <span style={{ color: '#f97316', fontStyle: 'italic' }}>Simplified</span> logistics management
        </h1>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', lineHeight: 1.5, maxWidth: 400 }}>
          Coordinate and manage the transportation of your commodities from the collection point to final delivery.
        </p>
        <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 24 }}>&copy; 2026 FarmChain All Rights Reserved.</p>
      </div>
    </div>
  );
}

function SignupForm() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%', maxWidth: 360 }}>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: '#111827' }}>Create Account</h2>
      <p style={{ fontSize: 13, color: '#6b7280', marginTop: -8 }}>Join our platform today</p>
      <input type="text" placeholder="Full Name" style={{ padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 8, fontSize: 13, width: '100%', boxSizing: 'border-box' }} data-testid="input-name-preview" />
      <input type="email" placeholder="Email" style={{ padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 8, fontSize: 13, width: '100%', boxSizing: 'border-box' }} data-testid="input-email-signup-preview" />
      <input type="password" placeholder="Password" style={{ padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 8, fontSize: 13, width: '100%', boxSizing: 'border-box' }} data-testid="input-password-signup-preview" />
      <button style={{ padding: 10, background: '#f97316', color: 'white', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer', width: '100%' }} data-testid="button-signup-preview">Create Account</button>
    </div>
  );
}

function JourneyHero() {
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

function ScrollLongForm() {
  const fields = [
    { label: 'Full Name', type: 'text', placeholder: 'John Doe' },
    { label: 'Email', type: 'email', placeholder: 'john@example.com' },
    { label: 'Phone', type: 'tel', placeholder: '+1 (555) 000-0000' },
    { label: 'Company', type: 'text', placeholder: 'Acme Inc.' },
    { label: 'Address', type: 'text', placeholder: '123 Main St' },
    { label: 'City', type: 'text', placeholder: 'New York' },
    { label: 'Password', type: 'password', placeholder: 'Min. 8 characters' },
    { label: 'Confirm Password', type: 'password', placeholder: 'Repeat password' },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, width: '100%', maxWidth: 400 }}>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: '#111827' }}>Complete Registration</h2>
      <p style={{ fontSize: 13, color: '#6b7280' }}>Fill in all the fields below</p>
      {fields.map((f) => (
        <div key={f.label} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>{f.label}</label>
          <input type={f.type} placeholder={f.placeholder} style={{ padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 8, fontSize: 13 }} />
        </div>
      ))}
      <textarea style={{ padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 8, fontSize: 13, minHeight: 80 }} placeholder="Bio..." />
      <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#6b7280' }}>
        <input type="checkbox" /> I agree to the Terms
      </label>
      <button style={{ padding: 12, background: '#f97316', color: 'white', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Create Account</button>
    </div>
  );
}

function ScrollBrand() {
  return (
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #1e3a5f 0%, #0f172a 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
      <div style={{ color: 'white', maxWidth: 360 }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 16, lineHeight: 1.2 }}>Join our community</h1>
        <p style={{ fontSize: 14, opacity: 0.85, lineHeight: 1.7 }}>Create your account and get access to all features.</p>
      </div>
    </div>
  );
}

function InteractiveMain({ mainWidth, widthMode, vAlign, hAlign }: { mainWidth: number; widthMode: string; vAlign: string; hAlign: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, color: '#111827' }}>Main Panel</h2>
      <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.6 }}>
        widthMode: {widthMode} | width: {mainWidth} | vAlign: {vAlign} | hAlign: {hAlign}
      </p>
    </div>
  );
}

function InteractiveSecondary() {
  return (
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ color: 'white', textAlign: 'center' }}>
        <h2 style={{ fontSize: 24, fontWeight: 700 }}>Secondary</h2>
        <p style={{ fontSize: 13, opacity: 0.8 }}>widthMode: full</p>
      </div>
    </div>
  );
}

export default function SplitLayoutPreview() {
  const params = useParams<{ example?: string }>();
  const initialExample = validExamples.includes(params.example as ExampleKey) ? (params.example as ExampleKey) : 'login';
  const [example, setExample] = useState<ExampleKey>(initialExample);
  const [mainWidth, setMainWidth] = useState(45);
  const [layoutHeight, setLayoutHeight] = useState(0);
  const [vAlign, setVAlign] = useState<VerticalAlign>('middle');
  const [hAlign, setHAlign] = useState<HorizontalAlign>('center');
  const [mainWidthMode, setMainWidthMode] = useState<SizeMode>('percentage');

  const handleExampleChange = (key: ExampleKey) => {
    setExample(key);
    setMainWidth(key === 'login' || key === 'reversed' ? 45 : 50);
    setVAlign('middle');
    setHAlign('center');
    setMainWidthMode('percentage');
    setLayoutHeight(0);
  };

  const layoutConfig = layoutHeight > 0
    ? { heightMode: 'fixed' as SizeMode, height: layoutHeight }
    : { heightMode: 'full' as SizeMode };

  const fullLayoutStyle = layoutHeight <= 0 ? { paddingTop: 52 } : undefined;

  const renderLayout = () => {
    if (example === 'login') {
      return (
        <SplitLayout
          layout={{ ...layoutConfig, ...(fullLayoutStyle ? {} : {}) }}
          main={{
            render: <LoginForm />,
            widthMode: mainWidthMode,
            width: mainWidth,
            align: { vertical: vAlign, horizontal: hAlign },
          }}
          secondary={{
            render: <LoginHero />,
            align: { vertical: 'bottom', horizontal: 'left' },
          }}
        />
      );
    }
    if (example === 'scroll') {
      return (
        <SplitLayout
          layout={layoutConfig}
          main={{
            render: <ScrollLongForm />,
            widthMode: mainWidthMode,
            width: mainWidth,
            align: { vertical: vAlign, horizontal: hAlign },
            scroll: { vertical: true },
          }}
          secondary={{
            render: <ScrollBrand />,
            scroll: { vertical: false },
          }}
        />
      );
    }
    if (example === 'reversed') {
      return (
        <SplitLayout
          layout={{ ...layoutConfig, componentMainAlign: 'right' }}
          main={{
            render: <SignupForm />,
            widthMode: mainWidthMode,
            width: mainWidth,
            align: { vertical: vAlign, horizontal: hAlign },
          }}
          secondary={{
            render: <JourneyHero />,
          }}
        />
      );
    }
    return (
      <SplitLayout
        layout={layoutConfig}
        main={{
          render: <InteractiveMain mainWidth={mainWidth} widthMode={mainWidthMode} vAlign={vAlign} hAlign={hAlign} />,
          widthMode: mainWidthMode,
          width: mainWidth,
          align: { vertical: vAlign, horizontal: hAlign },
        }}
        secondary={{
          render: <InteractiveSecondary />,
        }}
      />
    );
  };

  return (
    <>
      <div style={toolbarStyle} data-testid="preview-toolbar">
        <span style={labelStyle}>Ejemplo:</span>
        <select style={selectStyle} value={example} onChange={(e) => handleExampleChange(e.target.value as ExampleKey)} data-testid="select-example">
          <option value="login">Login</option>
          <option value="reversed">Reversed</option>
          <option value="scroll">Scroll</option>
          <option value="interactive">Interactive</option>
        </select>

        <div style={dividerStyle} />

        <span style={labelStyle}>WidthMode:</span>
        <select style={selectStyle} value={mainWidthMode} onChange={(e) => setMainWidthMode(e.target.value as SizeMode)} data-testid="select-width-mode-preview">
          <option value="full">full</option>
          <option value="auto">auto</option>
          <option value="fixed">fixed</option>
          <option value="percentage">percentage</option>
        </select>

        <span style={labelStyle}>Width:</span>
        <input style={inputStyle} type="number" min={50} max={800} value={mainWidth} onChange={(e) => setMainWidth(Number(e.target.value))} data-testid="input-width-preview" />

        <span style={labelStyle}>Layout H:</span>
        <input style={inputStyle} type="number" min={0} max={1000} value={layoutHeight} onChange={(e) => setLayoutHeight(Number(e.target.value))} data-testid="input-height-preview" />

        <div style={dividerStyle} />

        <span style={labelStyle}>V-Align:</span>
        <select style={selectStyle} value={vAlign} onChange={(e) => setVAlign(e.target.value as VerticalAlign)} data-testid="select-valign-preview">
          <option value="top">top</option>
          <option value="middle">middle</option>
          <option value="bottom">bottom</option>
        </select>

        <span style={labelStyle}>H-Align:</span>
        <select style={selectStyle} value={hAlign} onChange={(e) => setHAlign(e.target.value as HorizontalAlign)} data-testid="select-halign-preview">
          <option value="left">left</option>
          <option value="center">center</option>
          <option value="right">right</option>
        </select>
      </div>

      <div style={fullLayoutStyle}>
        {renderLayout()}
      </div>
    </>
  );
}
