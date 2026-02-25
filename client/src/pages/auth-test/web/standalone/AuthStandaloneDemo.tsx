import { useState, useEffect, useRef } from 'react';
import { Route, Switch, useLocation, Link } from 'wouter';
import { AppAuthProvider, useAppAuth, ProtectedRoute, PublicRoute } from '@/lib/ui-library/providers/AppAuthProvider';
import styles from './AuthStandaloneDemo.module.css';

const BASE = '/providers/app-auth/demo';

function LoginPage() {
  const { login } = useAppAuth();
  const [, setLocation] = useLocation();
  const [name, setName] = useState('Juan Pérez');
  const [role, setRole] = useState('admin');

  const handleLogin = () => {
    login({ name, role, loginTime: new Date().toISOString() });
    setLocation(`${BASE}/dashboard`);
  };

  return (
    <PublicRoute>
      <div className={styles.page}>
        <div className={styles.card}>
          <div className={styles.cardIcon} data-testid="icon-login">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
              <polyline points="10 17 15 12 10 7" />
              <line x1="15" y1="12" x2="3" y2="12" />
            </svg>
          </div>
          <h1 className={styles.cardTitle}>Iniciar Sesión</h1>
          <p className={styles.cardDescription}>
            Esta página usa <code>PublicRoute</code> — solo es visible si NO estás autenticado.
            Si ya tienes sesión, este contenido desaparece.
          </p>

          <div className={styles.formGroup}>
            <label className={styles.label}>Nombre</label>
            <input
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
              data-testid="input-login-name"
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Rol</label>
            <input
              className={styles.input}
              value={role}
              onChange={(e) => setRole(e.target.value)}
              data-testid="input-login-role"
            />
          </div>

          <button
            className={styles.btnPrimary}
            onClick={handleLogin}
            data-testid="button-standalone-login"
          >
            Iniciar Sesión
          </button>
        </div>
      </div>
    </PublicRoute>
  );
}

