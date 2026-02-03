import { useState } from 'react';
import { Accordion, useAccordionController } from '@/lib/ui-library/components/Accordion';
import { SampleHeader } from './SampleHeader';
import { RenderTrackingBody } from './RenderTrackingBody';

export function Example3HookControl() {
  const controller = useAccordionController();
  const [renderCount, setRenderCount] = useState(0);

  return (
    <div style={{ marginBottom: '32px' }}>
      <h3 style={{ marginBottom: '16px', color: '#1f2937' }}>3. Control por Hook (useAccordionController)</h3>
      <p style={{ marginBottom: '16px', color: '#6b7280', fontSize: '14px' }}>
        Control imperativo completo desde fuera mediante el hook. El accordion se registra automáticamente.
      </p>
      
      <div style={{ marginBottom: '16px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <button
          onClick={() => controller.open('hook-control-1')}
          style={{
            padding: '8px 16px',
            background: '#10b981',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
          data-testid="hook-open-button"
        >
          Abrir
        </button>
        <button
          onClick={() => controller.close('hook-control-1')}
          style={{
            padding: '8px 16px',
            background: '#ef4444',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
          data-testid="hook-close-button"
        >
          Cerrar
        </button>
        <button
          onClick={() => controller.toggle('hook-control-1')}
          style={{
            padding: '8px 16px',
            background: '#8b5cf6',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
          data-testid="hook-toggle-button"
        >
          Toggle
        </button>
        <button
          onClick={() => {
            controller.forceRenderBody('hook-control-1');
            setRenderCount(prev => prev + 1);
          }}
          style={{
            padding: '8px 16px',
            background: '#f59e0b',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
          data-testid="hook-force-render-button"
        >
          Force Re-render Body ({renderCount})
        </button>
        <button
          onClick={() => {
            const state = controller.isOpen('hook-control-1');
            alert(`isOpen: ${state}`);
          }}
          style={{
            padding: '8px 16px',
            background: '#6b7280',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
          data-testid="hook-check-state-button"
        >
          Check State
        </button>
      </div>
      
      <Accordion
        id="hook-control-1"
        controller={controller}
        defaultOpen={true}
        header={{
          renderType: 'component',
          render: <SampleHeader title="Accordion controlado por hook" />,
          arrowPosition: 'right',
        }}
        body={{
          renderType: 'component',
          render: <RenderTrackingBody content="Presiona 'Force Re-render Body' para ver cómo cambia el Render ID aleatorio." />,
          behaviors: {
            renderComponentStrategy: 'always',
            scroll: true,
          },
        }}
        layout={{
          widthMode: 'full',
        }}
        callbacks={{
          onToggleAccordion: (id, isOpen) => {
            console.log(`[Hook] Accordion ${id} toggled: ${isOpen}`);
          },
          onRenderBody: (id) => {
            console.log(`[Hook] Body rendered for ${id}`);
          },
        }}
      />
    </div>
  );
}
