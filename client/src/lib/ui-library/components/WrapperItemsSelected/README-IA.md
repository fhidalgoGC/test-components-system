# WrapperItemsSelected Component

## Overview

Universal selection wrapper component for React applications that tracks item selection state and provides callbacks for selection changes. Wraps any child components (cards, lists, grids) and provides a Context API for children to interact with selection state. Perfect for implementing selectable galleries, multi-select lists, choice groups, or any interface requiring item selection tracking.

## 🔄 How It Works: Communication Flow

The wrapper uses a **simple but powerful communication pattern**:

1. **Each child component** only knows about its own ID
2. **Child calls** `toggleSelection(id)` with its own ID
3. **Wrapper receives** the ID and updates the complete selection array
4. **Wrapper notifies** all children of the new state via Context API
5. **Children verify** their own state with `isSelected(id)`

### Visual Example

```
┌─────────────────────────────────────┐
│  5 Cards (children)                 │
│  Card 1: toggleSelection('card-1')  │
│  Card 2: toggleSelection('card-2')  │ ← Each card only knows its ID
│  Card 3: toggleSelection('card-3')  │
│  Card 4: toggleSelection('card-4')  │
│  Card 5: toggleSelection('card-5')  │
└───────────────┬─────────────────────┘
                │
                ▼
┌─────────────────────────────────────┐
│  WrapperItemsSelected               │
│  • Maintains: ['card-1', 'card-3']  │ ← Complete array
│  • Notifies all children via Context│
│  • Fires callbacks with full array  │
└───────────────┬─────────────────────┘
                │
                ▼
┌─────────────────────────────────────┐
│  Parent Component Callbacks         │
│  onSelectionChange(['card-1', 'card-3']) ← Full array
└─────────────────────────────────────┘
```

**Key Point:** Each child component doesn't need to know about other children. The wrapper handles all coordination.

## Key Features

- ✅ **Universal Wrapper**: Works with any child components (cards, lists, grid items, custom components)
- ✅ **Controlled & Uncontrolled Modes**: Flexible state management for internal or external control
- ✅ **Multi-Select & Single-Select**: Toggle between single or multiple item selection with `multiSelect` prop
- ✅ **Dual Callback System**: 
  - `onSelectionChange` - Receives complete array of selected IDs on any change
  - `onItemAction` - Receives individual action events (selected/deselected) for each item
- ✅ **Context API**: Children use `useSelection()` hook to access selection methods
- ✅ **Comprehensive Methods**: toggleSelection, selectItem, deselectItem, isSelected, clearSelection, selectAll
- ✅ **Simple Communication**: Each child only needs to pass its own ID
- ✅ **TypeScript Support**: Fully typed props and context values
- ✅ **Zero Visual Styling**: Pure logic wrapper, styling left to children
- ✅ **Test-Friendly**: Data-testid attributes for easy testing

## Installation

```tsx
import { WrapperItemsSelected, useSelection } from '@/lib/ui-library/components/WrapperItemsSelected';
```

## Quick Start: The Essentials

### Parent Component (Wrapper)

```tsx
<WrapperItemsSelected
  multiSelect={true}                    // Multi-select (true) or single-select (false)
  defaultSelectedIds={['item-1']}       // Initial selection (uncontrolled mode)
  onSelectionChange={(ids) => {         // Callback with full array
    console.log('Selected:', ids);      // ['item-1', 'item-3']
  }}
>
  {/* Your children here */}
</WrapperItemsSelected>
```

### Child Components (Inside Wrapper)

```tsx
const MyCard = ({ id, title }) => {
  const { isSelected, toggleSelection } = useSelection(); // Get hook
  
  return (
    <div onClick={() => toggleSelection(id)}>  {/* Pass only YOUR id */}
      {title} {isSelected(id) && '✓'}         {/* Check YOUR state */}
    </div>
  );
};
```

**That's it!** Each child calls `toggleSelection(id)` with its own ID, and the wrapper handles everything else.

## Basic Usage

### Uncontrolled Mode with Cards

