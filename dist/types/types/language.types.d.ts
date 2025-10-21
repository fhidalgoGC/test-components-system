export interface MultiLanguageLabel {
    [languageCode: string]: string;
    default: string;
}
export interface LanguageContextValue {
    currentLanguage: string;
    setLanguage: (language: string) => void;
    resolveLabel: (label: MultiLanguageLabel) => string;
}
export interface LanguageProviderProps {
    children: React.ReactNode;
    defaultLanguage?: string;
}
export interface GenericLanguageProvider {
    lang: string;
    setLang: (lang: any) => void;
}
export declare function detectParentLanguageProvider(): GenericLanguageProvider | null;
//# sourceMappingURL=language.types.d.ts.map