// Language system types for the UI library

export interface MultiLanguageLabel {
  [languageCode: string]: string;
  default: string; // Required fallback
}

export interface TagItem {
  id: string;
  label: MultiLanguageLabel;
}

export type TagsFunction = () => Promise<TagItem[]>;

export interface LanguageContextValue {
  currentLanguage: string;
  setLanguage: (language: string) => void;
  resolveLabel: (label: MultiLanguageLabel) => string;
}

export interface LanguageProviderProps {
  children: React.ReactNode;
  defaultLanguage?: string;
}