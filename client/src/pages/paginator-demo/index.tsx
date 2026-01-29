import { useState } from 'react';
import { Paginator } from '@/lib/ui-library/components/Paginator';
import { useAppLanguage } from '@/lib/ui-library/providers';

function CompleteExample({ lang }: { lang: string }) {
  const [totalItems, setTotalItems] = useState(435);

  return (
    <div style={{ marginBottom: '32px' }}>
      <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>
        1. Complete Example
      </h2>
      <div style={{ marginBottom: '12px', display: 'flex', gap: '8px', alignItems: 'center' }}>
        <span style={{ fontSize: '14px', color: '#6b7280' }}>Total Items:</span>
        <input
          type="number"
          value={totalItems}
          onChange={(e) => setTotalItems(Math.max(1, parseInt(e.target.value) || 1))}
          style={{
            padding: '6px 10px',
            borderRadius: '4px',
            border: '1px solid #d1d5db',
            width: '100px',
            fontSize: '14px',
          }}
          data-testid="input-total-items-1"
        />
      </div>
      <div style={{ 
        border: '1px solid #e5e7eb', 
        borderRadius: '8px', 
        overflow: 'hidden',
        backgroundColor: '#fff',
      }}>
        <div style={{ padding: '16px', borderBottom: '1px solid #e5e7eb' }}>
          <p style={{ color: '#6b7280' }}>Simulated table content for {totalItems} trips...</p>
        </div>
        <Paginator
          totalItems={totalItems}
          itemsPerPage={10}
          itemsPerPageOptions={[10, 25, 50, 100]}
          onPageChange={(page) => console.log('Page changed to:', page)}
          onItemsPerPageChange={(items) => console.log('Items per page changed to:', items)}
          langOverride={lang}
          i18nOrder="local-first"
        />
      </div>
    </div>
  );
}

function SimplePaginator({ lang }: { lang: string }) {
  return (
    <div style={{ marginBottom: '32px' }}>
      <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>
        2. Simple Paginator
      </h2>
      <div style={{ 
        border: '1px solid #e5e7eb', 
        borderRadius: '8px', 
        overflow: 'hidden',
        backgroundColor: '#fff',
      }}>
        <div style={{ padding: '16px', borderBottom: '1px solid #e5e7eb' }}>
          <p style={{ color: '#6b7280' }}>Simulated table content for 1250 items...</p>
        </div>
        <Paginator
          totalItems={1250}
          itemsPerPage={25}
          itemsPerPageOptions={[25, 50, 100, 200]}
          onPageChange={(page) => console.log('Page changed to:', page)}
          onItemsPerPageChange={(items) => console.log('Items per page changed to:', items)}
          langOverride={lang}
          i18nOrder="local-first"
        />
      </div>
    </div>
  );
}

function MinimalPaginator({ lang }: { lang: string }) {
  return (
    <div style={{ marginBottom: '32px' }}>
      <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>
        3. Minimal (no items per page selector)
      </h2>
      <div style={{ 
        border: '1px solid #e5e7eb', 
        borderRadius: '8px', 
        overflow: 'hidden',
        backgroundColor: '#fff',
      }}>
        <Paginator
          totalItems={100}
          itemsPerPage={10}
          showItemsPerPage={false}
          onPageChange={(page) => console.log('Page changed to:', page)}
          langOverride={lang}
          i18nOrder="local-first"
        />
      </div>
    </div>
  );
}

function CallbacksDemo({ lang }: { lang: string }) {
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
          itemsPerPage={10}
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
}

export default function PaginatorDemo() {
  const appLanguage = useAppLanguage();
  const lang = appLanguage?.lang ?? 'en';
  const setLanguage = appLanguage?.setLang ?? (() => {});

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Paginator Demo</h1>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setLanguage('en')}
            style={{
              padding: '8px 16px',
              borderRadius: '4px',
              border: '1px solid #d1d5db',
              backgroundColor: lang === 'en' ? '#3b82f6' : '#fff',
              color: lang === 'en' ? '#fff' : '#374151',
              cursor: 'pointer',
            }}
          >
            English
          </button>
          <button
            onClick={() => setLanguage('es')}
            style={{
              padding: '8px 16px',
              borderRadius: '4px',
              border: '1px solid #d1d5db',
              backgroundColor: lang === 'es' ? '#3b82f6' : '#fff',
              color: lang === 'es' ? '#fff' : '#374151',
              cursor: 'pointer',
            }}
          >
            Español
          </button>
        </div>
      </div>

      <CompleteExample lang={lang} />
      <SimplePaginator lang={lang} />
      <MinimalPaginator lang={lang} />
      <CallbacksDemo lang={lang} />
    </div>
  );
}
