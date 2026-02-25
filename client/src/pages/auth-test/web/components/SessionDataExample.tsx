import { useState } from 'react';
import { useAppAuth } from '@/lib/ui-library/providers/AppAuthProvider';
import styles from '../css/AppAuthDemo.module.css';

export function SessionDataExample() {
  const { isAuthenticated, sessionData, login, logout } = useAppAuth();
  const [userName, setUserName] = useState('Juan Pérez');
  const [userRole, setUserRole] = useState('admin');

  const handleLogin = () => {
    login({
      name: userName,
      role: userRole,
      permissions: ['read', 'write', 'delete'],
      loginTime: new Date().toISOString(),
    });
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>Session Data</h2>
      <p className={styles.sectionDescription}>
        <code className={styles.sectionDescriptionCode}>login(data)</code> guarda datos genéricos de sesión.
        Al recargar la página, los datos se recuperan de localStorage.
        <code className={styles.sectionDescriptionCode}>logout()</code> los borra.
      </p>

      <div className={styles.demoArea}>
        <div className={styles.row} style={{ marginBottom: 16 }}>
          <span
            className={`${styles.statusBadge} ${isAuthenticated ? styles.statusAuthenticated : styles.statusUnauthenticated}`}
            data-testid="badge-auth-status"
          >
            {isAuthenticated ? '✓ Autenticado' : '✗ No autenticado'}
          </span>
        </div>

        {!isAuthenticated && (
          <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Nombre</label>
              <input
                className={styles.input}
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                data-testid="input-user-name"
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Rol</label>
              <input
                className={styles.input}
                value={userRole}
                onChange={(e) => setUserRole(e.target.value)}
                data-testid="input-user-role"
              />
            </div>
          </div>
        )}

        <div className={styles.row}>
          <button
            className={`${styles.actionBtn} ${styles.actionBtnGreen}`}
            onClick={handleLogin}
            disabled={isAuthenticated}
            data-testid="button-login"
          >
            Login
          </button>
          <button
            className={`${styles.actionBtn} ${styles.actionBtnRed}`}
            onClick={handleLogout}
            disabled={!isAuthenticated}
            data-testid="button-logout"
          >
            Logout
          </button>
        </div>

        {sessionData && (
          <>
            <p className={styles.dataLabel} style={{ marginTop: 16 }}>sessionData:</p>
            <div className={styles.dataBlock} data-testid="text-session-data">
              {JSON.stringify(sessionData, null, 2)}
            </div>
          </>
        )}

        <p className={styles.infoText}>
          Recarga la página después de login — los datos persisten en localStorage.
        </p>
      </div>
    </div>
  );
}
