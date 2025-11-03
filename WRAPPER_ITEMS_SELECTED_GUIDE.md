# 📘 Guía Completa: WrapperItemsSelected

## 🎯 ¿Qué es WrapperItemsSelected?

`WrapperItemsSelected` es un wrapper **puramente lógico** (sin estilos CSS) que maneja el estado de selección de items. Envuelve cualquier contenido (listas, cards, grids) y proporciona funcionalidad de selección sin aplicar estilos visuales.

---

## ✅ Funcionalidades Principales

### 1. **Selección Múltiple vs Única**

```tsx
// ✅ Selección múltiple (por defecto)
<WrapperItemsSelected multiSelect={true}>
  {/* Los usuarios pueden seleccionar varios items */}
</WrapperItemsSelected>

// ✅ Selección única
<WrapperItemsSelected multiSelect={false}>
  {/* Solo un item a la vez */}
</WrapperItemsSelected>
```

### 2. **Limpiar Toda la Selección** 🧹

Borra todos los items seleccionados. Los componentes hijos se enteran automáticamente:

```tsx
import { useSelection } from '@/lib/ui-library/components/WrapperItemsSelected';

const MyComponent = () => {
  const { clearSelection } = useSelection();
  
  return (
    <button onClick={clearSelection}>
      Borrar Todo
    </button>
  );
};
```

**Características:**
- ✅ Borra toda la selección instantáneamente
- ✅ Dispara callbacks `onItemAction` para cada item deseleccionado
- ✅ Los componentes hijos se actualizan automáticamente vía Context

### 3. **Seleccionar Todos los Items** 🎯

Selecciona múltiples items de una vez:

```tsx
const MyComponent = () => {
  const { selectAll } = useSelection();
  const allIds = ['item1', 'item2', 'item3'];
  
  return (
    <button onClick={() => selectAll(allIds)}>
      Seleccionar Todo
    </button>
  );
};
```

**Características:**
- ✅ Selecciona todos los IDs proporcionados
- ✅ Respeta la prop `multiSelect` (en modo single-select solo selecciona el primero)
- ✅ Dispara callbacks para items seleccionados/deseleccionados
- ✅ Los componentes hijos se actualizan automáticamente

---

## 🎨 Props del WrapperItemsSelected

| Prop | Tipo | Descripción |
|------|------|-------------|
| `multiSelect` | `boolean` | Permite selección múltiple (default: `true`) |
| `selectedIds` | `string[]` | Control externo de la selección (modo controlado) |
| `defaultSelectedIds` | `string[]` | Selección inicial (modo no controlado) |
| `onSelectionChange` | `(ids: string[]) => void` | Callback con array completo de seleccionados |
| `onItemAction` | `(event) => void` | Callback para cada acción individual (select/deselect) |

---

## 🪝 Hook useSelection() para Componentes Hijos

Todos los componentes dentro del wrapper pueden usar este hook:

```tsx
const {
  selectedIds,        // Array de IDs seleccionados
  toggleSelection,    // Alternar selección de un item
  selectItem,         // Seleccionar un item específico
  deselectItem,       // Deseleccionar un item específico
  isSelected,         // Verificar si un item está seleccionado
  clearSelection,     // 🧹 Borrar toda la selección
  selectAll,          // 🎯 Seleccionar múltiples items
} = useSelection();
```

---

## 🚀 Ejemplo Completo

```tsx
import { WrapperItemsSelected, useSelection } from '@/lib/ui-library/components/WrapperItemsSelected';
import { Button } from '@/components/ui/button';

// Componente hijo que usa useSelection
const SelectableCard = ({ id, title }) => {
  const { isSelected, toggleSelection } = useSelection();
  const selected = isSelected(id);
  
  return (
    <div 
      onClick={() => toggleSelection(id)}
      className={selected ? 'selected' : ''}
    >
      {title} {selected && '✓'}
    </div>
  );
};

// Componente con controles
const Controls = () => {
  const { clearSelection, selectAll } = useSelection();
  const allIds = ['1', '2', '3', '4', '5'];
  
  return (
    <div>
      <Button onClick={() => selectAll(allIds)}>
        Seleccionar Todo
      </Button>
      <Button onClick={clearSelection}>
        Limpiar Selección
      </Button>
    </div>
  );
};

// Componente principal
export const MyApp = () => {
  const [selected, setSelected] = useState([]);
  const items = [
    { id: '1', title: 'Item 1' },
    { id: '2', title: 'Item 2' },
    { id: '3', title: 'Item 3' },
  ];
  
  return (
    <WrapperItemsSelected
      multiSelect={true}
      selectedIds={selected}
      onSelectionChange={setSelected}
    >
      <Controls />
      
      {items.map(item => (
        <SelectableCard key={item.id} {...item} />
      ))}
    </WrapperItemsSelected>
  );
};
```

