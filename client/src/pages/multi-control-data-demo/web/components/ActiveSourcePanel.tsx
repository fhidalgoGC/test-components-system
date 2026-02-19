import { useMultiControlData, useMultiControlDataActive, useMultiControlDataSources, MAIN_SOURCE_KEY } from '@/lib/ui-library/providers';
import styles from '../css/MultiControlDataDemo.module.css';

export function ActiveSourcePanel() {
  const main = useMultiControlData(MAIN_SOURCE_KEY);
  const sources = useMultiControlDataSources();
  const { activeSource, setActiveSource } = useMultiControlDataActive();

  const data = main.data as { items: Record<string, unknown>[]; total: number; page: number } | null;

  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>Source activo via main</h2>
      <p className={styles.sectionDesc}>
        Un solo componente consume <code>useMultiControlData('main')</code>.
        Al cambiar el source activo, la <strong>data, loading, error y state</strong> del main cambian al source seleccionado.
        Las acciones (applyToState, resetState, reload) siguen siendo broadcast a todos.
      </p>

      <div className={styles.sourceSelectorRow}>
        <span className={styles.selectorLabel}>Source activo:</span>
        <button
          className={`${styles.selectorBtn} ${activeSource === null ? styles.selectorBtnActive : ''}`}
          onClick={() => setActiveSource(null)}
          data-testid="selector-none"
        >
          Ninguno
        </button>
        {sources.map((key) => (
          <button
            key={key}
            className={`${styles.selectorBtn} ${activeSource === key ? styles.selectorBtnActive : ''}`}
            onClick={() => setActiveSource(key)}
            data-testid={`selector-${key}`}
          >
            {key}
          </button>
        ))}
      </div>

      <div className={styles.mainDataPanel}>
        <div className={styles.mainDataHeader}>
          <span className={styles.mainDataLabel}>
            main.data → {activeSource ? <strong>{activeSource}</strong> : <em>null (sin source activo)</em>}
          </span>
          <span className={`${styles.mainDataStatus} ${main.loading ? styles.statusLoading : styles.statusIdle}`}>
            {main.loading ? 'loading...' : 'idle'}
          </span>
        </div>

        {main.loading && (
          <div className={styles.loadingState}>Cargando datos del source activo...</div>
        )}

        {!main.loading && !data && (
          <div className={styles.emptyState}>
            {activeSource === null
              ? 'Selecciona un source para ver sus datos via main'
              : 'Sin datos disponibles'}
          </div>
        )}

        {!main.loading && data && data.items && (
          <>
            <table className={styles.table}>
              <thead className={styles.tableHead}>
                <tr>
                  {Object.keys(data.items[0] || {}).map((col) => (
                    <th key={col} className={styles.th}>{col.toUpperCase()}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.items.map((item, idx) => (
                  <tr key={idx}>
                    {Object.values(item).map((val, ci) => (
                      <td key={ci} className={styles.td}>
                        {typeof val === 'string' && ['active', 'inactive', 'archived'].includes(val) ? (
                          <span
                            className={styles.statusBadge}
                            style={{
                              background: val === 'active' ? '#dcfce7' : val === 'inactive' ? '#fef3c7' : '#fee2e2',
                              color: val === 'active' ? '#166534' : val === 'inactive' ? '#92400e' : '#991b1b',
                            }}
                          >
                            {val}
                          </span>
                        ) : (
                          String(val)
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className={styles.mainDataFooter}>
              Total: {data.total} items | Pagina: {data.page}
            </div>
          </>
        )}

        {main.error && (
          <div className={styles.errorState}>Error: {main.error.message}</div>
        )}

        <div className={styles.mainStatePreview}>
          <span className={styles.mainStateLabel}>main.state:</span>
          <code>{JSON.stringify(main.state)}</code>
        </div>
      </div>
    </div>
  );
}
