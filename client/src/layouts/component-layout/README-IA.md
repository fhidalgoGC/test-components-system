# ComponentLayout

## Overview

Layout wrapper for component demo pages. Provides a tabbed interface to organize component documentation into separate sections (Examples, Props, etc.). Supports two modes: manual tabs (configured externally) and auto-loading (discovers documentation modules dynamically). Includes i18n, light/dark theme support, and loading/error states.

## Key Features

- **Manual Tabs**: Accept pre-configured `TabConfig[]` with `content` (ReactNode) or `component` (ComponentType)
- **Auto-Loading**: Discovers documentation from `/src/lib/ui-library/{componentName}/documentation/index.ts` via `import.meta.glob`
- **Theme Support**: Light/dark theme via `next-themes`, applied through CSS module helper functions
- **i18n**: Hierarchical translations (ES/EN) for tab labels and UI messages
- **States**: Loading spinner, error display, and "not available" fallback for missing tab content

## File Structure

```
component-layout/
├── index.ts                          # Public exports
├── views/
│   └── ComponentLayout.view.tsx      # Main view component
├── hooks/
│   └── ComponentLayout.hook.ts       # State management hook (tabs, theme, i18n, loading)
├── types/
│   └── ComponentLayout.types.ts      # TabConfig, ComponentLayoutProps interfaces
├── css/
│   ├── ComponentLayout.module.css    # Styles (tabs, content, loading, error, spinner)
│   └── ComponentLayout.module.ts     # Theme-aware class builder functions
├── utils/
│   └── ComponentLayout.utils.ts      # getDefaultTabs(), loadDocumentationComponents()
└── i18n/
    ├── index.ts                      # Translation exports
    ├── es.json                       # Spanish translations
    └── en.json                       # English translations
```

## Interfaces

### ComponentLayoutProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `componentName` | `string` | **Required** | Name of the component (used for auto-loading docs) |
| `componentDescription` | `string` | i18n default | Description shown in header |
| `tabs` | `TabConfig[]` | `undefined` | Manual tab configuration (skips auto-loading when provided) |
| `defaultTab` | `string` | First tab's id | Initially active tab |
| `className` | `string` | `''` | Additional CSS class for container |
| `children` | `ReactNode` | `undefined` | Replaces tab content area entirely |

### TabConfig

| Prop | Type | Description |
|------|------|-------------|
| `id` | `string` | Unique tab identifier |
| `label` | `string` | Tab display text |
| `icon` | `string` | FontAwesome icon class (e.g., `'fa-eye'`, `'fa-list'`) |
| `component` | `ComponentType` | Lazy-loaded component (rendered via `<Component />`) |
| `content` | `ReactNode` | Pre-rendered content (takes priority over `component`) |

## Usage

### Manual Tabs (Recommended for demo pages)

```tsx
import { ComponentLayoutView } from '@/layouts/component-layout';
import type { TabConfig } from '@/layouts/component-layout/types/ComponentLayout.types';

const tabs: TabConfig[] = [
  {
    id: 'examples',
    label: 'Examples',
    icon: 'fa-eye',
    content: <MyExamplesTab />,
  },
  {
    id: 'props',
    label: 'Props',
    icon: 'fa-list',
    content: <MyPropsTab />,
  },
];

<ComponentLayoutView
  componentName="MyComponent"
  componentDescription="Description here"
  tabs={tabs}
  defaultTab="examples"
/>
```

### Auto-Loading Mode (Legacy)

```tsx
<ComponentLayoutView componentName="TagSelector" />
```

Requires a documentation module at `/src/lib/ui-library/TagSelector/documentation/index.ts` exporting `Preview`, `ReactDoc`, `CSSDoc`, and/or `UsageDoc`.

## CSS Module Helpers

The `ComponentLayout.module.ts` file exports theme-aware class builder functions:

- `containerClasses(theme, extra?)` - Main container
- `tabsClasses(theme, extra?)` - Tabs bar
- `tabClasses(theme, isActive, extra?)` - Individual tab (active/inactive)
- `contentClasses(theme, extra?)` - Content area
- `loadingClasses(theme, extra?)` - Loading state
- `errorClasses(theme, extra?)` - Error state

## Convention: 2 Mandatory Tabs

All component demo pages must use 2 tabs:

1. **Examples** (`id: 'examples'`, `icon: 'fa-eye'`) - Interactive demos wrapped in a `[Component]ExamplesTab.tsx`
2. **Props** (`id: 'props'`, `icon: 'fa-list'`) - Props documentation tables in `props/[Component]Props.tsx`

## Dependencies

- `next-themes` (useTheme for dark/light)
- `@/i18n` (useHierarchicalTranslations)
- FontAwesome icons (via `<i className="fas ...">`)

## Exports (index.ts)

- `ComponentLayoutView` (named + default)
- `useComponentLayout` hook
- Types: `ComponentLayoutProps`, `TabConfig`
- CSS utilities: `containerClasses`, `tabsClasses`, `tabClasses`, `contentClasses`, `loadingClasses`, `errorClasses`
