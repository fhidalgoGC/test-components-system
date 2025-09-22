# 🏗️ Guía para Construir Nuevos Componentes

Esta guía establece las convenciones y estructura estándar para crear componentes en la librería UI. **Sigue estas normas estrictamente** para mantener consistencia y escalabilidad.

## 📁 Estructura de Carpetas

### Estructura Principal
```
client/src/lib/ui-library/
├── components/
│   └── [ComponentName]/           ← PascalCase para nombre del componente
│       ├── css/                   ← Estilos CSS modules
│       ├── hooks/                 ← React hooks específicos
│       ├── i18n/                  ← Traducciones locales del componente
│       ├── providers/             ← Context providers específicos
│       ├── types/                 ← Definiciones de tipos TypeScript
│       ├── views/                 ← Componentes de vista/renderizado
│       ├── index.tsx              ← Punto de entrada principal
│       └── README-IA.md           ← Documentación del componente
├── utils/                         ← Utilidades globales compartidas
├── providers/                     ← Providers globales de la librería
├── types/                         ← Tipos globales compartidos
└── README-BUILD-NEW-COMPONENTS.md ← Este archivo
```

## 🎯 Convenciones de Nombres

### Carpetas (SIEMPRE PLURAL)
- `css/` - Archivos de estilos CSS modules
- `hooks/` - React hooks personalizados
- `i18n/` - Archivos de internacionalización
- `providers/` - Context providers y contextos
- `types/` - Definiciones de tipos TypeScript
- `views/` - Componentes de vista y renderizado

### Archivos (PREFIJO SINGULAR)
- **Componentes de vista**: `[ComponentName].view.tsx`
- **Hooks**: `[hookName].hook.ts`
- **Tipos**: `[typeName].type.ts`
- **Providers**: `[ComponentName].provider.tsx`
- **CSS Modules**: `[ComponentName].module.css` + `[ComponentName].module.ts`
- **Utilidades**: `[utilityName].util.ts`
- **Traducciones**: `[language].json` (ej: `en.json`, `es.json`)
- **Index files**: `index.ts` (para re-exportar)

## 🛠️ Plantilla de Componente

### 1. Estructura Básica
```
components/MyComponent/
├── css/
│   ├── MyComponent.module.css
│   └── MyComponent.module.ts
├── hooks/
│   ├── useMyComponent.hook.ts
│   └── index.ts
├── i18n/
│   ├── en.json
│   ├── es.json
│   └── index.ts
├── providers/
│   ├── MyComponent.provider.tsx
│   └── index.ts
├── types/
│   ├── MyComponent.type.ts
│   ├── component.type.ts
│   └── index.ts
├── views/
│   ├── MyComponent.view.tsx
│   └── index.ts
├── index.tsx
└── README-IA.md
```

### 2. Ejemplo de `index.tsx` Principal
```typescript
// Re-export the unified component
export { MyComponentView as default } from './views';

// Re-export types and utilities for external use
export * from './types';
export type { MyComponentProps } from './types/MyComponent.type';

// Re-export the component with original name
export { MyComponentView as MyComponent } from './views';
```

### 3. Ejemplo de `views/MyComponent.view.tsx`
```typescript
import React from 'react';
import type { MyComponentProps } from '../types';
import { MyComponentProvider } from '../providers';
import { useMyComponent } from '../hooks';
import { containerClasses } from '../css/MyComponent.module';

export const MyComponentView: React.FC<MyComponentProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <MyComponentProvider>
      <div className={containerClasses(className)} {...props}>
        {children}
      </div>
    </MyComponentProvider>
  );
};
```

### 4. Ejemplo de `types/MyComponent.type.ts`
```typescript
import type { ReactNode } from 'react';

export interface MyComponentProps {
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
  // Agregar props específicas aquí
}

export interface MyComponentState {
  isOpen: boolean;
  // Agregar estado específico aquí
}
```

### 5. Ejemplo de `hooks/useMyComponent.hook.ts`
```typescript
import { useState, useCallback } from 'react';
import type { MyComponentState } from '../types';

export function useMyComponent() {
  const [state, setState] = useState<MyComponentState>({
    isOpen: false,
  });

  const toggle = useCallback(() => {
    setState(prev => ({ ...prev, isOpen: !prev.isOpen }));
  }, []);

  return {
    state,
    actions: {
      toggle,
    },
  };
}
```

