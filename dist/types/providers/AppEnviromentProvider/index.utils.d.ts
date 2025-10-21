import { LibraryConfig, ConfigPriority } from './index.types';
export declare const defaultLibraryConfig: LibraryConfig;
declare let globalConfig: LibraryConfig;
export declare function mergeConfigs(libraryConfig: LibraryConfig, parentConfig?: Record<string, any>, priority?: ConfigPriority): LibraryConfig;
export declare function getConfig(): LibraryConfig;
export declare function getConfigValue<K extends keyof LibraryConfig>(key: K): LibraryConfig[K];
export declare function updateGlobalConfig(newConfig: Record<string, any>): void;
export declare function resetGlobalConfig(): void;
export declare const config: {
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
export { globalConfig as APP_CONFIG };
//# sourceMappingURL=index.utils.d.ts.map