import React from 'react';
import { useTagSelectorContext } from '../provider';
import { containerClasses, chipClasses } from '../css/TagSelector.module';
import type { SelectedTagItem } from '../types';
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
  size?: 'sm' | 'md' | 'lg';
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
    // Clear selection when default chip is clicked
    onSelectionChange([]);
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
        return (
          <button
            key={tag.id}
            className={chipClasses(theme, isVisible, isSelected, size, false)}
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