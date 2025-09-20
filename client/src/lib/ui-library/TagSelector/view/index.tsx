import React from 'react';
import { useTagSelectorContext } from '../provider';
import { containerClasses, chipClasses } from '../css/TagSelector.module';
import type { SelectedTagItem, TagSelectorSize } from '../types';
import type { TagItem } from '../../types/language';
import type { MultiLanguageLabel } from '../../types/language';
import { useLanguage } from '../../context/LanguageContext';

export const TagSelectorView: React.FC<{
  className?: string;
  tags: TagItem[]; // Now uses TagItem[] directly
  selectedTags: string[];
  onSelectionChange: (selectedTags: TagItem[]) => void; // Returns TagItem[] directly
  allowMultiple?: boolean;
  allowAll?: boolean;
  requireSelection?: boolean;
  size?: TagSelectorSize;
  disabled?: boolean;
  isLoading?: boolean;
  allLabel?: MultiLanguageLabel;
  defaultLabel?: MultiLanguageLabel;
  defaultTagLabels?: MultiLanguageLabel;
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
  allLabel,
  defaultLabel,
  defaultTagLabels
}) => {
  const { theme, t, isVisible } = useTagSelectorContext();
  const languageContext = useLanguage();

  // Helper function to resolve multilanguage labels
  const resolveLabel = (label: MultiLanguageLabel): string => {
    if (!languageContext) return label.default;
    return languageContext.resolveLabel(label);
  };

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
      // Check if requireSelection prevents clearing all tags
      if (requireSelection && selectedTags.length > 0) {
        return; // Don't allow clearing if requireSelection is active
      }
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
      if (isSelected) {
        // Check if requireSelection prevents deselecting the last tag
        if (requireSelection && selectedTags.length === 1) {
          return; // Don't allow deselecting the last tag if requireSelection is active
        }
        // Remove from selection - convert remaining IDs to TagItem format
        const remaining = selectedTags.filter(id => id !== tagId);
        onSelectionChange(idsToTagItems(remaining));
      } else {
        // Add to selection - convert all IDs to TagItem format
        const newSelection = [...selectedTags, tagId];
        onSelectionChange(idsToTagItems(newSelection));
      }
    } else {
      // Single selection mode
      const isSelected = selectedTags.includes(tagId);
      if (isSelected) {
        // Check if requireSelection prevents deselecting in single mode
        if (requireSelection) {
          return; // Don't allow deselecting if requireSelection is active in single mode
        }
        onSelectionChange([]); // Deselect if already selected
      } else {
        const selectedItem = findTagById(tagId);
        onSelectionChange(selectedItem ? [selectedItem] : []); // Select only this tag
      }
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
      {/* Default chip - shows when no selection and defaultLabel is provided */}
      {defaultLabel && hasNoSelection && tags.length > 0 && (
        <button
          className={chipClasses(theme, isVisible, true, size, false)}
          onClick={handleDefaultClick}
          disabled={disabled}
          data-testid="tag-default"
        >
          {resolveLabel(defaultLabel)}
        </button>
      )}
      
      {allowAll && tags.length > 0 && (
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
        const tagStyles = hasMetadataColors ? getCombinedTagStyles(tag, isSelected) : {};
        
        return (
          <button
            key={tag.id}
            className={chipClasses(theme, isVisible, isSelected, size, false)}
            style={tagStyles}
            onClick={() => handleTagClick(tag.id)}
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