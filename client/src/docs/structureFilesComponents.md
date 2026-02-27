# Estructura de carpetas de un componente

Guia de referencia para la organizacion interna de los componentes de la libreria UI.

## Regla principal

> Si una carpeta no tiene contenido que justifique su existencia, **no se crea**. Solo se agregan las carpetas que el componente realmente necesita.

---

## Estructura raiz del componente

```
ComponentName/
├── web/                # Variante web (Vite + React DOM)
├── mobile/             # Variante mobile responsive (opcional)
├── native/             # Variante React Native (opcional)
├── shared/             # Logica compartida entre variantes (opcional)
├── index.tsx           # Entry point con switch de plataforma
└── README.md           # Documentacion del componente
```

### Reglas de la raiz

- **Solo** `index.tsx`, `README.md` y las carpetas de variante (`web/`, `mobile/`, `native/`, `shared/`) van en la raiz.
- **Nunca** poner carpetas como `hooks/`, `styles/`, `types/`, `components/`, `providers/` directamente en la raiz. Esas van dentro de la variante correspondiente (`web/`, `mobile/`, etc.).
- Si el componente solo tiene una variante (por ejemplo solo `web/`), la estructura sigue siendo la misma: todo dentro de `web/`.

### index.tsx segun las variantes

**Solo web:**
```tsx
export { ComponentNameView as ComponentName } from './web';
export type { ComponentNameProps } from './web/types';
```

**Web + Mobile:**
```tsx
import { useIsMobile } from '../../hooks';
import { ComponentName as ComponentNameWeb } from './web';
import { ComponentName as ComponentNameMobile } from './mobile';

export const ComponentName = (props) => {
  const isMobile = useIsMobile();
  return isMobile
    ? <ComponentNameMobile {...props} />
    : <ComponentNameWeb {...props} />;
};
```

**Solo una variante con la otra pendiente:**
```tsx
import { useIsMobile } from '../../hooks';
import { ComponentName as ComponentNameWeb } from './web';
import { NotImplemented } from '../NotImplemented';

export const ComponentName = (props) => {
  const isMobile = useIsMobile();
  return isMobile
    ? <NotImplemented platform="Mobile" componentName="ComponentName" />
    : <ComponentNameWeb {...props} />;
};
```

---

## Estructura interna de una variante (web/, mobile/, native/)

```
web/
├── components/         # Subcomponentes internos
├── styles/             # CSS Modules
├── hooks/              # Hooks del componente
├── i18n/               # Traducciones locales
├── providers/          # Context Provider
├── types/              # Interfaces y tipos
├── views/              # Vista(s) del componente
├── layouts/            # Variantes de layout
├── utils/              # Funciones utilitarias
├── environment/        # Configuracion y constantes
└── index.tsx           # Wrapper: Provider + View
```

---

## Descripcion de cada carpeta

### views/ — Vista del componente

**Siempre necesaria.** Contiene el JSX del componente. Es la presentacion visual.

```
views/
├── ComponentName.view.tsx
└── index.ts
```

```tsx
// ComponentName.view.tsx
export function ComponentNameView(props: ComponentNameProps) {
  const { t, lang } = useComponentNameContext();
  return <div>{t('label')}</div>;
}
```

**Cuando crearla:** Siempre. Todo componente tiene al menos una vista.

---

### types/ — Interfaces y tipos

**Siempre necesaria.** Define las interfaces de props, context, y tipos auxiliares.

```
types/
├── ComponentName.type.ts    # Props + Context + tipos auxiliares
└── index.ts
```

```tsx
export interface ComponentNameProps {
  className?: string;
  langOverride?: string;
  i18nOrder?: 'global-first' | 'local-first';
}

export interface ComponentNameContext {
  t: (key: string, params?: Record<string, string | number>) => string;
  lang: string;
}
```

**Cuando crearla:** Siempre. Los tipos son obligatorios en TypeScript.

---

### styles/ — Estilos CSS Modules

Contiene los archivos `.module.css` con los estilos encapsulados del componente.

```
styles/
├── ComponentName.module.css
└── index.ts                   # Re-export opcional
```

**Cuando crearla:** Cuando el componente tiene estilos propios. Si el componente usa solo clases de Tailwind directamente en el JSX y no necesita un CSS Module, **no se crea**.

---

### hooks/ — Hooks del componente

Contiene hooks personalizados del componente, incluyendo el hook de i18n.

