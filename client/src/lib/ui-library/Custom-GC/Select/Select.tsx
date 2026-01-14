import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Select as SelectPrimitive,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { Option, Label, SelectProps } from './types';

const getLocalizedText = (label: Label, language: string): string => {
  if (language === 'es' && label.es) return label.es;
  if (language === 'en' && label.en) return label.en;
  return label.default;
};

export const Select = ({
  required = false,
  getOptions,
  onSelect,
  validationLabel,
  placeholder,
  className,
  disabled = false,
  value,
  error: externalError,
  showError = false,
  testIdPrefix = "general-select",
}: SelectProps) => {
  const { i18n } = useTranslation();
  const [options, setOptions] = useState<Option[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const currentLanguage = i18n.language;

  // Cargar opciones
  useEffect(() => {
    const loadOptions = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedOptions = await getOptions();
        setOptions(fetchedOptions);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Error loading options';
        setError(errorMessage);
        setOptions([]);
      } finally {
        setLoading(false);
      }
    };

    loadOptions();
  }, [getOptions]);

  // Placeholder localizado
  const localizedPlaceholder = useMemo(() => {
    if (loading) return currentLanguage === 'es' ? 'Cargando...' : 'Loading...';
    if (error) return currentLanguage === 'es' ? 'Error cargando opciones' : 'Error loading options';
    if (!placeholder) return currentLanguage === 'es' ? 'Seleccionar una opción...' : 'Select an option...';
    return getLocalizedText(placeholder, currentLanguage);
  }, [placeholder, currentLanguage, loading, error]);

  // Validación - usa props externas o lógica interna
  const isValid = !required || (value !== undefined && value !== null && value !== '');
  const shouldShowError = showError || (externalError ? true : (required && submitted && !isValid));

  // Mensaje de error localizado
  const errorMessage = useMemo(() => {
    if (!shouldShowError) return '';
    // Usar error externo si está disponible, sino usar validationLabel
    if (externalError) return externalError;
    if (validationLabel) return getLocalizedText(validationLabel, currentLanguage);
    return '';
  }, [shouldShowError, externalError, validationLabel, currentLanguage]);

  // Manejar selección
  const handleValueChange = (selectedId: string) => {
    if (onSelect) {
      onSelect(selectedId);
    }
  };

  // Simular submit para mostrar validación (esto se activaría desde el form padre)
  useEffect(() => {
    const handleFormSubmit = () => {
      setSubmitted(true);
    };

    // En un caso real, esto vendría del contexto del formulario
    // Por ahora usamos un evento personalizado
    window.addEventListener('form-submit-validation', handleFormSubmit);
    
    return () => {
      window.removeEventListener('form-submit-validation', handleFormSubmit);
    };
  }, []);

  return (
    <div className={cn('space-y-1', className)}>
      <SelectPrimitive
        value={value?.toString() || ''}
        onValueChange={handleValueChange}
        disabled={disabled || loading}
      >
        <SelectTrigger
          className={cn(
            'w-full transition-colors',
            // Theming reactivo (dark/light)
            'bg-background text-foreground border-input',
            'hover:bg-accent hover:text-accent-foreground',
            'focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background',
            'data-[placeholder]:text-muted-foreground',
            // Estados de error
            shouldShowError && 'border-destructive focus:ring-destructive',
            // Estados de disabled
            disabled && 'opacity-50 cursor-not-allowed'
          )}
          aria-invalid={shouldShowError}
          aria-describedby={shouldShowError ? 'select-error' : undefined}
          aria-required={required}
          data-testid={`${testIdPrefix}-trigger`}
        >
          <SelectValue placeholder={localizedPlaceholder} />
        </SelectTrigger>
        
        <SelectContent
          className={cn(
            // Theming reactivo
            'bg-popover text-popover-foreground border-border',
            'shadow-md z-50'
          )}
        >
          {loading && (
            <SelectItem value="__loading__" disabled data-testid={`${testIdPrefix}-loading`}>
              {currentLanguage === 'es' ? 'Cargando...' : 'Loading...'}
            </SelectItem>
          )}
          
          {error && (
            <SelectItem value="__error__" disabled data-testid={`${testIdPrefix}-error`}>
              {currentLanguage === 'es' ? 'Error:' : 'Error:'} {error}
            </SelectItem>
          )}
          
          {!loading && !error && options.length === 0 && (
            <SelectItem value="__empty__" disabled data-testid={`${testIdPrefix}-empty`}>
              {currentLanguage === 'es' ? 'No hay opciones disponibles' : 'No options available'}
            </SelectItem>
          )}
          
          {!loading && !error && options.map((option) => (
            <SelectItem 
              key={option.id} 
              value={option.id.toString()}
              className={cn(
                // Theming reactivo para items
                'hover:bg-accent hover:text-accent-foreground',
                'focus:bg-accent focus:text-accent-foreground'
              )}
              data-testid={`${testIdPrefix}-option-${option.id}`}
            >
              {getLocalizedText(option.label, currentLanguage)}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectPrimitive>

      {/* Mensaje de error de validación */}
      {shouldShowError && errorMessage && (
        <p 
          id="select-error" 
          className="text-sm text-destructive mt-1"
          role="alert"
          aria-live="polite"
          data-testid="select-error-message"
        >
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default Select;