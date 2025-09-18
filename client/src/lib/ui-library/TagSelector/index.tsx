import React, { useState, useEffect, useContext } from 'react';
import type { TagSelectorProps, SelectedTagItem, LegacySelectionCallback, NewSelectionCallback } from './types';
import type { TagItem } from '../types/language';
import { TagSelectorProvider } from './provider';
import { TagSelectorView } from './view';
import LanguageContext from '../context/LanguageContext';

const TagSelector: React.FC<TagSelectorProps> = ({
  id, 
  className, 
  style, 
  getTagsFunction,
  tags, // legacy prop
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
  defaultTagLabels,
  useNewSelectionFormat = false // Default to legacy format for backward compatibility
}) => {
  const [resolvedTags, setResolvedTags] = useState<TagItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // Get language context directly, null if not wrapped in LanguageProvider
  const languageContext = useContext(LanguageContext);

  // Create TRUE backward-compatible callback adapter
  const adaptedCallback = (items: SelectedTagItem[]) => {
    if (useNewSelectionFormat) {
      // NEW FORMAT: Pass full SelectedTagItem[] with {id, language}
      (onSelectionChange as NewSelectionCallback)(items);
    } else {
      // LEGACY FORMAT: Extract IDs only for backward compatibility
      const ids = items.map(item => item.id);
      (onSelectionChange as LegacySelectionCallback)(ids);
    }
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
        // Convert legacy tags to new format
        const legacyTagsConverted: TagItem[] = tags.map(tag => ({
          id: tag.id,
          label: {
            default: tag.label,
            [languageContext?.currentLanguage || 'en']: tag.label
          }
        }));
        if (!cancelled) {
          setResolvedTags(legacyTagsConverted);
        }
      }
    };

    loadTags();
    
    return () => {
      cancelled = true;
    };
  }, [getTagsFunction, tags, languageContext?.currentLanguage]);

  // Convert TagItem[] to legacy Tag[] format for the view
  const legacyFormattedTags = resolvedTags.map(item => ({
    id: item.id,
    label: languageContext ? languageContext.resolveLabel(item.label) : item.label.default
  }));

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
            tags={legacyFormattedTags}
            selectedTags={selectedTags}
            onSelectionChange={adaptedCallback}
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