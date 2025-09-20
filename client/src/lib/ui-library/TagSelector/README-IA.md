# TagSelector - AI Implementation Guide
**Version: 1.0.1**

## Overview

TagSelector is a comprehensive, multilingual React component designed for selecting multiple tags with async data loading, internationalization support, and extensive theming capabilities. It provides a modern UI with responsive design and accessibility features.

## Key Features

- **Async Data Loading**: Required async function for tag data
- **Multilingual Support**: Complete i18n system with hierarchical translations
- **Advanced Sizing System**: 15 predefined sizes (sm/md/lg + tam-1 through tam-12) plus custom pixel sizing
- **Individual Tag Customization**: Per-tag colors and sizing via metadata
- **Require Selection**: Prevent deselecting the last tag for mandatory selections
- **Theme Customization**: CSS Custom Properties + class-based theming
- **Accessibility**: Full keyboard navigation and screen reader support
- **Responsive Design**: Works on all device sizes
- **TypeScript**: Complete type safety with detailed interfaces

## Installation & Imports

```typescript
import TagSelector from '@/lib/ui-library/TagSelector';
import type { 
  TagItem, 
  TagCustomColors, 
  TagSelectorSize,
  TagMetadata,
  TagStateColors,
  MultiLanguageLabel 
} from '@/lib/ui-library/TagSelector';
```

## Core Types

### TagItem
```typescript
interface TagItem {
  id: string;
  label: MultiLanguageLabel; // Complete translation object
  metadata?: TagMetadata; // Optional individual tag customization (NEW)
}

### TagMetadata (NEW - Individual Tag Customization)
```typescript
interface TagMetadata {
  colors?: {
    light?: TagStateColors;
    dark?: TagStateColors;
  };
  sizing?: TagSizing; // Custom pixel-based sizing
}

interface TagStateColors {
  selected?: {
    background?: string;
    text?: string;
    border?: string;
    hoverBackground?: string;
    hoverBorder?: string;
  };
  unselected?: {
    background?: string;
    text?: string;
    border?: string;
    hoverBackground?: string;
    hoverBorder?: string;
  };
}

interface TagSizing {
  paddingX?: string;    // e.g., '12px', '1rem'
  paddingY?: string;    // e.g., '8px', '0.5rem'
  fontSize?: string;    // e.g., '14px', '0.875rem'
  minWidth?: string;    // e.g., '80px', '5rem'
  height?: string;      // e.g., '32px', '2rem'
}
```

### MultiLanguageLabel
```typescript
interface MultiLanguageLabel {
  [languageCode: string]: string;
  default: string; // Always required as fallback
}
```

### TagSelectorSize (ENHANCED - Granular Sizing System)
```typescript
type TagSelectorSize = 'sm' | 'md' | 'lg' | 'tam-1' | 'tam-2' | 'tam-3' | 'tam-4' | 'tam-5' | 'tam-6' | 'tam-7' | 'tam-8' | 'tam-9' | 'tam-10' | 'tam-11' | 'tam-12';
```

### TagCustomColors (NEW - Theming System)
```typescript
interface TagCustomColors {
  light?: TagThemeColors;
  dark?: TagThemeColors;
}

interface TagThemeColors {
  selected?: {
    background?: string;
    text?: string;
    border?: string;
    hoverBackground?: string;
    hoverBorder?: string;
  };
  unselected?: {
    background?: string;
    text?: string;
    border?: string;
    hoverBackground?: string;
    hoverBorder?: string;
  };
  all?: {
    background?: string;
    text?: string;
    border?: string;
    hoverBackground?: string;
    hoverBorder?: string;
  };
}
```

## Complete Props Interface

```typescript
interface TagSelectorProps {
  // REQUIRED PROPS
  getTagsFunction: () => Promise<TagItem[]>; // ALWAYS async function
  selectedTags: string[]; // Array of tag IDs for state management
  onSelectionChange: (selectedTags: TagItem[]) => void; // Receives full TagItem[] with translations
  
  // OPTIONAL BEHAVIOR PROPS
  allowMultiple?: boolean; // Default: true
  allowAll?: boolean; // Default: true - shows "Select All" button
  requireSelection?: boolean; // Default: false - prevents deselecting the last tag
  size?: TagSelectorSize; // Default: 'md' - supports 'sm'|'md'|'lg'|'tam-1' through 'tam-12'
  disabled?: boolean; // Default: false
  
  // INTERNATIONALIZATION PROPS
  langOverride?: string; // Force specific language (e.g., 'es', 'en')
  i18nOrder?: 'global-first' | 'local-first'; // Translation lookup priority
  allLabel?: MultiLanguageLabel; // Custom "All" button text
  defaultLabel?: MultiLanguageLabel; // Default text when no tags
  defaultTagLabels?: MultiLanguageLabel; // Fallback tag labels
  
  // STYLING & THEMING PROPS (NEW)
  theme?: string; // CSS class for predefined themes
  customColors?: TagCustomColors; // Direct color customization
  id?: string; // HTML id attribute
  className?: string; // Additional CSS classes
  style?: CSSProperties; // Inline styles
  
  // ADVANCED CONFIGURATION
  config?: VisibilityConfig; // Device-specific visibility rules
}
```

## Basic Implementation

### 1. Simple Food Categories Example

```typescript
import { useState } from 'react';
import TagSelector from '@/lib/ui-library/TagSelector';
import type { TagItem } from '@/lib/ui-library/TagSelector';

// Define async function to load tags
const getFoodTags = async (): Promise<TagItem[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return [
    {
      id: 'fruits',
      label: {
        en: 'Fruits',
        es: 'Frutas',
        fr: 'Fruits',
        default: 'Fruits'
      }
    },
    {
      id: 'vegetables',
      label: {
        en: 'Vegetables',
        es: 'Vegetales',
        fr: 'Légumes',
        default: 'Vegetables'
      }
    },
    {
      id: 'dairy',
      label: {
        en: 'Dairy',
        es: 'Lácteos',
        fr: 'Produits laitiers',
        default: 'Dairy'
      }
    }
  ];
};

