# Estructura de carpetas de un componente

Guia de referencia para la organizacion interna de los componentes de la libreria UI.

## Regla principal

> Si una carpeta no tiene contenido que justifique su existencia, **no se crea**. Solo se agregan las carpetas que el componente realmente necesita.

---

## Estructura completa

```
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
├── index.tsx           # Wrapper: Provider + View
└── README-USE.md       # Documentacion de uso del componente
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
├── ComponentName.type.ts
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
└── index.ts
```

**Cuando crearla:** Cuando el componente tiene estilos propios que necesitan un CSS Module.

**No crearla:** Si el componente usa solo clases de Tailwind directamente en el JSX y no necesita un archivo CSS aparte.

---

### hooks/ — Hooks del componente

Contiene hooks personalizados del componente, incluyendo el hook de i18n.

```
hooks/
├── useI18nMerge.hook.ts
├── useComponentName.hook.ts
└── index.ts
```

**Cuando crearla:** Cuando el componente necesita hooks propios. Si el componente tiene i18n, esta carpeta es necesaria para el `useI18nMerge.hook.ts`.

**No crearla:** Si el componente no tiene logica de estado propia ni i18n.

---

### i18n/ — Traducciones locales

Contiene archivos JSON con las traducciones especificas del componente.

```
i18n/
├── en.json
├── es.json
└── index.ts
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

**Cuando crearla:** Cuando el componente tiene textos internos visibles al usuario que necesitan traduccion (labels, placeholders, mensajes).

**No crearla:** Si el componente solo recibe textos via props (como `labelI18n`) y no tiene textos propios.

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

**Cuando crearla:** Cuando el componente tiene i18n, estado compartido entre subcomponentes, o logica que necesita ser accesible via contexto.

**No crearla:** Si el componente es simple, no tiene i18n y no comparte estado entre hijos.

---

### components/ — Subcomponentes internos

Contiene componentes hijos que solo se usan dentro de este componente. No se exportan al exterior.

```
components/
├── SubComponent/
│   ├── SubComponent.tsx
│   ├── styles/SubComponent.module.css
│   └── index.ts
└── AnotherSub/
    ├── AnotherSub.tsx
    └── index.ts
