# BottomNavigationBar Component

## Overview

Mobile navigation component for React applications with multilingual support, dynamic item management, and external configuration via ConfigProvider. Perfect for mobile-first applications that need bottom-fixed navigation with reactive internationalization.

## Key Features

- ✅ **Multilingual Support**: Reactive i18n using `ItemWithMultiLanguageLabel` type system
- ✅ **Controlled & Uncontrolled Modes**: Flexible state management
- ✅ **Dynamic Item Management**: Enable/disable items in real-time via `disabledIds` prop
- ✅ **ConfigProvider Integration**: External configuration with cascade priority (Props → ConfigProvider → Environment)
- ✅ **UX Protection**: Prevents disabling currently selected items
- ✅ **Error Handling**: `onError` callback for operation failures
- ✅ **Full Accessibility**: ARIA attributes (aria-current, aria-disabled)
- ✅ **Callbacks**: `onSelect` triggered on manual and external changes

## Installation

```tsx
import { BottomNavigationBar } from '@/lib/ui-library/components/BottomNavigationBar';
```

## Basic Usage

### Uncontrolled Mode (Default)

```tsx
import { BottomNavigationBar } from '@/lib/ui-library/components/BottomNavigationBar';
import { Home, Search, Bell, User } from 'lucide-react';

function App() {
  const navItems = [
    {
      id: 'home',
      label: { en: 'Home', es: 'Inicio' },
      metadata: { icon: Home }
    },
    {
      id: 'search',
      label: { en: 'Search', es: 'Buscar' },
      metadata: { icon: Search }
    },
    {
      id: 'notifications',
      label: { en: 'Notifications', es: 'Notificaciones' },
      metadata: { icon: Bell, isDisabled: true } // Static disabled via metadata
    },
    {
      id: 'profile',
      label: { en: 'Profile', es: 'Perfil' },
      metadata: { icon: User }
    }
  ];

  return (
    <BottomNavigationBar
      items={navItems}
      defaultSelectedId="home"
      onSelect={(item) => console.log('Selected:', item)}
    />
  );
}
```

### Controlled Mode

```tsx
import { useState } from 'react';
import { BottomNavigationBar } from '@/lib/ui-library/components/BottomNavigationBar';

function App() {
  const [selectedId, setSelectedId] = useState('home');
  
  const navItems = [
    { id: 'home', label: { en: 'Home', es: 'Inicio' }, metadata: { icon: Home } },
    { id: 'search', label: { en: 'Search', es: 'Buscar' }, metadata: { icon: Search } },
  ];

  return (
    <BottomNavigationBar
      items={navItems}
      selectedId={selectedId}
      onSelect={(item) => setSelectedId(item.id)}
    />
  );
}
```

### Dynamic Item Disabling

```tsx
import { useState } from 'react';
import { BottomNavigationBar } from '@/lib/ui-library/components/BottomNavigationBar';

function App() {
  const [selectedId, setSelectedId] = useState('home');
  const [disabledIds, setDisabledIds] = useState<string[]>([]);

  const handleError = (error) => {
    if (error.type === 'disable-selected-item') {
      alert(`Cannot disable selected item: ${error.itemId}`);
    }
  };

  const toggleDisable = (id: string) => {
    setDisabledIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <>
      <BottomNavigationBar
        items={navItems}
        selectedId={selectedId}
        disabledIds={disabledIds}
        onSelect={(item) => setSelectedId(item.id)}
        onError={handleError}
      />
      
      <button onClick={() => toggleDisable('search')}>
        Toggle Search Disabled
      </button>
    </>
  );
}
```

### With ConfigProvider Integration

```tsx
import { ConfigProvider } from '@/lib/ui-library/providers/AppEnviromentProvider';
import { BottomNavigationBar } from '@/lib/ui-library/components/BottomNavigationBar';

const customEnvironment = {
  BOTTOM_NAV_CONFIG: {
    TRIGGER_ON_MOUNT: true // Trigger onSelect callback on mount
  },
  // ... other environment configurations
};

function App() {
  return (
    <ConfigProvider parentConfig={customEnvironment} priority="parent">
      <BottomNavigationBar
        items={navItems}
        onSelect={(item) => console.log('Auto-selected on mount:', item)}
      />
    </ConfigProvider>
  );
}
```

