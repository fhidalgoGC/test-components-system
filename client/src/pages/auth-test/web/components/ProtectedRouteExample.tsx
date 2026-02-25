import { useAppAuth, ProtectedRoute } from '@/lib/ui-library/providers/AppAuthProvider';
import styles from '../css/AppAuthDemo.module.css';

export function ProtectedRouteExample() {
  const { isAuthenticated, sessionData, login, logout } = useAppAuth();

  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>ProtectedRoute</h2>
      <p className={styles.sectionDescription}>
        <code className={styles.sectionDescriptionCode}>ProtectedRoute</code> renderiza sus children solo si el usuario está autenticado.
        Si no lo está, redirige a <code className={styles.sectionDescriptionCode}>redirectTo</code>.
        Opcionalmente muestra un <code className={styles.sectionDescriptionCode}>fallback</code> mientras redirige.
      </p>

      <div className={styles.demoArea}>
        <div className={styles.row} style={{ marginBottom: 16 }}>
          <button
            className={`${styles.actionBtn} ${styles.actionBtnGreen}`}
            onClick={() => login({ demo: 'protected-route' })}
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
          redirectTo="/providers/app-auth"
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

        <p className={styles.infoText}>
          En esta demo el redirectTo apunta a esta misma página, así que no se nota la redirección. En tu app, lo apuntarías a /login.
        </p>
      </div>
    </div>
  );
}
