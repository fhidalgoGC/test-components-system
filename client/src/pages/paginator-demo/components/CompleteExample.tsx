import { useState } from 'react';
import { Paginator } from '@/lib/ui-library/components/Paginator';

interface CompleteExampleProps {
  lang: string;
}

export const CompleteExample = ({ lang }: CompleteExampleProps) => {
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
          initialItemsPerPage={10}
          itemsPerPageOptions={[10, 25, 50, 100]}
          onPageChange={(page) => console.log('Page changed to:', page)}
          onItemsPerPageChange={(items) => console.log('Items per page changed to:', items)}
          langOverride={lang}
          i18nOrder="local-first"
        />
      </div>
    </div>
  );
};
