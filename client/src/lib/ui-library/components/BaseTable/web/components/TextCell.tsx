import type { CSSProperties } from 'react';

export interface TextCellProps {
  text: string | number;
  style?: CSSProperties;
  className?: string;
}

export function TextCell({ text, style, className }: TextCellProps) {
  return (
    <span style={style} className={className}>
      {text}
    </span>
  );
}