```

**Cuando crearla:** Cuando el componente tiene partes internas que merecen ser su propio componente (por ejemplo, `SelfSpinner` dentro de `Loading`, `HeaderCell` dentro de `BaseTable`).

**No crearla:** Si el componente es simple y todo cabe en la vista.

---

### layouts/ — Variantes de layout

Contiene diferentes disposiciones visuales del mismo componente.

```
layouts/
├── ComponentName.normal.layout.tsx
├── ComponentName.compact.layout.tsx
└── index.ts
```

**Cuando crearla:** Cuando el componente tiene multiples modos de presentacion (por ejemplo, `List` con layout normal y compacto).

**No crearla:** Si el componente tiene un solo layout.

---

### utils/ — Funciones utilitarias

Contiene funciones auxiliares puras (sin estado, sin React) especificas del componente.

```
utils/
├── componentname.util.ts
└── index.ts
```

**Cuando crearla:** Cuando hay logica de transformacion de datos, formateadores, validadores, o calculos que no pertenecen al hook ni a la vista.

**No crearla:** Si no hay logica auxiliar independiente.

---

### environment/ — Configuracion

Contiene constantes de configuracion del componente con soporte para variables de entorno y ConfigProvider.

```
environment/
├── enviroment.ts
└── index.ts
```

```tsx
export const environment = {
  SOME_CONFIG: import.meta.env.VITE_COMPONENT_CONFIG || 'default',
};
```

**Cuando crearla:** Cuando el componente necesita configuracion externa o valores por defecto que pueden ser sobreescritos via `ConfigProvider` o variables de entorno.

**No crearla:** Si el componente no tiene configuracion sobreescribible.

---

## index.tsx — Wrapper

El archivo `index.tsx` conecta el Provider con la View:

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

## Resumen: cuando crear cada carpeta

| Carpeta / Archivo | Crear cuando... | No crear si... |
|-------------------|-----------------|----------------|
| `views/` | Siempre | — |
| `types/` | Siempre | — |
| `README-USE.md` | Siempre | — |
| `styles/` | Tiene estilos CSS Modules | Solo usa Tailwind inline |
| `hooks/` | Tiene hooks propios o i18n | Sin logica de estado ni i18n |
| `i18n/` | Tiene textos internos traducibles | Solo recibe textos via props |
| `providers/` | Tiene i18n, estado compartido o contexto | Componente simple sin subcomponentes |
| `components/` | Tiene subcomponentes internos | Todo cabe en la vista |
| `layouts/` | Tiene multiples modos de presentacion | Un solo layout |
| `utils/` | Tiene logica auxiliar pura | Sin logica de transformacion |
| `environment/` | Necesita config externa o env vars | Sin configuracion sobreescribible |

---

## Ejemplo minimo (componente simple)

```
├── types/
│   ├── SimpleAlert.type.ts
│   └── index.ts
├── views/
│   ├── SimpleAlert.view.tsx
│   └── index.ts
├── index.tsx
└── README-USE.md
```

Solo `types/`, `views/` y `README-USE.md`. Sin estilos propios, sin i18n, sin provider, sin hooks.

---

## Ejemplo completo (componente complejo con i18n)

```
├── components/
│   └── HeaderCell/
│       ├── HeaderCell.tsx
│       └── index.ts
├── styles/
│   ├── DataTable.module.css
│   └── index.ts
├── hooks/
│   ├── useI18nMerge.hook.ts
│   ├── useDataTable.hook.ts
│   └── index.ts
├── i18n/
│   ├── en.json
│   ├── es.json
│   └── index.ts
├── providers/
│   ├── DataTable.provider.tsx
│   └── index.ts
├── types/
│   ├── DataTable.type.ts
│   └── index.ts
├── utils/
│   ├── datatable.util.ts
│   └── index.ts
├── views/
│   ├── DataTable.view.tsx
│   └── index.ts
├── index.tsx
└── README-USE.md
```

Todas las carpetas necesarias estan presentes porque el componente las justifica.

---

## README-USE.md — Documentacion de uso

**Siempre necesario.** Cada componente debe tener un `README-USE.md` que documente como usarlo, sus props, variantes y ejemplos.

### Reglas del README-USE.md

- Se escribe en español
- Documenta TODAS las props del componente
- Incluye ejemplos de codigo para cada variante o modo de uso
- Las tablas de props usan el formato: `Prop | Tipo | Default | Descripcion`
- Si el componente tiene un hook/controller, se documenta su API
- Si el componente tiene tipos auxiliares (interfaces), se muestran con su definicion completa
- Si el componente tiene comportamientos condicionales, se documentan en tablas de comportamiento

### Estructura estandar del README-USE.md

```markdown
# NombreComponente

Descripcion breve de una linea sobre que hace el componente y para que sirve.

## Caracteristicas

- **Feature 1**: Descripcion corta
- **Feature 2**: Descripcion corta
- **Feature 3**: Descripcion corta

## Importacion

