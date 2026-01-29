import { Paginator } from '@/lib/ui-library/components/Paginator';

interface EmptyExampleProps {
  lang: string;
}

export const EmptyExample = ({ lang }: EmptyExampleProps) => {
  return (
    <div style={{ marginBottom: '32px' }}>
      <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>
        5. Empty State (0 items)
      </h2>
      <div style={{ 
        border: '1px solid #e5e7eb', 
        borderRadius: '8px', 
        overflow: 'hidden',
        backgroundColor: '#fff',
      }}>
        <div style={{ padding: '16px', borderBottom: '1px solid #e5e7eb' }}>
          <p style={{ color: '#6b7280' }}>No records found</p>
        </div>
        <Paginator
          totalItems={0}
          initialItemsPerPage={10}
          itemsPerPageOptions={[10, 25, 50]}
          onPageChange={(page) => console.log('Page changed to:', page)}
          langOverride={lang}
          i18nOrder="local-first"
        />
      </div>
    </div>
  );
};
