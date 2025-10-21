export interface TagStateColors {
    background?: string;
    text?: string;
    border?: string;
    hoverBackground?: string;
    hoverBorder?: string;
    hoverText?: string;
}
export interface TagMetadata {
    colors?: {
        light?: {
            selected?: TagStateColors;
            unselected?: TagStateColors;
        };
        dark?: {
            selected?: TagStateColors;
            unselected?: TagStateColors;
        };
    };
    sizing?: {
        paddingX?: string;
        paddingY?: string;
        fontSize?: string;
        minWidth?: string;
        height?: string;
    };
}
import type { MultiLanguageLabel } from '../../../types/language.types';
export interface TagItem {
    id: string;
    label: MultiLanguageLabel;
    metadata?: TagMetadata;
}
export type TagsFunction = () => Promise<TagItem[]>;
//# sourceMappingURL=tag-selector.type.d.ts.map