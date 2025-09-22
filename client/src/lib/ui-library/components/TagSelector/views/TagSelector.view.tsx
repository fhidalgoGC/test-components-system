import React, { useState, useEffect } from 'react';
import type { TagSelectorProps} from '../types';
import type { TagItem } from '../types/tag-selector.type';
import type { SelectedTagItem, TagSelectorSize } from '../types';
import type { MultiLanguageLabel } from '../../../types/language.types';
import { TagSelectorProvider, useTagSelectorContext } from '../providers';
import { containerClasses, chipClasses } from '../css/TagSelector.module';
import { useLibI18n } from '../../../providers/LibI18n.provider';

// Internal view component that handles rendering
const TagSelectorViewInternal: React.FC<{
  className?: string;
  tags: TagItem[];
  selectedTags: string[];
  onSelectionChange: (selectedTags: TagItem[]) => void;
  allowMultiple?: boolean;
  allowAll?: boolean;
  requireSelection?: boolean;
  size?: TagSelectorSize;
  disabled?: boolean;
  isLoading?: boolean;
  allLabel?: MultiLanguageLabel;
}> = ({ 
  className, 
  tags, 
  selectedTags, 
  onSelectionChange, 
  allowMultiple = true, 
  allowAll = true, 
  requireSelection = false,
  size = 'md', 
  disabled = false,
  isLoading = false,
  allLabel
}) => {
  const { theme, t, isVisible } = useTagSelectorContext();
  const { resolveLabel } = useLibI18n();

  // Helper function to find TagItem by ID
  const findTagById = (tagId: string): TagItem | null => {
    return tags.find(t => t.id === tagId) || null;
  };

  // Helper function to convert array of IDs to TagItem[]
  const idsToTagItems = (ids: string[]): TagItem[] => {
    return ids.map(id => findTagById(id)).filter((item): item is TagItem => item !== null);
  };

  const handleAllClick = () => {
    if (disabled) return;
    
    // If all tags are selected, clear selection; otherwise select all
    const allSelected = tags.length > 0 && tags.every(tag => selectedTags.includes(tag.id));
    if (allSelected) {
      // When allowAll is true, always allow clearing all tags
      onSelectionChange([]);
    } else {
      // Return TagItem[] format with complete label data
      onSelectionChange(tags); // Pass all tags directly
    }
  };

  const handleTagClick = (tagId: string) => {
    if (disabled) return;
    
    if (allowMultiple) {
      const isSelected = selectedTags.includes(tagId);
      if (!isSelected) {
        // Add to selection
        const newSelection = [...selectedTags, tagId];
        onSelectionChange(idsToTagItems(newSelection));
      } else {
        // Tag is currently selected - check deselection rules
        if (requireSelection) {
          // requireSelection has priority: don't deselect if it's the only one
          if (selectedTags.length > 1) {
            const newSelection = selectedTags.filter(id => id !== tagId);
            onSelectionChange(idsToTagItems(newSelection));
          }
          // If it's the only selected tag, do nothing (maintain minimum 1)
        } else if (allowAll) {
          // No requireSelection + allowAll: always allow deselection
          const newSelection = selectedTags.filter(id => id !== tagId);
          onSelectionChange(idsToTagItems(newSelection));
        } else {
          // No requireSelection + no allowAll: allow deselection
          const newSelection = selectedTags.filter(id => id !== tagId);
          onSelectionChange(idsToTagItems(newSelection));
        }
      }
    } else {
      // Single selection mode - always select the clicked tag
      const selectedItem = findTagById(tagId);
      onSelectionChange(selectedItem ? [selectedItem] : []);
    }
  };

  const allSelected = tags.length > 0 && tags.every(tag => selectedTags.includes(tag.id));
  const hasNoSelection = selectedTags.length === 0;

  const handleDefaultClick = () => {
    if (disabled) return;
    // Check if requireSelection prevents clearing selection
    if (requireSelection && selectedTags.length > 0) {
      return; // Don't allow clearing if requireSelection is active
    }
    // Clear selection when default chip is clicked
    onSelectionChange([]);
  };

  // Generate inline styles for individual tag metadata
  const generateTagInlineStyles = (tag: TagItem, isSelected: boolean): React.CSSProperties => {
    if (!tag.metadata?.colors) return {};
    
    const themeColors = tag.metadata.colors[theme];
    if (!themeColors) return {};
    
    const state = isSelected ? themeColors.selected : themeColors.unselected;
    if (!state) return {};
    
    const styles: React.CSSProperties = {};
    
    // Base styles for the current state
    if (state.background) styles.backgroundColor = state.background;
    if (state.text) styles.color = state.text;
    if (state.border) styles.borderColor = state.border;
    
    return styles;
  };

  // Generate CSS hover styles using CSS custom properties for individual tags
  const generateTagHoverStyles = (tag: TagItem, isSelected: boolean): Record<string, string> => {
    if (!tag.metadata?.colors) return {};
    
    const themeColors = tag.metadata.colors[theme];
    if (!themeColors) return {};
    
    const state = isSelected ? themeColors.selected : themeColors.unselected;
    if (!state) return {};
    
    const hoverStyles: Record<string, string> = {};
    
    // Set CSS custom properties for hover states
    if (state.hoverBackground) {
      hoverStyles['--tag-hover-bg'] = state.hoverBackground;
    }
    if (state.hoverBorder) {
      hoverStyles['--tag-hover-border'] = state.hoverBorder;
    }
    if (state.hoverText) {
      hoverStyles['--tag-hover-text'] = state.hoverText;
    }
    
    return hoverStyles;
  };

  // Generate sizing styles from metadata
  const generateTagSizingStyles = (tag: TagItem): React.CSSProperties => {
    if (!tag.metadata?.sizing) return {};
    
    const sizing = tag.metadata.sizing;
    const styles: React.CSSProperties = {};
    
    if (sizing.paddingX) {
      styles.paddingLeft = sizing.paddingX;
      styles.paddingRight = sizing.paddingX;
    }
    if (sizing.paddingY) {
      styles.paddingTop = sizing.paddingY;
      styles.paddingBottom = sizing.paddingY;
    }
    if (sizing.fontSize) styles.fontSize = sizing.fontSize;
    if (sizing.minWidth) styles.minWidth = sizing.minWidth;
    if (sizing.height) styles.height = sizing.height;
    
    return styles;
  };

  // Combine base styles, hover styles, and sizing styles for a tag
  const getCombinedTagStyles = (tag: TagItem, isSelected: boolean): React.CSSProperties => {
    const baseStyles = generateTagInlineStyles(tag, isSelected);
    const hoverStyles = generateTagHoverStyles(tag, isSelected);
    const sizingStyles = generateTagSizingStyles(tag);
    
    return { ...baseStyles, ...hoverStyles, ...sizingStyles } as React.CSSProperties;
  };

  return (
    <div 
      className={containerClasses(theme, isVisible, className)}
      data-testid="tag-selector-container"
    >
      {/* Default chip removed - should never show */}
      
      {allowAll && !requireSelection && tags.length > 0 && (
        <button
          className={chipClasses(theme, isVisible, allSelected, size, false)}
          onClick={handleAllClick}
          disabled={disabled}
          data-testid="tag-all"
        >
          {allLabel ? resolveLabel(allLabel) : t('all')}
        </button>
      )}
      
      {tags.map((tag) => {
        const isSelected = selectedTags.includes(tag.id);
        const hasMetadataColors = tag.metadata?.colors;
        const baseStyles = hasMetadataColors ? generateTagInlineStyles(tag, isSelected) : {};
        const sizingStyles = generateTagSizingStyles(tag);
        
        // Funciones para manejar el hover
        const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
          if (disabled || !hasMetadataColors) return;
          
          const themeColors = tag.metadata?.colors?.[theme];
          const state = isSelected ? themeColors?.selected : themeColors?.unselected;
          
          if (state?.hoverBackground) e.currentTarget.style.backgroundColor = state.hoverBackground;
          if (state?.hoverBorder) e.currentTarget.style.borderColor = state.hoverBorder;
          if (state?.hoverText) e.currentTarget.style.color = state.hoverText;
        };
        
        const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
          if (disabled || !hasMetadataColors) return;
          
          const themeColors = tag.metadata?.colors?.[theme];
          const state = isSelected ? themeColors?.selected : themeColors?.unselected;
          
          if (state?.background) e.currentTarget.style.backgroundColor = state.background;
          if (state?.border) e.currentTarget.style.borderColor = state.border;
          if (state?.text) e.currentTarget.style.color = state.text;
        };
        
        return (
          <button
            key={tag.id}
            className={chipClasses(theme, isVisible, isSelected, size, false)}
            style={{ ...baseStyles, ...sizingStyles }}
            onClick={() => handleTagClick(tag.id)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            disabled={disabled}
            data-testid={`tag-${tag.id}`}
          >
            {resolveLabel(tag.label)}
          </button>
        );
      })}
      
      {isLoading && (
        <span 
          className={chipClasses(theme, isVisible, false, size, false, 'opacity-50')}
          data-testid="tag-loading"
        >
          {t('loading')}
        </span>
      )}
      
      {!isLoading && tags.length === 0 && (
        <span 
          className={chipClasses(theme, isVisible, false, size, false, 'opacity-50')}
          data-testid="tag-no-tags"
        >
          {t('no_tags')}
        </span>
      )}
    </div>
  );
};