function FoodSelector() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  const handleSelectionChange = (tags: TagItem[]) => {
    // Extract IDs for state management
    const tagIds = tags.map(tag => tag.id);
    setSelectedTags(tagIds);
    
    // You have access to full translation data in 'tags' parameter
    console.log('Selected with translations:', tags);
  };

  return (
    <TagSelector
      getTagsFunction={getFoodTags}
      selectedTags={selectedTags}
      onSelectionChange={handleSelectionChange}
    />
  );
}
```

### 2. Tech Categories with API Integration

```typescript
const getTechTags = async (): Promise<TagItem[]> => {
  try {
    const response = await fetch('/api/categories');
    const data = await response.json();
    
    // Transform API response to TagItem[] format
    return data.map(item => ({
      id: item.id,
      label: {
        en: item.name_en,
        es: item.name_es,
        default: item.name_en || item.name
      }
    }));
  } catch (error) {
    console.error('Failed to load tags:', error);
    return []; // Return empty array on error
  }
};

function TechSelector() {
  const [selectedTags, setSelectedTags] = useState<string[]>(['technology']);
  
  return (
    <TagSelector
      getTagsFunction={getTechTags}
      selectedTags={selectedTags}
      onSelectionChange={(tags) => {
        setSelectedTags(tags.map(t => t.id));
      }}
      allowMultiple={true}
      allowAll={true}
      size="md"
      langOverride="en" // Force English labels
    />
  );
}
```

## Advanced Theming Examples

### 1. Using Predefined Theme Classes

```css
/* In your global CSS */
.theme-corporate {
  --tag-light-selected-bg: #2563eb;
  --tag-light-selected-hover-bg: #1d4ed8;
  --tag-light-selected-text: #ffffff;
  --tag-light-unselected-bg: #f1f5f9;
  --tag-light-unselected-text: #475569;
}

.theme-nature {
  --tag-light-selected-bg: #16a34a;
  --tag-light-selected-hover-bg: #15803d;
  --tag-light-selected-text: #ffffff;
  --tag-light-unselected-bg: #f0fdf4;
}

.theme-sunset {
  --tag-light-selected-bg: #ea580c;
  --tag-light-selected-hover-bg: #dc2626;
  --tag-light-selected-text: #ffffff;
  --tag-light-unselected-bg: #fff7ed;
}
```

```typescript
// Using predefined themes
<TagSelector
  getTagsFunction={getTags}
  selectedTags={selectedTags}
  onSelectionChange={handleChange}
  theme="theme-corporate" // Apply corporate theme
/>

<TagSelector
  getTagsFunction={getTags}
  selectedTags={selectedTags}
  onSelectionChange={handleChange}
  theme="theme-nature" // Apply nature theme
/>
```

### 2. Granular Color Control for All Tag States

**IMPORTANT**: Complete control over colors for every tag state with both fill and border colors.

```typescript
const granularBrandColors = {
  light: {
    selected: {
      background: '#6366f1',        // Fill color when selected
      text: '#ffffff',              // Text color when selected  
      border: '#4338ca',            // Border color when selected
      hoverBackground: '#4f46e5',   // Fill color when selected + hover
      hoverBorder: '#3730a3'        // Border color when selected + hover
    },
    unselected: {
      background: '#f8fafc',        // Fill color when unselected
      text: '#334155',              // Text color when unselected
      border: '#e2e8f0',            // Border color when unselected  
      hoverBackground: '#e2e8f0',   // Fill color when unselected + hover
      hoverBorder: '#cbd5e1'        // Border color when unselected + hover
    },
    all: {
      background: '#ef4444',        // Fill color for "All" button
      text: '#ffffff',              // Text color for "All" button
      border: '#dc2626',            // Border color for "All" button
      hoverBackground: '#dc2626',   // Fill color for "All" button + hover
      hoverBorder: '#b91c1c'        // Border color for "All" button + hover
    }
  },
  dark: {
    selected: {
      background: '#8b5cf6',        // Fill color when selected (dark theme)
      text: '#ffffff',              // Text color when selected (dark theme)
      border: '#7c3aed',            // Border color when selected (dark theme)
      hoverBackground: '#7c3aed',   // Fill color when selected + hover (dark theme)
      hoverBorder: '#6d28d9'        // Border color when selected + hover (dark theme)
    },
    unselected: {
      background: '#374151',        // Fill color when unselected (dark theme)
      text: '#d1d5db',              // Text color when unselected (dark theme)
      border: '#4b5563',            // Border color when unselected (dark theme)
      hoverBackground: '#4b5563',   // Fill color when unselected + hover (dark theme)
      hoverBorder: '#6b7280'        // Border color when unselected + hover (dark theme)
    },
    all: {
      background: '#f59e0b',        // Fill color for "All" button (dark theme)
      text: '#000000',              // Text color for "All" button (dark theme)
      border: '#d97706',            // Border color for "All" button (dark theme)
      hoverBackground: '#d97706',   // Fill color for "All" button + hover (dark theme)
      hoverBorder: '#b45309'        // Border color for "All" button + hover (dark theme)
    }
  }
};

<TagSelector
  getTagsFunction={getTags}
  selectedTags={selectedTags}
  onSelectionChange={handleChange}
  customColors={granularBrandColors}
