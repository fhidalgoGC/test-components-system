import type { CSSProperties, ReactNode } from 'react';

export type TextWrapMode = 'break-word' | 'truncate';

export interface HeaderCellProps {
  text: string | ReactNode;
  style?: CSSProperties;
  className?: string;
  width?: number | string;
  textWrap?: TextWrapMode;
  bold?: boolean;
}

const defaultStyle: CSSProperties = {
  display: 'inline-block',
};

const textWrapStyles: Record<TextWrapMode, CSSProperties> = {
  'break-word': {
    whiteSpace: 'normal',
    wordWrap: 'break-word',
    overflowWrap: 'break-word',
  },
  'truncate': {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
};

export function HeaderCell({ text, style, className, width, textWrap = 'truncate', bold = true }: HeaderCellProps) {
  const mergedStyle: CSSProperties = {
    ...defaultStyle,
    ...textWrapStyles[textWrap],
    ...(bold ? { fontWeight: 600 } : {}),
    ...style,
    ...(width !== undefined ? { width } : {}),
  };

  return (
    <span style={mergedStyle} className={className}>
      {text}
    </span>
  );
}