## Props

### Component Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `items` | `NavItem[]` | `[]` | Yes | Array of navigation items with multilingual labels |
| `selectedId` | `string` | - | No | Controlled: ID of currently selected item |
| `defaultSelectedId` | `string` | - | No | Uncontrolled: Initial selected item ID |
| `disabledIds` | `string[]` | `[]` | No | Dynamic array to disable items in real-time (priority over `metadata.isDisabled`) |
| `onSelect` | `(item: NavItem) => void` | - | No | Callback triggered on selection (manual or external changes) |
| `onError` | `(error: ErrorEvent) => void` | - | No | Callback for operation errors (e.g., attempting to disable selected item) |
| `triggerOnMount` | `boolean` | ConfigProvider → Environment | No | Whether to trigger `onSelect` callback on component mount |
| `langOverride` | `string` | - | No | Override language (e.g., 'en', 'es') for this component instance |
| `i18nOrder` | `'global-first' \| 'local-first'` | `'local-first'` | No | Translation priority order |
| `className` | `string` | - | No | Additional CSS classes for the container |

### NavItem Type

```typescript
interface NavItem {
  id: string;
  label: ItemWithMultiLanguageLabel;
  metadata?: {
    icon?: LucideIcon;
    isDisabled?: boolean;  // Static disabled state
    dataTestId?: string;
  };
}
```

### ItemWithMultiLanguageLabel Type

```typescript
type ItemWithMultiLanguageLabel = 
  | string 
  | { [languageCode: string]: string };

// Examples:
const label1 = "Home";  // Single language
const label2 = { en: "Home", es: "Inicio", fr: "Accueil" };  // Multilingual
```

### ErrorEvent Type

```typescript
interface ErrorEvent {
  type: 'disable-selected-item';
  itemId: string;
  message: string;
}
```

## Configuration via ConfigProvider

The component reads configuration from the ConfigProvider using the standardized `optionalConfig?.environment` pattern:

```typescript
// In your environment.ts
export const BOTTOM_NAV_CONFIG = {
  TRIGGER_ON_MOUNT: true  // or false
};

export const environment = {
  BOTTOM_NAV_CONFIG,
  // ... other configs
};
```

**Configuration Cascade Priority:**
1. **Props** (highest priority) - `triggerOnMount` prop
2. **ConfigProvider** - `optionalConfig?.environment?.BOTTOM_NAV_CONFIG?.TRIGGER_ON_MOUNT`
3. **Internal Library Environment** (fallback) - Default `false`

## Behavior Rules

### Item Disable Priority

When an item has both `disabledIds` and `metadata.isDisabled`:
- **`disabledIds` prop takes priority** (dynamic)
- `metadata.isDisabled` is used as static default

```tsx
// Item is disabled if:
const isDisabled = disabledIds.includes(item.id) || item.metadata?.isDisabled;
```

### UX Protection Rule

**You CANNOT disable the currently selected item.**

```tsx
// ❌ This will trigger onError callback
<BottomNavigationBar
  selectedId="home"
  disabledIds={['home']}  // Error: Cannot disable selected item
  onError={(error) => alert(error.message)}
/>

// ✅ Correct approach: Change selection first
setSelectedId('search');  // Change selection
setDisabledIds(['home']); // Then disable
```

### Callbacks Behavior

#### `onSelect` Callback

Triggered in these scenarios:
1. **Manual user click** on a navigation item
2. **External `selectedId` change** (controlled mode)
3. **Component mount** (if `triggerOnMount` is `true`)

```tsx
<BottomNavigationBar
  items={navItems}
  selectedId={selectedId}
  triggerOnMount={true}  // Triggers onSelect on mount
  onSelect={(item) => {
    console.log('Selected item:', item);
    // item.id, item.label, item.metadata
  }}
/>
```

#### `onError` Callback

Triggered when operations fail:

```tsx
<BottomNavigationBar
  items={navItems}
  selectedId="home"
  disabledIds={['home']}
  onError={(error) => {
    console.error(error.type);      // 'disable-selected-item'
    console.error(error.itemId);    // 'home'
    console.error(error.message);   // 'Cannot disable the currently selected item: home'
  }}
/>
```

