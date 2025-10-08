# Component Generator

Generador automático de componentes para la biblioteca de UI.

## Uso básico

```bash
npm run new-component <ComponentName> [opciones]
```

## Ejemplos

### Componente básico (solo estructura mínima)
```bash
npm run new-component Modal
```

Genera:
```
Modal/
  mobile/
    css/
    hooks/
    types/
    views/
  index.tsx
```

### Componente completo con todas las carpetas
```bash
npm run new-component Modal -all-folders
```

Genera además:
- `i18n/` - Archivos de internacionalización (en.json, es.json)
- `utils/` - Utilidades y funciones auxiliares
- `providers/` - Context provider del componente

### Con README de IA
```bash
npm run new-component Modal -readme
```

Genera un archivo `README-IA.md` dentro del componente con documentación inicial.

### Versión web
```bash
npm run new-component Modal -web
```

Por defecto crea versión mobile. Usa `-web` para web, o ambos flags para crear ambas versiones.

### Comando completo
```bash
npm run new-component Modal -all-folders -readme -mobile -web
```

## Opciones disponibles

| Opción | Descripción |
|--------|-------------|
| `-all-folders` | Crea i18n + utils + provider automáticamente |
| `-readme` | Genera README-IA.md dentro del componente |
| `-mobile` | Crea versión mobile (por defecto si no se especifica `-web`) |
| `-web` | Crea versión web |

## Estructura generada

### Estructura mínima (sin flags)

```
ComponentName/
├── mobile/
│   ├── css/
│   │   ├── ComponentName.module.css
│   │   ├── ComponentName.module.ts
│   │   └── index.ts
│   ├── hooks/
│   │   ├── useComponentName.hook.ts
│   │   └── index.ts
│   ├── types/
│   │   ├── ComponentName.type.ts
│   │   └── index.ts
│   ├── views/
│   │   ├── ComponentName.view.tsx
│   │   └── index.ts
│   └── index.tsx
└── index.tsx
```

### Con `-all-folders`

Agrega:
```
ComponentName/
├── mobile/
│   ├── ... (estructura básica)
│   ├── i18n/
│   │   ├── en.json
│   │   ├── es.json
│   │   └── index.ts
│   ├── utils/
│   │   ├── componentname.util.ts
│   │   └── index.ts
│   └── providers/
│       ├── ComponentName.provider.tsx
│       └── index.ts
```

### Con `-readme`

Agrega:
```
ComponentName/
├── README-IA.md
└── ...
```

## Componente por defecto

El componente base generado es un div simple:

```tsx
export function ComponentName() {
  return <div>ComponentName</div>;
}
```

A partir de aquí puedes desarrollar la funcionalidad específica del componente.

## Archivos generados

### 1. Types (`ComponentName.type.ts`)
```tsx
export interface ComponentNameProps {
  children?: React.ReactNode;
  className?: string;
}
```

### 2. Hook (`useComponentName.hook.ts`)
```tsx
import { useState } from 'react';
import type { ComponentNameProps } from '../types';

export const useComponentName = (props: ComponentNameProps) => {
  const [state, setState] = useState({});

  return {
    state,
  };
};
```

### 3. View (`ComponentName.view.tsx`)
```tsx
import type { ComponentNameProps } from '../types';

export const ComponentNameView = (props: ComponentNameProps) => {
  const { children, className } = props;

  return (
    <div className={className} data-testid="componentname">
      {children || 'ComponentName'}
    </div>
  );
};
```

### 4. CSS Module (`ComponentName.module.css` y `.ts`)
Estilos CSS Modules con Tailwind + exportaciones TypeScript

### 5. Provider (con `-all-folders`)
```tsx
import { createContext, useContext, useState } from 'react';

const ComponentNameContext = createContext(undefined);

export const ComponentNameProvider = ({ children }) => {
  const [state, setState] = useState({});

  return (
    <ComponentNameContext.Provider value={{ }}>
      {children}
    </ComponentNameContext.Provider>
  );
};

export const useComponentNameContext = () => {
  const context = useContext(ComponentNameContext);
  if (!context) {
    throw new Error('useComponentNameContext must be used within ComponentNameProvider');
  }
  return context;
};
```

### 6. i18n (con `-all-folders`)
Archivos JSON para inglés y español con estructura base

### 7. Utils (con `-all-folders`)
Archivo de utilidades para funciones auxiliares del componente

## Importación

El componente se exporta automáticamente en `components/index.ts`:

```tsx
import { ComponentName } from '@/lib/ui-library/components/ComponentName';

function Example() {
  return (
    <ComponentName>
      Content
    </ComponentName>
  );
}
```

## Notas

- Los nombres de componentes deben estar en PascalCase
- El generador actualiza automáticamente el index de componentes
- Todas las carpetas y archivos siguen la estructura establecida del proyecto
- El componente por defecto es un div simple, listo para personalizar
