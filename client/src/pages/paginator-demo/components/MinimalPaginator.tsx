import { Paginator } from '@/lib/ui-library/components/Paginator';

interface MinimalPaginatorProps {
  lang: string;
}

export const MinimalPaginator = ({ lang }: MinimalPaginatorProps) => {
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
          initialItemsPerPage={10}
          showItemsPerPage={false}
          onPageChange={(page) => console.log('Page changed to:', page)}
          langOverride={lang}
          i18nOrder="local-first"
        />
      </div>
    </div>
  );
};
