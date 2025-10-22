# Wrapper Generator

Generador automático de wrappers lógicos para la biblioteca de UI. Los wrappers son componentes que solo gestionan estado y contexto **sin estilos CSS**.

## 🚀 Uso básico

```bash
npm run create-wrapper -- <WrapperName>
```

⚠️ **Importante**: El `--` es necesario para pasar el nombre al script.

## 📚 Ejemplos

### Wrapper básico
```bash
npm run create-wrapper -- WrapperAuth
```

Genera:
```
WrapperAuth/
├── hooks/
│   ├── useWrapperAuth.hook.ts
│   └── index.ts
├── types/
│   ├── WrapperAuth.type.ts
│   └── index.ts
├── views/
│   ├── WrapperAuth.view.tsx
│   └── index.ts
├── index.tsx
└── README-IA.md
```

### Otros ejemplos
```bash
npm run create-wrapper -- WrapperSelection
npm run create-wrapper -- WrapperDragDrop
npm run create-wrapper -- WrapperPermissions
npm run create-wrapper -- WrapperTheme
```

## 🎯 Características de los Wrappers

Los wrappers generados tienen estas características:

✅ **Estructura mínima** - Solo types, hooks, views (NO CSS)
✅ **Lógica pura** - Gestionan estado sin aplicar estilos
✅ **Context Provider** - Patrón de contexto listo para usar
✅ **TypeScript** - Completamente tipado
✅ **Test IDs** - data-testid automático
✅ **README** - Documentación básica generada

❌ **NO incluye:**
- CSS/estilos
- i18n/traducciones
- Versiones responsive (mobile/web)
- Providers complejos
- Environment/configuración

## 📁 Estructura generada

```
WrapperName/
├── hooks/
│   ├── useWrapperName.hook.ts    # Lógica del wrapper
│   └── index.ts
├── types/
│   ├── WrapperName.type.ts       # Props y Context types
│   └── index.ts
├── views/
│   ├── WrapperName.view.tsx      # Componente sin estilos
│   └── index.ts
├── index.tsx                      # Export principal
└── README-IA.md                   # Documentación básica
```

## 📦 Archivos generados

### 1. Types (`WrapperName.type.ts`)

```tsx
import type { ReactNode } from 'react';

export interface WrapperNameProps {
  children: ReactNode;
  className?: string;
}
```

### 2. Hook (`useWrapperName.hook.ts`)

```tsx
import { useState, useCallback } from 'react';
import type { WrapperNameProps } from '../types';

export function useWrapperName(props: WrapperNameProps) {
  const { children } = props;

  // Add your wrapper logic here
  
  return {
    children,
  };
}
```

### 3. View (`WrapperName.view.tsx`)

```tsx
import type { WrapperNameProps } from '../types';
import { useWrapperName } from '../hooks';

export const WrapperNameView = (props: WrapperNameProps) => {
  const { children, className } = props;
  
  const {
    children: processedChildren,
  } = useWrapperName(props);

  return (
    <div 
      className={className}
      data-testid="wrappername"
    >
      {processedChildren}
    </div>
  );
};
```

### 4. Index (`index.tsx`)

```tsx
export { WrapperNameView as WrapperName } from './views';
export type { WrapperNameProps } from './types';
```

## 🎨 Sistema de Plantillas

Las plantillas están en `client/src/command-templates/wrappers/`:

```
command-templates/wrappers/
├── hooks/
│   ├── useWrapperName.hook.ts.template
│   └── index.ts.template
├── types/
│   ├── WrapperName.type.ts.template
│   └── index.ts.template
├── views/
│   ├── WrapperName.view.tsx.template
│   └── index.ts.template
└── index.tsx.template
```

### Variables de reemplazo

El generador reemplaza automáticamente:

- `{{WrapperName}}` → Nombre en PascalCase (`WrapperAuth`)
- `{{wrappername}}` → Nombre en lowercase (`wrapperauth`)

## 📝 Importación

El wrapper se exporta automáticamente en `components/index.ts`:

```tsx
import { WrapperAuth } from '@/lib/ui-library/components/WrapperAuth';

function Example() {
  return (
    <WrapperAuth>
      <YourContent />
    </WrapperAuth>
  );
}
```

## 🔧 Extender un Wrapper

### Agregar Context Provider

