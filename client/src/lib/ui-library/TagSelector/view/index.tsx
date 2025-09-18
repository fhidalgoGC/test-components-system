import React from 'react';
import { useTagSelectorContext } from '../provider';
import { containerClasses, chipClasses } from '../css/TagSelector.module';
import type { Tag, SelectedTagItem } from '../types';
import type { MultiLanguageLabel } from '../../types/language';
import { useLanguage } from '../../context/LanguageContext';

export const TagSelectorView: React.FC<{
  className?: string;
  tags: Tag[];
  selectedTags: string[];
  onSelectionChange: (selectedTags: SelectedTagItem[]) => void;
  allowMultiple?: boolean;
  allowAll?: boolean;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  isLoading?: boolean;
  allLabel?: MultiLanguageLabel;
  defaultLabel?: MultiLanguageLabel;
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
  defaultLabel
}) => {
  const { theme, t, isVisible } = useTagSelectorContext();
  const languageContext = useLanguage();

  // Helper function to resolve multilanguage labels
  const resolveLabel = (label: MultiLanguageLabel): string => {
    if (!languageContext) return label.default;
    return languageContext.resolveLabel(label);
  };

  // Get current language for the callback
  const currentLanguage = languageContext?.currentLanguage || 'default';

  const handleAllClick = () => {
    if (disabled) return;
    
    // If all tags are selected, clear selection; otherwise select all
    const allSelected = tags.length > 0 && tags.every(tag => selectedTags.includes(tag.id));
    if (allSelected) {
      onSelectionChange([]);
    } else {
      // Return SelectedTagItem[] format with current language
      onSelectionChange(tags.map(tag => ({ id: tag.id, language: currentLanguage })));
    }
  };

  const handleTagClick = (tagId: string) => {
    if (disabled) return;
    
    if (allowMultiple) {
      const isSelected = selectedTags.includes(tagId);
      if (isSelected) {
        // Remove from selection - convert remaining IDs to SelectedTagItem format
        const remaining = selectedTags.filter(id => id !== tagId);
        onSelectionChange(remaining.map(id => ({ id, language: currentLanguage })));
      } else {
        // Add to selection - convert all IDs to SelectedTagItem format
        const newSelection = [...selectedTags, tagId];
        onSelectionChange(newSelection.map(id => ({ id, language: currentLanguage })));
      }
    } else {
      // Single selection mode
      const isSelected = selectedTags.includes(tagId);
      if (isSelected) {
        onSelectionChange([]); // Deselect if already selected
      } else {
        onSelectionChange([{ id: tagId, language: currentLanguage }]); // Select only this tag
      }
    }
  };

  const allSelected = tags.length > 0 && tags.every(tag => selectedTags.includes(tag.id));

  return (
    <div 
      className={containerClasses(theme, isVisible, className)}
      data-testid="tag-selector-container"
    >
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
            {tag.label}
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