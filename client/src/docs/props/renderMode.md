# renderMode y renders — Renderizado condicional por variante responsiva

Los props `renderMode` y `renders` permiten que un componente reciba diferentes renders segun la variante responsiva activa (web, mobile, tablet, orientacion, etc.). Es complementario a `renderType`/`render` y mantiene compatibilidad total con el patron existente.

## Conceptos clave

| Concepto | Que hace |
|----------|----------|
| `renderType` | Define **como** se renderiza: visual interno (`self`) o custom (`component`). Ya documentado en `renderType.md`. |
| `renderMode` | Define **para que variante** se aplica el render: `web`, `mobile`, `native`, `tablet`, etc. |
| `render` | El render unico (sin variantes). Funciona siempre como fallback. |
| `renders` | Objeto con renders por variante. Cada key es un `RenderMode` y el value es el render para esa variante. |

## Interfaz base

```ts
type RenderMode =
  | 'web'
  | 'mobile'
  | 'native'
  | 'tablet'
  | 'desktop'
  | 'mobile-portrait'
  | 'mobile-landscape'
  | 'tablet-portrait'
  | 'tablet-landscape';

interface RenderModeConfig<R = ReactNode> {
  render?: R;
  renders?: Partial<Record<RenderMode, R>>;
}
```

Esta es la interfaz conceptual. Cada componente define su propia variante con tipos mas especificos para `R`.

## Valores de RenderMode

Los valores coinciden con las variantes del hook `useResponsive`:

| RenderMode | Cuando aplica | Basado en |
|------------|---------------|-----------|
| `web` | Cualquier pantalla >= 768px (no mobile) | `!isMobile` |
| `mobile` | Pantalla < 768px | `isMobile` |
| `native` | Plataforma nativa (React Native / Expo) | Plataforma |
| `tablet` | Pantalla >= 768px y < 1024px | `isTablet` |
| `desktop` | Pantalla >= 1024px | `isDesktop` |
| `mobile-portrait` | Mobile + orientacion vertical | `isMobile && isPortrait` |
| `mobile-landscape` | Mobile + orientacion horizontal | `isMobile && isLandscape` |
| `tablet-portrait` | Tablet + orientacion vertical | `isTablet && isPortrait` |
| `tablet-landscape` | Tablet + orientacion horizontal | `isTablet && isLandscape` |

## Cadena de resolucion (fallback)

Cuando el componente necesita resolver que render usar, sigue esta cadena de prioridad. Se usa el primer match que tenga un valor definido:

### Para mobile

```
mobile-portrait → mobile → web → render
mobile-landscape → mobile → web → render
```

### Para tablet

```
tablet-portrait → tablet → web → render
tablet-landscape → tablet → web → render
```

### Para desktop

```
desktop → web → render
```

### Para native

```
native → render
```

En resumen: **variante especifica → variante general → `web` → `render`**.

## Props opcionales — compatibilidad total

Tanto `renders` como cada key dentro de `renders` son **opcionales**. El componente funciona en cualquiera de estos escenarios:

### Escenario 1: Solo `render` (patron actual, sin cambios)

```tsx
<Grid
  data={items}
  item={{
    renderType: 'component',
    render: (item, index) => <Card data={item} />,
  }}
/>
```

Sin `renders`, se usa `render` en todas las variantes. Compatibilidad total con el patron existente.

### Escenario 2: `renders` con algunas variantes

```tsx
<Grid
  data={items}
  item={{
    renderType: 'component',
    render: (item, index) => <Card data={item} />,
    renders: {
      mobile: (item, index) => <CompactCard data={item} />,
    },
  }}
/>
```

En mobile usa `renders.mobile`. En web/tablet/desktop no hay variante definida en `renders`, entonces cae al fallback `render`.

### Escenario 3: `renders` con todas las variantes que necesitas

```tsx
<Grid
  data={items}
  item={{
    renderType: 'component',
    renders: {
      web: (item, index) => <DesktopCard data={item} />,
      mobile: (item, index) => <MobileCard data={item} />,
      tablet: (item, index) => <TabletCard data={item} />,
    },
  }}
/>
```

Cada variante tiene su render. No se necesita `render` como fallback si todas las variantes estan cubiertas.

### Escenario 4: `renders` con orientacion

```tsx
<Grid
  data={items}
  item={{
    renderType: 'component',
    render: (item, index) => <Card data={item} />,
    renders: {
      'mobile-portrait': (item, index) => <VerticalCard data={item} />,
      'mobile-landscape': (item, index) => <HorizontalCard data={item} />,
    },
  }}
/>
```

En mobile-portrait usa `renders['mobile-portrait']`. En mobile-landscape usa `renders['mobile-landscape']`. En cualquier otro caso (web, tablet, desktop) no hay variante en `renders`, cae a `render`.

## Combinacion con renderType

`renderMode`/`renders` funciona **dentro** del contexto de `renderType`. Es decir, solo aplica cuando `renderType: 'component'`. Cuando `renderType: 'self'`, el componente usa su visual interno y no consulta `renders`.

```tsx
// renderType: 'self' — ignora renders, usa visual interno
{
  renderType: 'self',
}

// renderType: 'component' + render unico
{
  renderType: 'component',
  render: <MiComponente />,
}

// renderType: 'component' + renders por variante
{
  renderType: 'component',
  render: <DefaultView />,
  renders: {
    mobile: <MobileView />,
  },
}
```

