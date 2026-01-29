import { useAppLanguage } from '@/lib/ui-library/providers';
import { CompleteExample, SimplePaginator, MinimalPaginator, CallbacksDemo, EmptyExample } from './components';

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
      <EmptyExample lang={lang} />
    </div>
  );
}
