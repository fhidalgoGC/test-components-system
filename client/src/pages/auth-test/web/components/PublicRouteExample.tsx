import { useAppAuth, PublicRoute } from '@/lib/ui-library/providers/AppAuthProvider';
import styles from '../css/AppAuthDemo.module.css';

export function PublicRouteExample() {
  const { isAuthenticated, login, logout } = useAppAuth();

  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>PublicRoute</h2>
      <p className={styles.sectionDescription}>
        <code className={styles.sectionDescriptionCode}>PublicRoute</code> renderiza sus children solo si el usuario NO está autenticado.
        Si ya está autenticado, redirige a <code className={styles.sectionDescriptionCode}>redirectTo</code>.
        Ideal para páginas de login/registro.
      </p>

      <div className={styles.demoArea}>
        <div className={styles.row} style={{ marginBottom: 16 }}>
          <button
            className={`${styles.actionBtn} ${styles.actionBtnGreen}`}
            onClick={() => login({ demo: 'public-route' })}
            disabled={isAuthenticated}
            data-testid="button-public-login"
          >
            Login
          </button>
          <button
            className={`${styles.actionBtn} ${styles.actionBtnRed}`}
            onClick={logout}
            disabled={!isAuthenticated}
            data-testid="button-public-logout"
          >
            Logout
          </button>
        </div>

        <PublicRoute
          redirectTo="/providers/app-auth"
          fallback={
            <div className={`${styles.routeBox}`} style={{ borderColor: '#fde68a', background: '#fefce8' }}>
              <p className={styles.routeBoxLabel} data-testid="text-public-fallback">Ya estás autenticado</p>
              <p className={styles.routeBoxDescription}>Esta vista es solo para usuarios no autenticados.</p>
            </div>
          }
        >
          <div className={`${styles.routeBox} ${styles.routeBoxPublic}`}>
            <p className={styles.routeBoxLabel} data-testid="text-public-content">Contenido Público</p>
            <p className={styles.routeBoxDescription}>
              Solo visible cuando NO estás autenticado. Aquí irían formularios de login/registro.
            </p>
          </div>
        </PublicRoute>

        <p className={styles.infoText}>
          Haz login para ver cómo el contenido público desaparece y se muestra el fallback.
        </p>
      </div>
    </div>
  );
}
