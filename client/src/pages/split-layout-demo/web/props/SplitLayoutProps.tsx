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
              <th>Descripcion</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>layout</code></td>
              <td><code>LayoutConfig</code></td>
              <td><code>undefined</code></td>
              <td>Configuracion de dimensiones del contenedor general</td>
            </tr>
            <tr>
              <td><code>main</code></td>
              <td><code>PanelConfig</code></td>
              <td><strong>Required</strong></td>
              <td>Panel principal. Posicion controlada por layout.componentMainAlign. Siempre visible en mobile</td>
            </tr>
            <tr>
              <td><code>secondary</code></td>
              <td><code>PanelConfig</code></td>
              <td><strong>Required</strong></td>
              <td>Panel secundario. Se oculta en mobile (&lt;768px)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className={styles.propsSubtitle}>LayoutConfig</h3>
      <p className={styles.propsDescription}>Configuracion de dimensiones del contenedor.</p>
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
              <td><code>componentMainAlign</code></td>
              <td><code>'left' | 'right'</code></td>
              <td><code>'left'</code></td>
              <td>Posicion del panel main: izquierda o derecha</td>
            </tr>
            <tr>
              <td><code>widthMode</code></td>
              <td><code>SizeMode</code></td>
              <td><code>'full'</code></td>
              <td>Modo de ancho del contenedor</td>
            </tr>
            <tr>
              <td><code>width</code></td>
              <td><code>string | number</code></td>
              <td><code>undefined</code></td>
              <td>Valor de ancho (usado con fixed o percentage)</td>
            </tr>
            <tr>
              <td><code>minWidth</code></td>
              <td><code>number</code></td>
              <td><code>undefined</code></td>
              <td>Ancho minimo en px</td>
            </tr>
            <tr>
              <td><code>heightMode</code></td>
              <td><code>SizeMode</code></td>
              <td><code>'full'</code></td>
              <td>Modo de altura del contenedor (full = 100vh)</td>
            </tr>
            <tr>
              <td><code>height</code></td>
              <td><code>string | number</code></td>
              <td><code>undefined</code></td>
              <td>Valor de altura (usado con fixed o percentage)</td>
            </tr>
            <tr>
              <td><code>minHeight</code></td>
              <td><code>number</code></td>
              <td><code>undefined</code></td>
              <td>Altura minima en px</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className={styles.propsSubtitle}>PanelConfig</h3>
      <p className={styles.propsDescription}>Configuracion de cada panel (main y secondary).</p>
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
              <td><code>render</code></td>
              <td><code>ReactNode</code></td>
              <td><strong>Required</strong></td>
              <td>Contenido a renderizar dentro del panel</td>
            </tr>
            <tr>
              <td><code>renderType</code></td>
              <td><code>'component'</code></td>
              <td><code>'component'</code></td>
              <td>Tipo de render (siempre component)</td>
            </tr>
            <tr>
              <td><code>widthMode</code></td>
              <td><code>SizeMode</code></td>
              <td><code>'full'</code></td>
              <td>Modo de ancho del panel</td>
            </tr>
            <tr>
              <td><code>width</code></td>
              <td><code>string | number</code></td>
              <td><code>undefined</code></td>
              <td>Valor de ancho (usado con fixed o percentage)</td>
            </tr>
            <tr>
              <td><code>minWidth</code></td>
              <td><code>number</code></td>
              <td><code>undefined</code></td>
              <td>Ancho minimo en px</td>
            </tr>
            <tr>
              <td><code>heightMode</code></td>
              <td><code>SizeMode</code></td>
              <td><code>'full'</code></td>
              <td>Modo de altura del panel</td>
            </tr>
            <tr>
              <td><code>height</code></td>
              <td><code>string | number</code></td>
              <td><code>undefined</code></td>
              <td>Valor de altura (usado con fixed o percentage)</td>
            </tr>
            <tr>
              <td><code>minHeight</code></td>
              <td><code>number</code></td>
              <td><code>undefined</code></td>
              <td>Altura minima en px</td>
            </tr>
            <tr>
              <td><code>align</code></td>
              <td><code>PanelAlign</code></td>
              <td><code>{`{ vertical: 'middle', horizontal: 'center' }`}</code></td>
              <td>Alineacion del contenido dentro del panel</td>
            </tr>
            <tr>
              <td><code>scroll</code></td>
              <td><code>PanelScroll</code></td>
              <td><code>{`{ vertical: true, horizontal: false }`}</code></td>
              <td>Control de scroll por eje</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className={styles.propsSubtitle}>PanelAlign</h3>
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
              <td><code>vertical</code></td>
              <td><code>'top' | 'middle' | 'bottom'</code></td>
              <td><code>'middle'</code></td>
              <td>Alineacion vertical del contenido</td>
            </tr>
            <tr>
              <td><code>horizontal</code></td>
              <td><code>'left' | 'center' | 'right'</code></td>
              <td><code>'center'</code></td>
              <td>Alineacion horizontal del contenido</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className={styles.propsSubtitle}>PanelScroll</h3>
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
              <td><code>vertical</code></td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
              <td>Habilita scroll vertical cuando el contenido excede la altura</td>
            </tr>
            <tr>
              <td><code>horizontal</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>Habilita scroll horizontal cuando el contenido excede el ancho</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className={styles.propsSubtitle}>Tipos auxiliares</h3>
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
              <td><code>ComponentMainAlign</code></td>
              <td><code>'left' | 'right'</code></td>
              <td>LayoutConfig.componentMainAlign</td>
            </tr>
            <tr>
              <td><code>SizeMode</code></td>
              <td><code>'full' | 'auto' | 'fixed' | 'percentage'</code></td>
              <td>widthMode, heightMode (layout y panels)</td>
            </tr>
            <tr>
              <td><code>VerticalAlign</code></td>
              <td><code>'top' | 'middle' | 'bottom'</code></td>
              <td>PanelAlign.vertical</td>
            </tr>
            <tr>
              <td><code>HorizontalAlign</code></td>
              <td><code>'left' | 'center' | 'right'</code></td>
              <td>PanelAlign.horizontal</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
