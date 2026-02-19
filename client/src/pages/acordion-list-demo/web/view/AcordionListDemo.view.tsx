import {
  ExampleSelfHeader,
  ExampleComponentHeader,
  ExampleGetItemData,
  ExampleFixedHeight,
  ExampleVisibleRecords,
  ExampleWithPaginator,
  ExampleStates,
} from '../components';

export const AcordionListDemoWebView = () => {
  return (
    <div style={{ padding: '24px', maxWidth: '900px' }}>
      <h1 style={{ marginBottom: '8px', fontSize: '28px', fontWeight: 700 }}>AcordionList Component</h1>
      <p style={{ marginBottom: '32px', color: '#6b7280' }}>
        Lista de Accordions controlados. Soporta header self/component, modos single/multiple, controller externo y transformación de datos con getItemData.
      </p>

      <ExampleSelfHeader />
      <ExampleComponentHeader />
      <ExampleGetItemData />
      <ExampleFixedHeight />
      <ExampleVisibleRecords />
      <ExampleWithPaginator />
      <ExampleStates />

      <div style={{ marginTop: '32px', padding: '16px', background: '#f8fafc', borderRadius: '8px' }}>
        <h4 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>Console Logs</h4>
        <p style={{ fontSize: '12px', color: '#6b7280' }}>
          Abre la consola del navegador para ver los eventos onToggle y onOpenChange.
        </p>
      </div>
    </div>
  );
};
