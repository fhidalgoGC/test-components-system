import { Paginator } from '@/lib/ui-library/components/Paginator';

interface SimplePaginatorProps {
  lang: string;
}

export const SimplePaginator = ({ lang }: SimplePaginatorProps) => {
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
          initialItemsPerPage={25}
          itemsPerPageOptions={[25, 50, 100, 200]}
          onPageChange={(page) => console.log('Page changed to:', page)}
          onItemsPerPageChange={(items) => console.log('Items per page changed to:', items)}
          langOverride={lang}
          i18nOrder="local-first"
        />
      </div>
    </div>
  );
};
