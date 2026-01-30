import { useEffect } from 'react';
import { useControlDataContext } from '@/lib/ui-library/providers';
import type { StateTransformer } from '@/lib/ui-library/providers';

type ApiResponse = {
  items: unknown[];
  total: number;
  page: number;
};

const pageTransformer: StateTransformer<number, number> = (value, _previous) => {
  console.log('🔵 [TRANSFORMER] Page transforming:', value, '| Previous:', _previous);
  return value;
};

export function PaginationControls() {
  const { data, state, applyToState, resetState, reload } = useControlDataContext<ApiResponse>();

  const currentPage = (state.page as number) || 1;

  useEffect(() => {
    if (state.page === undefined) {
      console.log('📄 [INIT] Initializing page to 1');
      applyToState('page', pageTransformer, 1);
    }
  }, []);
  const total = data?.total || 0;
  const pageSize = 5;
  const totalPages = Math.ceil(total / pageSize);

  const handlePrevious = () => {
    if (currentPage > 1) {
      console.log('⬅️ [UI EVENT] Previous page clicked');
      applyToState('page', pageTransformer, currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      console.log('➡️ [UI EVENT] Next page clicked');
      applyToState('page', pageTransformer, currentPage + 1);
    }
  };

  const handleReset = () => {
    console.log('🔄 [UI EVENT] Reset state clicked');
    resetState();
  };

  const handleReload = () => {
    console.log('🔃 [UI EVENT] Reload clicked');
    reload();
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '16px',
      padding: '12px 16px',
      background: '#f8f9fa',
      borderRadius: '8px'
    }}>
      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          onClick={handleReset}
          style={{
            padding: '8px 16px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            background: '#fff',
            cursor: 'pointer',
          }}
          data-testid="reset-state-button"
        >
          🔄 Limpiar todo
        </button>
        <button
          onClick={handleReload}
          style={{
            padding: '8px 16px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            background: '#fff',
            cursor: 'pointer',
          }}
          data-testid="reload-button"
        >
          🔃 Recargar
        </button>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ color: '#666', fontSize: '14px' }}>
          Página {currentPage} de {totalPages || 1} ({total} items)
        </span>
        <button
          onClick={handlePrevious}
          disabled={currentPage <= 1}
          style={{
            padding: '8px 16px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            background: currentPage <= 1 ? '#eee' : '#fff',
            cursor: currentPage <= 1 ? 'not-allowed' : 'pointer',
          }}
          data-testid="prev-page-button"
        >
          ← Anterior
        </button>
        <button
          onClick={handleNext}
          disabled={currentPage >= totalPages}
          style={{
            padding: '8px 16px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            background: currentPage >= totalPages ? '#eee' : '#fff',
            cursor: currentPage >= totalPages ? 'not-allowed' : 'pointer',
          }}
          data-testid="next-page-button"
        >
          Siguiente →
        </button>
      </div>
    </div>
  );
}