/>
```

### 3. Individual Tag Metadata Colors (NEW FEATURE)

**IMPORTANT**: Each tag can now have its own unique colors using the `metadata` property. This provides maximum customization flexibility for each tag individually.

#### TagStateColors Interface

```typescript
interface TagStateColors {
  background?: string;        // Fill color
  text?: string;             // Text color
  border?: string;           // Border color
  hoverBackground?: string;  // Fill color on hover
  hoverBorder?: string;      // Border color on hover
}
```

#### Individual Tag Customization

```typescript
// Example: Contract type tags with individual colors
const getContractTypeTags = async (): Promise<TagItem[]> => {
  return [
    {
      id: 'todos',
      label: {
        en: 'All',
        es: 'Todos',
        default: 'All'
      },
      metadata: {
        colors: {
          light: {
            selected: {
              background: '#8b5cf6',      // Purple fill
              text: '#ffffff',            // White text
              border: '#7c3aed',          // Purple border
              hoverBackground: '#7c3aed', // Darker purple on hover
              hoverBorder: '#6d28d9'      // Even darker purple border
            },
            unselected: {
              background: '#f3f4f6',      // Light gray
              text: '#374151',            // Dark text
              border: '#e5e7eb',          // Gray border
              hoverBackground: '#e5e7eb', // Darker gray on hover
              hoverBorder: '#d1d5db'      // Darker gray border
            }
          }
        }
      }
    },
    {
      id: 'fijo',
      label: {
        en: 'Fixed',
        es: 'Fijo',
        default: 'Fixed'
      },
      metadata: {
        colors: {
          light: {
            selected: {
              background: '#3b82f6',      // Blue fill
              text: '#ffffff',            // White text
              border: '#2563eb',          // Blue border
              hoverBackground: '#2563eb', // Darker blue on hover
              hoverBorder: '#1d4ed8'      // Even darker blue border
            },
            unselected: {
              background: '#eff6ff',      // Light blue
              text: '#1e40af',            // Dark blue text
              border: '#dbeafe',          // Light blue border
              hoverBackground: '#dbeafe', // Darker light blue on hover
              hoverBorder: '#bfdbfe'      // Darker blue border
            }
          }
        }
      }
    },
    {
      id: 'basis',
      label: {
        en: 'Basis',
        es: 'Basis',
        default: 'Basis'
      },
      metadata: {
        colors: {
          light: {
            selected: {
              background: '#ec4899',      // Pink fill
              text: '#ffffff',            // White text
              border: '#db2777',          // Pink border
              hoverBackground: '#db2777', // Darker pink on hover
              hoverBorder: '#be185d'      // Even darker pink border
            },
            unselected: {
              background: '#fdf2f8',      // Light pink
              text: '#831843',            // Dark pink text
              border: '#f9a8d4',          // Pink border
              hoverBackground: '#fce7f3', // Darker light pink on hover
              hoverBorder: '#f472b6'      // Darker pink border
            }
          }
        }
      }
    }
  ];
};

// Usage with individual tag colors
<TagSelector
  getTagsFunction={getContractTypeTags}
  selectedTags={selectedTypes}
  onSelectionChange={(tags) => setSelectedTypes(tags.map(t => t.id))}
  allowMultiple={true}
  allowAll={false}
/>
```

#### Real-World Commodities Example with Individual Colors

Perfect for commodity trading interfaces where each commodity has its own brand color:

```typescript
const getCommodityTagsWithColors = async (): Promise<TagItem[]> => {
  return [
    {
      id: 'wheat-hrw',
      label: {
        en: 'HRW - Wheat Hard Red Winter',
        es: 'Trigo Rojo Duro de Invierno',
        default: 'HRW - Wheat Hard Red Winter'
      },
      metadata: {
        colors: {
          light: {
            selected: {
              background: '#d97706',      // Wheat golden color
              text: '#ffffff',
              border: '#b45309',
              hoverBackground: '#b45309',
              hoverBorder: '#92400e'
            },
            unselected: {
              background: '#fef3c7',      // Light wheat color
              text: '#92400e',
              border: '#f9a8d4',
              hoverBackground: '#fde68a',
              hoverBorder: '#f59e0b'
            }
          }
        }
      }
    },
    {
      id: 'corn-yellow',
      label: {
        en: 'YC - Yellow Corn',
        es: 'Maíz Amarillo',
        default: 'YC - Yellow Corn'
      },
      metadata: {
        colors: {
          light: {
            selected: {
              background: '#eab308',      // Corn yellow
              text: '#000000',
              border: '#ca8a04',
              hoverBackground: '#ca8a04',
              hoverBorder: '#a16207'
            },
            unselected: {
              background: '#fef9c3',      // Light corn yellow
              text: '#713f12',
              border: '#fde047',
              hoverBackground: '#fef08a',
              hoverBorder: '#eab308'
            }
          }
        }
      }
    },
    {
      id: 'soy-2025',
      label: {
        en: 'Soy 2025',
        es: 'Soja 2025',
        default: 'Soy 2025'
      },
      metadata: {
        colors: {
          light: {
            selected: {
              background: '#16a34a',      // Soy green
              text: '#ffffff',
              border: '#15803d',
              hoverBackground: '#15803d',
              hoverBorder: '#166534'
            },
            unselected: {
              background: '#f0fdf4',      // Light soy green
              text: '#166534',
              border: '#bbf7d0',
              hoverBackground: '#dcfce7',
              hoverBorder: '#86efac'
            }
          }
        }
      }
    }
  ];
};

// Usage
<TagSelector
  getTagsFunction={getCommodityTagsWithColors}
  selectedTags={selectedCommodities}
  onSelectionChange={(tags) => setSelectedCommodities(tags.map(t => t.id))}
  allowMultiple={true}
  allowAll={true}
  allLabel={{
    en: 'All Commodities',
    es: 'Todas las Materias Primas',
    default: 'All Commodities'
  }}
/>
```

#### Fallback Color System (Priority Order)

**CRITICAL**: When a tag doesn't have metadata colors, the system uses this priority:

1. **Tag metadata colors** (highest priority) - `tag.metadata.colors`
2. **Global customColors** - `customColors` prop
3. **Theme CSS classes** - `theme` prop classes
4. **Default CSS variables** (lowest priority) - Built-in fallbacks

Example mixing tags with and without metadata:

```typescript
const getMixedTags = async (): Promise<TagItem[]> => {
  return [
    {
      id: 'special',
      label: { en: 'Special', default: 'Special' },
      metadata: {
        colors: {
          light: {
            selected: { background: '#ff6b6b', border: '#ee5a5a' }
          }
        }
      }
    },
    {
      id: 'normal',
      label: { en: 'Normal', default: 'Normal' }
      // No metadata - will use global customColors or theme defaults
    }
  ];
};

// Global colors for tags without metadata
const globalColors = {
  light: {
    selected: { background: '#3b82f6', border: '#2563eb' },
    unselected: { background: '#f8fafc', border: '#e2e8f0' }
  }
};

<TagSelector
  getTagsFunction={getMixedTags}
  selectedTags={selected}
  onSelectionChange={setSelection}
  customColors={globalColors} // Used for tags without metadata
/>
```

### 4. Combining Theme Class + Custom Colors

```typescript
<TagSelector
  getTagsFunction={getTags}
  selectedTags={selectedTags}
  onSelectionChange={handleChange}
  theme="theme-corporate" // Base theme
  customColors={{
    light: {
      selected: {
        background: '#custom-brand-color' // Override specific colors
      }
    }
  }}
