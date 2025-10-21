import styles from './TagSelector.module.css';
import type { TagSelectorSize } from '../types';
export declare function containerClasses(theme: 'light' | 'dark', visible: boolean, extra?: string): string;
export declare function combineWithParentClasses(moduleClasses: string, parentClasses?: string): string;
export declare function chipClasses(theme: 'light' | 'dark', visible: boolean, selected: boolean, size: TagSelectorSize, isAll?: boolean, extra?: string, parentChipClasses?: string): string;
export default styles;
//# sourceMappingURL=TagSelector.module.d.ts.map