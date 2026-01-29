import { useControlDataContext } from '@/lib/ui-library/providers';

type FileItem = {
  id: number;
  name: string;
  type: string;
  size: number;
  createdAt: string;
  status: string;
};

type ApiResponse = {
  items: FileItem[];
  total: number;
  page: number;
};

export function DataTable() {
  const { data, loading, error } = useControlDataContext<ApiResponse>();

  if (loading) {
    return (
      <div style={{ 
        padding: '40px', 
        textAlign: 'center', 
        background: '#f8f9fa',
        borderRadius: '8px',
        color: '#666'
      }}>
        ⏳ Cargando datos...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        padding: '40px', 
        textAlign: 'center', 
        background: '#fee', 
        borderRadius: '8px',
        color: '#c00'
      }}>
        ❌ Error: {error.message}
      </div>
    );
  }

  if (!data || data.items.length === 0) {
    return (
      <div style={{ 
        padding: '40px', 
        textAlign: 'center', 
        background: '#f8f9fa',
        borderRadius: '8px',
        color: '#666'
      }}>
        📭 No se encontraron archivos
      </div>
    );
  }

  return (
    <table style={{ 
      width: '100%', 
      borderCollapse: 'collapse',
      background: '#fff',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    }}>
      <thead>
        <tr style={{ background: '#f0f0f0' }}>
          <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Nombre</th>
          <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Tipo</th>
          <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Tamaño</th>
          <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Fecha</th>
          <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Estado</th>
        </tr>
      </thead>
      <tbody>
        {data.items.map((item) => (
          <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>{item.name}</td>
            <td style={{ padding: '12px' }}>{item.type}</td>
            <td style={{ padding: '12px' }}>{(item.size / 1024).toFixed(2)} KB</td>
            <td style={{ padding: '12px' }}>{item.createdAt}</td>
            <td style={{ padding: '12px' }}>
              <span style={{
                padding: '4px 8px',
                borderRadius: '12px',
                fontSize: '12px',
                background: item.status === 'active' ? '#d4edda' : 
                           item.status === 'archived' ? '#fff3cd' : '#e2e3e5',
                color: item.status === 'active' ? '#155724' : 
                       item.status === 'archived' ? '#856404' : '#383d41',
              }}>
                {item.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