```
hooks/
├── useI18nMerge.hook.ts       # Combina traducciones locales + globales
├── useComponentName.hook.ts   # Logica de estado/comportamiento
└── index.ts
```

**Cuando crearla:** Cuando el componente necesita hooks propios. Si el componente tiene i18n, esta carpeta es necesaria para el `useI18nMerge.hook.ts`. Si no tiene ni hooks ni i18n, **no se crea**.

---

### i18n/ — Traducciones locales

Contiene archivos JSON con las traducciones especificas del componente.

```
i18n/
├── en.json
├── es.json
└── index.ts       # localDictionaries + getLocalDict
```

```json
// en.json
{
  "label": "My Component",
  "description": "Component description"
}
```

```tsx
// index.ts
import en from './en.json';
import es from './es.json';

export const localDictionaries = { en, es } as const;

export const getLocalDict = (lang?: string) => {
  const pick = (lang || 'en').toLowerCase().startsWith('es') ? 'es' : 'en';
  return localDictionaries[pick];
};
```

**Cuando crearla:** Cuando el componente tiene textos internos visibles al usuario que necesitan traduccion (labels, placeholders, mensajes). Si el componente solo recibe textos via props (como `labelI18n`) y no tiene textos propios, **no se crea**.

---

### providers/ — Context Provider

Contiene el React Context y el Provider del componente. Pasa `t()` y `lang` (y cualquier otro estado compartido) a los hijos.

```
providers/
├── ComponentName.provider.tsx
└── index.ts
```

```tsx
const Ctx = createContext<ComponentNameContext | null>(null);

export function useComponentNameContext() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('ComponentNameProvider not mounted');
  return ctx;
}

export const ComponentNameProvider: React.FC<{
  children: ReactNode;
  langOverride?: string;
  i18nOrder?: 'global-first' | 'local-first';
}> = ({ children, langOverride, i18nOrder = 'local-first' }) => {
  const { t, lang } = useI18nMerge(langOverride, { order: i18nOrder });

  const value = useMemo<ComponentNameContext>(() => ({
    t, lang
  }), [t, lang]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};
```

**Cuando crearla:** Cuando el componente tiene i18n, estado compartido entre subcomponentes, o logica que necesita ser accesible via contexto. Si el componente es simple y no comparte estado, **no se crea**.

---

### components/ — Subcomponentes internos

Contiene componentes hijos que solo se usan dentro de este componente. No se exportan.

```
components/
├── SubComponent/
│   ├── SubComponent.tsx
│   ├── styles/SubComponent.module.css    # Si necesita estilos propios
│   └── index.ts
└── AnotherSub/
    ├── AnotherSub.tsx
    └── index.ts
```

**Cuando crearla:** Cuando el componente tiene partes internas que merecen ser su propio componente (por ejemplo, `SelfSpinner` dentro de `Loading`, `HeaderCell` dentro de `BaseTable`). Si el componente es simple y todo cabe en la vista, **no se crea**.

---

### layouts/ — Variantes de layout

Contiene diferentes disposiciones visuales del mismo componente.

```
layouts/
├── ComponentName.normal.layout.tsx
├── ComponentName.compact.layout.tsx
└── index.ts
```

**Cuando crearla:** Cuando el componente tiene multiples modos de presentacion (por ejemplo, `List` con layout normal y compacto). Si el componente tiene un solo layout, **no se crea**.

---

### utils/ — Funciones utilitarias

Contiene funciones auxiliares puras (sin estado, sin React) especificas del componente.

```
utils/
├── componentname.util.ts
└── index.ts
```

**Cuando crearla:** Cuando hay logica de transformacion de datos, formateadores, validadores, o calculos que no pertenecen al hook ni a la vista. Si no hay logica auxiliar, **no se crea**.

---

### environment/ — Configuracion

Contiene constantes de configuracion del componente con soporte para variables de entorno y ConfigProvider.

```
environment/
├── enviroment.ts     # Constantes flat
└── index.ts          # Re-export como COMPONENT_NAME_CONFIG
```

```tsx
export const environment = {
  SOME_CONFIG: import.meta.env.VITE_COMPONENT_CONFIG || 'default',
};
```

**Cuando crearla:** Cuando el componente necesita configuracion externa o valores por defecto que pueden ser sobreescritos via `ConfigProvider` o variables de entorno. Si el componente no tiene configuracion externa, **no se crea**.

---

## web/index.tsx — Wrapper

