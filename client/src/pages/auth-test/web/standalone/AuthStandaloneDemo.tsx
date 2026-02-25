import { useState, useEffect, useCallback } from 'react';
import { AppAuthProvider, useAppAuth, ProtectedRoute, PublicRoute } from '@/lib/ui-library/providers/AppAuthProvider';
import styles from './AuthStandaloneDemo.module.css';

function LoginView() {
  const { login } = useAppAuth();
  const [name, setName] = useState('Juan Pérez');
  const [role, setRole] = useState('admin');

  const handleLogin = () => {
    login({ name, role, loginTime: new Date().toISOString() });
  };

  return (
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
          Al hacer login, cambiarás al Dashboard automáticamente.
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
  );
}

function DashboardView() {
  const { sessionData, logout } = useAppAuth();
  const data = sessionData as { name?: string; role?: string; loginTime?: string } | null;

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.cardIcon} data-testid="icon-dashboard">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        </div>
        <h1 className={styles.cardTitle}>Dashboard Protegido</h1>
        <p className={styles.cardDescription}>
          Esta página usa <code>ProtectedRoute</code> — solo es visible si estás autenticado.
          Al hacer logout, el callback <code>onUnauthorized</code> te lleva al Login.
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
          onClick={logout}
          data-testid="button-standalone-logout"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}

function AuthRouter() {
  const { isAuthenticated } = useAppAuth();
  const [view, setView] = useState<'login' | 'dashboard'>(isAuthenticated ? 'dashboard' : 'login');

  useEffect(() => {
    setView(isAuthenticated ? 'dashboard' : 'login');
  }, [isAuthenticated]);

  const handleUnauthorized = useCallback(() => {
    console.log('[ProtectedRoute] onUnauthorized — cambiando a login');
    setView('login');
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.headerTitle} data-testid="text-standalone-title">AppAuth — Demo Interactiva</h2>
        <div className={styles.headerNav}>
          <button
            className={`${styles.navBtn} ${view === 'login' ? styles.navBtnActive : ''}`}
            onClick={() => setView('login')}
            data-testid="button-nav-login"
          >
            Login (PublicRoute)
          </button>
          <button
            className={`${styles.navBtn} ${view === 'dashboard' ? styles.navBtnActive : ''}`}
            onClick={() => setView('dashboard')}
            data-testid="button-nav-dashboard"
          >
            Dashboard (ProtectedRoute)
          </button>
        </div>
        <div className={styles.headerStatus}>
          <span className={`${styles.statusDot} ${isAuthenticated ? styles.statusDotGreen : styles.statusDotGray}`} />
          <span className={styles.headerStatusText} data-testid="text-standalone-status">
            {isAuthenticated ? 'Autenticado' : 'No autenticado'}
          </span>
        </div>
      </div>

      <div className={styles.content}>
        {view === 'login' && (
          <PublicRoute>
            <LoginView />
          </PublicRoute>
        )}

        {view === 'login' && isAuthenticated && (
          <div className={styles.page}>
            <div className={styles.redirectCard}>
              <div className={styles.redirectIcon}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
              <h2 className={styles.redirectTitle} data-testid="text-public-redirect">Ya estás autenticado</h2>
              <p className={styles.redirectText}>
                <code>PublicRoute</code> oculta el login porque ya tienes sesión activa.
              </p>
              <button
                className={styles.btnSecondary}
                onClick={() => setView('dashboard')}
                data-testid="button-go-dashboard"
              >
                Ir al Dashboard
              </button>
            </div>
          </div>
        )}

        {view === 'dashboard' && (
          <ProtectedRoute
            onUnauthorized={handleUnauthorized}
            fallback={
              <div className={styles.page}>
                <div className={styles.redirectCard}>
                  <div className={styles.redirectIcon}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </div>
                  <h2 className={styles.redirectTitle} data-testid="text-protected-redirect">Acceso denegado</h2>
                  <p className={styles.redirectText}>
                    <code>ProtectedRoute</code> llamó <code>onUnauthorized</code> porque no tienes sesión.
                  </p>
                  <button
                    className={styles.btnSecondary}
                    onClick={() => setView('login')}
                    data-testid="button-go-login"
                  >
                    Ir al Login
                  </button>
                </div>
              </div>
            }
          >
            <DashboardView />
          </ProtectedRoute>
        )}
      </div>
    </div>
  );
}

export default function AuthStandaloneDemo() {
  return (
    <AppAuthProvider>
      <AuthRouter />
    </AppAuthProvider>
  );
}
