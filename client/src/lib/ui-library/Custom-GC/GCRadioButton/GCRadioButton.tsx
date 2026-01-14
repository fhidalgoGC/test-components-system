import { useState, useId } from 'react';
import {
  GCRadioButtonProps,
  GCRadioButtonOption,
  GC_DEFAULT_COLOR,
  GC_DEFAULT_DIRECTION,
  GC_DEFAULT_KEEP_REGULAR_WEIGHT,
} from './GCRadioButtonProps';
import './GCRadioButton.scss';

const GCRadioButton = ({
  options = [],
  value,
  onChange,
  color = GC_DEFAULT_COLOR,
  disabled = false,
  name,
  keepRegularWeight = GC_DEFAULT_KEEP_REGULAR_WEIGHT,
  direction = GC_DEFAULT_DIRECTION,
  className = '',
  id,
  'data-testid': dataTestId = 'gc-radio-button'
}: GCRadioButtonProps) => {
  const generatedId = useId();
  const radioGroupId = id || generatedId;
  const radioGroupName = name || `gc-radio-${radioGroupId}`;

  const handleChange = (optionValue: string) => {
    if (disabled) return;
    onChange?.(optionValue);
  };

  const renderRadioOption = (option: GCRadioButtonOption, index: number) => {
    const isSelected = value === option.value;
    const isDisabled = disabled || option.disabled;
    const optionId = `${radioGroupId}-${index}`;
    
    const radioClasses = [
      'gc-radio-button__option',
      `gc-radio-button__option--${color}`,
      isSelected && 'gc-radio-button__option--selected',
      isDisabled && 'gc-radio-button__option--disabled',
    ].filter(Boolean).join(' ');

    const labelClasses = [
      'gc-radio-button__label',
      isSelected && !keepRegularWeight 
        ? 'gcc-ui-body-large-semibold' 
        : 'gcc-ui-body-large-regular',
      isDisabled && 'gc-radio-button__label--disabled',
    ].filter(Boolean).join(' ');

    return (
      <div 
        key={option.value}
        className={radioClasses}
        data-testid={option['data-testid'] || `${dataTestId}-option-${index}`}
        onClick={() => !isDisabled && handleChange(option.value)}
      >
        <input
          type="radio"
          id={optionId}
          name={radioGroupName}
          value={option.value}
          checked={isSelected}
          disabled={isDisabled}
          onChange={() => handleChange(option.value)}
          className="gc-radio-button__input"
          data-testid={`${dataTestId}-input-${index}`}
        />
        
        <div className="gc-radio-button__circle">
          <div className="gc-radio-button__circle-inner"></div>
        </div>
        
        <label 
          htmlFor={optionId}
          className={labelClasses}
        >
          {option.label}
        </label>
      </div>
    );
  };

  const containerClasses = [
    'gc-radio-button',
    `gc-radio-button--${direction}`,
    `gc-radio-button--${color}`,
    disabled && 'gc-radio-button--disabled',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div 
      className={containerClasses}
      id={radioGroupId}
      role="radiogroup"
      data-testid={dataTestId}
    >
      {options.map((option, index) => renderRadioOption(option, index))}
    </div>
  );
};

export default GCRadioButton;