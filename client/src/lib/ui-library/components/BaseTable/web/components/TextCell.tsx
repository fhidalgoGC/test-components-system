import type { CSSProperties } from 'react';

export interface TextCellProps {
  text: string | number;
  style?: CSSProperties;
  className?: string;
  width?: number | string;
}

const defaultStyle: CSSProperties = {
  display: 'inline-block',
  width: 80,
};

export function TextCell({ text, style, className, width }: TextCellProps) {
  const mergedStyle: CSSProperties = {
    ...defaultStyle,
    ...style,
    ...(width !== undefined ? { width } : {}),
  };

  return (
    <span style={mergedStyle} className={className}>
      {text}
    </span>
  );
}
