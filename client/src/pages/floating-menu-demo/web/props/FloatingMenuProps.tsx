import styles from '../css/FloatingMenuDemo.module.css';

export function FloatingMenuPropsTab() {
  return (
    <div className={styles.propsContainer}>
      <h2 className={styles.propsTitle}>FloatingMenu Props</h2>
      <p className={styles.propsDescription}>Propiedades principales del componente FloatingMenu.</p>

      <div className={styles.propsTableWrapper}>
        <table className={styles.propsTable}>
          <thead>
            <tr>
              <th>Prop</th>
              <th>Tipo</th>
              <th>Default</th>
              <th>Descripcion</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>items</code></td>
              <td><code>FloatingMenuItem&lt;T&gt;[]</code></td>
              <td><strong>Required</strong></td>
              <td>Array de items con render function</td>
            </tr>
            <tr>
              <td><code>isOpen</code></td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
              <td>Controla visibilidad del menú</td>
            </tr>
            <tr>
              <td><code>position</code></td>
              <td><code>MenuPosition</code></td>
              <td><code>'bottom-start'</code></td>
              <td>Posición de apertura del menú (12 opciones)</td>
            </tr>
            <tr>
              <td><code>offset</code></td>
              <td><code>number</code></td>
              <td><code>8</code></td>
              <td>Separación del trigger en pixels</td>
            </tr>
            <tr>
              <td><code>header</code></td>
              <td><code>FloatingMenuSectionConfig</code></td>
              <td><code>undefined</code></td>
              <td>Configuración del header</td>
            </tr>
            <tr>
              <td><code>footer</code></td>
              <td><code>FloatingMenuSectionConfig</code></td>
              <td><code>undefined</code></td>
              <td>Configuración del footer</td>
            </tr>
            <tr>
              <td><code>layout</code></td>
              <td><code>FloatingMenuLayout</code></td>
              <td><code>undefined</code></td>
              <td>Configuración de layout (ancho, alto, min/max)</td>
            </tr>
            <tr>
              <td><code>scroll</code></td>
              <td><code>'auto' | 'none'</code></td>
              <td><code>'auto'</code></td>
              <td>Modo de scroll del body</td>
            </tr>
            <tr>
              <td><code>showBackdrop</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>Muestra backdrop y cierra al hacer click fuera</td>
            </tr>
            <tr>
              <td><code>selectable</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>Activa la funcionalidad de selección interna</td>
            </tr>
            <tr>
              <td><code>defaultSelectedId</code></td>
              <td><code>string</code></td>
              <td><code>undefined</code></td>
              <td>ID del item seleccionado por defecto al iniciar</td>
            </tr>
            <tr>
              <td><code>selectionStyle</code></td>
              <td><code>FloatingMenuSelectionStyle</code></td>
              <td><code>undefined</code></td>
              <td>Estilo visual personalizado para el item seleccionado</td>
            </tr>
            <tr>
              <td><code>selectedClassName</code></td>
              <td><code>string</code></td>
              <td><code>undefined</code></td>
              <td>Clase CSS adicional para el item seleccionado</td>
            </tr>
            <tr>
              <td><code>controller</code></td>
              <td><code>FloatingMenuController</code></td>
              <td><code>undefined</code></td>
              <td>Controller (useFloatingMenu) para getSelectedId y clearSelection</td>
            </tr>
            <tr>
              <td><code>onSelectionChange</code></td>
              <td><code>(id, item) =&gt; void</code></td>
              <td><code>undefined</code></td>
              <td>Callback cuando cambia la selección</td>
            </tr>
            <tr>
              <td><code>onItemClick</code></td>
              <td><code>(item, index) =&gt; void</code></td>
              <td><code>undefined</code></td>
              <td>Callback al hacer click en un item</td>
            </tr>
            <tr>
              <td><code>onClose</code></td>
              <td><code>() =&gt; void</code></td>
              <td><code>undefined</code></td>
              <td>Callback al cerrar el menú</td>
            </tr>
            <tr>
              <td><code>orderable</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>Activa reordenamiento por drag & drop</td>
            </tr>
            <tr>
              <td><code>onOrderChange</code></td>
              <td><code>(items: FloatingMenuItem&lt;T&gt;[]) =&gt; void</code></td>
              <td><code>undefined</code></td>
              <td>Callback con el nuevo array de items tras reordenar</td>
            </tr>
            <tr>
              <td><code>dragHandleClassName</code></td>
              <td><code>string</code></td>
              <td><code>undefined</code></td>
              <td>Clase CSS adicional para el icono de drag handle</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className={styles.propsSubtitle}>FloatingMenuItem&lt;T&gt;</h3>
      <p className={styles.propsDescription}>Configuración de cada item del menú.</p>
      <div className={styles.propsTableWrapper}>
        <table className={styles.propsTable}>
          <thead>
            <tr>
              <th>Prop</th>
              <th>Tipo</th>
              <th>Default</th>
              <th>Descripcion</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>id</code></td>
              <td><code>string</code></td>
              <td><strong>Required</strong></td>
              <td>Identificador único del item</td>
            </tr>
            <tr>
              <td><code>data</code></td>
              <td><code>T</code></td>
              <td><code>undefined</code></td>
              <td>Datos genéricos del item</td>
            </tr>
            <tr>
              <td><code>render</code></td>
              <td><code>(item) =&gt; ReactNode</code></td>
              <td><strong>Required</strong></td>
              <td>Función que renderiza el contenido del item</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className={styles.propsSubtitle}>FloatingMenuSectionConfig</h3>
      <p className={styles.propsDescription}>Configuración de header y footer.</p>
      <div className={styles.propsTableWrapper}>
        <table className={styles.propsTable}>
          <thead>
            <tr>
              <th>Prop</th>
              <th>Tipo</th>
              <th>Default</th>
              <th>Descripcion</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>renderType</code></td>
              <td><code>'component' | 'none'</code></td>
              <td><code>'none'</code></td>
              <td>Tipo de renderizado</td>
            </tr>
            <tr>
              <td><code>render</code></td>
              <td><code>() =&gt; ReactNode</code></td>
              <td><code>undefined</code></td>
              <td>Función que retorna el contenido</td>
            </tr>
            <tr>
              <td><code>show</code></td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
              <td>Mostrar/ocultar (desmonta si false)</td>
            </tr>
            <tr>
              <td><code>heightMode</code></td>
              <td><code>'full' | 'auto' | 'fixed'</code></td>
              <td><code>'auto'</code></td>
              <td>Modo de altura de la sección</td>
            </tr>
            <tr>
              <td><code>height</code></td>
              <td><code>number | string</code></td>
              <td><code>undefined</code></td>
              <td>Altura fija (cuando heightMode es 'fixed')</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className={styles.propsSubtitle}>FloatingMenuLayout</h3>
      <p className={styles.propsDescription}>Configuración de dimensiones del menú.</p>
      <div className={styles.propsTableWrapper}>
        <table className={styles.propsTable}>
          <thead>
            <tr>
              <th>Prop</th>
              <th>Tipo</th>
              <th>Default</th>
              <th>Descripcion</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>widthMode</code></td>
              <td><code>'full' | 'auto' | 'fixed'</code></td>
              <td><code>'auto'</code></td>
              <td>Modo de ancho del menú</td>
            </tr>
            <tr>
              <td><code>width</code></td>
              <td><code>number | string</code></td>
              <td><code>undefined</code></td>
              <td>Ancho fijo (cuando widthMode es 'fixed')</td>
            </tr>
            <tr>
              <td><code>heightMode</code></td>
              <td><code>'full' | 'auto' | 'fixed'</code></td>
              <td><code>'auto'</code></td>
              <td>Modo de altura del menú</td>
            </tr>
            <tr>
              <td><code>height</code></td>
              <td><code>number | string</code></td>
              <td><code>undefined</code></td>
              <td>Altura fija</td>
            </tr>
            <tr>
              <td><code>maxHeight</code></td>
              <td><code>number</code></td>
              <td><code>undefined</code></td>
              <td>Altura máxima en px</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className={styles.propsSubtitle}>FloatingMenuSelectionStyle</h3>
      <p className={styles.propsDescription}>Estilo visual para el item seleccionado (solo con selectable=true).</p>
      <div className={styles.propsTableWrapper}>
        <table className={styles.propsTable}>
          <thead>
            <tr>
              <th>Prop</th>
              <th>Tipo</th>
              <th>Descripcion</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>backgroundColor</code></td>
              <td><code>string</code></td>
              <td>Color de fondo del item seleccionado</td>
            </tr>
            <tr>
              <td><code>border</code></td>
              <td><code>string</code></td>
              <td>Borde del item seleccionado</td>
            </tr>
            <tr>
              <td><code>boxShadow</code></td>
              <td><code>string</code></td>
              <td>Sombra del item seleccionado</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className={styles.propsSubtitle}>FloatingMenuController</h3>
      <p className={styles.propsDescription}>Controller retornado por useFloatingMenu().</p>
      <div className={styles.propsTableWrapper}>
        <table className={styles.propsTable}>
          <thead>
            <tr>
              <th>Método</th>
              <th>Retorno</th>
              <th>Descripcion</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>getSelectedId()</code></td>
              <td><code>string | null</code></td>
              <td>Retorna el ID del item seleccionado actualmente</td>
            </tr>
            <tr>
              <td><code>clearSelection()</code></td>
              <td><code>void</code></td>
              <td>Limpia la selección (resetea a null)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className={styles.propsSubtitle}>MenuPosition</h3>
      <p className={styles.propsDescription}>Posiciones disponibles para el menú.</p>
      <div className={styles.positionGridProps}>
        <div className={styles.positionGridItem}>top</div>
        <div className={styles.positionGridItem}>top-start</div>
        <div className={styles.positionGridItem}>top-end</div>
        <div className={styles.positionGridItem}>bottom</div>
        <div className={`${styles.positionGridItem} ${styles.positionGridItemDefault}`}>bottom-start (default)</div>
        <div className={styles.positionGridItem}>bottom-end</div>
        <div className={styles.positionGridItem}>left</div>
        <div className={styles.positionGridItem}>left-start</div>
        <div className={styles.positionGridItem}>left-end</div>
        <div className={styles.positionGridItem}>right</div>
        <div className={styles.positionGridItem}>right-start</div>
        <div className={styles.positionGridItem}>right-end</div>
      </div>
    </div>
  );
}
