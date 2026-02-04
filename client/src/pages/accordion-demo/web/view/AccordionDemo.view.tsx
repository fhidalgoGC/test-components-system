import {
  Example1InternalControl,
  Example2PropsControl,
  Example3HookControl,
  Example4RenderStrategies,
  Example5ScrollBehavior,
} from '../components';

export const AccordionDemoWebView = () => {
  return (
    <div style={{ padding: '24px', maxWidth: '900px' }}>
      <h1 style={{ marginBottom: '8px', fontSize: '28px', fontWeight: 700 }}>Accordion Component</h1>
      <p style={{ marginBottom: '32px', color: '#6b7280' }}>
        Componente agnóstico y controlable. Soporta control interno, por props y por hook externo.
      </p>
      
      <Example1InternalControl />
      <Example2PropsControl />
      <Example3HookControl />
      <Example4RenderStrategies />
      <Example5ScrollBehavior />
      
      <div style={{ marginTop: '32px', padding: '16px', background: '#f8fafc', borderRadius: '8px' }}>
        <h4 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>Console Logs</h4>
        <p style={{ fontSize: '12px', color: '#6b7280' }}>
          Abre la consola del navegador para ver los eventos onToggleAccordion y onRenderBody.
        </p>
      </div>
    </div>
  );
};
