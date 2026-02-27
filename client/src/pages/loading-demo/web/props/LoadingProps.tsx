import styles from '../css/LoadingDemo.module.css';

export function LoadingPropsTab() {
  return (
    <div className={styles.propsContainer} data-testid="loading-props-tab">
      <h2 className={styles.propsTitle}>LoadingProps</h2>
      <p className={styles.propsDescription}>Props del componente Loading.</p>
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
              <td><code>state</code></td>
              <td><code>'loading' | 'completed'</code></td>
              <td><code>'loading'</code></td>
              <td>Estado actual del loading. Cuando es <code>'completed'</code> el componente retorna <code>null</code>.</td>
            </tr>
            <tr>
              <td><code>overlay</code></td>
              <td><code>'transparent' | 'light' | 'dark' | 'none'</code></td>
              <td><code>'transparent'</code></td>
              <td>Tipo de fondo del overlay. Con <code>'none'</code> solo muestra el spinner sin fondo ni positioning.</td>
            </tr>
            <tr>
              <td><code>coverage</code></td>
              <td><code>'component' | 'fullscreen'</code></td>
              <td><code>'component'</code></td>
              <td>Si cubre solo el componente padre (<code>position: absolute</code>) o toda la pantalla (<code>position: fixed</code>).</td>
            </tr>
            <tr>
              <td><code>size</code></td>
              <td><code>'xs' | 'sm' | 'md' | 'lg' | 'xl'</code></td>
              <td><code>'md'</code></td>
              <td>Tamaño del spinner (solo aplica cuando <code>renderType: 'self'</code>).</td>
            </tr>
            <tr>
              <td><code>renderType</code></td>
              <td><code>'self' | 'component'</code></td>
              <td><code>'self'</code></td>
              <td>Modo de renderizado. <code>'self'</code> usa el spinner interno (<code>SelfSpinner</code>). <code>'component'</code> renderiza el componente custom pasado en <code>render</code>.</td>
            </tr>
            <tr>
              <td><code>render</code></td>
              <td><code>ReactNode</code></td>
              <td><code>undefined</code></td>
              <td>Componente custom a renderizar cuando <code>renderType: 'component'</code>. Se muestra centrado dentro del overlay.</td>
            </tr>
            <tr>
              <td><code>labelI18n</code></td>
              <td><code>LabelOrMultiLanguage</code></td>
              <td><code>undefined</code></td>
              <td>Texto debajo del spinner (solo aplica cuando <code>renderType: 'self'</code>). Acepta un <code>string</code> simple o un objeto <code>MultiLanguageLabel</code> con traducciones por idioma.</td>
            </tr>
            <tr>
              <td><code>className</code></td>
              <td><code>string</code></td>
              <td><code>undefined</code></td>
              <td>Clase CSS adicional para el contenedor del loading.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className={styles.propsSubtitle}>LoadingRenderType</h3>
      <p className={styles.propsDescription}>Modo de renderizado del contenido interno del loading.</p>
      <div className={styles.propsTableWrapper}>
        <table className={styles.propsTable}>
          <thead>
            <tr>
              <th>Valor</th>
              <th>Descripción</th>
              <th>Componente interno</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>'self'</code></td>
              <td>Usa el spinner por defecto de la librería (default)</td>
              <td><code>SelfSpinner</code> en <code>components/self/</code></td>
            </tr>
            <tr>
              <td><code>'component'</code></td>
              <td>Renderiza el componente custom pasado en <code>render</code></td>
              <td>El <code>ReactNode</code> del prop <code>render</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className={styles.propsSubtitle}>LoadingOverlay</h3>
      <p className={styles.propsDescription}>Valores posibles para el fondo del overlay.</p>
      <div className={styles.propsTableWrapper}>
        <table className={styles.propsTable}>
          <thead>
            <tr>
              <th>Valor</th>
              <th>Descripción</th>
              <th>CSS</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>'transparent'</code></td>
              <td>Fondo blanco semitransparente</td>
              <td><code>rgba(255, 255, 255, 0.5)</code></td>
            </tr>
            <tr>
              <td><code>'light'</code></td>
              <td>Fondo blanco casi opaco</td>
              <td><code>rgba(255, 255, 255, 0.85)</code></td>
            </tr>
            <tr>
              <td><code>'dark'</code></td>
              <td>Fondo oscuro semitransparente</td>
              <td><code>rgba(0, 0, 0, 0.6)</code></td>
            </tr>
            <tr>
              <td><code>'none'</code></td>
              <td>Sin fondo ni positioning, solo el contenido inline</td>
              <td>Sin background</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className={styles.propsSubtitle}>LoadingSize</h3>
      <p className={styles.propsDescription}>Dimensiones del spinner según el tamaño seleccionado (solo <code>renderType: 'self'</code>).</p>
      <div className={styles.propsTableWrapper}>
        <table className={styles.propsTable}>
          <thead>
            <tr>
              <th>Valor</th>
              <th>Dimensiones</th>
              <th>Border</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>'xs'</code></td>
              <td>16 x 16 px</td>
              <td>2px</td>
            </tr>
            <tr>
              <td><code>'sm'</code></td>
              <td>24 x 24 px</td>
              <td>2.5px</td>
            </tr>
            <tr>
              <td><code>'md'</code></td>
              <td>36 x 36 px</td>
              <td>3px</td>
            </tr>
            <tr>
              <td><code>'lg'</code></td>
              <td>48 x 48 px</td>
              <td>3.5px</td>
            </tr>
            <tr>
              <td><code>'xl'</code></td>
              <td>64 x 64 px</td>
              <td>4px</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className={styles.propsSubtitle}>LoadingProviderProps</h3>
      <p className={styles.propsDescription}>Props del provider para control global del loading.</p>
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
              <td><code>children</code></td>
              <td><code>ReactNode</code></td>
              <td>-</td>
              <td>Contenido que envuelve el provider (requerido).</td>
            </tr>
            <tr>
              <td><code>defaultOverlay</code></td>
              <td><code>LoadingOverlay</code></td>
              <td><code>'transparent'</code></td>
              <td>Overlay por defecto cuando se llama a <code>show()</code> sin config.</td>
            </tr>
            <tr>
              <td><code>defaultSize</code></td>
              <td><code>LoadingSize</code></td>
              <td><code>'lg'</code></td>
              <td>Tamaño por defecto cuando se llama a <code>show()</code> sin config.</td>
            </tr>
            <tr>
              <td><code>defaultLabelI18n</code></td>
              <td><code>LabelOrMultiLanguage</code></td>
              <td><code>undefined</code></td>
              <td>Label por defecto cuando se llama a <code>show()</code> sin config. Acepta <code>string</code> o <code>MultiLanguageLabel</code>.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className={styles.propsSubtitle}>LoadingContextValue (useLoading)</h3>
      <p className={styles.propsDescription}>API expuesta por el hook <code>useLoading()</code>.</p>
      <div className={styles.propsTableWrapper}>
        <table className={styles.propsTable}>
          <thead>
            <tr>
              <th>Propiedad</th>
              <th>Tipo</th>
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>isLoading</code></td>
              <td><code>boolean</code></td>
              <td>Indica si el loading global está activo.</td>
            </tr>
            <tr>
              <td><code>show</code></td>
              <td><code>(config?: LoadingConfig) =&gt; void</code></td>
              <td>Muestra el loading. Si se pasa <code>parentRef</code>, cubre ese componente. Si no, cubre toda la pantalla.</td>
            </tr>
            <tr>
              <td><code>hide</code></td>
              <td><code>() =&gt; void</code></td>
              <td>Oculta el loading y restaura el <code>position</code> original del padre si fue modificado.</td>
            </tr>
            <tr>
              <td><code>config</code></td>
              <td><code>LoadingConfig</code></td>
              <td>Configuración actual del loading.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className={styles.propsSubtitle}>LoadingConfig</h3>
      <p className={styles.propsDescription}>Objeto de configuración para <code>show(config?)</code>.</p>
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
              <td><code>overlay</code></td>
              <td><code>LoadingOverlay</code></td>
              <td>Sobreescribe el overlay del provider.</td>
            </tr>
            <tr>
              <td><code>size</code></td>
              <td><code>LoadingSize</code></td>
              <td>Sobreescribe el tamaño del spinner.</td>
            </tr>
            <tr>
              <td><code>labelI18n</code></td>
              <td><code>LabelOrMultiLanguage</code></td>
              <td>Sobreescribe el label del spinner. Acepta <code>string</code> o <code>MultiLanguageLabel</code>.</td>
            </tr>
            <tr>
              <td><code>renderType</code></td>
              <td><code>'self' | 'component'</code></td>
              <td>Modo de renderizado: <code>'self'</code> para el spinner interno, <code>'component'</code> para un componente custom.</td>
            </tr>
            <tr>
              <td><code>render</code></td>
              <td><code>ReactNode</code></td>
              <td>Componente custom a renderizar (solo cuando <code>renderType: 'component'</code>).</td>
            </tr>
            <tr>
              <td><code>parentRef</code></td>
              <td><code>RefObject&lt;HTMLElement&gt;</code></td>
              <td>Referencia al elemento padre donde inyectar el loading via portal. Si no se pasa, el loading es fullscreen. Se puede cambiar dinámicamente en cada <code>show()</code>.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
