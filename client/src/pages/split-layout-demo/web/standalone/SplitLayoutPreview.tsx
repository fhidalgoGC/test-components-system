import { useState } from 'react';
import { SplitLayout } from '@/layouts/split-layout-component';
import type { MainSide, VerticalAlign, HorizontalAlign, SpacingToken } from '@/layouts/split-layout-component';
import heroImg from '@assets/Screenshot_2026-02-13_at_12.11.37_p.m._1771006299518.png';

type ExampleKey = 'login' | 'reversed' | 'interactive';

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

function LoginHero() {
  return (
    <div style={{ color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 12 }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, lineHeight: 1.2 }}>
        <span style={{ color: '#f97316', fontStyle: 'italic' }}>Simplified</span> logistics management
      </h1>
      <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', lineHeight: 1.5, maxWidth: 400 }}>
        Coordinate and manage the transportation of your commodities from the collection point to final delivery.
      </p>
      <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 24 }}>&copy; 2026 FarmChain All Rights Reserved.</p>
    </div>
  );
}

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
    <div style={{ color: 'white', maxWidth: 400 }}>
      <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 12 }}>Start your journey</h1>
      <p style={{ fontSize: 14, opacity: 0.85, lineHeight: 1.6 }}>
        Access powerful tools to manage your workflow, collaborate with your team, and grow your business.
      </p>
    </div>
  );
}

function InteractiveMain({ ratio, side, vAlign, hAlign, padding }: { ratio: number; side: string; vAlign: string; hAlign: string; padding: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, color: '#111827' }}>Main Panel</h2>
      <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.6 }}>
        width: {ratio}% | side: {side} | vAlign: {vAlign} | hAlign: {hAlign} | padding: {padding}
      </p>
    </div>
  );
}

function InteractiveSecondary({ ratio }: { ratio: number }) {
  return (
    <div style={{ color: 'white', textAlign: 'center' }}>
      <h2 style={{ fontSize: 24, fontWeight: 700 }}>Secondary</h2>
      <p style={{ fontSize: 13, opacity: 0.8 }}>width: {100 - ratio}%</p>
    </div>
  );
}

export default function SplitLayoutPreview() {
  const [example, setExample] = useState<ExampleKey>('login');
  const [ratio, setRatio] = useState(45);
  const [side, setSide] = useState<MainSide>('right');
  const [vAlign, setVAlign] = useState<VerticalAlign>('center');
  const [hAlign, setHAlign] = useState<HorizontalAlign>('center');
  const [padding, setPadding] = useState<SpacingToken>('lg');

  const handleExampleChange = (key: ExampleKey) => {
    setExample(key);
    if (key === 'login') { setRatio(45); setSide('right'); setVAlign('center'); setHAlign('center'); setPadding('lg'); }
    if (key === 'reversed') { setRatio(45); setSide('left'); setVAlign('center'); setHAlign('center'); setPadding('lg'); }
    if (key === 'interactive') { setRatio(50); setSide('right'); setVAlign('center'); setHAlign('center'); setPadding('lg'); }
  };

  const renderLayout = () => {
    if (example === 'login') {
      return (
        <SplitLayout
          mainPanel={{ content: <LoginForm />, verticalAlign: vAlign, horizontalAlign: hAlign, padding }}
          secondPanel={{ content: <LoginHero />, verticalAlign: 'bottom', horizontalAlign: 'left', background: { image: heroImg, size: 'cover', position: 'center', overlay: 'rgba(0,0,0,0.5)' } }}
          mainSide={side}
          mainWidthPercent={ratio}
          fullHeight
          style={{ paddingTop: 52 }}
        />
      );
    }
    if (example === 'reversed') {
      return (
        <SplitLayout
          mainPanel={{ content: <SignupForm />, verticalAlign: vAlign, horizontalAlign: hAlign, padding, background: { color: '#ffffff' } }}
          secondPanel={{ content: <JourneyHero />, background: { gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' } }}
          mainSide={side}
          mainWidthPercent={ratio}
          fullHeight
          style={{ paddingTop: 52 }}
        />
      );
    }
    return (
      <SplitLayout
        mainPanel={{ content: <InteractiveMain ratio={ratio} side={side} vAlign={vAlign} hAlign={hAlign} padding={padding} />, verticalAlign: vAlign, horizontalAlign: hAlign, padding, background: { color: '#f9fafb' } }}
        secondPanel={{ content: <InteractiveSecondary ratio={ratio} />, background: { gradient: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)' } }}
        mainSide={side}
        mainWidthPercent={ratio}
        fullHeight
        style={{ paddingTop: 52 }}
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
          <option value="interactive">Interactive</option>
        </select>

        <div style={dividerStyle} />

        <span style={labelStyle}>Width %:</span>
        <input style={inputStyle} type="number" min={20} max={80} value={ratio} onChange={(e) => setRatio(Number(e.target.value))} data-testid="input-ratio-preview" />

        <span style={labelStyle}>Side:</span>
        <select style={selectStyle} value={side} onChange={(e) => setSide(e.target.value as MainSide)} data-testid="select-side-preview">
          <option value="left">left</option>
          <option value="right">right</option>
        </select>

        <span style={labelStyle}>V-Align:</span>
        <select style={selectStyle} value={vAlign} onChange={(e) => setVAlign(e.target.value as VerticalAlign)} data-testid="select-valign-preview">
          <option value="top">top</option>
          <option value="center">center</option>
          <option value="bottom">bottom</option>
        </select>

        <span style={labelStyle}>H-Align:</span>
        <select style={selectStyle} value={hAlign} onChange={(e) => setHAlign(e.target.value as HorizontalAlign)} data-testid="select-halign-preview">
          <option value="left">left</option>
          <option value="center">center</option>
          <option value="right">right</option>
        </select>

        <span style={labelStyle}>Padding:</span>
        <select style={selectStyle} value={padding} onChange={(e) => setPadding(e.target.value as SpacingToken)} data-testid="select-padding-preview">
          <option value="none">none</option>
          <option value="xs">xs</option>
          <option value="sm">sm</option>
          <option value="md">md</option>
          <option value="lg">lg</option>
          <option value="xl">xl</option>
        </select>
      </div>

      {renderLayout()}
    </>
  );
}