```tsx
import { WrapperItemsSelected, useSelection } from '@/lib/ui-library/components/WrapperItemsSelected';
import { Card } from '@/components/ui/card';

// Child component that uses the selection context
const SelectableCard = ({ id, title }) => {
  const { isSelected, toggleSelection } = useSelection();
  const selected = isSelected(id);

  return (
    <Card
      onClick={() => toggleSelection(id)}
      className={selected ? 'ring-2 ring-blue-500' : ''}
    >
      <h3>{title}</h3>
      {selected && <CheckIcon />}
    </Card>
  );
};

function App() {
  const products = [
    { id: 'prod-1', title: 'Product 1' },
    { id: 'prod-2', title: 'Product 2' },
    { id: 'prod-3', title: 'Product 3' },
  ];

  return (
    <WrapperItemsSelected
      defaultSelectedIds={['prod-1']}
      onSelectionChange={(selectedIds) => {
        console.log('Selected:', selectedIds);
      }}
    >
      <div className="grid grid-cols-3 gap-4">
        {products.map(product => (
          <SelectableCard key={product.id} {...product} />
        ))}
      </div>
    </WrapperItemsSelected>
  );
}
```

### Controlled Mode with External Buttons

```tsx
import { useState } from 'react';
import { WrapperItemsSelected, useSelection } from '@/lib/ui-library/components/WrapperItemsSelected';

function App() {
  const [selectedIds, setSelectedIds] = useState(['item-2']);

  return (
    <div>
      {/* External controls */}
      <div>
        <button onClick={() => setSelectedIds(['item-1', 'item-2', 'item-3'])}>
          Select All
        </button>
        <button onClick={() => setSelectedIds([])}>
          Clear All
        </button>
      </div>

      {/* Controlled wrapper */}
      <WrapperItemsSelected
        selectedIds={selectedIds}
        onSelectionChange={setSelectedIds}
      >
        <SelectableListItems />
      </WrapperItemsSelected>
    </div>
  );
}
```

### Single Selection Mode

```tsx
<WrapperItemsSelected
  multiSelect={false}
  defaultSelectedIds={['option-1']}
  onSelectionChange={(selectedIds) => {
    // selectedIds will always have 0 or 1 item
    console.log('Selected option:', selectedIds[0]);
  }}
>
  {/* Only one item can be selected at a time */}
  <RadioGroup />
</WrapperItemsSelected>
```

### With Both Callbacks

```tsx
<WrapperItemsSelected
  onSelectionChange={(selectedIds) => {
    // Called on every change with complete selection
    console.log('Current selection:', selectedIds);
    updateUI(selectedIds);
  }}
  onItemAction={(event) => {
    // Called for each individual action
    console.log(`Item ${event.id} was ${event.action}`);
    if (event.action === 'selected') {
      analytics.track('item_selected', { id: event.id });
    }
  }}
>
  <SelectableItems />
</WrapperItemsSelected>
```

### Using Selection Methods

```tsx
const SelectableItem = ({ id, name }) => {
  const {
    isSelected,
    selectItem,
    deselectItem,
    toggleSelection,
  } = useSelection();

  return (
    <div>
      <button onClick={() => toggleSelection(id)}>
        {isSelected(id) ? 'Deselect' : 'Select'}
      </button>
      
      {/* Or use direct methods */}
      <button onClick={() => selectItem(id)}>Force Select</button>
      <button onClick={() => deselectItem(id)}>Force Deselect</button>
    </div>
  );
};
```

### Selectable List with Checkbox

