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
  getTagsFunction,
  tags, // TagItem[] or async function
  selectedTags, 
  onSelectionChange, 
  allowMultiple, 
  allowAll, 
  config, 
  size, 
  disabled, 
  langOverride, 
  i18nOrder,
  allLabel,
  defaultLabel,
  defaultTagLabels
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
      if (getTagsFunction) {
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
      } else if (tags) {
        // Tags are already TagItem[] format
        if (!cancelled) {
          setResolvedTags(tags);
        }
      }
    };

    loadTags();
    
    return () => {
      cancelled = true;
    };
  }, [getTagsFunction, tags, languageContext?.currentLanguage]);

  // Tags are already in the correct TagItem[] format

  return (
    <TagSelectorProvider config={config} langOverride={langOverride} i18nOrder={i18nOrder}>
      <div id={id} style={style}>
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
export type { TagItem, MultiLanguageLabel, TagsFunction } from '../types/language';