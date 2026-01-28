import type { CSSProperties } from 'react';

export type TextWrapMode = 'break-word' | 'truncate';
export type HeightMode = 'fixed' | 'auto';

export interface TextCellProps {
  text: string | number;
  style?: CSSProperties;
  className?: string;
  width?: number | string;
  height?: number | string;
  heightMode?: HeightMode;
  textWrap?: TextWrapMode;
}

const MIN_HEIGHT = 20;

const defaultStyle: CSSProperties = {
  display: 'inline-block',
  width: 80,
  minHeight: MIN_HEIGHT,
  backgroundColor: '#d4edda', // TEMP: verde claro para visualizar
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

export function TextCell({ text, style, className, width, height, heightMode = 'auto', textWrap = 'break-word' }: TextCellProps) {
  const heightStyles: CSSProperties = {};
  
  if (height !== undefined) {
    if (heightMode === 'fixed') {
      heightStyles.height = height;
      heightStyles.overflow = 'hidden';
    } else {
      heightStyles.minHeight = height;
    }
  }

  const mergedStyle: CSSProperties = {
    ...defaultStyle,
    ...textWrapStyles[textWrap],
    ...heightStyles,
    ...style,
    ...(width !== undefined ? { width } : {}),
  };

  return (
    <span style={mergedStyle} className={className}>
      {text}
    </span>
  );
}
