import styles from '../css/GridDemo.module.css';

export function GridPropsTab() {
  return (
    <div className={styles.propsContainer} data-testid="grid-props-tab">
      <h2 className={styles.propsTitle}>GridProps&lt;T&gt;</h2>
      <p className={styles.propsDescription}>Props principales del componente Grid.</p>
      <div className={styles.propsTableWrapper}>
        <table className={styles.propsTable}>
          <thead>
            <tr>
              <th>Prop</th>
              <th>Tipo</th>
              <th>Default</th>
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>id</code></td>
              <td><code>string</code></td>
              <td><code>undefined</code></td>
              <td>Identificador único del grid</td>
            </tr>
            <tr>
              <td><code>data</code></td>
              <td><code>T[]</code></td>
              <td><code>[]</code></td>
              <td>Array de datos a renderizar en la cuadrícula</td>
            </tr>
            <tr>
              <td><code>layout</code></td>
              <td><code>GridLayout</code></td>
              <td><code>undefined</code></td>
              <td>Configuración de dimensiones del contenedor</td>
            </tr>
            <tr>
              <td><code>grid</code></td>
              <td><code>GridConfig</code></td>
              <td><code>undefined</code></td>
              <td>Configuración de columnas, filas y tamaño de cards</td>
            </tr>
            <tr>
              <td><code>item</code></td>
              <td><code>GridItemConfig&lt;T&gt;</code></td>
              <td>-</td>
              <td>Configuración de renderizado de cada item (requerido)</td>
            </tr>
            <tr>
              <td><code>scroll</code></td>
              <td><code>GridScrollConfig</code></td>
              <td><code>undefined</code></td>
              <td>Configuración de scroll e infinite scroll</td>
            </tr>
            <tr>
              <td><code>statesComponents</code></td>
              <td><code>GridStatesComponents</code></td>
              <td><code>undefined</code></td>
              <td>Componentes personalizados para cada estado visual</td>
            </tr>
            <tr>
              <td><code>callbacks</code></td>
              <td><code>GridCallbacks</code></td>
              <td><code>undefined</code></td>
              <td>Callbacks para eventos del grid</td>
            </tr>
            <tr>
              <td><code>controller</code></td>
              <td><code>GridController</code></td>
              <td><code>undefined</code></td>
              <td>Controller externo vía <code>useGridController()</code></td>
            </tr>
            <tr>
              <td><code>selectionConfig</code></td>
              <td><code>GridSelectionConfig&lt;T&gt;</code></td>
              <td><code>undefined</code></td>
              <td>Configuración de selección de items</td>
            </tr>
            <tr>
              <td><code>showBorder</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>Muestra borde alrededor del contenedor del grid</td>
            </tr>
            <tr>
              <td><code>className</code></td>
              <td><code>string</code></td>
              <td><code>undefined</code></td>
              <td>Clase CSS adicional para el contenedor</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className={styles.propsSubtitle}>GridLayout</h3>
      <p className={styles.propsDescription}>Configuración de dimensiones del contenedor del grid.</p>
      <div className={styles.propsTableWrapper}>
        <table className={styles.propsTable}>
          <thead>
            <tr>
              <th>Prop</th>
              <th>Tipo</th>
              <th>Default</th>
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>widthMode</code></td>
              <td><code>'full' | 'auto' | 'fixed'</code></td>
              <td><code>'auto'</code></td>
              <td>Modo de ancho del contenedor</td>
            </tr>
            <tr>
              <td><code>width</code></td>
              <td><code>number</code></td>
              <td><code>undefined</code></td>
              <td>Ancho fijo en px (solo cuando <code>widthMode: 'fixed'</code>)</td>
            </tr>
            <tr>
              <td><code>minWidth</code></td>
              <td><code>number</code></td>
              <td><code>undefined</code></td>
              <td>Ancho mínimo en px</td>
            </tr>
            <tr>
              <td><code>heightMode</code></td>
              <td><code>'full' | 'auto' | 'fixed'</code></td>
              <td><code>'auto'</code></td>
              <td>Modo de altura del contenedor</td>
            </tr>
            <tr>
              <td><code>height</code></td>
              <td><code>number</code></td>
              <td><code>undefined</code></td>
              <td>Altura fija en px (solo cuando <code>heightMode: 'fixed'</code>)</td>
            </tr>
            <tr>
              <td><code>minHeight</code></td>
              <td><code>number</code></td>
              <td><code>undefined</code></td>
              <td>Altura mínima en px</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className={styles.propsSubtitle}>GridConfig</h3>
      <p className={styles.propsDescription}>Configuración de la cuadrícula: columnas, filas y tamaño de cards.</p>
      <div className={styles.propsTableWrapper}>
        <table className={styles.propsTable}>
          <thead>
            <tr>
              <th>Prop</th>
              <th>Tipo</th>
              <th>Default</th>
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>minColumns</code></td>
              <td><code>number</code></td>
              <td><code>1</code></td>
              <td>Mínimo de columnas</td>
            </tr>
            <tr>
              <td><code>maxColumns</code></td>
              <td><code>number</code></td>
              <td><code>4</code></td>
              <td>Máximo de columnas</td>
            </tr>
            <tr>
              <td><code>minRows</code></td>
              <td><code>number</code></td>
              <td><code>undefined</code></td>
              <td>Mínimo de filas visibles (asegura altura mínima)</td>
            </tr>
            <tr>
              <td><code>maxRows</code></td>
              <td><code>number</code></td>
              <td><code>undefined</code></td>
              <td>Máximo de filas visibles (limita items renderizados)</td>
            </tr>
            <tr>
              <td><code>minCardWidth</code></td>
              <td><code>number</code></td>
              <td><code>280</code></td>
              <td>Ancho mínimo de cada card en px (base para calcular columnas)</td>
            </tr>
            <tr>
              <td><code>minCardHeight</code></td>
              <td><code>number</code></td>
              <td><code>undefined</code></td>
              <td>Altura mínima de cada card en px</td>
            </tr>
            <tr>
              <td><code>rowGap</code></td>
              <td><code>number</code></td>
              <td><code>16</code></td>
              <td>Espacio vertical entre filas en px</td>
            </tr>
            <tr>
              <td><code>columnGap</code></td>
              <td><code>number</code></td>
              <td><code>16</code></td>
              <td>Espacio horizontal entre columnas en px</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className={styles.propsSubtitle}>GridItemConfig&lt;T&gt;</h3>
      <p className={styles.propsDescription}>Configuración de cómo se renderiza cada item.</p>
      <div className={styles.propsTableWrapper}>
        <table className={styles.propsTable}>
          <thead>
            <tr>
              <th>Prop</th>
              <th>Tipo</th>
              <th>Default</th>
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>renderType</code></td>
              <td><code>'component'</code></td>
              <td>-</td>
              <td>Tipo de renderizado (requerido)</td>
            </tr>
            <tr>
              <td><code>render</code></td>
              <td><code>(item: T, index: number) =&gt; ReactNode</code></td>
              <td>-</td>
              <td>Función que renderiza cada item (requerido)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className={styles.propsSubtitle}>GridScrollConfig</h3>
      <p className={styles.propsDescription}>Configuración de scroll e infinite scroll.</p>
      <div className={styles.propsTableWrapper}>
        <table className={styles.propsTable}>
          <thead>
            <tr>
              <th>Prop</th>
              <th>Tipo</th>
              <th>Default</th>
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>enabled</code></td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
              <td>Habilita scroll vertical y sentinel para infinite scroll</td>
            </tr>
            <tr>
              <td><code>threshold</code></td>
              <td><code>number</code></td>
              <td><code>50</code></td>
              <td>Distancia en px antes del final para disparar <code>onReachEnd</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className={styles.propsSubtitle}>GridCallbacks</h3>
      <p className={styles.propsDescription}>Callbacks para eventos del grid.</p>
      <div className={styles.propsTableWrapper}>
        <table className={styles.propsTable}>
          <thead>
            <tr>
              <th>Callback</th>
              <th>Tipo</th>
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>onCapacityChange</code></td>
              <td><code>(info: GridCapacityInfo) =&gt; void</code></td>
              <td>Se dispara cuando cambia la capacidad (columnas, filas, items visibles)</td>
            </tr>
            <tr>
              <td><code>onReachEnd</code></td>
              <td><code>() =&gt; void</code></td>
              <td>Se dispara cuando el usuario llega al final del scroll (solo cuando <code>state === 'idle'</code>)</td>
            </tr>
            <tr>
              <td><code>onLayoutChange</code></td>
              <td><code>(info: GridLayoutInfo) =&gt; void</code></td>
              <td>Se dispara cuando cambian las dimensiones del contenedor</td>
            </tr>
            <tr>
              <td><code>onStateChange</code></td>
              <td><code>(newState: GridState) =&gt; void</code></td>
              <td>Se dispara cuando cambia el estado del grid</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className={styles.propsSubtitle}>GridStatesComponents</h3>
      <p className={styles.propsDescription}>Componentes personalizados para cada estado visual del grid.</p>
      <div className={styles.propsTableWrapper}>
        <table className={styles.propsTable}>
          <thead>
            <tr>
              <th>Estado</th>
              <th>Tipo</th>
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>idle</code></td>
              <td><code>GridStateComponent</code></td>
              <td>Componente para estado idle (sin datos cargados)</td>
            </tr>
            <tr>
              <td><code>loading</code></td>
              <td><code>GridStateComponent</code></td>
              <td>Componente para estado loading</td>
            </tr>
            <tr>
              <td><code>empty</code></td>
              <td><code>GridStateComponent</code></td>
              <td>Componente para estado empty</td>
            </tr>
            <tr>
              <td><code>error</code></td>
              <td><code>GridStateComponent</code></td>
              <td>Componente para estado error</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className={styles.propsSubtitle}>GridStateComponent</h3>
      <p className={styles.propsDescription}>Configuración de un estado visual individual.</p>
      <div className={styles.propsTableWrapper}>
        <table className={styles.propsTable}>
          <thead>
            <tr>
              <th>Prop</th>
              <th>Tipo</th>
              <th>Default</th>
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>renderType</code></td>
              <td><code>'component' | 'self'</code></td>
              <td>-</td>
              <td><code>'self'</code> usa el render por defecto del grid, <code>'component'</code> usa uno personalizado</td>
            </tr>
            <tr>
              <td><code>render</code></td>
              <td><code>ReactNode | ComponentType</code></td>
              <td><code>undefined</code></td>
              <td>Componente o nodo a renderizar (solo cuando <code>renderType: 'component'</code>)</td>
            </tr>
            <tr>
              <td><code>verticalAlign</code></td>
              <td><code>'top' | 'middle' | 'bottom'</code></td>
              <td><code>'middle'</code></td>
              <td>Alineación vertical del contenido del estado</td>
            </tr>
            <tr>
              <td><code>horizontalAlign</code></td>
              <td><code>'left' | 'center' | 'right'</code></td>
              <td><code>'center'</code></td>
              <td>Alineación horizontal del contenido del estado</td>
            </tr>
            <tr>
              <td><code>position</code></td>
              <td><code>'bottom' | 'over'</code></td>
              <td><code>'bottom'</code></td>
              <td>Posición del loading: <code>'bottom'</code> debajo de los datos, <code>'over'</code> como overlay</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className={styles.propsSubtitle}>GridController</h3>
      <p className={styles.propsDescription}>Métodos del controller externo (vía <code>useGridController()</code>).</p>
      <div className={styles.propsTableWrapper}>
        <table className={styles.propsTable}>
          <thead>
            <tr>
              <th>Método</th>
              <th>Tipo</th>
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>setState</code></td>
              <td><code>(state: GridState) =&gt; void</code></td>
              <td>Cambia el estado visual del grid (<code>'idle'</code>, <code>'loading'</code>, <code>'empty'</code>, <code>'error'</code>)</td>
            </tr>
            <tr>
              <td><code>getState</code></td>
              <td><code>() =&gt; GridState</code></td>
              <td>Obtiene el estado actual del grid</td>
            </tr>
            <tr>
              <td><code>refreshLayout</code></td>
              <td><code>() =&gt; void</code></td>
              <td>Fuerza un recálculo del layout (columnas/filas)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className={styles.propsSubtitle}>GridSelectionConfig&lt;T&gt;</h3>
      <p className={styles.propsDescription}>Configuración de selección de items (integración con WrapperItemsSelected).</p>
      <div className={styles.propsTableWrapper}>
        <table className={styles.propsTable}>
          <thead>
            <tr>
              <th>Prop</th>
              <th>Tipo</th>
              <th>Default</th>
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>getItemId</code></td>
              <td><code>(item: T, index: number) =&gt; string</code></td>
              <td>-</td>
              <td>Función para extraer el ID único de cada item (requerido)</td>
            </tr>
            <tr>
              <td><code>getItem</code></td>
              <td><code>(item: T, index: number) =&gt; R</code></td>
              <td><code>undefined</code></td>
              <td>Función para transformar T → R en callbacks (agnóstico)</td>
            </tr>
            <tr>
              <td><code>multiSelect</code></td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
              <td>Habilita selección múltiple (<code>false</code> = selección simple)</td>
            </tr>
            <tr>
              <td><code>selectedIds</code></td>
              <td><code>string[]</code></td>
              <td><code>undefined</code></td>
              <td>IDs seleccionados (modo controlado)</td>
            </tr>
            <tr>
              <td><code>defaultSelectedIds</code></td>
              <td><code>string[]</code></td>
              <td><code>undefined</code></td>
              <td>IDs seleccionados iniciales (modo no controlado)</td>
            </tr>
            <tr>
              <td><code>onSelectionChange</code></td>
              <td><code>(items: R[]) =&gt; void</code></td>
              <td><code>undefined</code></td>
              <td>Callback cuando cambia la selección (recibe items transformados si <code>getItem</code> está definido, o <code>string[]</code> si no)</td>
            </tr>
            <tr>
              <td><code>onItemAction</code></td>
              <td><code>(event: GridSelectionItemActionEvent) =&gt; void</code></td>
              <td><code>undefined</code></td>
              <td>Callback por cada acción individual de selección/deselección</td>
            </tr>
            <tr>
              <td><code>selectionStyle</code></td>
              <td><code>GridSelectionStyle</code></td>
              <td><code>undefined</code></td>
              <td>Estilos visuales para items seleccionados</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className={styles.propsSubtitle}>GridSelectionStyle</h3>
      <p className={styles.propsDescription}>Estilos visuales para items seleccionados.</p>
      <div className={styles.propsTableWrapper}>
        <table className={styles.propsTable}>
          <thead>
            <tr>
              <th>Prop</th>
              <th>Tipo</th>
              <th>Default</th>
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>border</code></td>
              <td><code>string</code></td>
              <td><code>undefined</code></td>
              <td>Borde del item seleccionado</td>
            </tr>
            <tr>
              <td><code>borderRadius</code></td>
              <td><code>string | number</code></td>
              <td><code>'8px'</code></td>
              <td>Border radius del item seleccionado</td>
            </tr>
            <tr>
              <td><code>backgroundColor</code></td>
              <td><code>string</code></td>
              <td><code>undefined</code></td>
              <td>Color de fondo del item seleccionado</td>
            </tr>
            <tr>
              <td><code>boxShadow</code></td>
              <td><code>string</code></td>
              <td><code>undefined</code></td>
              <td>Sombra del item seleccionado</td>
            </tr>
            <tr>
              <td><code>outline</code></td>
              <td><code>string</code></td>
              <td><code>undefined</code></td>
              <td>Outline del item seleccionado</td>
            </tr>
            <tr>
              <td><code>custom</code></td>
              <td><code>CSSProperties</code></td>
              <td><code>undefined</code></td>
              <td>Estilos CSS personalizados adicionales</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className={styles.propsSubtitle}>GridSelectionItemActionEvent&lt;R&gt;</h3>
      <p className={styles.propsDescription}>Evento emitido por <code>onItemAction</code> en cada acción de selección/deselección.</p>
      <div className={styles.propsTableWrapper}>
        <table className={styles.propsTable}>
          <thead>
            <tr>
              <th>Prop</th>
              <th>Tipo</th>
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>item</code></td>
              <td><code>R</code></td>
              <td>Item transformado (vía <code>getItem</code>) o item original</td>
            </tr>
            <tr>
              <td><code>action</code></td>
              <td><code>'selected' | 'deselected'</code></td>
              <td>Acción realizada sobre el item</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className={styles.propsSubtitle}>GridCapacityInfo</h3>
      <p className={styles.propsDescription}>Información de capacidad emitida por <code>onCapacityChange</code>.</p>
      <div className={styles.propsTableWrapper}>
        <table className={styles.propsTable}>
          <thead>
            <tr>
              <th>Prop</th>
              <th>Tipo</th>
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>columns</code></td>
              <td><code>number</code></td>
              <td>Número de columnas calculadas</td>
            </tr>
            <tr>
              <td><code>rows</code></td>
              <td><code>number</code></td>
              <td>Número de filas efectivas</td>
            </tr>
            <tr>
              <td><code>visibleItems</code></td>
              <td><code>number</code></td>
              <td>Número de items visibles en la cuadrícula</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className={styles.propsSubtitle}>GridLayoutInfo</h3>
      <p className={styles.propsDescription}>Información de dimensiones emitida por <code>onLayoutChange</code>.</p>
      <div className={styles.propsTableWrapper}>
        <table className={styles.propsTable}>
          <thead>
            <tr>
              <th>Prop</th>
              <th>Tipo</th>
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>width</code></td>
              <td><code>number</code></td>
              <td>Ancho actual del contenedor en px</td>
            </tr>
            <tr>
              <td><code>height</code></td>
              <td><code>number</code></td>
              <td>Altura actual del contenedor en px</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className={styles.propsSubtitle}>Tipos auxiliares</h3>
      <p className={styles.propsDescription}>Tipos usados como valores en las interfaces anteriores.</p>
      <div className={styles.propsTableWrapper}>
        <table className={styles.propsTable}>
          <thead>
            <tr>
              <th>Tipo</th>
              <th>Valores</th>
              <th>Usado en</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>GridState</code></td>
              <td><code>'idle' | 'loading' | 'empty' | 'error'</code></td>
              <td>controller, statesComponents, onStateChange</td>
            </tr>
            <tr>
              <td><code>WidthMode</code></td>
              <td><code>'full' | 'auto' | 'fixed'</code></td>
              <td>layout.widthMode</td>
            </tr>
            <tr>
              <td><code>HeightMode</code></td>
              <td><code>'full' | 'auto' | 'fixed'</code></td>
              <td>layout.heightMode</td>
            </tr>
            <tr>
              <td><code>VerticalAlign</code></td>
              <td><code>'top' | 'middle' | 'bottom'</code></td>
              <td>statesComponents[*].verticalAlign</td>
            </tr>
            <tr>
              <td><code>HorizontalAlign</code></td>
              <td><code>'left' | 'center' | 'right'</code></td>
              <td>statesComponents[*].horizontalAlign</td>
            </tr>
            <tr>
              <td><code>LoadingPosition</code></td>
              <td><code>'bottom' | 'over'</code></td>
              <td>statesComponents.loading.position</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
