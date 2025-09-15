import React from 'react';
import type { TagSelectorProps } from './types';
import { TagSelectorProvider } from './provider';
import { TagSelectorView } from './view';

const TagSelector: React.FC<TagSelectorProps> = ({
  id, className, style, tags, selectedTags, onSelectionChange, allowMultiple, allowAll, config, size, disabled, langOverride, i18nOrder
}) => {
  return (
    <TagSelectorProvider config={config} langOverride={langOverride} i18nOrder={i18nOrder}>
      <div id={id} style={style}>
        <TagSelectorView
          className={className}
          tags={tags}
          selectedTags={selectedTags}
          onSelectionChange={onSelectionChange}
          allowMultiple={allowMultiple}
          allowAll={allowAll}
          size={size}
          disabled={disabled}
        />
      </div>
    </TagSelectorProvider>
  );
};

export default TagSelector;
export * from './types';