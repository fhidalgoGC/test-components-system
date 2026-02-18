import { useEffect } from 'react';
import { useMultiControlData } from '@/lib/ui-library/providers';
import type { StateTransformer } from '@/lib/ui-library/providers';
import styles from '../css/MultiControlDataDemo.module.css';

type FileItem = {
  id: number;
  name: string;
  type: string;
  size: number;
  status: string;
};

type FilesResponse = {
  items: FileItem[];
  total: number;
  page: number;
};

const pageTransformer: StateTransformer<number, number> = (value) => value;

export function FilesPanel() {
  const { data, loading, error, state, applyToState } = useMultiControlData<FilesResponse>('files');

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
        <h3 className={styles.panelTitle}>Archivos</h3>
        <span className={`${styles.panelBadge} ${styles.badgeFiles}`}>source: files</span>
      </div>

      {loading && <div className={styles.loadingState}>Cargando archivos...</div>}

      {error && <div className={styles.errorState}>Error: {error.message}</div>}

      {!loading && !error && (!data || data.items.length === 0) && (
        <div className={styles.emptyState}>No se encontraron archivos</div>
      )}

      {!loading && !error && data && data.items.length > 0 && (
        <table className={styles.table}>
          <thead className={styles.tableHead}>
            <tr>
              <th className={styles.th}>Nombre</th>
              <th className={styles.th}>Tipo</th>
              <th className={styles.th}>Tamano</th>
              <th className={styles.th}>Estado</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item) => (
              <tr key={item.id}>
                <td className={styles.td}>{item.name}</td>
                <td className={styles.td}>{item.type}</td>
                <td className={styles.td}>{(item.size / 1024).toFixed(1)} KB</td>
                <td className={styles.td}>
                  <span
                    className={styles.statusBadge}
                    style={{
                      background: item.status === 'active' ? '#d4edda' : item.status === 'archived' ? '#fff3cd' : '#e2e3e5',
                      color: item.status === 'active' ? '#155724' : item.status === 'archived' ? '#856404' : '#383d41',
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
            data-testid="files-prev-page"
          >
            Anterior
          </button>
          <button
            onClick={() => applyToState('page', pageTransformer, currentPage + 1)}
            disabled={currentPage >= totalPages}
            className={styles.paginationBtn}
            data-testid="files-next-page"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}