/>
```

## Advanced Sizing System

### 1. Granular Size Control with tam-1 through tam-12

**NEW FEATURE**: Beyond the basic `sm`, `md`, `lg` sizes, TagSelector now supports 12 additional granular sizes (`tam-1` through `tam-12`) for precise control.

```typescript
// Available sizes with their approximate dimensions
type TagSelectorSize = 
  | 'sm'     // Small (legacy)
  | 'md'     // Medium (legacy) 
  | 'lg'     // Large (legacy)
  | 'tam-1'  // Extra tiny: 18px height, 0.625rem font
  | 'tam-2'  // Tiny: 20px height, 0.6875rem font
  | 'tam-3'  // Very small: 22px height, 0.75rem font
  | 'tam-4'  // Small+: 24px height, 0.8125rem font
  | 'tam-5'  // Small-medium: 26px height, 0.875rem font
  | 'tam-6'  // Medium-: 28px height, 0.9375rem font
  | 'tam-7'  // Medium: 32px height, 1rem font
  | 'tam-8'  // Medium+: 36px height, 1.0625rem font
  | 'tam-9'  // Large-: 40px height, 1.125rem font
  | 'tam-10' // Large: 44px height, 1.1875rem font
  | 'tam-11' // Large+: 48px height, 1.25rem font
  | 'tam-12' // Extra large: 52px height, 1.3125rem font

// Examples of different sizes
<TagSelector
  getTagsFunction={getTags}
  selectedTags={selectedTags}
  onSelectionChange={handleChange}
  size="tam-1" // Very compact tags
/>

<TagSelector
  getTagsFunction={getTags}
  selectedTags={selectedTags}
  onSelectionChange={handleChange}
  size="tam-12" // Very large tags
/>

<TagSelector
  getTagsFunction={getTags}
  selectedTags={selectedTags}
  onSelectionChange={handleChange}
  size="tam-7" // Equivalent to medium
/>
```

### 2. Custom Pixel-Based Sizing via Metadata

**NEW FEATURE**: Individual tags can override size with custom pixel values through the `metadata.sizing` property.

```typescript
// Tags with custom pixel-based sizing
const getCustomSizedTags = async (): Promise<TagItem[]> => {
  return [
    {
      id: 'compact',
      label: {
        en: 'Compact Tag',
        es: 'Etiqueta Compacta',
        default: 'Compact Tag'
      },
      metadata: {
        sizing: {
          paddingX: '8px',      // Custom horizontal padding
          paddingY: '4px',      // Custom vertical padding
          fontSize: '11px',     // Custom font size
          minWidth: '60px',     // Minimum width
          height: '24px'        // Fixed height
        }
      }
    },
    {
      id: 'large-emphasis',
      label: {
        en: 'Important',
        es: 'Importante', 
        default: 'Important'
      },
      metadata: {
        sizing: {
          paddingX: '20px',     // Extra wide padding
          paddingY: '12px',     // Extra tall padding
          fontSize: '16px',     // Large font
          minWidth: '120px',    // Wide minimum
          height: '48px'        // Tall height
        }
      }
    },
    {
      id: 'normal',
      label: {
        en: 'Normal Tag',
        default: 'Normal Tag'
      }
      // No metadata - uses global size prop
    }
  ];
};

// Usage: Mix global size with individual overrides
<TagSelector
  getTagsFunction={getCustomSizedTags}
  selectedTags={selectedTags}
  onSelectionChange={handleChange}
  size="tam-5" // Global size for tags without metadata
/>
```

### 3. Real-World Sizing Examples

#### Financial Dashboard with Hierarchical Sizes
```typescript
const getFinancialTags = async (): Promise<TagItem[]> => {
  return [
    {
      id: 'all-markets',
      label: { en: 'All Markets', default: 'All Markets' },
      metadata: {
        sizing: {
          paddingX: '24px',
          paddingY: '16px', 
          fontSize: '18px',
          height: '56px'
        },
        colors: {
          light: {
            selected: { background: '#1e40af', text: '#ffffff' }
          }
        }
      }
    },
    {
      id: 'stocks',
      label: { en: 'Stocks', default: 'Stocks' },
      metadata: {
        sizing: {
          paddingX: '16px',
          paddingY: '12px',
          fontSize: '14px', 
          height: '40px'
        }
      }
    },
    {
      id: 'bonds',
      label: { en: 'Bonds', default: 'Bonds' },
      // Uses global size (tam-6 in this example)
    }
  ];
};

<TagSelector
  getTagsFunction={getFinancialTags}
  selectedTags={selectedMarkets}
  onSelectionChange={setSelectedMarkets}
  size="tam-6" // Default for tags without custom sizing
  allowMultiple={true}
  requireSelection={true} // Ensure at least one market is selected
/>
```

#### Mobile-Optimized Responsive Sizing
```typescript
const getMobileTags = async (): Promise<TagItem[]> => {
  const isMobile = window.innerWidth < 768;
  
  return [
    {
      id: 'categories',
      label: { en: 'Categories', default: 'Categories' },
      metadata: {
        sizing: {
          paddingX: isMobile ? '12px' : '20px',
          paddingY: isMobile ? '8px' : '12px',
          fontSize: isMobile ? '12px' : '14px',
          height: isMobile ? '32px' : '44px'
        }
      }
    }
  ];
};
```

## Require Selection Feature

### 1. Basic requireSelection Usage

**NEW FEATURE**: The `requireSelection` prop prevents users from deselecting the last remaining tag, ensuring at least one tag stays selected.

```typescript
function RequiredTagSelector() {
  const [selectedTags, setSelectedTags] = useState<string[]>(['default-category']);
  
  return (
    <TagSelector
      getTagsFunction={getCategoryTags}
      selectedTags={selectedTags}
      onSelectionChange={(tags) => setSelectedTags(tags.map(t => t.id))}
      requireSelection={true} // Prevents deselecting the last tag
      allowMultiple={true}
    />
  );
}
```

### 2. requireSelection Behavior Details

- **Multiple Selection Mode**: When only one tag is selected, that tag cannot be deselected
- **Single Selection Mode**: Selected tag cannot be deselected (user must select a different tag first)
- **"All" Button**: Disabled when requireSelection is active and tags are selected
- **Default Button**: Disabled when requireSelection is active and tags are selected

```typescript
// Examples of requireSelection behavior
<TagSelector
  getTagsFunction={getTags}
  selectedTags={['technology']} // Only one tag selected
  onSelectionChange={handleChange}
  requireSelection={true}
  allowMultiple={true}
  // User cannot deselect 'technology' until they select another tag first
/>

