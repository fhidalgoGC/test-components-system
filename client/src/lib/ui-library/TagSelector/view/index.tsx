import React from 'react';
import { useTagSelectorContext } from '../provider';
import { containerClasses, chipClasses } from '../css/TagSelector.module';
import type { Tag } from '../types';

export const TagSelectorView: React.FC<{
  className?: string;
  tags: Tag[];
  selectedTags: string[];
  onSelectionChange: (selectedTags: string[]) => void;
  allowMultiple?: boolean;
  allowAll?: boolean;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}> = ({ 
  className, 
  tags, 
  selectedTags, 
  onSelectionChange, 
  allowMultiple = true, 
  allowAll = true, 
  size = 'md', 
  disabled = false 
}) => {
  const { theme, t, isVisible } = useTagSelectorContext();

  const handleAllClick = () => {
    if (disabled) return;
    
    // If all tags are selected, clear selection; otherwise select all
    const allSelected = tags.length > 0 && tags.every(tag => selectedTags.includes(tag.id));
    if (allSelected) {
      onSelectionChange([]);
    } else {
      onSelectionChange(tags.map(tag => tag.id));
    }
  };

  const handleTagClick = (tagId: string) => {
    if (disabled) return;
    
    if (allowMultiple) {
      const isSelected = selectedTags.includes(tagId);
      if (isSelected) {
        onSelectionChange(selectedTags.filter(id => id !== tagId));
      } else {
        onSelectionChange([...selectedTags, tagId]);
      }
    } else {
      // Single selection mode
      const isSelected = selectedTags.includes(tagId);
      if (isSelected) {
        onSelectionChange([]); // Deselect if already selected
      } else {
        onSelectionChange([tagId]); // Select only this tag
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
          className={chipClasses(theme, isVisible, allSelected, size, true)}
          onClick={handleAllClick}
          disabled={disabled}
          data-testid="tag-all"
        >
          {t('all')}
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
      
      {tags.length === 0 && (
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