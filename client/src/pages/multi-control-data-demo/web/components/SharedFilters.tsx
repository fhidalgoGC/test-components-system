import { useMultiControlData, MAIN_SOURCE_KEY } from '@/lib/ui-library/providers';
import type { StateTransformer } from '@/lib/ui-library/providers';
import styles from '../css/MultiControlDataDemo.module.css';

const searchTransformer: StateTransformer<string, string> = (value) => value;
const statusTransformer: StateTransformer<string, string | undefined> = (value) => value || undefined;
const pageTransformer: StateTransformer<number, number> = (value) => value;

export function SharedFilters() {
  const main = useMultiControlData(MAIN_SOURCE_KEY);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    main.applyToState('textSearch', searchTransformer, e.target.value);
    main.applyToState('page', pageTransformer, 1);
  };

  const handleStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    main.applyToState('status', statusTransformer, e.target.value);
    main.applyToState('page', pageTransformer, 1);
  };

  const handleResetAll = () => {
    main.resetState();
  };

  const handleReloadAll = () => {
    main.reload();
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