\```tsx
import { NombreComponente } from '@/lib/ui-library/components/NombreComponente';
import type { NombreComponenteProps } from '@/lib/ui-library/components/NombreComponente';
\```

## Uso basico

\```tsx
<NombreComponente
  propRequerida="valor"
  otraProp={data}
/>
\```

## Variantes de uso

### Variante 1: Nombre descriptivo

Explicacion breve de cuando usar esta variante.

\```tsx
<NombreComponente
  propRequerida="valor"
  variante="opcion1"
/>
\```

### Variante 2: Nombre descriptivo

Explicacion breve de cuando usar esta variante.

\```tsx
<NombreComponente
  propRequerida="valor"
  variante="opcion2"
  propAdicional={valor}
/>
\```

## Props

### NombreComponenteProps

| Prop | Tipo | Default | Descripcion |
|------|------|---------|-------------|
| `propRequerida` | `string` | requerido | Que hace esta prop |
| `propOpcional` | `boolean` | `false` | Que hace esta prop |
| `className` | `string` | `undefined` | Clase CSS adicional |

## Tipos auxiliares

### NombreDelTipo

\```typescript
interface NombreDelTipo {
  campo1: string;
  campo2?: number;
}
\```

### OtroTipo

| Prop | Tipo | Descripcion |
|------|------|-------------|
| `campo1` | `string` | Que hace |
| `campo2` | `number` | Que hace |

## Controller / Hook (si aplica)

### useNombreComponenteController

\```tsx
const controller = useNombreComponenteController();

controller.metodo1();
controller.metodo2('param');
\```

| Metodo | Retorna | Descripcion |
|--------|---------|-------------|
| `metodo1()` | `void` | Que hace |
| `metodo2(id)` | `boolean` | Que hace |

## Comportamiento

| Escenario | Comportamiento |
|-----------|----------------|
| `propX=true` | Que pasa |
| `propX=false` | Que pasa |
| Sin `propY` | Comportamiento por defecto |

## Ejemplos de integracion (si aplica)

### Con otro componente

\```tsx
<ContenedorPadre>
  <NombreComponente ... />
  <OtroComponente ... />
</ContenedorPadre>
\```

## Demo

Disponible en `/components/nombre-componente`
```

### Secciones opcionales

| Seccion | Incluir cuando... |
|---------|-------------------|
| Caracteristicas | Siempre (resume las capacidades del componente) |
| Importacion | Siempre |
| Uso basico | Siempre |
| Variantes de uso | El componente tiene multiples modos o configuraciones |
| Props | Siempre |
| Tipos auxiliares | Hay interfaces que el consumidor necesita conocer |
| Controller / Hook | El componente expone un hook de control externo |
| Comportamiento | Hay logica condicional que depende de combinaciones de props |
| Ejemplos de integracion | El componente se usa tipicamente combinado con otros |
| Demo | Siempre (link a la pagina de demo) |

### Ejemplo real: README-USE.md de un componente simple

```markdown
# SimpleAlert

Alerta visual configurable con niveles de severidad y cierre opcional.

## Caracteristicas

- **4 niveles**: `info`, `warning`, `error`, `success`
- **Cierre opcional**: Boton de cerrar configurable
- **Icono automatico**: Icono segun el nivel de severidad

## Importacion

\```tsx
import { SimpleAlert } from '@/lib/ui-library/components/SimpleAlert';
\```

## Uso basico

\```tsx
<SimpleAlert level="info" message="Operacion completada" />
\```

## Variantes de uso

### Con cierre

\```tsx
<SimpleAlert
  level="warning"
  message="Sesion por expirar"
  closable={true}
  onClose={() => console.log('cerrado')}
/>
\```

### Con titulo

\```tsx
<SimpleAlert
  level="error"
  title="Error de conexion"
  message="No se pudo conectar al servidor"
/>
\```

## Props

| Prop | Tipo | Default | Descripcion |
|------|------|---------|-------------|
| `level` | `'info' \| 'warning' \| 'error' \| 'success'` | requerido | Nivel de severidad |
| `message` | `string` | requerido | Texto del mensaje |
| `title` | `string` | `undefined` | Titulo opcional |
| `closable` | `boolean` | `false` | Muestra boton de cerrar |
| `onClose` | `() => void` | `undefined` | Callback al cerrar |
| `className` | `string` | `undefined` | Clase CSS adicional |

## Comportamiento

| Escenario | Comportamiento |
|-----------|----------------|
| `closable=true` | Muestra boton X, llama `onClose` al hacer click |
| `closable=false` | Sin boton de cierre, la alerta es persistente |
| Sin `title` | Solo muestra el mensaje, sin linea de titulo |

## Demo

Disponible en `/components/simple-alert`
```
