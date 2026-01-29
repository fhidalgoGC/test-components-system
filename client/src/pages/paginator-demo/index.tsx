import { useState } from 'react';
import { Paginator } from '@/lib/ui-library/components/Paginator';
import { useAppLanguage } from '@/lib/ui-library/providers';

const StatusIndicator = ({ color, label, count }: { color: string; label: string; count: number }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px' }}>
    <span style={{ 
      width: '8px', 
      height: '8px', 
      borderRadius: '50%', 
      backgroundColor: color,
    }} />
    <span style={{ color: '#6b7280' }}>{label}: {count}</span>
  </div>
);

const ViewAllLink = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      color: '#3b82f6',
      fontSize: '14px',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
    }}
  >
    View all trips
    <span>{'>'}</span>
  </button>
);

export default function PaginatorDemo() {
  const appLanguage = useAppLanguage();
  const lang = appLanguage?.lang ?? 'en';
  const setLanguage = appLanguage?.setLang ?? (() => {});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(435);

  const [currentPage2, setCurrentPage2] = useState(1);
  const [itemsPerPage2, setItemsPerPage2] = useState(25);
  const totalItems2 = 1250;

  const handleViewAll = () => {
    console.log('View all clicked');
  };

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

      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>
          1. Complete Example (with right components)
        </h2>
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
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            itemsPerPageOptions={[10, 25, 50, 100]}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={(items) => {
              setItemsPerPage(items);
              setCurrentPage(1);
            }}
            langOverride={lang}
            i18nOrder="local-first"
            rightComponents={[
              <StatusIndicator key="completed" color="#22c55e" label="Completed" count={2} />,
              <StatusIndicator key="transit" color="#3b82f6" label="In Transit" count={2} />,
              <StatusIndicator key="delayed" color="#ef4444" label="Delayed" count={2} />,
              <ViewAllLink key="view-all" onClick={handleViewAll} />,
            ]}
          />
        </div>
        <div style={{ marginTop: '8px', fontSize: '14px', color: '#6b7280' }}>
          Current state: Page {currentPage}, Items per page: {itemsPerPage}
        </div>
      </div>

      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>
          2. Simple Paginator (no right components)
        </h2>
        <div style={{ 
          border: '1px solid #e5e7eb', 
          borderRadius: '8px', 
          overflow: 'hidden',
          backgroundColor: '#fff',
        }}>
          <div style={{ padding: '16px', borderBottom: '1px solid #e5e7eb' }}>
            <p style={{ color: '#6b7280' }}>Simulated table content for {totalItems2} items...</p>
          </div>
          <Paginator
            totalItems={totalItems2}
            currentPage={currentPage2}
            itemsPerPage={itemsPerPage2}
            itemsPerPageOptions={[25, 50, 100, 200]}
            onPageChange={setCurrentPage2}
            onItemsPerPageChange={(items) => {
              setItemsPerPage2(items);
              setCurrentPage2(1);
            }}
            langOverride={lang}
            i18nOrder="local-first"
          />
        </div>
        <div style={{ marginTop: '8px', fontSize: '14px', color: '#6b7280' }}>
          Current state: Page {currentPage2}, Items per page: {itemsPerPage2}
        </div>
      </div>

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
            currentPage={1}
            itemsPerPage={10}
            showItemsPerPage={false}
            onPageChange={(page) => console.log('Page changed:', page)}
            langOverride={lang}
            i18nOrder="local-first"
          />
        </div>
      </div>

      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>
          4. External Control Demo
        </h2>
        <div style={{ marginBottom: '16px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setCurrentPage(1)}
            style={{
              padding: '8px 16px',
              borderRadius: '4px',
              border: '1px solid #d1d5db',
              backgroundColor: '#fff',
              cursor: 'pointer',
            }}
            data-testid="btn-go-page-1"
          >
            Go to Page 1
          </button>
          <button
            onClick={() => setCurrentPage(22)}
            style={{
              padding: '8px 16px',
              borderRadius: '4px',
              border: '1px solid #d1d5db',
              backgroundColor: '#fff',
              cursor: 'pointer',
            }}
            data-testid="btn-go-page-22"
          >
            Go to Page 22
          </button>
          <button
            onClick={() => setCurrentPage(Math.ceil(totalItems / itemsPerPage))}
            style={{
              padding: '8px 16px',
              borderRadius: '4px',
              border: '1px solid #d1d5db',
              backgroundColor: '#fff',
              cursor: 'pointer',
            }}
            data-testid="btn-go-last-page"
          >
            Go to Last Page
          </button>
          <button
            onClick={() => setItemsPerPage(50)}
            style={{
              padding: '8px 16px',
              borderRadius: '4px',
              border: '1px solid #d1d5db',
              backgroundColor: '#fff',
              cursor: 'pointer',
            }}
            data-testid="btn-set-50-per-page"
          >
            Set 50 per page
          </button>
        </div>
        <div style={{ marginBottom: '16px', display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{ fontSize: '14px', color: '#6b7280' }}>Total Items:</span>
          <input
            type="number"
            value={totalItems}
            onChange={(e) => {
              const value = Math.max(1, parseInt(e.target.value) || 1);
              setTotalItems(value);
              setCurrentPage(1);
            }}
            style={{
              padding: '8px 12px',
              borderRadius: '4px',
              border: '1px solid #d1d5db',
              width: '100px',
              fontSize: '14px',
            }}
            data-testid="input-total-items"
          />
          <button
            onClick={() => { setTotalItems(100); setCurrentPage(1); }}
            style={{
              padding: '8px 16px',
              borderRadius: '4px',
              border: '1px solid #d1d5db',
              backgroundColor: '#fff',
              cursor: 'pointer',
            }}
            data-testid="btn-set-100-items"
          >
            100
          </button>
          <button
            onClick={() => { setTotalItems(500); setCurrentPage(1); }}
            style={{
              padding: '8px 16px',
              borderRadius: '4px',
              border: '1px solid #d1d5db',
              backgroundColor: '#fff',
              cursor: 'pointer',
            }}
            data-testid="btn-set-500-items"
          >
            500
          </button>
          <button
            onClick={() => { setTotalItems(1000); setCurrentPage(1); }}
            style={{
              padding: '8px 16px',
              borderRadius: '4px',
              border: '1px solid #d1d5db',
              backgroundColor: '#fff',
              cursor: 'pointer',
            }}
            data-testid="btn-set-1000-items"
          >
            1000
          </button>
        </div>
        <div style={{ 
          border: '1px solid #e5e7eb', 
          borderRadius: '8px', 
          overflow: 'hidden',
          backgroundColor: '#fff',
        }}>
          <Paginator
            totalItems={totalItems}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            itemsPerPageOptions={[10, 25, 50, 100]}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={(items) => {
              setItemsPerPage(items);
              setCurrentPage(1);
            }}
            langOverride={lang}
            i18nOrder="local-first"
          />
        </div>
      </div>
    </div>
  );
}