```tsx
const SelectableListItem = ({ id, name, email }) => {
  const { isSelected, toggleSelection } = useSelection();
  const selected = isSelected(id);

  return (
    <div 
      onClick={() => toggleSelection(id)}
      className={selected ? 'bg-blue-100' : 'hover:bg-gray-50'}
    >
      <input
        type="checkbox"
        checked={selected}
        onChange={() => toggleSelection(id)}
      />
      <div>
        <p>{name}</p>
        <p>{email}</p>
      </div>
    </div>
  );
};

function UserList() {
  const users = [
    { id: '1', name: 'Alice', email: 'alice@example.com' },
    { id: '2', name: 'Bob', email: 'bob@example.com' },
  ];

  return (
    <WrapperItemsSelected multiSelect={true}>
      {users.map(user => (
        <SelectableListItem key={user.id} {...user} />
      ))}
    </WrapperItemsSelected>
  );
}
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | - | Child components that will use selection context |
| `className` | `string` | - | Custom CSS class for wrapper container |
| `selectedIds` | `string[]` | `undefined` | Controlled selection (array of selected IDs) |
| `defaultSelectedIds` | `string[]` | `[]` | Initial selection for uncontrolled mode |
| `onSelectionChange` | `(selectedIds: string[]) => void` | `undefined` | Callback with complete array of selected IDs |
| `onItemAction` | `(event: ItemActionEvent) => void` | `undefined` | Callback for each individual selection action |
| `multiSelect` | `boolean` | `true` | Allow multiple selections (false = only one at a time) |

### ItemActionEvent Type

```tsx
interface ItemActionEvent {
  id: string;
  action: 'selected' | 'deselected';
}
```

### useSelection Hook

Access selection state and methods from child components. **This is what children use to communicate with the wrapper:**

```tsx
const {
  selectedIds,        // string[] - Currently selected IDs (read-only array)
  toggleSelection,    // (id: string) => void - Toggle item selection (most common)
  selectItem,         // (id: string) => void - Force select an item
  deselectItem,       // (id: string) => void - Force deselect an item
  isSelected,         // (id: string) => boolean - Check if item is selected
  clearSelection,     // () => void - Clear all selections
  selectAll,          // (ids: string[]) => void - Select multiple items at once
} = useSelection();
```

**How children use it:**
1. Call `toggleSelection(id)` (or other methods) with **only their own ID**
2. Use `isSelected(id)` to check their own state
3. The wrapper automatically updates all children via Context

## Modes

### Controlled vs Uncontrolled

**Uncontrolled Mode** (Default):
- Component manages its own selection state internally
- Use `defaultSelectedIds` to set initial selection
- Use `onSelectionChange` to listen to changes

```tsx
<WrapperItemsSelected
  defaultSelectedIds={['item-1']}
  onSelectionChange={(ids) => console.log('Changed:', ids)}
>
  {children}
</WrapperItemsSelected>
```

**Controlled Mode**:
- Parent component controls the selection state
- Provide both `selectedIds` and `onSelectionChange`
- Enables external control (buttons, keyboard shortcuts, etc.)

```tsx
const [selectedIds, setSelectedIds] = useState([]);

<WrapperItemsSelected
  selectedIds={selectedIds}
  onSelectionChange={setSelectedIds}
>
  {children}
</WrapperItemsSelected>
```

### Multi-Select vs Single-Select

**Multi-Select** (`multiSelect={true}`, default):
- Multiple items can be selected simultaneously
- `selectedIds` can contain multiple IDs
- Click toggles individual items on/off

**Single-Select** (`multiSelect={false}`):
- Only one item can be selected at a time
- Selecting a new item automatically deselects the previous one
- `selectedIds` will always contain 0 or 1 item
- Perfect for radio button groups or exclusive choices

## Selection Methods

### toggleSelection(id)
Toggles the selection state of an item. If selected, deselects it. If deselected, selects it.

```tsx
toggleSelection('item-1'); // Toggles item-1
```

### selectItem(id)
Forces an item to be selected (idempotent - won't trigger callback if already selected).

```tsx
selectItem('item-2'); // Ensures item-2 is selected
```

### deselectItem(id)
Forces an item to be deselected (idempotent - won't trigger callback if already deselected).

```tsx
deselectItem('item-3'); // Ensures item-3 is deselected
```

### isSelected(id)
Checks if an item is currently selected. Returns boolean.

```tsx
const isItemSelected = isSelected('item-4'); // true or false
```

### clearSelection()
Clears all selections. Triggers `onItemAction` for each deselected item.

```tsx
clearSelection(); // Deselects all items
```

### selectAll(ids)
Selects multiple items at once. In single-select mode, only selects the first item.

```tsx
selectAll(['item-1', 'item-2', 'item-3']); // Selects all three
```

## Callback System

### onSelectionChange

Called whenever the selection changes, receiving the complete array of selected IDs.

```tsx
onSelectionChange={(selectedIds) => {
  // Full selection state
  console.log('Selected count:', selectedIds.length);
  console.log('Selected IDs:', selectedIds);
  
  // Update UI, save to state, etc.
  updateDatabase(selectedIds);
}}
```

**Use cases:**
- Updating UI based on selection count
- Enabling/disabling bulk actions
- Saving selection to state or database
- Tracking overall selection state

### onItemAction

Called for each individual selection/deselection action with details about the specific item.

```tsx
onItemAction={(event) => {
  console.log(`Item ${event.id} was ${event.action}`);
  
  if (event.action === 'selected') {
    analytics.track('item_selected', { itemId: event.id });
  } else {
    analytics.track('item_deselected', { itemId: event.id });
  }
}}
```

**Use cases:**
- Analytics tracking for individual actions
- Logging selection history
- Triggering animations or side effects per item
- Auditing user interactions

## Common Use Cases

### Selectable Product Gallery

```tsx
<WrapperItemsSelected
  multiSelect={true}
  onSelectionChange={(ids) => {
    setCartItems(ids);
  }}
