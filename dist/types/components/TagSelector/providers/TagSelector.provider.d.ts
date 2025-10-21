import React from 'react';
import type { ReactNode } from 'react';
import type { TagSelectorContext } from '../types';
import type { VisibilityConfig } from '../../../types/shared.types';
export declare function useTagSelectorContext(): TagSelectorContext;
export declare const TagSelectorProvider: React.FC<{
    children: ReactNode;
    config?: VisibilityConfig;
    langOverride?: string;
    i18nOrder?: 'global-first' | 'local-first';
}>;
//# sourceMappingURL=TagSelector.provider.d.ts.map