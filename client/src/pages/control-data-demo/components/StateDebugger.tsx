import { useControlDataContext } from '@/lib/ui-library/providers';

export function StateDebugger() {
  const { state, loading, error } = useControlDataContext();

  return (
    <div style={{
      width: '300px',
      padding: '16px',
      background: '#1e1e1e',
      borderRadius: '8px',
      color: '#fff',
      fontSize: '12px',
      fontFamily: 'monospace',
      position: 'sticky',
      top: '24px',
      height: 'fit-content',
    }}>
      <h3 style={{ margin: '0 0 12px 0', color: '#4fc3f7' }}>🔍 State Debugger</h3>
      
      <div style={{ marginBottom: '12px' }}>
        <span style={{ color: '#81c784' }}>loading:</span>{' '}
        <span style={{ color: loading ? '#ffb74d' : '#aaa' }}>{String(loading)}</span>
      </div>

      <div style={{ marginBottom: '12px' }}>
        <span style={{ color: '#81c784' }}>error:</span>{' '}
        <span style={{ color: error ? '#ef5350' : '#aaa' }}>{error ? error.message : 'null'}</span>
      </div>

      <div style={{ marginBottom: '8px' }}>
        <span style={{ color: '#81c784' }}>state:</span>
      </div>
      
      <pre style={{ 
        margin: 0, 
        padding: '12px',
        background: '#2d2d2d',
        borderRadius: '4px',
        overflow: 'auto',
        maxHeight: '400px',
      }}>
        {JSON.stringify(state, null, 2)}
      </pre>
    </div>
  );
}