<TagSelector
  getTagsFunction={getTags}
  selectedTags={['design']}
  onSelectionChange={handleChange}
  requireSelection={true}
  allowMultiple={false} // Single selection mode
  // User cannot deselect 'design' - must select a different tag
/>
```

### 3. Real-World requireSelection Examples

#### Filter Interface (Always Show Something)
```typescript
function ProductFilter() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['all']);
  
  return (
    <div>
      <h3>Product Categories</h3>
      <TagSelector
        getTagsFunction={getProductCategories}
        selectedTags={selectedCategories}
        onSelectionChange={(tags) => setSelectedCategories(tags.map(t => t.id))}
        requireSelection={true} // Always have at least one category selected
        allowMultiple={true}
        allowAll={true}
        allLabel={{
          en: 'All Products',
          es: 'Todos los Productos',
          default: 'All Products'
        }}
      />
      <ProductList categories={selectedCategories} />
    </div>
  );
}
```

#### User Profile Settings (Required Choice)
```typescript
function NotificationSettings() {
  const [notificationTypes, setNotificationTypes] = useState<string[]>(['email']);
  
  return (
    <div>
      <h3>How would you like to receive notifications?</h3>
      <p className="text-sm text-gray-600">At least one option must be selected</p>
      
      <TagSelector
        getTagsFunction={getNotificationOptions}
        selectedTags={notificationTypes}
        onSelectionChange={(tags) => setNotificationTypes(tags.map(t => t.id))}
        requireSelection={true} // User must have at least one notification method
        allowMultiple={true}
        allowAll={false}
      />
    </div>
  );
}
```

#### Data Dashboard (Required Data Source)
```typescript
function DataSourceSelector() {
  const [dataSources, setDataSources] = useState<string[]>(['primary']);
  
  return (
    <TagSelector
      getTagsFunction={getDataSources}
      selectedTags={dataSources}
      onSelectionChange={(tags) => setDataSources(tags.map(t => t.id))}
      requireSelection={true} // Dashboard must always show data from at least one source
      allowMultiple={true}
      size="tam-8" // Large tags for important selection
      customColors={{
        light: {
          selected: {
            background: '#059669',
            text: '#ffffff',
            border: '#047857'
          }
        }
      }}
    />
  );
}

## CSS Custom Properties Reference

**For Advanced Users**: Direct CSS variable control for maximum customization flexibility.

### Available CSS Variables

All CSS variables follow the pattern: `--tag-{theme}-{state}-{property}`

#### Light Theme Variables

```css
/* Selected state */
--tag-light-selected-bg: #16a34a;           /* Fill color when selected */
--tag-light-selected-text: #ffffff;         /* Text color when selected */
--tag-light-selected-border: #16a34a;       /* Border color when selected */
--tag-light-selected-hover-bg: #15803d;     /* Fill color when selected + hover */
--tag-light-selected-hover-border: #15803d; /* Border color when selected + hover */

/* Unselected state */
--tag-light-unselected-bg: #f1f5f9;         /* Fill color when unselected */
--tag-light-unselected-text: #475569;       /* Text color when unselected */
--tag-light-unselected-border: #e2e8f0;     /* Border color when unselected */
--tag-light-unselected-hover-bg: #e2e8f0;   /* Fill color when unselected + hover */
--tag-light-unselected-hover-border: #cbd5e1; /* Border color when unselected + hover */

/* All button state */
--tag-light-all-bg: #3b82f6;                /* Fill color for "All" button */
--tag-light-all-text: #ffffff;              /* Text color for "All" button */
--tag-light-all-border: #3b82f6;            /* Border color for "All" button */
--tag-light-all-hover-bg: #2563eb;          /* Fill color for "All" button + hover */
--tag-light-all-hover-border: #2563eb;      /* Border color for "All" button + hover */
```

#### Dark Theme Variables

```css
/* Selected state */
--tag-dark-selected-bg: #22c55e;            /* Fill color when selected (dark) */
--tag-dark-selected-text: #000000;          /* Text color when selected (dark) */
--tag-dark-selected-border: #22c55e;        /* Border color when selected (dark) */
--tag-dark-selected-hover-bg: #16a34a;      /* Fill color when selected + hover (dark) */
--tag-dark-selected-hover-border: #16a34a;  /* Border color when selected + hover (dark) */

/* Unselected state */
--tag-dark-unselected-bg: #374151;          /* Fill color when unselected (dark) */
--tag-dark-unselected-text: #d1d5db;        /* Text color when unselected (dark) */
--tag-dark-unselected-border: #4b5563;      /* Border color when unselected (dark) */
--tag-dark-unselected-hover-bg: #4b5563;    /* Fill color when unselected + hover (dark) */
--tag-dark-unselected-hover-border: #6b7280; /* Border color when unselected + hover (dark) */

/* All button state */
--tag-dark-all-bg: #60a5fa;                 /* Fill color for "All" button (dark) */
--tag-dark-all-text: #000000;               /* Text color for "All" button (dark) */
--tag-dark-all-border: #60a5fa;             /* Border color for "All" button (dark) */
--tag-dark-all-hover-bg: #3b82f6;           /* Fill color for "All" button + hover (dark) */
--tag-dark-all-hover-border: #3b82f6;       /* Border color for "All" button + hover (dark) */
```

### Direct CSS Usage

You can override these variables directly in your CSS:

```css
.commodity-selector {
  /* Custom commodities theme */
  --tag-light-selected-bg: #10b981;
  --tag-light-selected-border: #059669;
  --tag-light-selected-hover-bg: #059669;
  --tag-light-selected-hover-border: #047857;
  
  --tag-light-unselected-bg: #f9fafb;
  --tag-light-unselected-border: #e5e7eb;
  --tag-light-unselected-hover-bg: #f3f4f6;
  --tag-light-unselected-hover-border: #d1d5db;
}

.financial-selector {
  /* Custom financial theme */
  --tag-light-selected-bg: #1d4ed8;
  --tag-light-selected-border: #1e40af;
  --tag-light-unselected-bg: #eff6ff;
  --tag-light-unselected-border: #dbeafe;
}
```

### Runtime CSS Variable Updates

For dynamic color changes (e.g., user preferences):

