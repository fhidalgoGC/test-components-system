import styles from '../css/BaseTableDemo.module.scss';

export function BaseTablePropsTab() {
  return (
    <div className={styles.propsContainer} data-testid="base-table-props-tab">
      <h2 className={styles.propsTitle}>BaseTableProps</h2>
      <p className={styles.propsDescription}>Props principales del componente BaseTable.</p>
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
              <td><code>config</code></td>
              <td><code>BaseTableConfig</code></td>
              <td>-</td>
              <td>Configuración principal de la tabla (requerido)</td>
            </tr>
            <tr>
              <td><code>data</code></td>
              <td><code>any[]</code></td>
              <td><code>[]</code></td>
              <td>Array de datos a renderizar en la tabla</td>
            </tr>
            <tr>
              <td><code>state</code></td>
              <td><code>TableState</code></td>
              <td><code>'idle'</code></td>
              <td>Estado actual de la tabla: 'idle' | 'loading' | 'success' | 'error' | 'empty' | 'loadingMore'</td>
            </tr>
            <tr>
              <td><code>error</code></td>
              <td><code>string</code></td>
              <td><code>undefined</code></td>
              <td>Mensaje de error a mostrar cuando state es 'error'</td>
            </tr>
            <tr>
              <td><code>callbacks</code></td>
              <td><code>TableCallbacks</code></td>
              <td><code>undefined</code></td>
              <td>Objeto con callbacks para eventos de la tabla</td>
            </tr>
            <tr>
              <td><code>className</code></td>
              <td><code>string</code></td>
              <td><code>undefined</code></td>
              <td>Clase CSS adicional para el contenedor</td>
            </tr>
            <tr>
              <td><code>dataTestId</code></td>
              <td><code>string</code></td>
              <td><code>'base-table'</code></td>
              <td>Identificador para pruebas</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className={styles.propsTitle}>BaseTableConfig</h2>
      <p className={styles.propsDescription}>Configuración principal que define estructura y comportamiento de la tabla.</p>
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
              <td><code>columns</code></td>
              <td><code>ColumnConfig[]</code></td>
              <td>-</td>
              <td>Definición de columnas de la tabla (requerido)</td>
            </tr>
            <tr>
              <td><code>layout</code></td>
              <td><code>LayoutConfig</code></td>
              <td><code>undefined</code></td>
              <td>Configuración de dimensiones y scroll del contenedor</td>
            </tr>
            <tr>
              <td><code>headersDefault</code></td>
              <td><code>HeadersDefaultConfig</code></td>
              <td><code>undefined</code></td>
              <td>Configuración global de headers</td>
            </tr>
            <tr>
              <td><code>rowsDefault</code></td>
              <td><code>RowsDefaultConfig</code></td>
              <td><code>undefined</code></td>
              <td>Configuración global de filas</td>
            </tr>
            <tr>
              <td><code>columnsDefault</code></td>
              <td><code>ColumnsDefaultConfig</code></td>
              <td><code>undefined</code></td>
              <td>Configuración global aplicada a todas las columnas</td>
            </tr>
            <tr>
              <td><code>cellsDefault</code></td>
              <td><code>CellsDefaultConfig</code></td>
              <td><code>undefined</code></td>
              <td>Configuración global de celdas</td>
            </tr>
            <tr>
              <td><code>behaviors</code></td>
              <td><code>BehaviorsConfig</code></td>
              <td><code>undefined</code></td>
              <td>Configuración de comportamientos (hover, click, estados, infinite scroll)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className={styles.propsTitle}>LayoutConfig</h2>
      <p className={styles.propsDescription}>Controla las dimensiones y el comportamiento de scroll del contenedor.</p>
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
              <td><code>undefined</code></td>
              <td>Modo de ancho del contenedor</td>
            </tr>
            <tr>
              <td><code>width</code></td>
              <td><code>number | string</code></td>
              <td><code>undefined</code></td>
              <td>Ancho fijo (solo cuando widthMode es 'fixed')</td>
            </tr>
            <tr>
              <td><code>heightMode</code></td>
              <td><code>'full' | 'auto' | 'fixed'</code></td>
              <td><code>undefined</code></td>
              <td>Modo de alto del contenedor</td>
            </tr>
            <tr>
              <td><code>height</code></td>
              <td><code>number | string</code></td>
              <td><code>undefined</code></td>
              <td>Alto fijo (solo cuando heightMode es 'fixed')</td>
            </tr>
            <tr>
              <td><code>minWidth</code></td>
              <td><code>number</code></td>
              <td><code>undefined</code></td>
              <td>Ancho mínimo del contenedor</td>
            </tr>
            <tr>
              <td><code>minHeight</code></td>
              <td><code>number</code></td>
              <td><code>undefined</code></td>
              <td>Alto mínimo del contenedor</td>
            </tr>
            <tr>
              <td><code>stickyHeader</code></td>
              <td><code>boolean</code></td>
              <td><code>undefined</code></td>
              <td>Fija el header al hacer scroll vertical</td>
            </tr>
            <tr>
              <td><code>horizontalScroll</code></td>
              <td><code>boolean</code></td>
              <td><code>undefined</code></td>
              <td>Habilita scroll horizontal</td>
            </tr>
            <tr>
              <td><code>verticalScroll</code></td>
              <td><code>boolean</code></td>
              <td><code>undefined</code></td>
              <td>Habilita scroll vertical (requiere heightMode 'fixed' + height)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className={styles.propsTitle}>ColumnConfig</h2>
      <p className={styles.propsDescription}>Configuración individual de cada columna.</p>
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
              <td><code>metadata</code></td>
              <td><code>ColumnMetadata</code></td>
              <td>-</td>
              <td>Metadatos de la columna: columnId (requerido) y order</td>
            </tr>
            <tr>
              <td><code>header</code></td>
              <td><code>ColumnHeaderConfig</code></td>
              <td><code>undefined</code></td>
              <td>Configuración del header de la columna</td>
            </tr>
            <tr>
              <td><code>cell</code></td>
              <td><code>ColumnCellConfig</code></td>
              <td><code>undefined</code></td>
              <td>Configuración de las celdas de la columna</td>
            </tr>
            <tr>
              <td><code>visible</code></td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
              <td>Si la columna es visible</td>
            </tr>
            <tr>
              <td><code>minWidth</code></td>
              <td><code>number</code></td>
              <td><code>undefined</code></td>
              <td>Ancho mínimo de la columna en px</td>
            </tr>
            <tr>
              <td><code>maxWidth</code></td>
              <td><code>number | 'stretch' | 'container'</code></td>
              <td><code>undefined</code></td>
              <td>Ancho máximo: número fijo, 'stretch' para expandir, o 'container' para ajustar al contenedor</td>
            </tr>
            <tr>
              <td><code>sortable</code></td>
              <td><code>boolean</code></td>
              <td><code>undefined</code></td>
              <td>Si la columna es ordenable</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className={styles.propsTitle}>RowsDefaultConfig</h2>
      <p className={styles.propsDescription}>Configuración global aplicada a todas las filas.</p>
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
              <td><code>height</code></td>
              <td><code>number | string</code></td>
              <td><code>undefined</code></td>
              <td>Alto fijo de cada fila</td>
            </tr>
            <tr>
              <td><code>heightMode</code></td>
              <td><code>'fixed' | 'auto' | 'stretch'</code></td>
              <td><code>undefined</code></td>
              <td>Modo de alto de las filas</td>
            </tr>
            <tr>
              <td><code>maxVisibleRows</code></td>
              <td><code>number</code></td>
              <td><code>undefined</code></td>
              <td>Número máximo de filas visibles (ajusta alto automáticamente)</td>
            </tr>
            <tr>
              <td><code>hoverable</code></td>
              <td><code>boolean</code></td>
              <td><code>undefined</code></td>
              <td>Habilita efecto hover en las filas</td>
            </tr>
            <tr>
              <td><code>dividers</code></td>
              <td><code>boolean</code></td>
              <td><code>undefined</code></td>
              <td>Muestra divisores entre filas</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className={styles.propsTitle}>BehaviorsConfig</h2>
      <p className={styles.propsDescription}>Configuración de comportamientos interactivos.</p>
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
              <td><code>hoverable</code></td>
              <td><code>'header' | 'column' | 'row' | 'cell' | 'none'</code></td>
              <td><code>undefined</code></td>
              <td>Target del efecto hover</td>
            </tr>
            <tr>
              <td><code>clickable</code></td>
              <td><code>'header' | 'cell' | 'row' | 'none'</code></td>
              <td><code>undefined</code></td>
              <td>Target del click</td>
            </tr>
            <tr>
              <td><code>states</code></td>
              <td><code>StatesConfig</code></td>
              <td><code>undefined</code></td>
              <td>Componentes personalizados para estados (loading, error, empty, idle)</td>
            </tr>
            <tr>
              <td><code>infiniteScroll</code></td>
              <td><code>InfiniteScrollConfig</code></td>
              <td><code>undefined</code></td>
              <td>Configuración de infinite scroll</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className={styles.propsTitle}>InfiniteScrollConfig</h2>
      <p className={styles.propsDescription}>Configuración para carga infinita de datos al hacer scroll.</p>
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
              <td><code>undefined</code></td>
              <td>Activa la detección de scroll para carga infinita</td>
            </tr>
            <tr>
              <td><code>threshold</code></td>
              <td><code>number</code></td>
              <td><code>100</code></td>
              <td>Píxeles antes del final para disparar onReachEnd</td>
            </tr>
            <tr>
              <td><code>loadingMoreMessage</code></td>
              <td><code>string</code></td>
              <td><code>'Loading more...'</code></td>
              <td>Texto del spinner de carga al final de la tabla</td>
            </tr>
            <tr>
              <td><code>loadingMoreComponent</code></td>
              <td><code>ReactNode</code></td>
              <td><code>undefined</code></td>
              <td>Componente personalizado para el indicador de carga</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className={styles.propsTitle}>TableCallbacks</h2>
      <p className={styles.propsDescription}>Callbacks para eventos de interacción con la tabla.</p>
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
              <td><code>onHeaderClick</code></td>
              <td><code>(columnId, sortDirection) =&gt; void</code></td>
              <td><code>undefined</code></td>
              <td>Se ejecuta al hacer click en un header</td>
            </tr>
            <tr>
              <td><code>onCellClick</code></td>
              <td><code>(columnId, rowIndex, value, rowData) =&gt; void</code></td>
              <td><code>undefined</code></td>
              <td>Se ejecuta al hacer click en una celda</td>
            </tr>
            <tr>
              <td><code>onRowClick</code></td>
              <td><code>(rowIndex, rowData) =&gt; void</code></td>
              <td><code>undefined</code></td>
              <td>Se ejecuta al hacer click en una fila</td>
            </tr>
            <tr>
              <td><code>onSort</code></td>
              <td><code>(column, direction) =&gt; void</code></td>
              <td><code>undefined</code></td>
              <td>Se ejecuta al ordenar una columna</td>
            </tr>
            <tr>
              <td><code>onReachEnd</code></td>
              <td><code>() =&gt; void</code></td>
              <td><code>undefined</code></td>
              <td>Se ejecuta al llegar al final del scroll (infinite scroll)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
