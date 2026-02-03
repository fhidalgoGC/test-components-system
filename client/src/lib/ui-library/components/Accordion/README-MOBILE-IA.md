# Accordion - Mobile Responsive Version

## Overview

Implementación mobile responsive del componente Accordion. Comparte la misma API y lógica que la versión web, optimizada para pantallas pequeñas.

## Características

- Misma API que web
- Estilos optimizados para touch
- Control interno, por props y por hook
- Estrategias de render: "once" / "always"

## Importación

```tsx
import { Accordion, useAccordionController } from '@/lib/ui-library/components/Accordion';
```

El componente detecta automáticamente si es mobile usando `useIsMobile()`.

## Folder Structure

```
mobile/
├── css/
│   ├── index.ts
│   ├── Accordion.module.css    # Estilos mobile
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

## Uso

Misma API que la versión web:

```tsx
<Accordion
  id="mobile-accordion"
  defaultOpen={false}
  header={{
    renderType: 'component',
    render: <span>Toca para expandir</span>,
  }}
  body={{
    renderType: 'component',
    render: <p>Contenido mobile...</p>,
    behaviors: {
      renderComponentStrategy: 'once',
    },
  }}
/>
```

## Platform Resolution

El `index.tsx` principal usa `useIsMobile()` para dispatch:

```typescript
if (isMobile) {
  return <AccordionMobile {...props} />;  // < 768px
}
return <AccordionWeb {...props} />;        // >= 768px
```

## Tipos Compartidos

Los tipos se comparten desde `shared/`:

```typescript
// mobile/types/Accordion.type.ts
export type {
  AccordionProps,
  AccordionController,
  AccordionCallbacks,
  AccordionLayout,
  AccordionHeader,
  AccordionBody,
} from '../../shared';
```