```typescript
function updateTagColors(element: HTMLElement, colors: any) {
  // Update CSS variables at runtime
  if (colors.selected?.background) {
    element.style.setProperty('--tag-light-selected-bg', colors.selected.background);
  }
  if (colors.selected?.border) {
    element.style.setProperty('--tag-light-selected-border', colors.selected.border);
  }
  if (colors.unselected?.background) {
    element.style.setProperty('--tag-light-unselected-bg', colors.unselected.background);
  }
  // ... continue for all needed variables
}

// Usage
const tagSelectorElement = document.querySelector('.tag-selector-container');
updateTagColors(tagSelectorElement, {
  selected: { background: '#custom-color', border: '#custom-border' },
  unselected: { background: '#another-color', border: '#another-border' }
});
```

## Global State Integration (REACTIVE UPDATES)

**IMPORTANT**: The TagSelector component is designed to work reactively with global state management systems. This means it automatically updates when your app's theme or language changes globally.

### 1. Global Theme Integration

The component automatically detects and responds to theme changes through your application's theme provider.

#### With next-themes (Most Common)

```typescript
import { useTheme } from 'next-themes';

function ResponsiveTagSelector() {
  const { theme, resolvedTheme } = useTheme();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  // Component automatically reacts to global theme changes
  const currentTheme = resolvedTheme === 'dark' ? 'dark' : 'light';
  
  return (
    <TagSelector
      getTagsFunction={getTags}
      selectedTags={selectedTags}
      onSelectionChange={(tags) => setSelectedTags(tags.map(t => t.id))}
      // Theme changes automatically when user toggles app theme
      theme={currentTheme === 'dark' ? 'theme-dark-corporate' : 'theme-corporate'}
    />
  );
}
```

#### With Custom Theme Context

```typescript
import { useThemeContext } from '@/contexts/ThemeContext';

function ThemedTagSelector() {
  const { currentTheme, isDark } = useThemeContext();
  
  return (
    <TagSelector
      getTagsFunction={getTags}
      selectedTags={selectedTags}
      onSelectionChange={handleChange}
      // Automatically updates when global theme changes
      theme={isDark ? 'theme-dark-nature' : 'theme-nature'}
      customColors={isDark ? darkBrandColors : lightBrandColors}
    />
  );
}
```

### 2. Global Language Integration

The component automatically responds to language changes in your i18n system.

#### With react-i18next

```typescript
import { useTranslation } from 'react-i18next';

function MultilingualTagSelector() {
  const { i18n, t } = useTranslation();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  // Custom multilingual labels that react to language changes
  const allButtonLabel = {
    en: 'Select All Categories',
    es: 'Seleccionar Todas las Categorías',
    fr: 'Sélectionner Toutes',
    de: 'Alle Auswählen',
    default: 'Select All'
  };
  
  return (
    <TagSelector
      getTagsFunction={getMultilingualTags}
      selectedTags={selectedTags}
      onSelectionChange={(tags) => setSelectedTags(tags.map(t => t.id))}
      // Automatically uses current app language
      langOverride={i18n.language} // Reacts to global language changes
      allLabel={allButtonLabel}
      // Component re-renders with new translations when language changes
    />
  );
}
```

#### With Custom i18n System

```typescript
import { useLanguage } from '@/contexts/LanguageContext';

function InternationalTagSelector() {
  const { currentLanguage, changeLanguage } = useLanguage();
  
  return (
    <div>
      {/* Language switcher affects TagSelector automatically */}
      <select 
        value={currentLanguage} 
        onChange={(e) => changeLanguage(e.target.value)}
      >
        <option value="en">English</option>
        <option value="es">Español</option>
        <option value="fr">Français</option>
      </select>
      
      <TagSelector
        getTagsFunction={getTags}
        selectedTags={selectedTags}
        onSelectionChange={handleChange}
        // Automatically updates when language changes above
        langOverride={currentLanguage}
      />
    </div>
  );
}
```

### 3. Complete Reactive Integration

This example shows how to integrate both theme and language reactivity:

```typescript
import { useTheme } from 'next-themes';
import { useTranslation } from 'react-i18next';

function FullyReactiveTagSelector() {
  const { resolvedTheme } = useTheme();
  const { i18n } = useTranslation();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  // Define theme-aware color schemes
  const getThemeClass = () => {
    const baseTheme = resolvedTheme === 'dark' ? 'dark' : 'light';
    return `theme-${baseTheme}-corporate`;
  };
  
  // Define multilingual labels
  const customLabels = {
    allButton: {
      en: 'All Categories',
      es: 'Todas las Categorías',
      fr: 'Toutes les Catégories',
      default: 'All Categories'
    },
    noResults: {
      en: 'No categories found',
      es: 'No se encontraron categorías',
      fr: 'Aucune catégorie trouvée',
      default: 'No categories found'
    }
  };
  
  return (
    <div>
      {/* These buttons demonstrate reactive updates */}
      <div className="controls">
        <button onClick={() => i18n.changeLanguage('en')}>English</button>
        <button onClick={() => i18n.changeLanguage('es')}>Español</button>
        <button onClick={() => i18n.changeLanguage('fr')}>Français</button>
      </div>
      
      <TagSelector
        getTagsFunction={getCategories}
        selectedTags={selectedTags}
        onSelectionChange={(tags) => {
          setSelectedTags(tags.map(t => t.id));
          console.log('Selection changed:', tags);
        }}
        // Both props automatically update when global state changes
        theme={getThemeClass()} // Reacts to theme changes
        langOverride={i18n.language} // Reacts to language changes
        allLabel={customLabels.allButton}
        defaultLabel={customLabels.noResults}
        allowMultiple={true}
        allowAll={true}
      />
    </div>
  );
}
```

### 4. Provider Setup for Reactive Updates

To ensure your TagSelector works reactively, wrap your app with the necessary providers:

```typescript
// App.tsx or _app.tsx
import { ThemeProvider } from 'next-themes';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/config';

function App({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <I18nextProvider i18n={i18n}>
        <Component {...pageProps} />
      </I18nextProvider>
    </ThemeProvider>
  );
}

export default App;
```

### 5. Dynamic Theme Switching Example

