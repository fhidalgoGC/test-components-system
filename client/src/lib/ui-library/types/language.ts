// Language system types for the UI library

export interface MultiLanguageLabel {
  [languageCode: string]: string;
  default: string; // Required fallback
}

// Individual tag state colors interface
export interface TagStateColors {
  background?: string;        // Fill color
  text?: string;             // Text color
  border?: string;           // Border color
  hoverBackground?: string;  // Fill color on hover
  hoverBorder?: string;      // Border color on hover
}

// Tag metadata for individual customization per tag
export interface TagMetadata {
  colors?: {
    light?: {
      selected?: TagStateColors;   // Colors when selected
      unselected?: TagStateColors; // Colors when unselected
    };
    dark?: {
      selected?: TagStateColors;   // Colors when selected (dark theme)
      unselected?: TagStateColors; // Colors when unselected (dark theme)
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