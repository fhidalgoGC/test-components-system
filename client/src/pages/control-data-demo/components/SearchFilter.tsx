import { useControlDataContext } from '@/lib/ui-library/providers';
import type { StateTransformer } from '@/lib/ui-library/providers';

const searchTransformer: StateTransformer<string, string> = (value) => {
  console.log('🔵 [TRANSFORMER] SearchFilter transforming:', value);
  return value.toUpperCase();
};

export function SearchFilter() {
  const { applyToState } = useControlDataContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('⌨️ [UI EVENT] SearchFilter input changed:', e.target.value);
    applyToState('textSearch', searchTransformer, e.target.value);
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
