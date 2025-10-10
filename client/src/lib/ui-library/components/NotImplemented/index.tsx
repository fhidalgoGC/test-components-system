interface NotImplementedProps {
  platform?: 'Web' | 'Mobile';
  componentName?: string;
  className?: string;
}

export const NotImplemented = ({ 
  platform = 'Web',
  componentName = 'Component',
  className = ''
}: NotImplementedProps) => {
  return (
    <div 
      className={`flex items-center justify-center p-8 ${className}`}
      data-testid="not-implemented"
    >
      <div className="text-center">
        <div className="text-muted-foreground text-lg mb-2">
          {platform} version not implemented yet
        </div>
        <div className="text-sm text-muted-foreground/60">
          {componentName} - {platform.toLowerCase()}
        </div>
      </div>
    </div>
  );
};