>
  <div className="grid grid-cols-4 gap-4">
    {products.map(product => (
      <ProductCard key={product.id} {...product} />
    ))}
  </div>
</WrapperItemsSelected>
```

### Bulk Actions List

```tsx
const [selectedUsers, setSelectedUsers] = useState([]);

<div>
  {selectedUsers.length > 0 && (
    <BulkActionsToolbar
      count={selectedUsers.length}
      onDelete={() => deleteUsers(selectedUsers)}
      onExport={() => exportUsers(selectedUsers)}
    />
  )}

  <WrapperItemsSelected
    selectedIds={selectedUsers}
    onSelectionChange={setSelectedUsers}
  >
    <UserList />
  </WrapperItemsSelected>
</div>
```

### Quiz/Survey Single Choice

```tsx
<WrapperItemsSelected
  multiSelect={false}
  onSelectionChange={(ids) => {
    submitAnswer(questionId, ids[0]);
  }}
>
  <AnswerOptions />
</WrapperItemsSelected>
```

### Image Gallery with Selection

```tsx
<WrapperItemsSelected
  defaultSelectedIds={[]}
  onSelectionChange={(ids) => {
    setDownloadQueue(ids);
  }}
>
  <div className="grid grid-cols-5 gap-2">
    {images.map(image => (
      <SelectableImage key={image.id} {...image} />
    ))}
  </div>
</WrapperItemsSelected>
```

## Styling

The wrapper component applies **no visual styling** by default - it's purely a logic wrapper. All visual feedback should be implemented in child components using the selection state from `useSelection()`.

### Recommended Pattern

```tsx
const SelectableItem = ({ id }) => {
  const { isSelected, toggleSelection } = useSelection();
  const selected = isSelected(id);

  return (
    <div
      onClick={() => toggleSelection(id)}
      className={cn(
        'border rounded-lg p-4 cursor-pointer transition',
        selected 
          ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' 
          : 'border-gray-200 hover:border-gray-300'
      )}
    >
      {/* Content */}
    </div>
  );
};
```

## TypeScript Support

Full TypeScript support with comprehensive type definitions:

```tsx
import type {
  WrapperItemsSelectedProps,
  ItemActionEvent,
  SelectionContextValue,
} from '@/lib/ui-library/components/WrapperItemsSelected';

// Props typing
const props: WrapperItemsSelectedProps = {
  multiSelect: true,
  defaultSelectedIds: ['item-1'],
  onSelectionChange: (ids: string[]) => console.log(ids),
  onItemAction: (event: ItemActionEvent) => console.log(event),
};

// Context typing
const context: SelectionContextValue = useSelection();
```

## Testing

The wrapper includes `data-testid` for easy testing:

```tsx
// Wrapper container
data-testid="wrapper-items-selected"
```

Example test:

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { WrapperItemsSelected, useSelection } from '@/lib/ui-library/components/WrapperItemsSelected';

test('toggles selection when item is clicked', () => {
  const TestItem = ({ id }: { id: string }) => {
    const { isSelected, toggleSelection } = useSelection();
    return (
      <button
        data-testid={`item-${id}`}
        onClick={() => toggleSelection(id)}
      >
        {isSelected(id) ? 'Selected' : 'Not Selected'}
      </button>
    );
  };

  const onSelectionChange = jest.fn();

  render(
    <WrapperItemsSelected onSelectionChange={onSelectionChange}>
      <TestItem id="test-1" />
    </WrapperItemsSelected>
  );

  const item = screen.getByTestId('item-test-1');
  expect(item).toHaveTextContent('Not Selected');

  fireEvent.click(item);
  expect(item).toHaveTextContent('Selected');
  expect(onSelectionChange).toHaveBeenCalledWith(['test-1']);
});
```

