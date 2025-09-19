export interface CodeProp {
  name: string;
  value: string;
  comment?: string;
}

export interface CodePreviewProps {
  componentName: string;
  props: CodeProp[];
  titleKey?: string;
  descriptionKey?: string;
  title?: string;
  description?: string;
  className?: string;
}

export interface CodePreviewState {
  isCodeVisible: boolean;
  isLoaded: boolean;
}

export interface CodePreviewConfig {
  showLineNumbers?: boolean;
  enableCopy?: boolean;
  highlightSyntax?: boolean;
}