## Algoritmo de resolucion

```ts
function resolveRender<R>(
  config: RenderModeConfig<R>,
  currentMode: RenderMode,
): R | undefined {
  const { render, renders } = config;

  if (!renders) return render;

  const fallbackChains: Record<string, RenderMode[]> = {
    'mobile-portrait':   ['mobile-portrait', 'mobile', 'web'],
    'mobile-landscape':  ['mobile-landscape', 'mobile', 'web'],
    'mobile':            ['mobile', 'web'],
    'tablet-portrait':   ['tablet-portrait', 'tablet', 'web'],
    'tablet-landscape':  ['tablet-landscape', 'tablet', 'web'],
    'tablet':            ['tablet', 'web'],
    'desktop':           ['desktop', 'web'],
    'web':               ['web'],
    'native':            ['native'],
  };

  const chain = fallbackChains[currentMode] || ['web'];

  for (const mode of chain) {
    if (renders[mode] !== undefined) {
      return renders[mode];
    }
  }

  return render;
}
```

El componente determina el `currentMode` usando `useResponsive()` y luego resuelve el render con esta funcion.

## Determinacion del currentMode

El componente obtiene el `currentMode` combinando los valores de `useResponsive()`:

```ts
function getCurrentRenderMode(): RenderMode {
  const { deviceType, orientation } = useResponsive();

  if (deviceType === 'mobile') {
    return orientation === 'portrait' ? 'mobile-portrait' : 'mobile-landscape';
  }
  if (deviceType === 'tablet') {
    return orientation === 'portrait' ? 'tablet-portrait' : 'tablet-landscape';
  }
  return 'desktop';
}
```

Este valor se pasa al algoritmo de resolucion para encontrar el render correcto.

## Ejemplo completo: List con variantes

```tsx
<List
  id="mi-lista"
  data={items}
  item={{
    renderType: 'component',
    render: (item, index) => <StandardRow data={item} />,
    renders: {
      mobile: (item, index) => <CompactRow data={item} />,
      'mobile-landscape': (item, index) => <WideCompactRow data={item} />,
    },
  }}
  empty={{
    renderType: 'component',
    render: <EmptyState message="No hay datos" />,
    renders: {
      mobile: <EmptyStateMobile message="Sin datos" />,
    },
  }}
/>
```

| Variante activa | item render | empty render |
|-----------------|-------------|--------------|
| desktop | `StandardRow` | `EmptyState` |
| tablet | `StandardRow` (fallback a `render`) | `EmptyState` (fallback a `render`) |
| mobile-portrait | `CompactRow` (fallback a `mobile`) | `EmptyStateMobile` (fallback a `mobile`) |
| mobile-landscape | `WideCompactRow` | `EmptyStateMobile` (fallback a `mobile`) |

## Ejemplo completo: Loading con variantes

```tsx
<Loading
  state="loading"
  overlay="transparent"
  coverage="component"
  renderType="component"
  render={<DesktopSkeleton />}
  renders={{
    mobile: <MobileSkeleton />,
  }}
/>
```

## Ejemplo completo: AcordionList con variantes

```tsx
<AcordionList
  id="faq"
  data={faqs}
  getItemId={(item) => item.id}
  getItemData={(item) => item}
  itemHeader={{
    renderType: 'self',
    getHeaderLabel: (item) => item.question,
  }}
  itemBody={{
    renderType: 'component',
    render: FAQAnswer,
    renders: {
      mobile: FAQAnswerCompact,
    },
  }}
/>
```

## Interface actualizada con renders

La interfaz base de renderType.md se extiende asi:

```ts
interface RenderConfig<R = ReactNode> {
  renderType: 'self' | 'component';
  render?: R;
  renders?: Partial<Record<RenderMode, R>>;
}
```

`renders` es siempre opcional. Cuando no esta presente, el componente se comporta exactamente igual que antes.

## Reglas

1. `renders` es **siempre opcional**. Si no esta, se usa `render`. Compatibilidad total con el patron actual.
2. Cada key dentro de `renders` es **opcional**. Solo defines las variantes que necesitas.
3. Si `renders` esta presente pero no tiene la variante activa, se sigue la cadena de fallback hasta llegar a `render`.
4. `renders` solo aplica cuando `renderType: 'component'`. Con `renderType: 'self'` se ignora.
5. El tipo de cada valor en `renders` es el mismo tipo que `render` (ReactNode, funcion, ComponentType, segun el componente).
6. Un componente puede soportar `renders` sin tener variantes `web/mobile` en su estructura de carpetas. `renders` es a nivel de props del consumidor, no de la arquitectura interna del componente.

## Diferencia entre estructura de carpetas y renders

| Concepto | Donde vive | Quien lo controla | Que resuelve |
|----------|------------|-------------------|--------------|
| Carpetas `web/`, `mobile/` | Estructura interna del componente | El desarrollador de la libreria | La **vista interna** del componente segun la plataforma |
| `renders` prop | Props del componente | La aplicacion consumidora | El **contenido custom** que se inyecta al componente segun la variante |

Son complementarios y no se reemplazan. Un componente con carpetas `web/mobile` puede ademas aceptar `renders` para que el consumidor pase contenido diferente por variante.
