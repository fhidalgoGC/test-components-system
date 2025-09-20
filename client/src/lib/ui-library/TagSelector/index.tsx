import React, { useState, useEffect, useContext } from 'react';
import type { TagSelectorProps, SelectedTagItem } from './types';
import type { TagItem } from '../types/language';
import { TagSelectorProvider } from './provider';
import { TagSelectorView } from './view';
import LanguageContext from '../context/LanguageContext';

const TagSelector: React.FC<TagSelectorProps> = ({
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
  defaultLabel,
  defaultTagLabels,
  theme,
  customColors
}) => {
  const [resolvedTags, setResolvedTags] = useState<TagItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // Get language context directly, null if not wrapped in LanguageProvider
  const languageContext = useContext(LanguageContext);

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
  }, [getTagsFunction, languageContext?.currentLanguage]);

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
          <TagSelectorView
            className={className}
            tags={resolvedTags}
            selectedTags={selectedTags}
            onSelectionChange={directCallback}
            allLabel={allLabel}
            defaultLabel={defaultLabel}
            defaultTagLabels={defaultTagLabels}
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

export default TagSelector;
export * from './types';
export { LanguageProvider, useLanguage } from '../context/LanguageContext';
export type { TagItem, MultiLanguageLabel, TagsFunction, TagMetadata, TagStateColors } from '../types/language';
export type { TagSelectorSize } from './types/component';