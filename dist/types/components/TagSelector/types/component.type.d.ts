import type { CSSProperties } from 'react';
import type { VisibilityConfig, Device, Orientation } from '../../../types/shared.types';
import type { TagItem, TagsFunction, TagMetadata } from './tag-selector.type';
import type { MultiLanguageLabel } from '../../../types/language.types';
export type TagSelectorSize = 'sm' | 'md' | 'lg' | 'tam-1' | 'tam-2' | 'tam-3' | 'tam-4' | 'tam-5' | 'tam-6' | 'tam-7' | 'tam-8' | 'tam-9' | 'tam-10' | 'tam-11' | 'tam-12';
export interface SelectedTagItem {
    id: string;
    label: MultiLanguageLabel;
    metadata?: TagMetadata;
}
export type SelectionCallback = (selectedTags: TagItem[]) => void;
export interface TagThemeColors {
    selected?: {
        background?: string;
        text?: string;
        border?: string;
        hoverBackground?: string;
        hoverBorder?: string;
        hoverText?: string;
    };
    unselected?: {
        background?: string;
        text?: string;
        border?: string;
        hoverBackground?: string;
        hoverBorder?: string;
        hoverText?: string;
    };
    all?: {
        background?: string;
        text?: string;
        border?: string;
        hoverBackground?: string;
        hoverBorder?: string;
        hoverText?: string;
    };
}
export interface TagCustomColors {
    light?: TagThemeColors;
    dark?: TagThemeColors;
}
export interface TagSelectorProps {
    id?: string;
    className?: string;
    chipClassName?: string;
    style?: CSSProperties;
    getTagsFunction: TagsFunction;
    selectedTags: string[];
    onSelectionChange: SelectionCallback;
    allLabel?: MultiLanguageLabel;
    defaultSelectedTags?: string[];
    allowMultiple?: boolean;
    allowAll?: boolean;
    requireSelection?: boolean;
    config?: VisibilityConfig;
    size?: TagSelectorSize;
    disabled?: boolean;
    langOverride?: string;
    i18nOrder?: 'global-first' | 'local-first';
    theme?: string;
    customColors?: TagCustomColors;
}
export interface TagSelectorContext {
    theme: 'light' | 'dark';
    t: (key: string, params?: Record<string, string | number>) => string;
    visibilityConfig?: VisibilityConfig;
    isVisible: boolean;
    device: Device;
    orientation: Orientation;
    width: number;
}
//# sourceMappingURL=component.type.d.ts.map