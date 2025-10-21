import type { LibI18nContextValue, Lang, GlobalTranslationPath } from './index.types';
import type { GenericLanguageProvider } from '../../types/language.types';
export declare const LibI18nContext: import("react").Context<LibI18nContextValue | undefined>;
export declare function useLibI18n(): LibI18nContextValue;
export declare function useParentLanguageInjection(parentProvider: GenericLanguageProvider | null): {
    parentLanguageProvider: GenericLanguageProvider;
} | {
    parentLanguageProvider?: undefined;
};
export declare function useOptionalConfig(): {
    AVAILABLE_LANGUAGES: string[];
    DEFAULT_LANGUAGE: string;
    LANGUAGE_CONFIG: Record<string, import("../..").LanguageConfig>;
    NUMBER_FORMAT_CONFIG: {
        NUMBER_FORMAT_PATTERN: "0,000.00";
        NUMBER_ROUND_MODE: "truncate";
        NUMBER_LOCATE: string;
        NUMBER_MIN_DECIMALS: number;
        NUMBER_MAX_DECIMALS: number;
    };
    SESSION_CONFIG: {
        SESSION_DURATION: number;
        VALIDATION_INTERVAL: number;
    };
    IS_DEVELOPMENT: boolean;
} | null;
export declare function useEffectiveLanguage(language: Lang | undefined, parentLanguageProvider: GenericLanguageProvider | undefined): {
    effectiveLang: Lang;
    internal: Lang;
    setInternal: import("react").Dispatch<import("react").SetStateAction<Lang>>;
};
export declare function useTranslationLoader(globalTranslationPaths: GlobalTranslationPath[]): Record<string, Record<string, any>>;
export declare function useTranslator(loadedTranslations: Record<string, Record<string, any>>, effectiveLang: Lang, translationPriority: 'component-first' | 'external-first'): {
    t: (key: string, params?: Record<string, string | number>) => string;
    getExternalTranslations: () => Record<string, string>;
    processedGlobalTranslations: Record<string, string>;
};
export declare function useLanguageHandlers(effectiveLang: Lang, setInternal: (lang: Lang) => void, parentLanguageProvider: GenericLanguageProvider | undefined, onLanguageChange: ((next: Lang) => void) | undefined): {
    setLanguage: (next: Lang) => void;
    resolveLabel: (label: {
        [key: string]: string;
        default: string;
    }) => string;
};
//# sourceMappingURL=index.hook.d.ts.map