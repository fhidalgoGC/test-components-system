import { useControlDataContext } from '@/lib/ui-library/providers';
import type { StateTransformer } from '@/lib/ui-library/providers';

const statusTransformer: StateTransformer<string, string | undefined> = (value) => {
  console.log('🔵 [TRANSFORMER] StatusFilter transforming:', value);
  return value || undefined;
};

export function StatusFilter() {
  const { applyToState } = useControlDataContext();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log('🔄 [UI EVENT] StatusFilter changed:', e.target.value);
    applyToState('status', statusTransformer, e.target.value);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <label style={{ fontSize: '12px', color: '#666' }}>Estado</label>
      <select
        onChange={handleChange}
        style={{
          padding: '8px 12px',
          border: '1px solid #ddd',
          borderRadius: '4px',
          fontSize: '14px',
          width: '150px',
        }}
        data-testid="status-filter-select"
      >
        <option value="">Todos</option>
        <option value="active">Activo</option>
        <option value="archived">Archivado</option>
        <option value="draft">Borrador</option>
      </select>
    </div>
  );
}
