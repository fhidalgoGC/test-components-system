import { useState } from 'react';
import { Paginator } from '@/lib/ui-library/components/Paginator';

interface CallbacksDemoProps {
  lang: string;
}

export const CallbacksDemo = ({ lang }: CallbacksDemoProps) => {
  const [log, setLog] = useState<string[]>([]);

  const addLog = (message: string) => {
    setLog(prev => [...prev.slice(-4), message]);
  };

  return (
    <div style={{ marginBottom: '32px' }}>
      <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>
        4. Callbacks Demo
      </h2>
      <div style={{ 
        border: '1px solid #e5e7eb', 
        borderRadius: '8px', 
        overflow: 'hidden',
        backgroundColor: '#fff',
      }}>
        <Paginator
          totalItems={500}
          initialItemsPerPage={10}
          itemsPerPageOptions={[10, 25, 50]}
          onPageChange={(page) => addLog(`Page changed to: ${page}`)}
          onItemsPerPageChange={(items) => addLog(`Items per page: ${items}`)}
          langOverride={lang}
          i18nOrder="local-first"
        />
      </div>
      <div style={{ 
        marginTop: '12px', 
        padding: '12px', 
        backgroundColor: '#f9fafb', 
        borderRadius: '4px',
        fontFamily: 'monospace',
        fontSize: '13px',
      }}>
        <strong>Callback Log:</strong>
        {log.length === 0 ? (
          <p style={{ color: '#9ca3af', marginTop: '8px' }}>Interact with the paginator to see callbacks...</p>
        ) : (
          <ul style={{ marginTop: '8px', paddingLeft: '16px' }}>
            {log.map((entry, i) => (
              <li key={i} style={{ color: '#374151' }}>{entry}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
