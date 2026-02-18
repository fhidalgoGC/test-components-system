import { useEffect } from 'react';
import { useMultiControlData } from '@/lib/ui-library/providers';
import type { StateTransformer } from '@/lib/ui-library/providers';
import styles from '../css/MultiControlDataDemo.module.css';

type UserItem = {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
};

type UsersResponse = {
  items: UserItem[];
  total: number;
  page: number;
};

const pageTransformer: StateTransformer<number, number> = (value) => value;

export function UsersPanel() {
  const { data, loading, error, state, applyToState } = useMultiControlData<UsersResponse>('users');

  const currentPage = (state.page as number) || 1;
  const total = data?.total || 0;
  const pageSize = 4;
  const totalPages = Math.ceil(total / pageSize);

  useEffect(() => {
    if (state.page === undefined) {
      applyToState('page', pageTransformer, 1);
    }
  }, []);

  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <h3 className={styles.panelTitle}>Usuarios</h3>
        <span className={`${styles.panelBadge} ${styles.badgeUsers}`}>source: users</span>
      </div>

      {loading && <div className={styles.loadingState}>Cargando usuarios...</div>}

      {error && <div className={styles.errorState}>Error: {error.message}</div>}

      {!loading && !error && (!data || data.items.length === 0) && (
        <div className={styles.emptyState}>No se encontraron usuarios</div>
      )}

      {!loading && !error && data && data.items.length > 0 && (
        <table className={styles.table}>
          <thead className={styles.tableHead}>
            <tr>
              <th className={styles.th}>Nombre</th>
              <th className={styles.th}>Email</th>
              <th className={styles.th}>Rol</th>
              <th className={styles.th}>Estado</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item) => (
              <tr key={item.id}>
                <td className={styles.td}>{item.name}</td>
                <td className={styles.td}>{item.email}</td>
                <td className={styles.td}>
                  <span
                    className={styles.statusBadge}
                    style={{
                      background: item.role === 'admin' ? '#ede9fe' : item.role === 'editor' ? '#fef3c7' : '#e0f2fe',
                      color: item.role === 'admin' ? '#5b21b6' : item.role === 'editor' ? '#92400e' : '#0369a1',
                    }}
                  >
                    {item.role}
                  </span>
                </td>
                <td className={styles.td}>
                  <span
                    className={styles.statusBadge}
                    style={{
                      background: item.status === 'active' ? '#d4edda' : item.status === 'inactive' ? '#fff3cd' : '#e2e3e5',
                      color: item.status === 'active' ? '#155724' : item.status === 'inactive' ? '#856404' : '#383d41',
                    }}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className={styles.paginationRow}>
        <span className={styles.paginationInfo}>
          Pag {currentPage}/{totalPages || 1} ({total} items)
        </span>
        <div className={styles.paginationButtons}>
          <button
            onClick={() => applyToState('page', pageTransformer, currentPage - 1)}
            disabled={currentPage <= 1}
            className={styles.paginationBtn}
            data-testid="users-prev-page"
          >
            Anterior
          </button>
          <button
            onClick={() => applyToState('page', pageTransformer, currentPage + 1)}
            disabled={currentPage >= totalPages}
            className={styles.paginationBtn}
            data-testid="users-next-page"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}
