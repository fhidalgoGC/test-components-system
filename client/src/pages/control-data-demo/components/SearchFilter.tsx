import { useControlDataContext } from '@/lib/ui-library/providers';
import type { FilterTransformer } from '@/lib/ui-library/providers';

const searchTransformer: FilterTransformer<string> = (value) => {
  console.log('🔵 [TRANSFORMER] SearchFilter transforming:', value);
  return { textSearch: value.toUpperCase() };
};

export function SearchFilter() {
  const { applyFilter } = useControlDataContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('⌨️ [UI EVENT] SearchFilter input changed:', e.target.value);
    applyFilter(searchTransformer, e.target.value);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <label style={{ fontSize: '12px', color: '#666' }}>Buscar archivo</label>
      <input
        type="text"
        onChange={handleChange}
        placeholder="Escribe para buscar..."
        style={{
          padding: '8px 12px',
          border: '1px solid #ddd',
          borderRadius: '4px',
          fontSize: '14px',
          width: '200px',
        }}
        data-testid="search-filter-input"
      />
    </div>
  );
}
