# Accordion Component

Componente Accordion agnóstico, reutilizable y desacoplado de la lógica de control.

## Características

- **Agnóstico a la data**: No asume ningún tipo de contenido, header ni body
- **Múltiples modos de control**: Interno, por props, o por hook externo
- **Callbacks**: Eventos onToggleAccordion y onRenderBody
- **Estrategias de render**: "once" (mantiene montado) o "always" (desmonta/monta)
- **Layout flexible**: Configurable en width/height modes
- **Sin refs/forwardRef**: Usa patrón de registro por id
- **Web y Mobile**: Implementaciones para ambas plataformas

## Modos de Control

### 1. Control Interno (No Controlado)
```tsx
<Accordion
  id="acc-1"
  defaultOpen={false}
  header={{ renderType: 'component', render: <Header /> }}
  body={{ renderType: 'component', render: <Body /> }}
/>
```

### 2. Control por Props (Controlado)
```tsx
const [open, setOpen] = useState(false);

<Accordion
  id="acc-2"
  isOpen={open}
  callbacks={{ onToggleAccordion: (_, state) => setOpen(state) }}
  header={{ renderType: 'component', render: <Header /> }}
  body={{ renderType: 'component', render: <Body /> }}
/>
```

### 3. Control por Hook (Imperativo)
```tsx
const controller = useAccordionController();

<button onClick={() => controller.open('acc-3')}>Abrir</button>
<button onClick={() => controller.forceRenderBody('acc-3')}>Refresh</button>

<Accordion
  id="acc-3"
  controller={controller}
  header={{ renderType: 'component', render: <Header /> }}
  body={{ renderType: 'component', render: <Body /> }}
/>
```

## Datos Genéricos (itemData)

El Accordion es genérico (`AccordionProps<T>`). Puedes pasar `itemData` de cualquier tipo y los componentes header/body lo reciben automáticamente:

```tsx
type DriverData = { name: string; trips: Trip[] };

const DriverHeader: ComponentType<AccordionItemDataProps<DriverData>> = ({ itemData }) => (
  <div>{itemData.name} — {itemData.trips.length} viajes</div>
);

const DriverBody: ComponentType<AccordionItemDataProps<DriverData>> = ({ itemData }) => (
  <table>{itemData.trips.map(t => <tr key={t.id}><td>{t.from}</td></tr>)}</table>
);

<Accordion
  id="driver-1"
  itemData={driverData}
  header={{ renderType: 'component', render: DriverHeader, arrowPosition: 'right' }}
  body={{ renderType: 'component', render: DriverBody }}
/>
```

- Si `render` es un `ReactNode`, no recibe props adicionales
- Si `render` es un `ComponentType<AccordionItemDataProps<T>>`, recibe `{ itemData: T }` automáticamente
- `itemData` se pasa tanto al header como al body

## API

### AccordionProps<T>

| Prop | Tipo | Descripción |
|------|------|-------------|
| `id` | `string` | Identificador único (requerido) |
| `itemData` | `T` | Datos genéricos pasados al header y body como prop |
| `controller` | `AccordionController` | Hook de control externo |
| `isOpen` | `boolean` | Estado controlado |
| `defaultOpen` | `boolean` | Estado inicial (no controlado) |
| `callbacks` | `AccordionCallbacks` | Eventos |
| `layout` | `AccordionLayout` | Configuración de dimensiones |
| `header` | `AccordionHeader<T>` | Configuración del header |
| `body` | `AccordionBody<T>` | Configuración del body |

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

### AccordionCallbacks

```typescript
type AccordionCallbacks = {
  onToggleAccordion?: (id: string, isOpen: boolean) => void;
  onRenderBody?: (id: string) => void;
};
```

### Estrategias de Render

- `once`: El body se monta una sola vez y se oculta con display:none
- `always`: El body se desmonta y monta en cada toggle

## Demo

Ver la demo en `/components/accordion`

## Estructura

```
Accordion/
├── shared/             # Tipos y hook compartidos
│   ├── Accordion.types.ts
│   ├── useAccordionController.ts
│   └── index.ts
├── web/                # Implementación web
├── mobile/             # Implementación mobile responsive
├── index.tsx           # Dispatch web/mobile
└── README.md
```
