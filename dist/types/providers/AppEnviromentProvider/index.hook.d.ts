import { ConfigContextType, LibraryConfig, ConfigPriority } from './index.types';
export declare const ConfigContext: import("react").Context<ConfigContextType | undefined>;
export declare function useConfig(): ConfigContextType;
export declare function useConfigValue<K extends keyof LibraryConfig>(key: K, fallback?: LibraryConfig[K]): LibraryConfig[K];
export declare function useConfigState(parentConfig: Partial<LibraryConfig>, priority: ConfigPriority, enableOverrides: boolean): {
    config: {
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
    };
    setConfig: import("react").Dispatch<import("react").SetStateAction<{
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
    }>>;
};
export declare function useConfigHandlers(setConfig: React.Dispatch<React.SetStateAction<LibraryConfig>>, parentConfig: Partial<LibraryConfig>, priority: ConfigPriority, enableOverrides: boolean): {
    updateConfig: (newConfig: Partial<LibraryConfig>) => void;
    resetConfig: () => void;
};
//# sourceMappingURL=index.hook.d.ts.map