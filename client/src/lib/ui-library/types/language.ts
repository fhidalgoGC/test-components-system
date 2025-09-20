// Language system types for the UI library

export interface MultiLanguageLabel {
  [languageCode: string]: string;
  default: string; // Required fallback
}

// Tag metadata for individual customization per tag
export interface TagMetadata {
  colors?: {
    light?: {
      selected?: {
        background?: string;        // Fill color when selected
        text?: string;             // Text color when selected
        border?: string;           // Border color when selected
        hoverBackground?: string;  // Fill color when selected + hover
        hoverBorder?: string;      // Border color when selected + hover
      };
      unselected?: {
        background?: string;        // Fill color when unselected
        text?: string;             // Text color when unselected
        border?: string;           // Border color when unselected
        hoverBackground?: string;  // Fill color when unselected + hover
        hoverBorder?: string;      // Border color when unselected + hover
      };
    };
    dark?: {
      selected?: {
        background?: string;        // Fill color when selected (dark theme)
        text?: string;             // Text color when selected (dark theme)
        border?: string;           // Border color when selected (dark theme)
        hoverBackground?: string;  // Fill color when selected + hover (dark theme)
        hoverBorder?: string;      // Border color when selected + hover (dark theme)
      };
      unselected?: {
        background?: string;        // Fill color when unselected (dark theme)
        text?: string;             // Text color when unselected (dark theme)
        border?: string;           // Border color when unselected (dark theme)
        hoverBackground?: string;  // Fill color when unselected + hover (dark theme)
        hoverBorder?: string;      // Border color when unselected + hover (dark theme)
      };
    };
  };
}

export interface TagItem {
  id: string;
  label: MultiLanguageLabel;
  metadata?: TagMetadata; // Optional individual tag customization
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