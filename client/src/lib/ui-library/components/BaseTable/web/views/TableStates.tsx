import type { StatesConfig, TableState } from '../types';
import styles from '../css/BaseTable.module.css';

interface TableStatesProps {
  state: TableState;
  statesConfig?: StatesConfig;
  error?: string;
  columnsCount: number;
}

export const TableStates = ({ state, statesConfig, error, columnsCount }: TableStatesProps) => {
  const renderStateContent = () => {
    switch (state) {
      case 'loading': {
        const loadingConfig = statesConfig?.loading;
        if (loadingConfig?.component) {
          return loadingConfig.component;
        }
        return (
          <div className={styles.stateContainer}>
            <div className={styles.loadingSpinner} />
            <span>{loadingConfig?.defaultText || 'Loading...'}</span>
          </div>
        );
      }

      case 'error': {
        const errorConfig = statesConfig?.error;
        if (errorConfig?.component) {
          return errorConfig.component;
        }
        return (
          <div className={`${styles.stateContainer} ${styles.errorState}`}>
            <span>{error || errorConfig?.defaultText || 'An error occurred'}</span>
          </div>
        );
      }

      case 'empty': {
        const emptyConfig = statesConfig?.empty;
        if (emptyConfig?.component) {
          return emptyConfig.component;
        }
        return (
          <div className={`${styles.stateContainer} ${styles.emptyState}`}>
            <span>{emptyConfig?.defaultText || 'No data available'}</span>
          </div>
        );
      }

      default:
        return null;
    }
  };

  if (state === 'idle' || state === 'success') {
    return null;
  }

  return (
    <tbody>
      <tr>
        <td colSpan={columnsCount} data-testid={`table-state-${state}`}>
          {renderStateContent()}
        </td>
      </tr>
    </tbody>
  );
};