```typescript
function DynamicThemeTagSelector() {
  const { theme, setTheme } = useTheme();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  // Define different theme mappings
  const themeMapping = {
    light: 'theme-corporate',
    dark: 'theme-dark-corporate',
    auto: theme === 'dark' ? 'theme-dark-nature' : 'theme-nature'
  };
  
  return (
    <div>
      {/* Theme switcher that affects TagSelector immediately */}
      <div className="theme-controls">
        <button onClick={() => setTheme('light')}>Light</button>
        <button onClick={() => setTheme('dark')}>Dark</button>
        <button onClick={() => setTheme('system')}>Auto</button>
      </div>
      
      <TagSelector
        getTagsFunction={getTags}
        selectedTags={selectedTags}
        onSelectionChange={(tags) => setSelectedTags(tags.map(t => t.id))}
        // Theme updates instantly when buttons above are clicked
        theme={themeMapping[theme as keyof typeof themeMapping]}
      />
    </div>
  );
}
```

### 6. Language-Aware Tag Loading

For truly reactive multilingual support, your tag loading function should also be language-aware:

```typescript
function useLanguageAwareTags() {
  const { i18n } = useTranslation();
  
  const getTagsForCurrentLanguage = useCallback(async (): Promise<TagItem[]> => {
    try {
      // API call includes current language
      const response = await fetch(`/api/tags?lang=${i18n.language}`);
      const data = await response.json();
      
      return data.map(item => ({
        id: item.id,
        label: {
          en: item.label_en,
          es: item.label_es,
          fr: item.label_fr,
          default: item.label_en || item.label
        }
      }));
    } catch (error) {
      console.error('Failed to load tags:', error);
      return [];
    }
  }, [i18n.language]); // Re-runs when language changes
  
  return getTagsForCurrentLanguage;
}

// Usage
function LanguageAwareTagSelector() {
  const { i18n } = useTranslation();
  const getTagsFunction = useLanguageAwareTags();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  return (
    <TagSelector
      getTagsFunction={getTagsFunction} // Automatically reloads when language changes
      selectedTags={selectedTags}
      onSelectionChange={(tags) => setSelectedTags(tags.map(t => t.id))}
      langOverride={i18n.language}
    />
  );
}
```

### 7. Real-Time Reactive Demo

This example demonstrates instant updates across multiple TagSelector instances:

```typescript
function ReactiveDemo() {
  const { theme, setTheme } = useTheme();
  const { i18n } = useTranslation();
  const [selectedTags1, setSelectedTags1] = useState<string[]>([]);
  const [selectedTags2, setSelectedTags2] = useState<string[]>([]);
  
  return (
    <div>
      {/* Global controls */}
      <div className="global-controls">
        <h3>Global Controls (affect all TagSelectors)</h3>
        
        <div className="theme-controls">
          <label>Theme:</label>
          <button onClick={() => setTheme('light')}>☀️ Light</button>
          <button onClick={() => setTheme('dark')}>🌙 Dark</button>
        </div>
        
        <div className="language-controls">
          <label>Language:</label>
          <button onClick={() => i18n.changeLanguage('en')}>🇺🇸 English</button>
          <button onClick={() => i18n.changeLanguage('es')}>🇪🇸 Español</button>
          <button onClick={() => i18n.changeLanguage('fr')}>🇫🇷 Français</button>
        </div>
      </div>
      
      {/* Both TagSelectors update automatically */}
      <div className="selectors">
        <h4>Categories Selector</h4>
        <TagSelector
          getTagsFunction={getCategoryTags}
          selectedTags={selectedTags1}
          onSelectionChange={(tags) => setSelectedTags1(tags.map(t => t.id))}
          theme={theme === 'dark' ? 'theme-dark-corporate' : 'theme-corporate'}
          langOverride={i18n.language}
        />
        
        <h4>Skills Selector</h4>
        <TagSelector
          getTagsFunction={getSkillTags}
          selectedTags={selectedTags2}
          onSelectionChange={(tags) => setSelectedTags2(tags.map(t => t.id))}
          theme={theme === 'dark' ? 'theme-dark-nature' : 'theme-nature'}
          langOverride={i18n.language}
        />
      </div>
    </div>
  );
}
```

## Internationalization Examples

### 1. Custom Labels for All Button

```typescript
const customAllLabel = {
  en: 'Select All Categories',
  es: 'Seleccionar Todas',
  fr: 'Tout Sélectionner',
  default: 'Select All'
};

<TagSelector
  getTagsFunction={getTags}
  selectedTags={selectedTags}
  onSelectionChange={handleChange}
  allLabel={customAllLabel}
  langOverride="es" // Force Spanish
/>
```

### 2. Error Handling with Custom Messages

```typescript
const getTagsWithError = async (): Promise<TagItem[]> => {
  throw new Error('Network error occurred');
};

const errorFallbackLabel = {
  en: 'No categories available',
  es: 'No hay categorías disponibles',
  default: 'No categories'
};

<TagSelector
  getTagsFunction={getTagsWithError}
  selectedTags={selectedTags}
  onSelectionChange={handleChange}
  defaultLabel={errorFallbackLabel}
/>
```

## Error Handling Patterns

### 1. Graceful Async Error Handling

```typescript
const getTagsWithFallback = async (): Promise<TagItem[]> => {
  try {
    const response = await fetch('/api/tags');
    if (!response.ok) throw new Error('API Error');
    return await response.json();
  } catch (error) {
    console.error('Failed to load tags:', error);
    
    // Return fallback data instead of empty array
    return [
      {
        id: 'fallback',
        label: {
          en: 'Default Category',
          es: 'Categoría por Defecto',
          default: 'Default Category'
        }
      }
    ];
  }
};
```

### 2. Loading States and Error Display

The component automatically handles loading states and errors. You can customize error messages:

```typescript
// Component automatically shows loading state during async operation
// Error states are displayed with red text and error icon
// No manual loading state management needed
```

## CSS Custom Properties Available

```css
/* Light Theme Variables */
--tag-light-selected-bg
--tag-light-selected-text
--tag-light-selected-border
--tag-light-selected-hover-bg
--tag-light-selected-hover-border

--tag-light-unselected-bg
--tag-light-unselected-text
--tag-light-unselected-border
--tag-light-unselected-hover-bg
--tag-light-unselected-hover-border

--tag-light-all-bg
--tag-light-all-text
--tag-light-all-border
--tag-light-all-hover-bg
--tag-light-all-hover-border

/* Dark Theme Variables (same pattern with -dark-) */
--tag-dark-selected-bg
--tag-dark-selected-text
/* ... etc */
```

## Common Implementation Patterns

### 1. Form Integration

