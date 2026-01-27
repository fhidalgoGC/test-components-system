import type { CSSProperties } from 'react';

export type TextWrapMode = 'break-word' | 'truncate';

export interface TextCellProps {
  text: string | number;
  style?: CSSProperties;
  className?: string;
  width?: number | string;
  textWrap?: TextWrapMode;
}

const defaultStyle: CSSProperties = {
  display: 'inline-block',
  width: 80,
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

export function TextCell({ text, style, className, width, textWrap = 'break-word' }: TextCellProps) {
  const mergedStyle: CSSProperties = {
    ...defaultStyle,
    ...textWrapStyles[textWrap],
    ...style,
    ...(width !== undefined ? { width } : {}),
  };

  return (
    <span style={mergedStyle} className={className}>
      {text}
    </span>
  );
}
