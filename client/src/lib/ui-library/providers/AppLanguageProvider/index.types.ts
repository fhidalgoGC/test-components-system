export type AppLanguage = string;

export type LanguageConfig = {
  locale: string;
  dateFormat: string;
  twoDigits: boolean;
};

export type AppLanguageContextValue = {
  lang: AppLanguage;
  setLang: (next: AppLanguage) => void;
  dateFormat: string;
  twoDigits: boolean;
  config: LanguageConfig;
  availableLanguages: string[];
};

export type AppLanguageProviderProps = {
  initial?: AppLanguage;
  children: React.ReactNode;
};