```typescript
function FilterForm() {
  const [formData, setFormData] = useState({
    name: '',
    categories: [] as string[],
    // other form fields
  });

  const handleCategoryChange = (tags: TagItem[]) => {
    setFormData(prev => ({
      ...prev,
      categories: tags.map(t => t.id)
    }));
  };

  const handleSubmit = () => {
    console.log('Form data:', formData);
    // Submit form with categories: formData.categories
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        value={formData.name} 
        onChange={e => setFormData(prev => ({...prev, name: e.target.value}))}
      />
      
      <TagSelector
        getTagsFunction={getCategories}
        selectedTags={formData.categories}
        onSelectionChange={handleCategoryChange}
      />
      
      <button type="submit">Submit</button>
    </form>
  );
}
```

### 2. Search/Filter Integration

```typescript
function ProductSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  
  // Filter products based on selected categories
  const filteredProducts = products.filter(product => 
    selectedCategories.length === 0 || 
    selectedCategories.includes(product.categoryId)
  );

  return (
    <div>
      <input 
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        placeholder="Search products..."
      />
      
      <TagSelector
        getTagsFunction={getProductCategories}
        selectedTags={selectedCategories}
        onSelectionChange={(tags) => setSelectedCategories(tags.map(t => t.id))}
        allowMultiple={true}
        allowAll={true}
      />
      
      <ProductList products={filteredProducts} />
    </div>
  );
}
```

## Important Implementation Notes

### 1. Always Use Async Functions
```typescript
// ✅ CORRECT - Always async
const getTags = async (): Promise<TagItem[]> => {
  return tagData;
};

// ❌ WRONG - Synchronous function
const getTags = (): TagItem[] => {
  return tagData;
};
```

### 2. State Management Pattern
```typescript
// ✅ CORRECT - Store IDs for state, receive full objects in callback
const [selectedTags, setSelectedTags] = useState<string[]>([]);

const handleChange = (fullTagObjects: TagItem[]) => {
  // Extract IDs for state
  setSelectedTags(fullTagObjects.map(tag => tag.id));
  
  // Use full objects for other operations
  console.log('Full translation data:', fullTagObjects);
};
```

### 3. Translation Object Structure
```typescript
// ✅ CORRECT - Always include 'default' key
const tagLabel = {
  en: 'Technology',
  es: 'Tecnología',
  fr: 'Technologie',
  default: 'Technology' // REQUIRED fallback
};

// ❌ WRONG - Missing default fallback
const tagLabel = {
  en: 'Technology',
  es: 'Tecnología'
  // Missing 'default' key
};
```

### 4. Error Handling Best Practice
```typescript
const getTags = async (): Promise<TagItem[]> => {
  try {
    const data = await fetchFromAPI();
    return data;
  } catch (error) {
    console.error('Tag loading failed:', error);
    // Always return valid TagItem[] array, never throw
    return []; 
  }
};
```

## Testing Data Generators

For testing purposes, here are some utility functions:

```typescript
// Generate test tags with multiple languages
export const generateTestTags = (count: number): TagItem[] => {
  const categories = ['tech', 'design', 'business', 'science', 'art'];
  const languages = {
    tech: { en: 'Technology', es: 'Tecnología', fr: 'Technologie' },
    design: { en: 'Design', es: 'Diseño', fr: 'Conception' },
    business: { en: 'Business', es: 'Negocios', fr: 'Affaires' },
    science: { en: 'Science', es: 'Ciencia', fr: 'Science' },
    art: { en: 'Art', es: 'Arte', fr: 'Art' }
  };

  return categories.slice(0, count).map(cat => ({
    id: cat,
    label: {
      ...languages[cat],
      default: languages[cat].en
    }
  }));
};

// Simulate network delay for testing
export const createAsyncTagLoader = (tags: TagItem[], delay: number = 500) => {
  return async (): Promise<TagItem[]> => {
    await new Promise(resolve => setTimeout(resolve, delay));
    return tags;
  };
};
```

## Size Reference Chart

### Legacy Sizes (Backwards Compatible)
- `sm`: Small - padding: 0.25rem 0.75rem, font-size: 0.75rem
- `md`: Medium - padding: 0.375rem 1rem, font-size: 0.875rem  
- `lg`: Large - padding: 0.5rem 1.25rem, font-size: 0.875rem

### Granular Sizes (tam-1 through tam-12)
- `tam-1`: 18px height, 0.625rem font - Ultra compact
- `tam-2`: 20px height, 0.6875rem font - Extra small
- `tam-3`: 22px height, 0.75rem font - Very small
- `tam-4`: 24px height, 0.8125rem font - Small plus
- `tam-5`: 26px height, 0.875rem font - Small-medium
- `tam-6`: 28px height, 0.9375rem font - Medium minus
- `tam-7`: 32px height, 1rem font - Standard medium
- `tam-8`: 36px height, 1.0625rem font - Medium plus
- `tam-9`: 40px height, 1.125rem font - Large minus
- `tam-10`: 44px height, 1.1875rem font - Standard large
- `tam-11`: 48px height, 1.25rem font - Large plus
- `tam-12`: 52px height, 1.3125rem font - Extra large

### Custom Sizing via Metadata
Individual tags can override any size with custom pixel values:
- `paddingX`: Horizontal padding (e.g., '12px', '1rem')
- `paddingY`: Vertical padding (e.g., '8px', '0.5rem')
- `fontSize`: Font size (e.g., '14px', '0.875rem')
- `minWidth`: Minimum width (e.g., '80px', '5rem')
- `height`: Fixed height (e.g., '32px', '2rem')

## Summary

This implementation guide provides everything needed to implement the TagSelector component without needing to read the full source code. The component handles all complex logic internally while providing a simple, powerful API for various use cases.

## Version History

### Version 1.0.1 (Current)
- ✅ Granular sizing system with tam-1 through tam-12 sizes
- ✅ Custom pixel-based sizing via metadata
- ✅ Individual tag color customization via metadata
- ✅ requireSelection prop for mandatory selections
- ✅ Complete fallback system for colors and sizing
- ✅ Enhanced TypeScript interfaces with full type safety

### Versioning Rules
- **Format**: MAJOR.MINOR.PATCH (e.g., 1.0.1)
- **Increment**: PATCH +1 for each change (1.0.1 → 1.0.2)
- **Rollover**: When PATCH reaches 10, increment MINOR and reset PATCH (1.0.10 → 1.1.0)
- **Major**: For breaking changes (1.9.x → 2.0.0)

### Future Updates
Next version will be **1.0.2** when documentation changes are made.