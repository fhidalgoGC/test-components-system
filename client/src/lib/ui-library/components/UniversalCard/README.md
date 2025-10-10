# UniversalCard Component

A flexible, reusable card component that can wrap and render any React component with customizable sizing and styling options.

## Features

- ✅ **Dynamic Component Rendering**: Accepts any React component to render inside
- ✅ **Flexible Sizing**: Supports px values, percentages, and Tailwind classes (w-full, h-full, etc.)
- ✅ **Customizable Styles**: Full control over card appearance
- ✅ **Header & Footer Support**: Optional header and footer content areas
- ✅ **Theme Integration**: Uses CSS variables for seamless theming
- ✅ **TypeScript Support**: Fully typed for better DX

## Usage

### Basic Example

```tsx
import { UniversalCard } from '@/lib/ui-library/components/UniversalCard';

// Simple component to display
const MyContent = ({ title, description }) => (
  <div>
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

// Use UniversalCard
<UniversalCard
  component={MyContent}
  componentProps={{
    title: "Hello World",
    description: "This is a demo"
  }}
  minWidth={300}
  minHeight={200}
/>
```

### With Tailwind Classes

```tsx
<UniversalCard
  component={MyDashboard}
  componentProps={{ data: dashboardData }}
  width="w-full"
  height="h-full"
  cardStyles={{
    className: "shadow-lg"
  }}
/>
```

### With Custom Styles

```tsx
<UniversalCard
  component={UserProfile}
  componentProps={{ userId: "123" }}
  minWidth={400}
  minHeight={500}
  cardStyles={{
    backgroundColor: "#f0f0f0",
    borderRadius: "12px",
    borderWidth: "2px",
    borderColor: "#3b82f6",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    padding: "24px"
  }}
/>
```

### With Header and Footer

```tsx
<UniversalCard
  component={ArticleContent}
  componentProps={{ articleId: "abc" }}
  headerContent={
    <div className="flex justify-between items-center">
      <h2>Article Title</h2>
      <button>Share</button>
    </div>
  }
  footerContent={
    <div className="flex gap-2">
      <button>Like</button>
      <button>Comment</button>
    </div>
  }
  minWidth={600}
/>
```

## Props

### UniversalCardProps

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `component` | `ComponentType<any>` | ✅ Yes | - | React component to render inside the card |
| `componentProps` | `Record<string, any>` | No | `{}` | Props to pass to the child component |
| `minWidth` | `SizeValue` | No | - | Minimum width (px, %, or Tailwind class) |
| `minHeight` | `SizeValue` | No | - | Minimum height (px, %, or Tailwind class) |
| `width` | `SizeValue` | No | - | Width (px, %, or Tailwind class) |
| `height` | `SizeValue` | No | - | Height (px, %, or Tailwind class) |
| `cardStyles` | `CardStyles` | No | `{}` | Card styling options |
| `dataTestId` | `string` | No | `'universal-card'` | Data test ID for testing |
| `headerContent` | `ReactNode` | No | - | Content to display in header area |
| `footerContent` | `ReactNode` | No | - | Content to display in footer area |

### CardStyles Interface

| Property | Type | Description |
|----------|------|-------------|
| `backgroundColor` | `string` | Background color (CSS value or Tailwind class) |
| `borderColor` | `string` | Border color (CSS value or Tailwind class) |
| `borderWidth` | `string` | Border width (CSS value) |
| `borderRadius` | `string` | Border radius (CSS value or Tailwind class) |
| `boxShadow` | `string` | Shadow (CSS value or Tailwind class) |
| `padding` | `string` | Padding (CSS value or Tailwind class) |
| `className` | `string` | Additional CSS classes |
| `style` | `React.CSSProperties` | Custom inline styles |

### SizeValue Type

```typescript
type SizeValue = string | number;
```

- **Number**: Converted to pixels (e.g., `300` → `"300px"`)
- **String with units**: Used as-is (e.g., `"50%"`, `"20rem"`)
- **Tailwind classes**: Applied as className (e.g., `"w-full"`, `"h-screen"`)

## Size Handling

The component intelligently handles different size value formats:

### Numeric Values (Pixels)
```tsx
<UniversalCard
  component={MyComponent}
  minWidth={300}      // Converts to "300px"
  minHeight={200}     // Converts to "200px"
/>
```

### String Values with Units
```tsx
<UniversalCard
  component={MyComponent}
  width="50%"         // Used as-is
  height="20rem"      // Used as-is
/>
```

### Tailwind Classes
```tsx
<UniversalCard
  component={MyComponent}
  width="w-full"      // Applied as className
  height="h-screen"   // Applied as className
/>
```

## Styling Examples

### Minimal Card
```tsx
<UniversalCard
  component={SimpleContent}
  minWidth={200}
/>
```

### Styled Card
```tsx
<UniversalCard
  component={RichContent}
  minWidth={400}
  cardStyles={{
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
  }}
/>
```

### Full-width Responsive Card
```tsx
<UniversalCard
  component={ResponsiveContent}
  width="w-full"
  minHeight={300}
  cardStyles={{
    className: "md:w-2/3 lg:w-1/2"
  }}
/>
```

## Use Cases

1. **Dashboard Widgets**: Wrap different widget components
2. **Content Cards**: Display articles, posts, products
3. **Forms**: Wrap form components with consistent styling
4. **Modal Content**: Use as modal body wrapper
5. **Grid Items**: Create consistent grid layouts
6. **Sidebars**: Display sidebar content sections

## Theme Support

The card uses CSS variables for theming:

- `--card`: Card background color
- `--card-foreground`: Card text color
- `--border`: Border color
- `--muted`: Muted background color (header/footer)

Override these in your theme configuration for consistent styling across all UniversalCards.

## Accessibility

- Includes `data-testid` attributes for testing
- Semantic HTML structure with header, content, and footer sections
- Proper overflow handling for scrollable content

## Best Practices

1. **Component Props**: Always validate props passed to child components
2. **Size Values**: Use Tailwind classes for responsive layouts
3. **Styling**: Prefer `cardStyles.className` for Tailwind utilities
4. **Performance**: Memoize child component if it's expensive to render
5. **Testing**: Use `dataTestId` prop for consistent test selectors

## Examples in Action

See the UniversalCard demo page for live examples:
- Different component types
- Various sizing options
- Custom styling variations
- Header/footer combinations
