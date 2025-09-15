import React from 'react';
import { useButtonContext } from '../provider';
import styles, { classes } from '../Button.module';

export const ButtonView: React.FC<{
  className?: string;
  titleKey?: string;
  children?: React.ReactNode;
  intent?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
}> = ({ className, titleKey = 'primary', children, intent = 'primary', size = 'md', disabled, onClick }) => {
  const { theme, t, isVisible } = useButtonContext();

  return (
    <button
      className={classes(theme, isVisible, intent, size, className)}
      aria-hidden={!isVisible}
      disabled={disabled}
      onClick={onClick}
      data-testid={`button-${intent}`}
    >
      {children ?? t(titleKey)}
    </button>
  );
};
