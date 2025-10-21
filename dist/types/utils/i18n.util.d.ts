export type TranslationOrder = 'global-first' | 'local-first';
export declare function interpolate(template: string, params?: Record<string, string | number>): string;
export declare function makeTranslator(local?: Record<string, string>, global?: Record<string, string>, order?: TranslationOrder): (key: string, params?: Record<string, string | number>) => string;
//# sourceMappingURL=i18n.util.d.ts.map