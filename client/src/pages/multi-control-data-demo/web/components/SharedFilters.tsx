import { useMultiControlData } from '@/lib/ui-library/providers';
import type { StateTransformer } from '@/lib/ui-library/providers';
import styles from '../css/MultiControlDataDemo.module.css';

const searchTransformer: StateTransformer<string, string> = (value) => value;
const statusTransformer: StateTransformer<string, string | undefined> = (value) => value || undefined;
const pageTransformer: StateTransformer<number, number> = (value) => value;

export function SharedFilters() {
  const files = useMultiControlData('files');
  const users = useMultiControlData('users');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    files.applyToState('textSearch', searchTransformer, value);
    files.applyToState('page', pageTransformer, 1);
    users.applyToState('textSearch', searchTransformer, value);
    users.applyToState('page', pageTransformer, 1);
  };

  const handleStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    files.applyToState('status', statusTransformer, value);
    files.applyToState('page', pageTransformer, 1);
    users.applyToState('status', statusTransformer, value);
    users.applyToState('page', pageTransformer, 1);
  };

  const handleResetAll = () => {
    files.resetState();
    users.resetState();
  };

  const handleReloadAll = () => {
    files.reload();
    users.reload();
  };

  return (
    <div className={styles.filtersRow}>
      <div className={styles.filterGroup}>
        <label className={styles.filterLabel}>Buscar (ambos sources)</label>
        <input
          type="text"
          onChange={handleSearch}
          placeholder="Escribe para buscar..."
          className={styles.filterInput}
          data-testid="multi-search-input"
        />
      </div>

      <div className={styles.filterGroup}>
        <label className={styles.filterLabel}>Estado (ambos sources)</label>
        <select
          onChange={handleStatus}
          className={styles.filterSelect}
          data-testid="multi-status-select"
        >
          <option value="">Todos</option>
          <option value="active">Activo</option>
          <option value="inactive">Inactivo</option>
          <option value="archived">Archivado</option>
        </select>
      </div>

      <div className={styles.actionButtons}>
        <button onClick={handleResetAll} className={styles.actionBtn} data-testid="multi-reset-button">
          Limpiar todo
        </button>
        <button onClick={handleReloadAll} className={styles.actionBtn} data-testid="multi-reload-button">
          Recargar todo
        </button>
      </div>
    </div>
  );
}
