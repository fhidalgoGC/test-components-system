# Formato de Props en JSON

Este documento define como se deben mostrar las props de cualquier componente cuando se soliciten en formato JSON.

## Reglas

1. **JSON plano, sin interfaces**: No usar nombres de interfaces ni tipos intermedios. Todo debe estar expandido directamente dentro del objeto.

2. **Objetos anidados expandidos**: Si una prop es un objeto (como `align`, `scroll`, `backgroundImage`), se muestra con todas sus propiedades internas expandidas dentro del JSON.

3. **Cada panel/seccion repite sus props**: Si `main` y `secondary` tienen el mismo tipo, ambos deben mostrar todas sus propiedades completas, sin decir "mismas propiedades que X".

4. **Indicar required**: Las props obligatorias se marcan con `(required)` al lado del tipo. Las opcionales no llevan ninguna marca.

5. **Tipos como valores**: El valor de cada prop en el JSON es el tipo que acepta, escrito como string. Ejemplos: `"string"`, `"number"`, `"boolean"`, `"ReactNode"`, `"'left' | 'right'"`.

6. **Props condicionales**: Cuando una prop es opcional pero al usarla tiene reglas internas (como `backgroundImage` que requiere `renderType`), indicarlo claramente con una nota breve.

7. **Sin defaults en el JSON**: El JSON solo muestra la estructura y tipos. Los valores por defecto se mencionan aparte si es necesario, no dentro del JSON.

## Ejemplo de Referencia (SplitLayout)

```json
{
  "layout": {
    "componentMainAlign": "'left' | 'right'",
    "widthMode": "'full' | 'auto' | 'fixed' | 'percentage'",
    "width": "string | number",
    "minWidth": "number",
    "heightMode": "'full' | 'auto' | 'fixed' | 'percentage'",
    "height": "string | number",
    "minHeight": "number"
  },
  "main": {
    "render": "ReactNode (required)",
    "renderType": "'component'",
    "widthMode": "'full' | 'auto' | 'fixed' | 'percentage'",
    "width": "string | number",
    "minWidth": "number",
    "heightMode": "'full' | 'auto' | 'fixed' | 'percentage'",
    "height": "string | number",
    "minHeight": "number",
    "align": {
      "vertical": "'top' | 'middle' | 'bottom'",
      "horizontal": "'left' | 'center' | 'right'"
    },
    "scroll": {
      "vertical": "boolean",
      "horizontal": "boolean"
    },
    "backgroundImage": {
      "renderType": "'src' | 'component' (required)",
      "src": "string",
      "render": "ReactNode",
      "opacity": "number",
      "objectFit": "'cover' | 'contain' | 'fill' | 'none'",
      "objectPosition": "string",
      "overlayColor": "string"
    }
  },
  "secondary": {
    "render": "ReactNode (required)",
    "renderType": "'component'",
    "widthMode": "'full' | 'auto' | 'fixed' | 'percentage'",
    "width": "string | number",
    "minWidth": "number",
    "heightMode": "'full' | 'auto' | 'fixed' | 'percentage'",
    "height": "string | number",
    "minHeight": "number",
    "align": {
      "vertical": "'top' | 'middle' | 'bottom'",
      "horizontal": "'left' | 'center' | 'right'"
    },
    "scroll": {
      "vertical": "boolean",
      "horizontal": "boolean"
    },
    "backgroundImage": {
      "renderType": "'src' | 'component' (required)",
      "src": "string",
      "render": "ReactNode",
      "opacity": "number",
      "objectFit": "'cover' | 'contain' | 'fill' | 'none'",
      "objectPosition": "string",
      "overlayColor": "string"
    }
  }
}
```

## Notas sobre el ejemplo

- `layout` es opcional. Si no se pasa, el contenedor usa valores por defecto.
- `main` y `secondary` son obligatorios. Ambos muestran todas sus props expandidas.
- `backgroundImage` es opcional en cada panel. Si se pasa, `renderType` es obligatorio:
  - `renderType: 'src'` requiere `src` (URL de imagen).
  - `renderType: 'component'` requiere `render` (componente React).
- Las props de estilo de imagen (`opacity`, `objectFit`, `objectPosition`, `overlayColor`) solo aplican con `renderType: 'src'`.
