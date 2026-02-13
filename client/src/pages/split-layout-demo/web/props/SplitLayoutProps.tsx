import styles from '../css/SplitLayoutDemo.module.css';

export function SplitLayoutPropsTab() {
  return (
    <div className={styles.propsContainer}>
      <h2 className={styles.propsTitle}>SplitLayout Props</h2>
      <p className={styles.propsDescription}>Propiedades principales del componente SplitLayout.</p>

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
              <td><code>mainPanel</code></td>
              <td><code>PanelConfig</code></td>
              <td><strong>Required</strong></td>
              <td>Configuración del panel principal (contenido que siempre se muestra)</td>
            </tr>
            <tr>
              <td><code>secondPanel</code></td>
              <td><code>PanelConfig</code></td>
              <td><strong>Required</strong></td>
              <td>Configuración del panel secundario (se oculta en mobile)</td>
            </tr>
            <tr>
              <td><code>mainSide</code></td>
              <td><code>'left' | 'right'</code></td>
              <td><code>'right'</code></td>
              <td>En qué lado aparece el panel principal</td>
            </tr>
            <tr>
              <td><code>mainWidthPercent</code></td>
              <td><code>number</code></td>
              <td><code>50</code></td>
              <td>Porcentaje del ancho para el panel principal (el secundario ocupa el resto)</td>
            </tr>
            <tr>
              <td><code>collapseBreakpoint</code></td>
              <td><code>number</code></td>
              <td><code>768</code></td>
              <td>Breakpoint en px donde el panel secundario desaparece</td>
            </tr>
            <tr>
              <td><code>gap</code></td>
              <td><code>SpacingToken</code></td>
              <td><code>'none'</code></td>
              <td>Espacio entre los dos paneles</td>
            </tr>
            <tr>
              <td><code>fullHeight</code></td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
              <td>Si ocupa 100vh de altura (se ignora si <code>height</code> está definido)</td>
            </tr>
            <tr>
              <td><code>height</code></td>
              <td><code>string</code></td>
              <td><code>undefined</code></td>
              <td>Altura fija personalizada (ej: '600px', '80vh')</td>
            </tr>
            <tr>
              <td><code>className</code></td>
              <td><code>string</code></td>
              <td><code>undefined</code></td>
              <td>Clase CSS adicional para el contenedor</td>
            </tr>
            <tr>
              <td><code>style</code></td>
              <td><code>CSSProperties</code></td>
              <td><code>undefined</code></td>
              <td>Estilos inline adicionales para el contenedor</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className={styles.propsSubtitle}>PanelConfig</h3>
      <p className={styles.propsDescription}>Configuración de cada panel (mainPanel y secondPanel).</p>
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
              <td><code>content</code></td>
              <td><code>ReactNode</code></td>
              <td><strong>Required</strong></td>
              <td>Contenido a renderizar dentro del panel</td>
            </tr>
            <tr>
              <td><code>verticalAlign</code></td>
              <td><code>'top' | 'center' | 'bottom'</code></td>
              <td><code>'center'</code></td>
              <td>Alineación vertical del contenido</td>
            </tr>
            <tr>
              <td><code>horizontalAlign</code></td>
              <td><code>'left' | 'center' | 'right'</code></td>
              <td><code>'center'</code></td>
              <td>Alineación horizontal del contenido</td>
            </tr>
            <tr>
              <td><code>padding</code></td>
              <td><code>SpacingToken</code></td>
              <td><code>'none'</code></td>
              <td>Padding interno del panel</td>
            </tr>
            <tr>
              <td><code>background</code></td>
              <td><code>PanelBackground</code></td>
              <td><code>undefined</code></td>
              <td>Configuración del fondo del panel</td>
            </tr>
            <tr>
              <td><code>style</code></td>
              <td><code>CSSProperties</code></td>
              <td><code>undefined</code></td>
              <td>Estilos inline adicionales para el panel</td>
            </tr>
            <tr>
              <td><code>className</code></td>
              <td><code>string</code></td>
              <td><code>undefined</code></td>
              <td>Clase CSS adicional para el panel</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className={styles.propsSubtitle}>PanelBackground</h3>
      <p className={styles.propsDescription}>Configuración del fondo de un panel.</p>
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
              <td><code>color</code></td>
              <td><code>string</code></td>
              <td><code>undefined</code></td>
              <td>Color de fondo (se ignora si hay gradient o image)</td>
            </tr>
            <tr>
              <td><code>image</code></td>
              <td><code>string</code></td>
              <td><code>undefined</code></td>
              <td>URL de imagen de fondo</td>
            </tr>
            <tr>
              <td><code>gradient</code></td>
              <td><code>string</code></td>
              <td><code>undefined</code></td>
              <td>Gradiente CSS (ej: 'linear-gradient(135deg, #667eea, #764ba2)')</td>
            </tr>
            <tr>
              <td><code>size</code></td>
              <td><code>string</code></td>
              <td><code>'cover'</code></td>
              <td>background-size CSS (solo aplica con image)</td>
            </tr>
            <tr>
              <td><code>position</code></td>
              <td><code>string</code></td>
              <td><code>'center'</code></td>
              <td>background-position CSS (solo aplica con image)</td>
            </tr>
            <tr>
              <td><code>overlay</code></td>
              <td><code>string</code></td>
              <td><code>undefined</code></td>
              <td>Capa semitransparente sobre el fondo (ej: 'rgba(0,0,0,0.5)')</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className={styles.propsSubtitle}>Tipos auxiliares</h3>
      <p className={styles.propsDescription}>Tipos usados en las interfaces anteriores.</p>
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
              <td><code>MainSide</code></td>
              <td><code>'left' | 'right'</code></td>
              <td>mainSide</td>
            </tr>
            <tr>
              <td><code>VerticalAlign</code></td>
              <td><code>'top' | 'center' | 'bottom'</code></td>
              <td>PanelConfig.verticalAlign</td>
            </tr>
            <tr>
              <td><code>HorizontalAlign</code></td>
              <td><code>'left' | 'center' | 'right'</code></td>
              <td>PanelConfig.horizontalAlign</td>
            </tr>
            <tr>
              <td><code>SpacingToken</code></td>
              <td><code>'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'</code></td>
              <td>PanelConfig.padding, gap</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
