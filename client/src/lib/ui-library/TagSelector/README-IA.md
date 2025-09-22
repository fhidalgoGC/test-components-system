# TagSelector - AI Implementation Guide
**Version: 1.0.4**

## Overview

TagSelector is a comprehensive React component designed for selecting multiple tags with async data loading, advanced functionality, and complete TypeScript support. It provides a modern UI with responsive design and accessibility features.

## Key Features

- **Async Data Loading**: Required async function for tag data
- **Require Selection**: Prevent deselecting the last tag for mandatory selections
- **Advanced Configuration**: Granular control over behavior and visibility
- **Accessibility**: Full keyboard navigation and screen reader support
- **Responsive Design**: Works on all device sizes
- **TypeScript**: Complete type safety with detailed interfaces

## Installation & Imports

```typescript
import TagSelector from '@/lib/ui-library/TagSelector';
import type { 
  TagItem, 
  TagSelectorSize
} from '@/lib/ui-library/TagSelector';
```

## Core Types

### TagItem
```typescript
interface TagItem {
  id: string;
  label: string; // Simple string label
}

### TagSelectorSize
```typescript
type TagSelectorSize = 'sm' | 'md' | 'lg';
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
  size?: TagSelectorSize; // Default: 'md' - supports 'sm'|'md'|'lg'
  disabled?: boolean; // Default: false
  
  // BASIC STYLING PROPS
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
      label: 'Fruits'
    },
    {
      id: 'vegetables',
      label: 'Vegetables'
    },
    {
      id: 'dairy',
      label: 'Dairy'
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
      label: item.name || item.name_en
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
    />
  );
}
```

## Additional Documentation

### 🎨 **Styling and Theming**
For comprehensive styling, theming, and visual customization, see:
**[README-IA-STYLES.md](./README-IA-STYLES.md)**

### 🌐 **Internationalization and Languages**  
For complete language support, translations, and i18n setup, see:
**[README-IA--LANGUAJE.md](./README-IA--LANGUAJE.md)**

## Advanced Usage

### 1. Require Selection Example

Prevent users from deselecting the last tag:

```typescript
function MandatoryTagSelector() {
  const [selectedTags, setSelectedTags] = useState<string[]>(['required']);
  
  const getRequiredTags = async (): Promise<TagItem[]> => {
    return [
      { id: 'required', label: 'Required' },
      { id: 'optional', label: 'Optional' },
      { id: 'extra', label: 'Extra' }
    ];
  };

  return (
    <TagSelector
      getTagsFunction={getRequiredTags}
      selectedTags={selectedTags}
      onSelectionChange={(tags) => setSelectedTags(tags.map(t => t.id))}
      requireSelection={true} // Prevents deselecting the last tag
      allowMultiple={true}
      allowAll={false}
    />
  );
}
```

### 2. Single Selection Mode

Force only one tag to be selected at a time:

```typescript
function SingleSelectTagSelector() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  const getSingleTags = async (): Promise<TagItem[]> => {
    return [
      { id: 'option1', label: 'Option 1' },
      { id: 'option2', label: 'Option 2' },
      { id: 'option3', label: 'Option 3' }
    ];
  };

  return (
    <TagSelector
      getTagsFunction={getSingleTags}
      selectedTags={selectedTags}
      onSelectionChange={(tags) => setSelectedTags(tags.map(t => t.id))}
      allowMultiple={false} // Only one selection allowed
      allowAll={false} // Hide "All" button
    />
  );
}
```

### 3. Error Handling

Handle async function errors gracefully:

```typescript
const getTagsWithErrorHandling = async (): Promise<TagItem[]> => {
  try {
    const response = await fetch('/api/tags');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.map(item => ({
      id: item.id,
      label: item.name
    }));
  } catch (error) {
    console.error('Failed to load tags:', error);
    // Always return valid TagItem[] array, never throw
    return [
      { id: 'fallback', label: 'Error loading tags' }
    ]; 
  }
};
```

## Troubleshooting

### Common Issues

#### 1. Tags not loading
**Problem**: TagSelector shows loading state but no tags appear.
**Solution**: Ensure your `getTagsFunction` returns a valid `Promise<TagItem[]>` and each item has `id` and `label` properties.

#### 2. Selection not updating
**Problem**: Clicking tags doesn't update the selection.
**Solution**: Verify that `onSelectionChange` properly updates your state and `selectedTags` array contains valid tag IDs.

#### 3. Component not rendering
**Problem**: TagSelector doesn't appear on screen.
**Solution**: Check that all required props (`getTagsFunction`, `selectedTags`, `onSelectionChange`) are provided.

### Performance Tips

1. **Memoize tag loading function** if it depends on expensive computations
2. **Use stable references** for the `onSelectionChange` callback
3. **Implement proper error handling** in your async function
4. **Consider pagination** for very large tag lists (>100 items)

## API Reference

### Required Props
- `getTagsFunction`: `() => Promise<TagItem[]>` - MUST be async
- `selectedTags`: `string[]` - Array of currently selected tag IDs  
- `onSelectionChange`: `(tags: TagItem[]) => void` - Called when selection changes

### Optional Props
- `allowMultiple`: `boolean` (default: `true`) - Allow multiple selections
- `allowAll`: `boolean` (default: `true`) - Show "Select All" button
- `requireSelection`: `boolean` (default: `false`) - Prevent deselecting last tag
- `size`: `TagSelectorSize` (default: `'md'`) - Component size: 'sm', 'md', 'lg'
- `disabled`: `boolean` (default: `false`) - Disable all interactions
- `id`: `string` - HTML id attribute
- `className`: `string` - Additional CSS classes
- `style`: `CSSProperties` - Inline styles

## Summary

This implementation guide provides everything needed to use the TagSelector component effectively. The component handles all complex logic internally while providing a simple, powerful API for various use cases.

For advanced styling and theming, see [README-IA-STYLES.md](./README-IA-STYLES.md).
For internationalization and language support, see [README-IA--LANGUAJE.md](./README-IA--LANGUAJE.md).

## Version History

### Version 1.0.4 (Current)
- ✅ Separated styling documentation into README-IA-STYLES.md
- ✅ Separated language documentation into README-IA--LANGUAJE.md  
- ✅ Simplified main README to focus on core functionality
- ✅ Streamlined examples and removed complex styling content

### Version 1.0.3
- ✅ Added comprehensive programmatic language change documentation
- ✅ Three integration options: LanguageProvider + useLanguage, langOverride, and i18n systems
- ✅ Complete import statements and setup examples

### Version 1.0.2
- ✅ Granular sizing system and individual tag customization features
- ✅ Enhanced TypeScript interfaces with full type safety

### Versioning Rules
- **Format**: MAJOR.MINOR.PATCH (e.g., 1.0.4)
- **Increment**: PATCH +1 for each change (1.0.4 → 1.0.5)
- **Rollover**: When PATCH reaches 10, increment MINOR and reset PATCH (1.0.10 → 1.1.0)
- **Major**: For breaking changes (1.9.x → 2.0.0)

### Future Updates
Next version will be **1.0.5** when documentation changes are made.
