# Accordion - Web Version

## Overview

Implementación web del componente Accordion. Componente agnóstico, reutilizable y controlable.

## Características

- Control interno (no controlado)
- Control por props (controlado)
- Control por hook externo (imperativo)
- Estrategias de render: "once" / "always"
- Layout configurable
- Callbacks para eventos

## Importación

```tsx
import { Accordion, useAccordionController } from '@/lib/ui-library/components/Accordion';
```

## Folder Structure

```
web/
├── css/
│   ├── index.ts
│   ├── Accordion.module.css    # Estilos CSS
│   └── Accordion.module.ts     # Helpers de estilo
├── hooks/
│   ├── index.ts
│   └── useAccordion.hook.ts    # Lógica del componente
├── types/
│   ├── index.ts
│   └── Accordion.type.ts       # Re-export de tipos compartidos
├── views/
│   ├── index.ts
│   └── Accordion.view.tsx      # Componente React
└── index.tsx                   # Export principal
```

## Ejemplos de Uso

### Control Interno

```tsx
<Accordion
  id="faq-1"
  defaultOpen={false}
  header={{
    renderType: 'component',
    render: <span>¿Cómo funciona?</span>,
  }}
  body={{
    renderType: 'component',
    render: <p>Explicación detallada...</p>,
    behaviors: {
      renderComponentStrategy: 'once',
    },
  }}
/>
```

### Control por Props

```tsx
const [isOpen, setIsOpen] = useState(false);

<Accordion
  id="controlled-1"
  isOpen={isOpen}
  callbacks={{
    onToggleAccordion: (_, state) => setIsOpen(state),
  }}
  header={{ renderType: 'component', render: <Header /> }}
  body={{ renderType: 'component', render: <Body /> }}
/>
```

### Control por Hook

```tsx
const controller = useAccordionController();

<button onClick={() => controller.open('hook-1')}>Abrir</button>
<button onClick={() => controller.close('hook-1')}>Cerrar</button>
<button onClick={() => controller.toggle('hook-1')}>Toggle</button>
<button onClick={() => controller.forceRenderBody('hook-1')}>Refresh</button>

<Accordion
  id="hook-1"
  controller={controller}
  header={{ renderType: 'component', render: <Header /> }}
  body={{ 
    renderType: 'component', 
    render: <Body />,
    behaviors: { renderComponentStrategy: 'always' }
  }}
/>
```

## Props

### AccordionProps

```typescript
type AccordionProps = {
  id: string;                        // Identificador único
  controller?: AccordionController;  // Hook de control
  isOpen?: boolean;                  // Estado controlado
  defaultOpen?: boolean;             // Estado inicial
  callbacks?: {
    onToggleAccordion?: (id: string, isOpen: boolean) => void;
    onRenderBody?: (id: string) => void;
  };
  layout?: {
    widthMode?: 'full' | 'auto' | 'fixed';
    width?: number;
    minWidth?: number;
    heightMode?: 'full' | 'auto' | 'fixed';
    height?: number | 'auto';
    minHeight?: number;
  };
  header: {
    renderType: 'component';
    render: ReactNode | Component;
    heightMode?: 'full' | 'auto' | 'fixed';
    height?: number | 'auto';
    minHeight?: number;
  };
  body: {
    renderType: 'component';
    render: ReactNode | Component;
    heightMode?: 'full' | 'auto' | 'fixed';
    height?: number | 'auto';
    minHeight?: number;
    behaviors?: {
      scroll?: boolean;
      renderComponentStrategy?: 'once' | 'always';
    };
  };
};
```

### useAccordionController

```typescript
type AccordionController = {
  open: (id: string) => void;
  close: (id: string) => void;
  toggle: (id: string) => void;
  forceRenderBody: (id: string) => void;
  isOpen: (id: string) => boolean;
};
```

## Data Attributes

- `data-testid="accordion-{id}"` - Contenedor principal
- `data-testid="accordion-header-{id}"` - Header clickeable
- `data-testid="accordion-body-{id}"` - Body expandible
- `data-open="true|false"` - Estado actual del accordion