## Accessibility

- ✅ **Semantic HTML**: Uses standard div container
- ✅ **Keyboard Support**: Implemented by child components
- ✅ **ARIA Attributes**: Should be added by child components based on selection state
- ✅ **Focus Management**: Handled by child components

**Recommended child component accessibility:**

```tsx
const SelectableItem = ({ id, label }) => {
  const { isSelected, toggleSelection } = useSelection();
  const selected = isSelected(id);

  return (
    <button
      role="checkbox"
      aria-checked={selected}
      aria-label={label}
      onClick={() => toggleSelection(id)}
    >
      {label}
    </button>
  );
};
```

## Performance Considerations

1. **Memoization**: The wrapper uses `useCallback` for all methods to prevent unnecessary re-renders
2. **Controlled Updates**: Only re-renders when `selectedIds` changes
3. **Efficient Callbacks**: `onItemAction` only fires for actual changes (idempotent operations skip callbacks)
4. **Context Optimization**: Single context provider for all selection methods

## Common Patterns

### Select All / Clear All

```tsx
const SelectionToolbar = () => {
  const { selectedIds, selectAll, clearSelection } = useSelection();
  const allItems = ['item-1', 'item-2', 'item-3', 'item-4'];

  return (
    <div>
      <span>{selectedIds.length} selected</span>
      <button onClick={() => selectAll(allItems)}>Select All</button>
      <button onClick={clearSelection}>Clear</button>
    </div>
  );
};
```

### Keyboard Shortcuts

```tsx
function App() {
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey && e.key === 'a') {
        e.preventDefault();
        setSelectedIds(allItemIds);
      }
      if (e.key === 'Escape') {
        setSelectedIds([]);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <WrapperItemsSelected
      selectedIds={selectedIds}
      onSelectionChange={setSelectedIds}
    >
      {children}
    </WrapperItemsSelected>
  );
}
```

### Conditional Bulk Actions

```tsx
const [selectedIds, setSelectedIds] = useState([]);

<div>
  {selectedIds.length > 0 && (
    <div className="bulk-actions">
      <button onClick={() => deleteItems(selectedIds)}>
        Delete {selectedIds.length} items
      </button>
      <button onClick={() => exportItems(selectedIds)}>
        Export {selectedIds.length} items
      </button>
    </div>
  )}

  <WrapperItemsSelected
    selectedIds={selectedIds}
    onSelectionChange={setSelectedIds}
  >
    <ItemList />
  </WrapperItemsSelected>
</div>
```

## Troubleshooting

### "useSelection must be used within WrapperItemsSelected"

**Problem**: Child component trying to use `useSelection()` outside the wrapper  
**Solution**: Ensure child components are rendered inside `<WrapperItemsSelected>`

### Selection not updating visually

**Problem**: Child components not re-rendering on selection change  
**Solution**: Ensure child components are calling `isSelected(id)` inside the component, not just once at initialization

### Callbacks firing multiple times

**Problem**: `onSelectionChange` or `onItemAction` firing unexpectedly  
**Solution**: In controlled mode, make sure you're not causing infinite loops by updating `selectedIds` inside the callback without proper conditions

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)
- ✅ IE11: Works (uses standard React features)

## Related Components

- **HeterogeneousList**: Use WrapperItemsSelected to make list items selectable
- **UniversalCard**: Wrap cards in WrapperItemsSelected for selectable card grids
- **Carousel**: Combine for selectable carousel items

## Examples Repository

Check out the **interactive demo page** at `/components/wrapper-items-selected` for complete working examples including:

- **🔄 Communication Flow Example** - 5 cards showing how each child only passes its ID and the wrapper maintains the complete array
- **Selectable cards** with visual feedback and real-time logs
- **Controlled list** with external buttons (Select All, Clear All)
- **Single-select mode** (radio group pattern)
- **Multi-select mode** with clearSelection() and selectAll()
- **Callback logging** showing onSelectionChange and onItemAction in action

Each example is fully interactive with visual explanations and real-time state inspection.

---

**Last Updated**: October 2025 | **Component Version**: 1.0.0
