export const codePreviewStyles = {
  codePreview: 'codePreview',
  codeContainer: 'codeContainer',
  codeBlock: 'codeBlock',
  header: 'header',
  title: 'title',
  description: 'description',
  content: 'content'
} as const;

export type CodePreviewStylesType = typeof codePreviewStyles;