```tsx
// types/WrapperName.type.ts
export interface WrapperNameContext {
  selectedIds: string[];
  selectItem: (id: string) => void;
  deselectItem: (id: string) => void;
}

export interface WrapperNameProps {
  children: ReactNode;
  onSelectionChange?: (ids: string[]) => void;
}
```

```tsx
// hooks/useWrapperName.hook.ts
import { useState, useCallback } from 'react';

export function useWrapperName(props: WrapperNameProps) {
  const { onSelectionChange } = props;
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const selectItem = useCallback((id: string) => {
    setSelectedIds(prev => {
      const newIds = [...prev, id];
      onSelectionChange?.(newIds);
      return newIds;
    });
  }, [onSelectionChange]);

  const deselectItem = useCallback((id: string) => {
    setSelectedIds(prev => {
      const newIds = prev.filter(i => i !== id);
      onSelectionChange?.(newIds);
      return newIds;
    });
  }, [onSelectionChange]);

  return {
    selectedIds,
    selectItem,
    deselectItem,
  };
}
```

```tsx
// views/WrapperName.view.tsx
import { createContext, useContext } from 'react';
import type { WrapperNameProps, WrapperNameContext } from '../types';
import { useWrapperName } from '../hooks';

const Context = createContext<WrapperNameContext | null>(null);

export const useWrapperNameContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error('useWrapperNameContext must be used within WrapperName');
  }
  return context;
};

export const WrapperNameView = (props: WrapperNameProps) => {
  const { children, className } = props;
  
  const {
    selectedIds,
    selectItem,
    deselectItem,
  } = useWrapperName(props);

  const contextValue: WrapperNameContext = {
    selectedIds,
    selectItem,
    deselectItem,
  };

  return (
    <Context.Provider value={contextValue}>
      <div className={className} data-testid="wrappername">
        {children}
      </div>
    </Context.Provider>
  );
};
```

## 🎯 Cuándo usar Wrappers vs Components

### Usa `create-wrapper` cuando:

- ✅ Solo necesitas gestionar lógica/estado
- ✅ No aplicas estilos propios
- ✅ Provees contexto a hijos
- ✅ Envuelves contenido sin modificar apariencia

**Ejemplos:** `WrapperItemsSelected`, `WrapperAuth`, `WrapperPermissions`

### Usa `new-component` cuando:

- ✅ Necesitas un componente visual con estilos
- ✅ Requieres i18n
- ✅ Necesitas responsive (mobile/web)
- ✅ Muestra contenido visual propio

**Ejemplos:** `Button`, `Card`, `Modal`, `Carousel`

## 📖 Comparación

| Característica | Wrapper | Component |
|---------------|---------|-----------|
| Carpeta CSS | ❌ No | ✅ Sí |
| i18n | ❌ No | ✅ Sí (con -all-folders) |
| Responsive | ❌ No | ✅ Sí (--mobile/--web) |
| Providers | Manual | ✅ Automático (con -all-folders) |
| Environment | ❌ No | ✅ Sí (con -all-folders) |
| Estilos visuales | ❌ No | ✅ Sí |
| Context/Lógica | ✅ Sí | ✅ Sí |

## 🔗 Referencias

- **Plantillas**: `client/src/command-templates/wrappers/`
- **Script generador**: `scripts/create-wrapper.mjs`
- **Wrapper de referencia**: `client/src/lib/ui-library/components/WrapperItemsSelected`
- **Generador de componentes**: `scripts/README-COMMAND-NEW-COMPONENT.md`

## 📝 Notas

- Los nombres de wrappers deben estar en **PascalCase** y empezar con "Wrapper"
- El `data-testid` se genera en **lowercase** automáticamente
- Los wrappers son componentes **puramente lógicos** sin estilos
- Para estilos visuales, usa el generador de componentes (`new-component`)
- Modifica las plantillas en `command-templates/wrappers/` para cambiar cómo se generan

## 💡 Tips

1. **Nombrado claro**: Usa nombres descriptivos como `WrapperSelection`, `WrapperDragDrop`
2. **Context pattern**: Los wrappers son ideales para providers de contexto
3. **Sin estilos**: Si necesitas estilos, usa `new-component` en su lugar
4. **Hook exportado**: Exporta el hook de contexto para que los hijos accedan al estado
5. **Props mínimas**: Mantén las props simples (children + callbacks)

---

**Última actualización:** Octubre 2025