## Internationalization (i18n)

The component uses the `useI18nMerge` hook to handle multilingual labels reactively:

### Translation Order

```tsx
// Local-first (default): Component translations → Global translations
<BottomNavigationBar items={navItems} i18nOrder="local-first" />

// Global-first: Global translations → Component translations
<BottomNavigationBar items={navItems} i18nOrder="global-first" />
```

### Language Override

```tsx
// Force Spanish for this component instance
<BottomNavigationBar items={navItems} langOverride="es" />
```

### Label Resolution

The component automatically resolves labels based on the current language:

```tsx
const item = {
  id: 'home',
  label: { en: 'Home', es: 'Inicio', fr: 'Accueil' }
};

// Current language: 'es' → Displays "Inicio"
// Current language: 'en' → Displays "Home"
// Current language: 'de' → Falls back to 'en' → Displays "Home"
```

## Accessibility

The component follows ARIA best practices:

```html
<!-- Selected item -->
<button aria-current="page">Home</button>

<!-- Disabled item -->
<button aria-disabled="true" disabled>Notifications</button>

<!-- Regular item -->
<button>Search</button>
```

## Data Test IDs

All interactive elements have `data-testid` attributes for testing:

```tsx
const navItems = [
  {
    id: 'home',
    label: { en: 'Home' },
    metadata: { 
      icon: Home,
      dataTestId: 'nav-home'  // Custom test ID
    }
  }
];

// Renders as:
// <button data-testid="nav-home">Home</button>
```

If no `dataTestId` is provided, it defaults to: `bottom-nav-item-${item.id}`

## Advanced Examples

### Complete Implementation with All Features

```tsx
import { useState, useCallback } from 'react';
import { BottomNavigationBar } from '@/lib/ui-library/components/BottomNavigationBar';
import { ConfigProvider } from '@/lib/ui-library/providers/AppEnviromentProvider';
import { Home, Search, Bell, User, Settings } from 'lucide-react';

const environment = {
  BOTTOM_NAV_CONFIG: {
    TRIGGER_ON_MOUNT: true
  }
};

function App() {
  const [selectedId, setSelectedId] = useState('home');
  const [disabledIds, setDisabledIds] = useState<string[]>([]);
  const [errors, setErrors] = useState<string[]>([]);

  const navItems = [
    {
      id: 'home',
      label: { en: 'Home', es: 'Inicio' },
      metadata: { icon: Home, dataTestId: 'nav-home' }
    },
    {
      id: 'search',
      label: { en: 'Search', es: 'Buscar' },
      metadata: { icon: Search, dataTestId: 'nav-search' }
    },
    {
      id: 'notifications',
      label: { en: 'Notifications', es: 'Notificaciones' },
      metadata: { icon: Bell, isDisabled: true, dataTestId: 'nav-notifications' }
    },
    {
      id: 'profile',
      label: { en: 'Profile', es: 'Perfil' },
      metadata: { icon: User, dataTestId: 'nav-profile' }
    },
    {
      id: 'settings',
      label: { en: 'Settings', es: 'Configuración' },
      metadata: { icon: Settings, dataTestId: 'nav-settings' }
    }
  ];

  const handleSelect = useCallback((item) => {
    console.log('Navigation changed to:', item.id);
    setSelectedId(item.id);
  }, []);

  const handleError = useCallback((error) => {
    const errorMsg = `${error.type}: ${error.message}`;
    setErrors(prev => [...prev, errorMsg]);
    
    // Auto-dismiss after 3 seconds
    setTimeout(() => {
      setErrors(prev => prev.filter(e => e !== errorMsg));
    }, 3000);
  }, []);

  const toggleItemDisabled = (id: string) => {
    setDisabledIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <ConfigProvider parentConfig={environment} priority="parent">
      <div className="app-container">
        {/* Error Display */}
        {errors.map((error, idx) => (
          <div key={idx} className="error-alert">{error}</div>
        ))}

        {/* Main Content */}
        <main className="content">
          <h1>Current Page: {selectedId}</h1>
          
          <div className="controls">
            <h2>Dynamic Controls</h2>
            <button onClick={() => toggleItemDisabled('search')}>
              Toggle Search Disabled
            </button>
            <button onClick={() => toggleItemDisabled('profile')}>
              Toggle Profile Disabled
            </button>
          </div>

          <div className="status">
            <p>Selected: {selectedId}</p>
            <p>Disabled Items: {disabledIds.join(', ') || 'None'}</p>
          </div>
        </main>

        {/* Bottom Navigation */}
        <BottomNavigationBar
          items={navItems}
          selectedId={selectedId}
          disabledIds={disabledIds}
          onSelect={handleSelect}
          onError={handleError}
          langOverride="es"  // Force Spanish
        />
      </div>
    </ConfigProvider>
  );
}
```

