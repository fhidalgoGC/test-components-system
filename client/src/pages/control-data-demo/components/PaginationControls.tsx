import { useControlDataContext } from '@/lib/ui-library/providers';

type ApiResponse = {
  items: unknown[];
  total: number;
  page: number;
};

export function PaginationControls() {
  const { data, state, setPage, resetFilters, reload } = useControlDataContext<ApiResponse>();

  const total = data?.total || 0;
  const pageSize = 5;
  const totalPages = Math.ceil(total / pageSize);

  const handlePrevious = () => {
    if (state.page > 1) {
      console.log('⬅️ [UI EVENT] Previous page clicked');
      setPage(state.page - 1);
    }
  };

  const handleNext = () => {
    if (state.page < totalPages) {
      console.log('➡️ [UI EVENT] Next page clicked');
      setPage(state.page + 1);
    }
  };

  const handleReset = () => {
    console.log('🔄 [UI EVENT] Reset filters clicked');
    resetFilters();
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
          data-testid="reset-filters-button"
        >
          🔄 Limpiar filtros
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
          Página {state.page} de {totalPages || 1} ({total} items)
        </span>
        <button
          onClick={handlePrevious}
          disabled={state.page <= 1}
          style={{
            padding: '8px 16px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            background: state.page <= 1 ? '#eee' : '#fff',
            cursor: state.page <= 1 ? 'not-allowed' : 'pointer',
          }}
          data-testid="prev-page-button"
        >
          ← Anterior
        </button>
        <button
          onClick={handleNext}
          disabled={state.page >= totalPages}
          style={{
            padding: '8px 16px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            background: state.page >= totalPages ? '#eee' : '#fff',
            cursor: state.page >= totalPages ? 'not-allowed' : 'pointer',
          }}
          data-testid="next-page-button"
        >
          Siguiente →
        </button>
      </div>
    </div>
  );
}