El archivo `index.tsx` dentro de la variante conecta el Provider con la View:

```tsx
import type { ComponentNameProps } from './types';
import { ComponentNameProvider } from './providers';
import { ComponentNameView } from './views';

export const ComponentName = (props: ComponentNameProps) => {
  const { langOverride, i18nOrder, ...viewProps } = props;

  return (
    <ComponentNameProvider langOverride={langOverride} i18nOrder={i18nOrder}>
      <ComponentNameView {...viewProps} />
    </ComponentNameProvider>
  );
};
```

Si el componente no tiene provider (componente simple sin i18n ni contexto), el wrapper simplemente re-exporta la vista:

```tsx
export { ComponentNameView as ComponentName } from './views';
export type { ComponentNameProps } from './types';
```

---

## shared/ — Logica compartida entre variantes

Cuando `web/` y `mobile/` comparten logica (tipos, controladores, utilidades), se coloca en `shared/` al nivel de la raiz del componente.

```
ComponentName/
├── shared/
│   ├── types/
│   ├── controllers/
│   └── utils/
├── web/
├── mobile/
└── index.tsx
```

**Cuando crearla:** Solo cuando existen multiples variantes (`web/` + `mobile/`) que comparten tipos o logica. Si solo hay una variante, **no se crea**.

---

## Resumen: cuando crear cada carpeta

| Carpeta | Crear cuando... | No crear si... |
|---------|-----------------|----------------|
| `views/` | Siempre | — |
| `types/` | Siempre | — |
| `styles/` | El componente tiene CSS Modules | Solo usa Tailwind inline |
| `hooks/` | Tiene hooks propios o i18n | Componente sin logica de estado ni i18n |
| `i18n/` | Tiene textos internos traducibles | Solo recibe textos via props |
| `providers/` | Tiene i18n, estado compartido o contexto | Componente simple sin subcomponentes |
| `components/` | Tiene subcomponentes internos | Todo cabe en la vista |
| `layouts/` | Tiene multiples modos de presentacion | Un solo layout |
| `utils/` | Tiene logica auxiliar pura | Sin logica de transformacion |
| `environment/` | Necesita config externa o env vars | Sin configuracion sobreescribible |
| `shared/` | Multiples variantes comparten logica | Solo una variante |

---

## Ejemplo minimo (componente simple)

```
SimpleAlert/
├── web/
│   ├── types/
│   │   ├── SimpleAlert.type.ts
│   │   └── index.ts
│   ├── views/
│   │   ├── SimpleAlert.view.tsx
│   │   └── index.ts
│   └── index.tsx
├── index.tsx
└── README.md
```

Solo `types/` y `views/`. Sin estilos propios, sin i18n, sin provider, sin hooks.

---

## Ejemplo completo (componente complejo con i18n)

```
DataTable/
├── web/
│   ├── components/
│   │   └── HeaderCell/
│   │       ├── HeaderCell.tsx
│   │       └── index.ts
│   ├── styles/
│   │   ├── DataTable.module.css
│   │   └── index.ts
│   ├── hooks/
│   │   ├── useI18nMerge.hook.ts
│   │   ├── useDataTable.hook.ts
│   │   └── index.ts
│   ├── i18n/
│   │   ├── en.json
│   │   ├── es.json
│   │   └── index.ts
│   ├── providers/
│   │   ├── DataTable.provider.tsx
│   │   └── index.ts
│   ├── types/
│   │   ├── DataTable.type.ts
│   │   └── index.ts
│   ├── utils/
│   │   ├── datatable.util.ts
│   │   └── index.ts
│   ├── views/
│   │   ├── DataTable.view.tsx
│   │   └── index.ts
│   └── index.tsx
├── index.tsx
└── README.md
```

Todas las carpetas necesarias estan presentes porque el componente las justifica.

---

## Ejemplo multi-plataforma

```
UserProfile/
├── shared/
│   ├── types/
│   │   └── UserProfile.type.ts
│   └── controllers/
│       └── userprofile.controller.ts
├── web/
│   ├── styles/
│   ├── hooks/
│   ├── views/
│   └── index.tsx
├── mobile/
│   ├── styles/
│   ├── hooks/
│   ├── views/
│   └── index.tsx
├── index.tsx       # Switch con useIsMobile()
└── README.md
```

`shared/` contiene los tipos y controladores que ambas variantes usan. Cada variante tiene su propia vista y estilos.
