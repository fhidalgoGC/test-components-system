# TagSelector - AI Implementation Guide

## Overview

TagSelector is a comprehensive, multilingual React component designed for selecting multiple tags with async data loading, internationalization support, and extensive theming capabilities. It provides a modern UI with responsive design and accessibility features.

## Key Features

- **Async Data Loading**: Required async function for tag data
- **Multilingual Support**: Complete i18n system with hierarchical translations
- **Theme Customization**: CSS Custom Properties + class-based theming
- **Accessibility**: Full keyboard navigation and screen reader support
- **Responsive Design**: Works on all device sizes
- **TypeScript**: Complete type safety with detailed interfaces

## Installation & Imports

```typescript
import TagSelector from '@/lib/ui-library/TagSelector';
import type { TagItem, TagCustomColors, MultiLanguageLabel } from '@/lib/ui-library/TagSelector';
```

## Core Types

### TagItem
```typescript
interface TagItem {
  id: string;
  label: MultiLanguageLabel; // Complete translation object
}
```

### MultiLanguageLabel
```typescript
interface MultiLanguageLabel {
  [languageCode: string]: string;
  default: string; // Always required as fallback
}
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
  size?: 'sm' | 'md' | 'lg'; // Default: 'md'
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

### 2. Direct Color Customization

```typescript
const brandColors = {
  light: {
    selected: {
      background: '#6366f1', // Brand primary
      text: '#ffffff',
      hoverBackground: '#4f46e5'
    },
    unselected: {
      background: '#f8fafc',
      text: '#334155',
      hoverBackground: '#e2e8f0'
    },
    all: {
      background: '#ef4444', // Red for "Select All"
      text: '#ffffff'
    }
  },
  dark: {
    selected: {
      background: '#8b5cf6',
      text: '#ffffff'
    },
    unselected: {
      background: '#374151',
      text: '#d1d5db'
    }
  }
};

<TagSelector
  getTagsFunction={getTags}
  selectedTags={selectedTags}
  onSelectionChange={handleChange}
  customColors={brandColors}
/>
```

### 3. Combining Theme Class + Custom Colors

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

This implementation guide provides everything needed to implement the TagSelector component without needing to read the full source code. The component handles all complex logic internally while providing a simple, powerful API for various use cases.