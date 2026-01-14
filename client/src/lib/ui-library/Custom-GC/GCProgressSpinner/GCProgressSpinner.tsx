import { useMemo } from 'react';
import { GCProgressSpinnerProps } from './GCProgressSpinnerProps';
import './GCProgressSpinner.scss';

const SIZE_CONFIG = {
  tiny: { size: 16, stroke: 4 },
  small: { size: 20, stroke: 4 },
  medium: { size: 40, stroke: 6 },
  large: { size: 64, stroke: 8 },
  'extra-large': { size: 96, stroke: 12 }
};

export function GCProgressSpinner({
  mode = 'indeterminate',
  size = 'medium',
  color = 'brand',
  tone = 'default',
  value = 0,
  className = '',
  'data-testid': dataTestId
}: GCProgressSpinnerProps) {
  
  const sizeConfig = SIZE_CONFIG[size];
  const radius = (sizeConfig.size - sizeConfig.stroke) / 2;
  const circumference = radius * 2 * Math.PI;
  
  const getColorClass = useMemo(() => {
    if (color === 'black' || color === 'white') {
      return `gc-progress-spinner--${color}`;
    }
    return `gc-progress-spinner--${color}-${tone}`;
  }, [color, tone]);
  
  const getStrokeDasharray = useMemo(() => {
    if (mode === 'indeterminate') {
      return undefined;
    }
    const progress = Math.min(Math.max(value || 0, 0), 100);
    const offset = circumference - (progress / 100) * circumference;
    return `${circumference} ${circumference}`;
  }, [mode, value, circumference]);
  
  const getStrokeDashoffset = useMemo(() => {
    if (mode === 'indeterminate') {
      return undefined;
    }
    const progress = Math.min(Math.max(value || 0, 0), 100);
    return circumference - (progress / 100) * circumference;
  }, [mode, value, circumference]);
  
  const classes = [
    'gc-progress-spinner',
    `gc-progress-spinner--${size}`,
    getColorClass,
    mode === 'indeterminate' ? 'gc-progress-spinner--indeterminate' : '',
    className
  ].filter(Boolean).join(' ');
  
  return (
    <div 
      className={classes}
      data-testid={dataTestId}
      role="progressbar"
      aria-valuemin={mode === 'determinate' ? 0 : undefined}
      aria-valuemax={mode === 'determinate' ? 100 : undefined}
      aria-valuenow={mode === 'determinate' ? value : undefined}
    >
      <svg
        className="gc-progress-spinner__svg"
        width={sizeConfig.size}
        height={sizeConfig.size}
        viewBox={`0 0 ${sizeConfig.size} ${sizeConfig.size}`}
      >
        {/* Background track */}
        <circle
          className="gc-progress-spinner__track"
          cx={sizeConfig.size / 2}
          cy={sizeConfig.size / 2}
          r={radius}
        />
        
        {/* Progress circle */}
        <circle
          className="gc-progress-spinner__progress"
          cx={sizeConfig.size / 2}
          cy={sizeConfig.size / 2}
          r={radius}
          strokeDasharray={getStrokeDasharray}
          strokeDashoffset={getStrokeDashoffset}
        />
      </svg>
    </div>
  );
}