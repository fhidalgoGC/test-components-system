import { useState } from 'react';
import { useAppAuth, ProtectedRoute } from '@/lib/ui-library/providers/AppAuthProvider';
import styles from '../css/AppAuthDemo.module.css';

export function ProtectedRouteExample() {
  const { isAuthenticated, sessionData, login, logout } = useAppAuth();
  const [callbackLog, setCallbackLog] = useState<string | null>(null);

  const handleUnauthorized = () => {
    const msg = `onUnauthorized llamado a las ${new Date().toLocaleTimeString()}`;
    setCallbackLog(msg);
    console.log('[ProtectedRoute]', msg);
  };

  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>ProtectedRoute</h2>
      <p className={styles.sectionDescription}>
        <code className={styles.sectionDescriptionCode}>ProtectedRoute</code> renderiza sus children solo si el usuario está autenticado.
        Si no lo está, llama el callback <code className={styles.sectionDescriptionCode}>onUnauthorized</code> y muestra el
        <code className={styles.sectionDescriptionCode}>fallback</code>.
        El consumidor decide qué hacer: redirigir, mostrar un modal, etc.
        Prueba la <a href="/providers/app-auth/demo/login" target="_blank" rel="noopener noreferrer" style={{ color: '#6366f1', fontWeight: 500 }} data-testid="link-interactive-demo">demo interactiva completa</a> para ver el flujo real.
      </p>

      <div className={styles.demoArea}>
        <div className={styles.row} style={{ marginBottom: 16 }}>
          <button
            className={`${styles.actionBtn} ${styles.actionBtnGreen}`}
            onClick={() => { login({ demo: 'protected-route' }); setCallbackLog(null); }}
            disabled={isAuthenticated}
            data-testid="button-protected-login"
          >
            Login
          </button>
          <button
            className={`${styles.actionBtn} ${styles.actionBtnRed}`}
            onClick={logout}
            disabled={!isAuthenticated}
            data-testid="button-protected-logout"
          >
            Logout
          </button>
        </div>

        <ProtectedRoute
          onUnauthorized={handleUnauthorized}
          fallback={
            <div className={`${styles.routeBox}`} style={{ borderColor: '#fca5a5', background: '#fef2f2' }}>
              <p className={styles.routeBoxLabel} data-testid="text-protected-fallback">Acceso denegado</p>
              <p className={styles.routeBoxDescription}>Debes iniciar sesión para ver este contenido.</p>
            </div>
          }
        >
          <div className={`${styles.routeBox} ${styles.routeBoxProtected}`}>
            <p className={styles.routeBoxLabel} data-testid="text-protected-content">Contenido Protegido</p>
            <p className={styles.routeBoxDescription}>
              Solo visible cuando estás autenticado. Session data: {sessionData ? JSON.stringify(sessionData) : 'null'}
            </p>
          </div>
        </ProtectedRoute>

        {callbackLog && (
          <div className={styles.dataBlock} data-testid="text-protected-callback-log">
            {callbackLog}
          </div>
        )}
      </div>
    </div>
  );
}
