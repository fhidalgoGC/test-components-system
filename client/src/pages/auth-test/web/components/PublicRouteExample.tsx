import { useAppAuth, PublicRoute } from '@/lib/ui-library/providers/AppAuthProvider';
import styles from '../css/AppAuthDemo.module.css';

export function PublicRouteExample() {
  const { isAuthenticated, login, logout } = useAppAuth();

  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>PublicRoute</h2>
      <p className={styles.sectionDescription}>
        <code className={styles.sectionDescriptionCode}>PublicRoute</code> renderiza sus children solo si el usuario NO está autenticado.
        Si ya está autenticado, no renderiza nada (retorna null). No valida rutas ni redirige — simplemente oculta el contenido.
        Ideal para formularios de login/registro.
        Prueba la <a href="/providers/app-auth/interactive" target="_blank" rel="noopener noreferrer" style={{ color: '#6366f1', fontWeight: 500 }} data-testid="link-interactive-demo-2">demo interactiva completa</a> para ver el flujo real.
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

        <PublicRoute>
          <div className={`${styles.routeBox} ${styles.routeBoxPublic}`}>
            <p className={styles.routeBoxLabel} data-testid="text-public-content">Contenido Público</p>
            <p className={styles.routeBoxDescription}>
              Solo visible cuando NO estás autenticado. Aquí irían formularios de login/registro.
            </p>
          </div>
        </PublicRoute>

        {isAuthenticated && (
          <div className={`${styles.routeBox}`} style={{ borderColor: '#fde68a', background: '#fefce8' }}>
            <p className={styles.routeBoxLabel} data-testid="text-public-hidden">Contenido oculto por PublicRoute</p>
            <p className={styles.routeBoxDescription}>Estás autenticado, así que PublicRoute no renderiza sus children.</p>
          </div>
        )}
      </div>
    </div>
  );
}
