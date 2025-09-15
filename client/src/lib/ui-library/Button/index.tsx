import React from 'react';
import type { ButtonProps } from './types';
import { ButtonProvider } from './provider';
import { ButtonView } from './view';

const Button: React.FC<ButtonProps> = ({
  id, className, style, titleKey, children, config, intent, size, disabled, onClick
}) => {
  return (
    <ButtonProvider config={config}>
      <div id={id} style={style}>
        <ButtonView
          className={className}
          titleKey={titleKey}
          intent={intent}
          size={size}
          disabled={disabled}
          onClick={onClick}
        >
          {children}
        </ButtonView>
      </div>
    </ButtonProvider>
  );
};

export default Button;
export * from './types';
