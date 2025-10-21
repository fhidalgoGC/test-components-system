import type { AppLanguage, AppLanguageContextValue, LanguageConfig } from './index.types';
export declare const AppLanguageContext: import("react").Context<AppLanguageContextValue | undefined>;
export declare function useAppLanguage(): AppLanguageContextValue | undefined;
export declare function useValidatedLanguage(initial?: AppLanguage): {
    lang: string;
    setValidatedLang: (nextLang: AppLanguage) => void;
};
export declare function useLanguageConfig(lang: AppLanguage): {
    dateFormat: string;
    twoDigits: boolean;
    config: LanguageConfig;
    availableLanguages: string[];
};
//# sourceMappingURL=index.hook.d.ts.map