---

## 🎭 Modo Controlado vs No Controlado

### Modo No Controlado (Uncontrolled)
El wrapper maneja su propio estado:

```tsx
<WrapperItemsSelected 
  defaultSelectedIds={['item1']}
  onSelectionChange={(ids) => console.log(ids)}
>
  {children}
</WrapperItemsSelected>
```

### Modo Controlado (Controlled)
Tú controlas el estado desde el padre:

```tsx
const [selected, setSelected] = useState(['item1']);

<WrapperItemsSelected 
  selectedIds={selected}
  onSelectionChange={setSelected}
>
  {children}
</WrapperItemsSelected>
```

---

## 📊 Callbacks

### onSelectionChange
Recibe el array completo de IDs seleccionados:

```tsx
onSelectionChange={(selectedIds) => {
  console.log('Seleccionados:', selectedIds);
  // Output: ['item1', 'item3', 'item5']
}}
```

### onItemAction
Recibe cada acción individual:

```tsx
onItemAction={(event) => {
  console.log(event);
  // Output: { id: 'item1', action: 'selected' }
  // Output: { id: 'item2', action: 'deselected' }
}}
```

---

## 🔥 Casos de Uso Comunes

### 1. Seleccionar/Deseleccionar Todo
```tsx
const Controls = () => {
  const { clearSelection, selectAll, selectedIds } = useSelection();
  const allIds = ['1', '2', '3', '4', '5'];
  
  const isAllSelected = selectedIds.length === allIds.length;
  
  return (
    <button onClick={() => isAllSelected ? clearSelection() : selectAll(allIds)}>
      {isAllSelected ? 'Deseleccionar Todo' : 'Seleccionar Todo'}
    </button>
  );
};
```

### 2. Contador de Selección
```tsx
const Counter = () => {
  const { selectedIds } = useSelection();
  
  return <span>{selectedIds.length} items seleccionados</span>;
};
```

### 3. Botón de Acción Condicional
```tsx
const ActionButton = () => {
  const { selectedIds, clearSelection } = useSelection();
  
  const handleDelete = () => {
    // Eliminar items seleccionados
    deleteItems(selectedIds);
    clearSelection(); // Limpiar después de eliminar
  };
  
  return (
    <button 
      disabled={selectedIds.length === 0}
      onClick={handleDelete}
    >
      Eliminar ({selectedIds.length})
    </button>
  );
};
```

---

## 🎯 Demo Interactivo

Ve la página de demo en: `/components/wrapper-items-selected`

Incluye 4 ejemplos completos:
1. **Modo no controlado** con callbacks en tiempo real
2. **Modo controlado** con controles externos
3. **Selección única** (multiSelect=false)
4. **Controles completos** con clearSelection() y selectAll()

---

## 🔑 Puntos Clave

✅ **Puramente lógico** - No aplica estilos CSS  
✅ **Totalmente flexible** - Funciona con cualquier tipo de contenido  
✅ **Context API** - Los hijos se enteran automáticamente de cambios  
✅ **Controlado/No controlado** - Tú decides cómo manejarlo  
✅ **Multi/Single select** - Configurable con una prop  
✅ **clearSelection()** - Limpia toda la selección  
✅ **selectAll()** - Selecciona múltiples items de una vez  
✅ **Dual callbacks** - onSelectionChange + onItemAction  

---

¿Necesitas más ayuda? Revisa el código en:
- `client/src/lib/ui-library/components/WrapperItemsSelected/`
- `client/src/pages/wrapper-items-selected-demo/`