## Architecture

### Pattern: Provider + Context + Hook

```
BottomNavigationBar (View)
    ↓
BottomNavigationBarProvider (Provider)
    ↓ provides
BottomNavigationBarContext (Context)
    ↓ consumed by
useBottomNavigationBarContext() (Hook)
```

### Internal Hooks

- **`useBottomNavigationBar`**: Manages selection state and callbacks
- **`useI18nMerge`**: Handles multilingual translations with reactive language changes
- **`useOptionalConfig`**: Safe access to ConfigProvider (returns `{ environment }` or `null`)

### Files Structure

```
BottomNavigationBar/
├── mobile/
│   ├── hooks/
│   │   ├── useBottomNavigationBar.hook.ts   # Selection logic
│   │   └── useI18nMerge.hook.ts             # i18n merge logic
│   ├── providers/
│   │   └── BottomNavigationBar.provider.tsx # Context provider
│   ├── types/
│   │   └── BottomNavigationBar.type.ts      # TypeScript interfaces
│   ├── views/
│   │   └── BottomNavigationBar.view.tsx     # UI component
│   ├── i18n/
│   │   ├── en.json                          # English translations
│   │   ├── es.json                          # Spanish translations
│   │   └── index.ts                         # i18n exports
│   └── index.tsx                            # Public exports
└── README-IA.md                             # This file
```

## Styling

The component uses Tailwind CSS with responsive utilities:

```tsx
<nav className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 border-t">
  <div className="grid grid-cols-{n} gap-1">
    <button className="flex flex-col items-center justify-center py-2 px-1">
      {/* Icon and Label */}
    </button>
  </div>
</nav>
```

Custom styling can be applied via the `className` prop.

## Development Notes

### Adding New Navigation Items

```tsx
const newItem = {
  id: 'unique-id',
  label: { en: 'Label', es: 'Etiqueta' },
  metadata: {
    icon: YourLucideIcon,
    isDisabled: false,
    dataTestId: 'nav-unique-id'
  }
};
```

### Testing Considerations

```tsx
// Testing with data-testid
const homeButton = screen.getByTestId('nav-home');
expect(homeButton).toBeInTheDocument();

// Testing disabled state
expect(homeButton).toHaveAttribute('aria-disabled', 'true');

// Testing selection
expect(homeButton).toHaveAttribute('aria-current', 'page');
```

### Performance Tips

1. **Memoize callbacks** to prevent unnecessary re-renders:
   ```tsx
   const handleSelect = useCallback((item) => {
     // Your logic
   }, [dependencies]);
   ```

2. **Keep `navItems` stable** - define outside component or use `useMemo`:
   ```tsx
   const navItems = useMemo(() => [...], []);
   ```

3. **Minimize `disabledIds` updates** - only update when necessary

## Migration from Previous Versions

If you were using direct environment access:

```tsx
// ❌ Old pattern (deprecated)
import { environment } from '../../../../enviorments/enviroment';
const finalValue = optionalConfig?.BOTTOM_NAV_CONFIG?.VALUE ?? environment.BOTTOM_NAV_CONFIG.VALUE;

// ✅ New pattern (standardized)
const finalValue = optionalConfig?.environment.BOTTOM_NAV_CONFIG?.VALUE ?? environment.BOTTOM_NAV_CONFIG.VALUE;
```

## Related Components

- **TagSelector**: Multi-select component with similar i18n patterns
- **HeterogeneousList**: List component with flexible item types
- **ConfigProvider**: Global configuration management

## License

Part of the UI Library - Internal use only
