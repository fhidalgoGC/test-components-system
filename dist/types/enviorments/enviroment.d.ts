import type { LanguageConfig } from "./enviroment.types";
export declare const SESSION_CONFIG: {
    SESSION_DURATION: number;
    VALIDATION_INTERVAL: number;
};
export declare const environment: {
    AVAILABLE_LANGUAGES: string[];
    DEFAULT_LANGUAGE: string;
    LANGUAGE_CONFIG: Record<string, LanguageConfig>;
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
export declare const APP_CONFIG: {
    AVAILABLE_LANGUAGES: string[];
    DEFAULT_LANGUAGE: string;
    LANGUAGE_CONFIG: Record<string, LanguageConfig>;
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
//# sourceMappingURL=enviroment.d.ts.map