// Main unified component that includes both logic and rendering
export const TagSelectorView: React.FC<TagSelectorProps> = ({
  id, 
  className, 
  style, 
  getTagsFunction, // Required async function
  selectedTags, 
  onSelectionChange, 
  allowMultiple, 
  allowAll, 
  requireSelection,
  config, 
  size, 
  disabled, 
  langOverride, 
  i18nOrder,
  allLabel,
  defaultSelectedTags,
  theme,
  customColors
}) => {
  const [resolvedTags, setResolvedTags] = useState<TagItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasInitialized, setHasInitialized] = useState<boolean>(false);
  
  // Language is now handled internally by LibI18nProvider
  // No need to manually manage language context here

  // Direct callback - always passes TagItem[] with full translation data
  const directCallback = (items: TagItem[]) => {
    onSelectionChange(items);
  };

  // Load tags when component mounts or when language changes
  useEffect(() => {
    let cancelled = false;
    
    const loadTags = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const loadedTags = await getTagsFunction();
        if (!cancelled) {
          setResolvedTags(loadedTags);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load tags');
          setResolvedTags([]);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    loadTags();
    
    return () => {
      cancelled = true;
    };
  }, [getTagsFunction]);

  // Handle default selection when tags are loaded
  useEffect(() => {
    if (!hasInitialized && resolvedTags.length > 0 && defaultSelectedTags && defaultSelectedTags.length > 0) {
      // Find valid default tags that exist in loaded tags
      const validDefaultTags = defaultSelectedTags.filter(id => 
        resolvedTags.some(tag => tag.id === id)
      );
      
      if (validDefaultTags.length > 0) {
        // Get full TagItem objects for valid defaults
        const defaultTagItems = resolvedTags.filter(tag => 
          validDefaultTags.includes(tag.id)
        );
        
        // Trigger selection change with default tags
        onSelectionChange(defaultTagItems);
      }
      
      setHasInitialized(true);
    }
  }, [resolvedTags, defaultSelectedTags, hasInitialized, onSelectionChange]);

  // Tags are already in the correct TagItem[] format

  // Generate inline styles for custom colors
  const generateCustomColorStyles = () => {
    if (!customColors) return undefined;
    
    const styles: Record<string, string> = {};
    
    // Light theme colors
    if (customColors.light) {
      const light = customColors.light;
      
      if (light.selected) {
        if (light.selected.background) styles['--tag-light-selected-bg'] = light.selected.background;
        if (light.selected.text) styles['--tag-light-selected-text'] = light.selected.text;
        if (light.selected.border) styles['--tag-light-selected-border'] = light.selected.border;
        if (light.selected.hoverBackground) styles['--tag-light-selected-hover-bg'] = light.selected.hoverBackground;
        if (light.selected.hoverBorder) styles['--tag-light-selected-hover-border'] = light.selected.hoverBorder;
      }
      
      if (light.unselected) {
        if (light.unselected.background) styles['--tag-light-unselected-bg'] = light.unselected.background;
        if (light.unselected.text) styles['--tag-light-unselected-text'] = light.unselected.text;
        if (light.unselected.border) styles['--tag-light-unselected-border'] = light.unselected.border;
        if (light.unselected.hoverBackground) styles['--tag-light-unselected-hover-bg'] = light.unselected.hoverBackground;
        if (light.unselected.hoverBorder) styles['--tag-light-unselected-hover-border'] = light.unselected.hoverBorder;
      }
      
      if (light.all) {
        if (light.all.background) styles['--tag-light-all-bg'] = light.all.background;
        if (light.all.text) styles['--tag-light-all-text'] = light.all.text;
        if (light.all.border) styles['--tag-light-all-border'] = light.all.border;
        if (light.all.hoverBackground) styles['--tag-light-all-hover-bg'] = light.all.hoverBackground;
        if (light.all.hoverBorder) styles['--tag-light-all-hover-border'] = light.all.hoverBorder;
      }
    }
    
    // Dark theme colors
    if (customColors.dark) {
      const dark = customColors.dark;
      
      if (dark.selected) {
        if (dark.selected.background) styles['--tag-dark-selected-bg'] = dark.selected.background;
        if (dark.selected.text) styles['--tag-dark-selected-text'] = dark.selected.text;
        if (dark.selected.border) styles['--tag-dark-selected-border'] = dark.selected.border;
        if (dark.selected.hoverBackground) styles['--tag-dark-selected-hover-bg'] = dark.selected.hoverBackground;
        if (dark.selected.hoverBorder) styles['--tag-dark-selected-hover-border'] = dark.selected.hoverBorder;
      }
      
      if (dark.unselected) {
        if (dark.unselected.background) styles['--tag-dark-unselected-bg'] = dark.unselected.background;
        if (dark.unselected.text) styles['--tag-dark-unselected-text'] = dark.unselected.text;
        if (dark.unselected.border) styles['--tag-dark-unselected-border'] = dark.unselected.border;
        if (dark.unselected.hoverBackground) styles['--tag-dark-unselected-hover-bg'] = dark.unselected.hoverBackground;
        if (dark.unselected.hoverBorder) styles['--tag-dark-unselected-hover-border'] = dark.unselected.hoverBorder;
      }
      
      if (dark.all) {
        if (dark.all.background) styles['--tag-dark-all-bg'] = dark.all.background;
        if (dark.all.text) styles['--tag-dark-all-text'] = dark.all.text;
        if (dark.all.border) styles['--tag-dark-all-border'] = dark.all.border;
        if (dark.all.hoverBackground) styles['--tag-dark-all-hover-bg'] = dark.all.hoverBackground;
        if (dark.all.hoverBorder) styles['--tag-dark-all-hover-border'] = dark.all.hoverBorder;
      }
    }
    
    return styles;
  };

  const customColorStyles = generateCustomColorStyles();
  
  // Combine theme class with existing styles
  const combinedStyle = {
    ...style,
    ...customColorStyles
  };
  
  const combinedClassName = theme ? (className ? `${className} ${theme}` : theme) : className;

  return (
    <TagSelectorProvider config={config} langOverride={langOverride} i18nOrder={i18nOrder}>
      <div id={id} className={combinedClassName} style={combinedStyle}>
        {error ? (
          <div 
            className="text-red-500 text-sm p-2"
            data-testid="tag-selector-error"
          >
            Error: {error}
          </div>
        ) : (
          <TagSelectorViewInternal
            className={className}
            tags={resolvedTags}
            selectedTags={selectedTags}
            onSelectionChange={directCallback}
            allLabel={allLabel}
            allowMultiple={allowMultiple}
            allowAll={allowAll}
            requireSelection={requireSelection}
            size={size}
            disabled={disabled || isLoading}
            isLoading={isLoading}
          />
        )}
      </div>
    </TagSelectorProvider>
  );
};