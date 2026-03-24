import styles from '../css/ListDemo.module.scss';

export function ListPropsTab() {
  return (
    <div className={styles.propsContainer} data-testid="list-props-tab">
      <h2 className={styles.propsTitle}>ListProps&lt;T&gt;</h2>
      <p className={styles.propsDescription}>Props principales del componente List.</p>
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
              <td>-</td>
              <td>Identificador único del list (requerido)</td>
            </tr>
            <tr>
              <td><code>data</code></td>
              <td><code>T[]</code></td>
              <td><code>undefined</code></td>
              <td>Array de datos a renderizar. Se usa cuando no hay controller</td>
            </tr>
            <tr>
              <td><code>controller</code></td>
              <td><code>ListController&lt;T&gt;</code></td>
              <td><code>undefined</code></td>
              <td>Controller externo creado con useListController. Maneja data, paginación y estados</td>
            </tr>
            <tr>
              <td><code>item</code></td>
              <td><code>ListItemConfig&lt;T&gt;</code></td>
              <td>-</td>
              <td>Configuración de renderizado de cada item (requerido)</td>
            </tr>
            <tr>
              <td><code>layout</code></td>
              <td><code>ListLayout</code></td>
              <td><code>undefined</code></td>
              <td>Configuración de dimensiones del contenedor</td>
            </tr>
            <tr>
              <td><code>behaviors</code></td>
              <td><code>ListBehaviors</code></td>
              <td><code>undefined</code></td>
              <td>Configuración de comportamientos (scroll, paginador)</td>
            </tr>
            <tr>
              <td><code>callbacks</code></td>
              <td><code>ListCallbacks</code></td>
              <td><code>undefined</code></td>
              <td>Callbacks para eventos de scroll</td>
            </tr>
            <tr>
              <td><code>loading</code></td>
              <td><code>ListLoading</code></td>
              <td><code>undefined</code></td>
              <td>Configuración del indicador de carga</td>
            </tr>
            <tr>
              <td><code>empty</code></td>
              <td><code>ListEmpty</code></td>
              <td><code>undefined</code></td>
              <td>Configuración del estado vacío</td>
            </tr>
            <tr>
              <td><code>selectionConfig</code></td>
              <td><code>SelectionConfig&lt;T&gt;</code></td>
              <td><code>undefined</code></td>
              <td>Configuración de selección (single/multi select)</td>
            </tr>
            <tr>
              <td><code>className</code></td>
              <td><code>string</code></td>
              <td><code>undefined</code></td>
              <td>Clase CSS adicional para el contenedor</td>
            </tr>
            <tr>
              <td><code>renderIdle</code></td>
              <td><code>ComponentType | () =&gt; ReactNode</code></td>
              <td><code>undefined</code></td>
              <td>Componente a renderizar en estado idle</td>
            </tr>
            <tr>
              <td><code>renderLoading</code></td>
              <td><code>ComponentType | () =&gt; ReactNode</code></td>
              <td><code>undefined</code></td>
              <td>Componente a renderizar en estado loading</td>
            </tr>
            <tr>
              <td><code>renderComplete</code></td>
              <td><code>ComponentType | () =&gt; ReactNode</code></td>
              <td><code>undefined</code></td>
              <td>Componente a renderizar en estado complete</td>
            </tr>
            <tr>
              <td><code>renderError</code></td>
              <td><code>ComponentType | () =&gt; ReactNode</code></td>
              <td><code>undefined</code></td>
              <td>Componente a renderizar en estado error</td>
            </tr>
            <tr>
              <td><code>langOverride</code></td>
              <td><code>string</code></td>
              <td><code>undefined</code></td>
              <td>Override del idioma para i18n</td>
            </tr>
            <tr>
              <td><code>i18nOrder</code></td>
              <td><code>'global-first' | 'local-first'</code></td>
              <td><code>undefined</code></td>
              <td>Orden de prioridad para traducciones</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className={styles.propsTitle}>ListLayout</h2>
      <p className={styles.propsDescription}>Controla las dimensiones y el espaciado del contenedor.</p>
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
              <td><code>number</code></td>
              <td><code>undefined</code></td>
              <td>Ancho fijo en px (solo cuando widthMode es 'fixed')</td>
            </tr>
            <tr>
              <td><code>minWidth</code></td>
              <td><code>number</code></td>
              <td><code>undefined</code></td>
              <td>Ancho mínimo del contenedor</td>
            </tr>
            <tr>
              <td><code>heightMode</code></td>
              <td><code>'full' | 'auto' | 'fixed'</code></td>
              <td><code>undefined</code></td>
              <td>Modo de alto del contenedor</td>
            </tr>
            <tr>
              <td><code>height</code></td>
              <td><code>number | 'auto'</code></td>
              <td><code>undefined</code></td>
              <td>Alto fijo en px o 'auto'</td>
            </tr>
            <tr>
              <td><code>minHeight</code></td>
              <td><code>number</code></td>
              <td><code>undefined</code></td>
              <td>Alto mínimo del contenedor</td>
            </tr>
            <tr>
              <td><code>gap</code></td>
              <td><code>number | string</code></td>
              <td><code>undefined</code></td>
              <td>Espacio entre items (px o valor CSS)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className={styles.propsTitle}>ListItemConfig&lt;T&gt;</h2>
      <p className={styles.propsDescription}>Configuración de renderizado de cada item de la lista.</p>
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
              <td>Tipo de renderizado (requerido, siempre 'component')</td>
            </tr>
            <tr>
              <td><code>render</code></td>
              <td><code>(item: T, index: number) =&gt; ReactNode</code></td>
              <td>-</td>
              <td>Función de renderizado de cada item (requerido)</td>
            </tr>
            <tr>
              <td><code>heightMode</code></td>
              <td><code>'full' | 'auto' | 'fixed'</code></td>
              <td><code>undefined</code></td>
              <td>Modo de alto de cada item</td>
            </tr>
            <tr>
              <td><code>height</code></td>
              <td><code>number | 'auto'</code></td>
              <td><code>undefined</code></td>
              <td>Alto fijo de cada item</td>
            </tr>
            <tr>
              <td><code>minHeight</code></td>
              <td><code>number</code></td>
              <td><code>undefined</code></td>
              <td>Alto mínimo de cada item</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className={styles.propsTitle}>ListBehaviors</h2>
      <p className={styles.propsDescription}>Configuración de comportamientos de scroll y paginación.</p>
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
              <td><code>scroll</code></td>
              <td><code>'normal' | 'infinityScroll' | 'none'</code></td>
              <td><code>undefined</code></td>
              <td>Comportamiento de scroll: normal, infinito o deshabilitado</td>
            </tr>
            <tr>
              <td><code>paginator</code></td>
              <td><code>ListPaginator</code></td>
              <td><code>undefined</code></td>
              <td>Configuración del paginador</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className={styles.propsTitle}>ListPaginator</h2>
      <p className={styles.propsDescription}>Configuración del paginador interno.</p>
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
              <td><code>maxItem</code></td>
              <td><code>number</code></td>
              <td>-</td>
              <td>Número máximo de items por página (requerido)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className={styles.propsTitle}>ListCallbacks</h2>
      <p className={styles.propsDescription}>Callbacks para eventos de la lista.</p>
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
              <td><code>onScroll</code></td>
              <td><code>(id: string) =&gt; void</code></td>
              <td><code>undefined</code></td>
              <td>Se ejecuta al hacer scroll en la lista</td>
            </tr>
            <tr>
              <td><code>onScrollInfinity</code></td>
              <td><code>(page: number) =&gt; void</code></td>
              <td><code>undefined</code></td>
              <td>Se ejecuta al llegar al final del scroll (infinite scroll). Recibe el número de página siguiente</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className={styles.propsTitle}>ListLoading</h2>
      <p className={styles.propsDescription}>Configuración del indicador de carga.</p>
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
              <td><code>undefined</code></td>
              <td>'component' usa un componente custom, 'self' usa el spinner interno</td>
            </tr>
            <tr>
              <td><code>render</code></td>
              <td><code>ReactNode | ComponentType</code></td>
              <td><code>undefined</code></td>
              <td>Componente personalizado para el estado de carga</td>
            </tr>
            <tr>
              <td><code>position</code></td>
              <td><code>'top' | 'bottom' | 'over'</code></td>
              <td><code>undefined</code></td>
              <td>Posición del indicador de carga</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className={styles.propsTitle}>ListEmpty</h2>
      <p className={styles.propsDescription}>Configuración del estado vacío.</p>
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
              <td><code>undefined</code></td>
              <td>'component' usa un componente custom, 'self' usa el indicador interno</td>
            </tr>
            <tr>
              <td><code>render</code></td>
              <td><code>ReactNode | ComponentType</code></td>
              <td><code>undefined</code></td>
              <td>Componente personalizado para el estado vacío</td>
            </tr>
            <tr>
              <td><code>position</code></td>
              <td><code>'center' | 'over'</code></td>
              <td><code>undefined</code></td>
              <td>Posición del indicador de estado vacío</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className={styles.propsTitle}>SelectionConfig&lt;T&gt;</h2>
      <p className={styles.propsDescription}>Configuración de selección de items (single o multi select).</p>
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
              <td>Función que retorna el ID único de cada item (requerido)</td>
            </tr>
            <tr>
              <td><code>getItem</code></td>
              <td><code>(item: T, index: number) =&gt; any</code></td>
              <td><code>undefined</code></td>
              <td>Transforma el item original en la forma deseada para los callbacks</td>
            </tr>
            <tr>
              <td><code>multiSelect</code></td>
              <td><code>boolean</code></td>
              <td><code>undefined</code></td>
              <td>Habilita selección múltiple</td>
            </tr>
            <tr>
              <td><code>selectedIds</code></td>
              <td><code>string[]</code></td>
              <td><code>undefined</code></td>
              <td>IDs seleccionados controlados externamente</td>
            </tr>
            <tr>
              <td><code>defaultSelectedIds</code></td>
              <td><code>string[]</code></td>
              <td><code>undefined</code></td>
              <td>IDs seleccionados por defecto (no controlado)</td>
            </tr>
            <tr>
              <td><code>onSelectionChange</code></td>
              <td><code>(selectedItems: any[]) =&gt; void</code></td>
              <td><code>undefined</code></td>
              <td>Callback cuando cambia la selección. Devuelve items transformados por getItem o IDs</td>
            </tr>
            <tr>
              <td><code>onItemAction</code></td>
              <td><code>(event: SelectionItemActionEvent) =&gt; void</code></td>
              <td><code>undefined</code></td>
              <td>Callback por cada acción individual (selected/deselected)</td>
            </tr>
            <tr>
              <td><code>selectionStyle</code></td>
              <td><code>SelectionStyle</code></td>
              <td><code>undefined</code></td>
              <td>Estilos CSS aplicados al item seleccionado</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className={styles.propsTitle}>SelectionStyle</h2>
      <p className={styles.propsDescription}>Estilos CSS aplicados al wrapper del item seleccionado.</p>
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
              <td>Borde del item seleccionado (ej: '2px solid #3b82f6')</td>
            </tr>
            <tr>
              <td><code>borderRadius</code></td>
              <td><code>string | number</code></td>
              <td><code>undefined</code></td>
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
              <td>Estilos CSS adicionales personalizados</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className={styles.propsTitle}>ListController&lt;T&gt;</h2>
      <p className={styles.propsDescription}>Interface del controller externo creado con useListController(). Maneja data, paginación y estados de forma imperativa.</p>
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
              <td><code>setData</code></td>
              <td><code>(data: T[]) =&gt; void</code></td>
              <td>Reemplaza todos los datos de la lista</td>
            </tr>
            <tr>
              <td><code>appendData</code></td>
              <td><code>(data: T[]) =&gt; void</code></td>
              <td>Agrega datos al final de la lista (para infinite scroll)</td>
            </tr>
            <tr>
              <td><code>setRenderState</code></td>
              <td><code>(state: RenderState) =&gt; void</code></td>
              <td>Cambia el estado de renderizado</td>
            </tr>
            <tr>
              <td><code>getRenderState</code></td>
              <td><code>() =&gt; RenderState</code></td>
              <td>Retorna el estado de renderizado actual</td>
            </tr>
            <tr>
              <td><code>setPage</code></td>
              <td><code>(page: number) =&gt; void</code></td>
              <td>Establece la página actual</td>
            </tr>
            <tr>
              <td><code>setPageSize</code></td>
              <td><code>(size: number) =&gt; void</code></td>
              <td>Establece el tamaño de página</td>
            </tr>
            <tr>
              <td><code>setTotalItems</code></td>
              <td><code>(total: number) =&gt; void</code></td>
              <td>Establece el total de items disponibles</td>
            </tr>
            <tr>
              <td><code>reload</code></td>
              <td><code>() =&gt; void</code></td>
              <td>Resetea la lista al estado inicial</td>
            </tr>
            <tr>
              <td><code>getPage</code></td>
              <td><code>() =&gt; number</code></td>
              <td>Retorna la página actual</td>
            </tr>
            <tr>
              <td><code>getPageSize</code></td>
              <td><code>() =&gt; number</code></td>
              <td>Retorna el tamaño de página</td>
            </tr>
            <tr>
              <td><code>getTotalItems</code></td>
              <td><code>() =&gt; number</code></td>
              <td>Retorna el total de items</td>
            </tr>
            <tr>
              <td><code>getTotalPages</code></td>
              <td><code>() =&gt; number</code></td>
              <td>Retorna el total de páginas calculadas</td>
            </tr>
            <tr>
              <td><code>getNextPage</code></td>
              <td><code>() =&gt; number</code></td>
              <td>Retorna el número de la siguiente página</td>
            </tr>
            <tr>
              <td><code>getLoadedItems</code></td>
              <td><code>() =&gt; number</code></td>
              <td>Retorna la cantidad de items cargados actualmente</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className={styles.propsTitle}>RenderState</h2>
      <p className={styles.propsDescription}>Estados posibles del ciclo de renderizado de la lista.</p>
      <div className={styles.propsTableWrapper}>
        <table className={styles.propsTable}>
          <thead>
            <tr>
              <th>Valor</th>
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>'renderIdle'</code></td>
              <td>Estado inicial, sin datos cargados</td>
            </tr>
            <tr>
              <td><code>'renderLoading'</code></td>
              <td>Cargando datos</td>
            </tr>
            <tr>
              <td><code>'renderComplete'</code></td>
              <td>Datos cargados y renderizados</td>
            </tr>
            <tr>
              <td><code>'renderEmpty'</code></td>
              <td>Sin datos para mostrar</td>
            </tr>
            <tr>
              <td><code>'renderError'</code></td>
              <td>Error al cargar datos</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className={styles.propsTitle}>DraggableConfig&lt;T&gt;</h2>
      <p className={styles.propsDescription}>Configuración de drag and drop para reordenar items.</p>
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
              <td>Activa o desactiva el drag and drop</td>
            </tr>
            <tr>
              <td><code>getItemId</code></td>
              <td><code>(item: T, index: number) =&gt; string</code></td>
              <td>-</td>
              <td>Función que retorna el ID único de cada item (requerido)</td>
            </tr>
            <tr>
              <td><code>isItemDraggable</code></td>
              <td><code>(item: T, index: number) =&gt; boolean</code></td>
              <td><code>() =&gt; true</code></td>
              <td>Función que determina si un item específico puede ser arrastrado. Por defecto todos los items son arrastrables</td>
            </tr>
            <tr>
              <td><code>onReorder</code></td>
              <td><code>(newData: T[], event: DraggableReorderEvent) =&gt; void</code></td>
              <td><code>undefined</code></td>
              <td>Callback con el nuevo array ordenado y detalles del movimiento</td>
            </tr>
            <tr>
              <td><code>handle</code></td>
              <td><code>DragHandleConfig</code></td>
              <td><code>undefined</code></td>
              <td>Configuración del icono de arrastre</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className={styles.propsTitle}>DragHandleConfig</h2>
      <p className={styles.propsDescription}>Configuración del icono/handle de arrastre.</p>
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
              <td><code>render</code></td>
              <td><code>ComponentType&lt;{'{'} isDragging: boolean {'}'}&gt;</code></td>
              <td>-</td>
              <td>Componente personalizado para el handle (requerido). Si no se pasa handle, todo el item es el área de arrastre</td>
            </tr>
            <tr>
              <td><code>position</code></td>
              <td><code>'left' | 'right'</code></td>
              <td><code>'right'</code></td>
              <td>Posición del handle respecto al contenido del item</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className={styles.propsTitle}>DraggableReorderEvent&lt;T&gt;</h2>
      <p className={styles.propsDescription}>Evento emitido al completar un reordenamiento.</p>
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
              <td><code>T</code></td>
              <td>El item que fue movido</td>
            </tr>
            <tr>
              <td><code>fromIndex</code></td>
              <td><code>number</code></td>
              <td>Índice original del item</td>
            </tr>
            <tr>
              <td><code>toIndex</code></td>
              <td><code>number</code></td>
              <td>Nuevo índice del item</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