function CountdownTimer({ sessionDuration, checkInterval }: { sessionDuration: number; checkInterval: number }) {
  const { isAuthenticated } = useAppAuth();
  const [remaining, setRemaining] = useState<number | null>(null);
  const lastActivityRef = useRef<number>(Date.now());

  useEffect(() => {
    if (!isAuthenticated) {
      setRemaining(null);
      return;
    }
    lastActivityRef.current = Date.now();
    setRemaining(sessionDuration);
  }, [isAuthenticated, sessionDuration]);

  useEffect(() => {
    if (!isAuthenticated) return;

    const handler = () => {
      lastActivityRef.current = Date.now();
    };
    window.addEventListener('click', handler);
    return () => window.removeEventListener('click', handler);
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) return;

    const interval = setInterval(() => {
      const elapsed = Date.now() - lastActivityRef.current;
      const rem = Math.max(0, sessionDuration - elapsed);
      setRemaining(rem);
    }, 200);

    return () => clearInterval(interval);
  }, [isAuthenticated, sessionDuration]);

  if (!isAuthenticated || remaining === null) return null;

  const secs = Math.ceil(remaining / 1000);
  const pct = (remaining / sessionDuration) * 100;
  const isWarning = secs <= 5;

  return (
    <div className={styles.timerContainer}>
      <div className={styles.timerBarBg}>
        <div
          className={`${styles.timerBar} ${isWarning ? styles.timerBarWarning : ''}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className={`${styles.timerText} ${isWarning ? styles.timerTextWarning : ''}`} data-testid="text-timer">
        Expira en {secs}s
      </span>
      <span className={styles.timerDetail} data-testid="text-check-interval">
        (revisa cada {checkInterval / 1000}s)
      </span>
    </div>
  );
}

function DashboardPage() {
  const { sessionData, logout } = useAppAuth();
  const [, setLocation] = useLocation();
  const data = sessionData as { name?: string; role?: string; loginTime?: string } | null;

  const handleLogout = () => {
    logout();
    setLocation(`${BASE}/login`);
  };

  return (
    <ProtectedRoute
      onUnauthorized={() => setLocation(`${BASE}/login`)}
      fallback={<div className={styles.page}><p>Redirigiendo al login...</p></div>}
    >
      <div className={styles.page}>
        <div className={styles.card}>
          <div className={styles.cardIcon} data-testid="icon-dashboard">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <h1 className={styles.cardTitle}>Dashboard</h1>
          <p className={styles.cardDescription}>
            Ruta protegida con <code>ProtectedRoute</code>. Cada vez que navegas aquí se actualiza
            <code>lastActivityTime</code>. Si no interactúas, la sesión expira.
          </p>

          {data && (
            <div className={styles.dataCard}>
              <div className={styles.dataRow}>
                <span className={styles.dataKey}>Nombre:</span>
                <span className={styles.dataValue} data-testid="text-dashboard-name">{data.name}</span>
              </div>
              <div className={styles.dataRow}>
                <span className={styles.dataKey}>Rol:</span>
                <span className={styles.dataValue} data-testid="text-dashboard-role">{data.role}</span>
              </div>
              <div className={styles.dataRow}>
                <span className={styles.dataKey}>Login:</span>
                <span className={styles.dataValue} data-testid="text-dashboard-time">
                  {data.loginTime ? new Date(data.loginTime).toLocaleString() : '-'}
                </span>
              </div>
            </div>
          )}

          <button
            className={styles.btnDanger}
            onClick={handleLogout}
            data-testid="button-standalone-logout"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </ProtectedRoute>
  );
}

function ProfilePage() {
  const { sessionData } = useAppAuth();
  const [, setLocation] = useLocation();
  const data = sessionData as { name?: string; role?: string } | null;

  return (
    <ProtectedRoute
      onUnauthorized={() => setLocation(`${BASE}/login`)}
      fallback={<div className={styles.page}><p>Redirigiendo al login...</p></div>}
    >
      <div className={styles.page}>
        <div className={styles.card}>
          <div className={styles.cardIcon} data-testid="icon-profile">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <h1 className={styles.cardTitle}>Perfil</h1>
          <p className={styles.cardDescription}>
            Otra ruta protegida. Navegar aquí actualiza <code>lastActivityTime</code>, renovando la sesión.
          </p>

          {data && (
            <div className={styles.dataCard}>
              <div className={styles.dataRow}>
                <span className={styles.dataKey}>Usuario:</span>
                <span className={styles.dataValue} data-testid="text-profile-name">{data.name}</span>
              </div>
              <div className={styles.dataRow}>
                <span className={styles.dataKey}>Rol:</span>
                <span className={styles.dataValue} data-testid="text-profile-role">{data.role}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}

function NavBar({ sessionDuration, checkInterval }: { sessionDuration: number; checkInterval: number }) {
  const { isAuthenticated } = useAppAuth();
  const [location] = useLocation();

  const isActive = (path: string) => location === path;

  return (
    <div className={styles.header}>
      <h2 className={styles.headerTitle} data-testid="text-standalone-title">AppAuth — Demo con Rutas</h2>
      <nav className={styles.headerNav}>
        <Link
          href={`${BASE}/login`}
          className={`${styles.navBtn} ${isActive(`${BASE}/login`) ? styles.navBtnActive : ''}`}
          data-testid="link-nav-login"
        >
          Login
        </Link>
        <Link
          href={`${BASE}/dashboard`}
          className={`${styles.navBtn} ${isActive(`${BASE}/dashboard`) ? styles.navBtnActive : ''}`}
          data-testid="link-nav-dashboard"
        >
          Dashboard
        </Link>
        <Link
          href={`${BASE}/profile`}
          className={`${styles.navBtn} ${isActive(`${BASE}/profile`) ? styles.navBtnActive : ''}`}
          data-testid="link-nav-profile"
        >
          Perfil
        </Link>
      </nav>
      <CountdownTimer sessionDuration={sessionDuration} checkInterval={checkInterval} />
      <div className={styles.headerStatus}>
        <span className={`${styles.statusDot} ${isAuthenticated ? styles.statusDotGreen : styles.statusDotGray}`} />
        <span className={styles.headerStatusText} data-testid="text-standalone-status">
          {isAuthenticated ? 'Autenticado' : 'No autenticado'}
        </span>
      </div>
    </div>
  );
}

function AuthApp({ sessionDuration, checkInterval }: { sessionDuration: number; checkInterval: number }) {
  return (
    <div className={styles.container}>
      <NavBar sessionDuration={sessionDuration} checkInterval={checkInterval} />
      <div className={styles.content}>
        <Switch>
          <Route path={`${BASE}/login`} component={LoginPage} />
          <Route path={`${BASE}/dashboard`} component={DashboardPage} />
          <Route path={`${BASE}/profile`} component={ProfilePage} />
          <Route>
            <LoginPage />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default function AuthStandaloneDemo() {
  const [durationSecs, setDurationSecs] = useState(15);
  const [intervalSecs, setIntervalSecs] = useState(2);
  const [appliedDuration, setAppliedDuration] = useState(15000);
  const [appliedInterval, setAppliedInterval] = useState(2000);
  const [providerKey, setProviderKey] = useState(0);

  const handleApply = () => {
    setAppliedDuration(durationSecs * 1000);
    setAppliedInterval(intervalSecs * 1000);
    setProviderKey(k => k + 1);
  };

  return (
    <div>
      <div className={styles.configBar}>
        <span className={styles.configLabel}>Configuración del Provider:</span>
        <div className={styles.configField}>
          <label className={styles.configFieldLabel}>Expiración (seg)</label>
          <input
            type="number"
            min={3}
            max={3600}
            className={styles.configInput}
            value={durationSecs}
            onChange={(e) => setDurationSecs(Number(e.target.value))}
            data-testid="input-session-duration"
          />
        </div>
        <div className={styles.configField}>
          <label className={styles.configFieldLabel}>Intervalo revisión (seg)</label>
          <input
            type="number"
            min={1}
            max={60}
            className={styles.configInput}
            value={intervalSecs}
            onChange={(e) => setIntervalSecs(Number(e.target.value))}
            data-testid="input-check-interval"
          />
        </div>
        <button
          className={styles.configBtn}
          onClick={handleApply}
          data-testid="button-apply-config"
        >
          Aplicar y reiniciar
        </button>
      </div>
      <AppAuthProvider
        key={providerKey}
        sessionDuration={appliedDuration}
        validationInterval={appliedInterval}
      >
        <AuthApp sessionDuration={appliedDuration} checkInterval={appliedInterval} />
      </AppAuthProvider>
    </div>
  );
}
