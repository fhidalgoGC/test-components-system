import { type TranslationOrder } from '../../../utils';
export declare function useI18nMerge(langOverride?: string, opts?: {
    order?: TranslationOrder;
}): {
    lang: string;
    t: (key: string, params?: Record<string, string | number>) => string;
};
//# sourceMappingURL=useI18nMerge.hook.d.ts.map