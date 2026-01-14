export interface Label {
  es?: string;
  en?: string;
  default: string; // obligatorio
}

export interface Option {
  id: string | number;
  label: Label;
}

export type SelectProps = {
  required?: boolean; // si true valida en submit; si false no valida ni muestra reglas
  getOptions: () => Promise<Option[]>; // carga asíncrona de opciones
  onSelect?: (id: Option['id']) => void; // callback al seleccionar
  validationLabel?: Label; // textos de validación multilenguaje
  placeholder?: Label; // placeholder multilenguaje
  className?: string; // estilos extra
  disabled?: boolean; // opcional
  value?: string | number; // valor seleccionado actual
  error?: string; // mensaje de error externo (react-hook-form)
  showError?: boolean; // controla cuándo mostrar error
  testIdPrefix?: string; // prefijo opcional para test IDs únicos
};