import { environment } from '../../enviorments/enviroment';
export type LanguageConfig = {
    locale: string;
    dateFormat: string;
    twoDigits: boolean;
};
export type LibraryConfig = typeof environment;
export type ConfigPriority = "parent" | "library" | "auto";
export interface ConfigProviderProps {
    children: React.ReactNode;
    parentConfig?: Record<string, any>;
    priority?: ConfigPriority;
    enableOverrides?: boolean;
}
export interface ConfigContextType {
    config: LibraryConfig;
    updateConfig: (newConfig: Record<string, any>) => void;
    resetConfig: () => void;
    priority: ConfigPriority;
}
//# sourceMappingURL=index.types.d.ts.map