### 6. Ejemplo de `css/MyComponent.module.ts`
```typescript
import styles from './MyComponent.module.css';

export const containerClasses = (className?: string) => {
  const base = styles.container;
  return className ? `${base} ${className}` : base;
};

export const buttonClasses = (variant: 'primary' | 'secondary' = 'primary') => {
  return `${styles.button} ${styles[variant]}`;
};
```

## 🌐 Sistema de Internacionalización

### Estructura de Traducciones
```
i18n/
├── en.json     ← Inglés (idioma base)
├── es.json     ← Español
└── index.ts    ← Exporta funciones de acceso
```

### Ejemplo de `i18n/en.json`
```json
{
  "title": "My Component",
  "button": "Click me",
  "loading": "Loading...",
  "error": "An error occurred"
}
```

### Ejemplo de `i18n/index.ts`
```typescript
import en from './en.json';
import es from './es.json';

const translations = { en, es };

export function getLocalDict(lang: string) {
  return translations[lang as keyof typeof translations] || translations.en;
}

export { en, es };
```

## 🎨 Sistema de Estilos CSS Modules

### Estructura CSS
```css
/* MyComponent.module.css */

.container {
  display: flex;
  flex-direction: column;
  /* Variables CSS para theming */
  background-color: var(--component-bg, #ffffff);
  color: var(--component-text, #000000);
}

.button {
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  transition: all 0.2s ease;
}

.primary {
  background-color: var(--primary-color, #3b82f6);
  color: white;
}

.secondary {
  background-color: var(--secondary-color, #6b7280);
  color: white;
}

/* Estados responsivos */
@media (max-width: 768px) {
  .container {
    padding: 0.5rem;
  }
}
```

## 🔗 Uso de Recursos Globales

### Utilidades Globales (`../../../utils/`)
```typescript
// Importar utilidades globales
import { makeTranslator, detectDevice } from '../../../utils';
```

### Providers Globales (`../../../providers/`)
```typescript
// Importar providers globales como LibI18n
import { useLibI18n } from '../../../providers/LibI18n.provider';
```

### Tipos Globales (`../../../types/`)
```typescript
// Importar tipos compartidos
import type { MultiLanguageLabel } from '../../../types/language.types';
```

## ✅ Checklist de Implementación

### Antes de Crear el Componente
- [ ] Verificar que no existe un componente similar
- [ ] Definir la API del componente (props, callbacks)
- [ ] Planificar estados y comportamientos

### Durante la Implementación
- [ ] Crear estructura de carpetas siguiendo convenciones
- [ ] Implementar tipos TypeScript primero
- [ ] Crear hooks para lógica reutilizable
- [ ] Implementar estilos con CSS modules
- [ ] Agregar soporte i18n si es necesario
- [ ] Crear provider si maneja estado complejo

### Después de la Implementación
- [ ] Crear `index.ts` en cada carpeta para re-exports
- [ ] Documentar en `README-IA.md`
- [ ] Agregar data-testid para testing
- [ ] Verificar accesibilidad básica
- [ ] Probar en modo light/dark

## 🚫 Errores Comunes a Evitar

### ❌ Convenciones Incorrectas
```typescript
// MAL - nombres incorrectos
components/myComponent/     // debe ser PascalCase
types/MyComponent.types.ts  // debe ser .type.ts
hook/useMyHook.ts          // carpeta debe ser plural: hooks/
```

### ❌ Imports Incorrectos
```typescript
// MAL - rutas relativas largas
import { utils } from '../../../../utils/someUtil';

// BIEN - usar alias configurados
import { utils } from '@/lib/ui-library/utils';
```

### ❌ Estructura Incorrecta
```typescript
// MAL - lógica en el componente principal
export const MyComponent = () => {
  const [state, setState] = useState();
  // mucha lógica aquí...
  return <div>...</div>;
};

// BIEN - separar en hooks
export const MyComponent = () => {
  const { state, actions } = useMyComponent();
  return <div>...</div>;
};
```

## 📚 Recursos Adicionales

- **CSS Variables**: Usar variables CSS para theming dinámico
- **TypeScript**: Preferir tipos estrictos sobre `any`
- **Testing**: Agregar `data-testid` en elementos interactivos
- **Accesibilidad**: Incluir atributos ARIA cuando sea necesario
- **Performance**: Usar `memo` y `useCallback` para optimizaciones

---

## 🎯 Ejemplo Completo: Componente Modal

Consulta el componente `TagSelector` como referencia completa de implementación siguiendo todas estas convenciones.