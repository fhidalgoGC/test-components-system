import styles from '../css/AppAuthDemo.module.css';

export function AppAuthPropsTab() {
  return (
    <div className={styles.propsContainer}>
      <h2 className={styles.propsTitle}>AppAuthProvider Props</h2>
      <p className={styles.propsDescription}>Propiedades del provider de autenticación.</p>

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
              <td><strong>Required</strong></td>
              <td>Contenido envuelto por el provider</td>
            </tr>
            <tr>
              <td><code>sessionDuration</code></td>
              <td><code>number</code></td>
              <td><code>environment default</code></td>
              <td>Duración de la sesión en milisegundos</td>
            </tr>
            <tr>
              <td><code>validationInterval</code></td>
              <td><code>number</code></td>
              <td><code>environment default</code></td>
              <td>Intervalo de validación de sesión en milisegundos</td>
            </tr>
            <tr>
              <td><code>skipInitialValidation</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>Si es true, no valida la sesión al montar el provider</td>
            </tr>
            <tr>
              <td><code>sessionDataKey</code></td>
              <td><code>string</code></td>
              <td><code>'app_session_data'</code></td>
              <td>Clave de localStorage para guardar los datos de sesión genéricos</td>
            </tr>
            <tr>
              <td><code>onLogging</code></td>
              <td><code>() =&gt; void</code></td>
              <td><code>undefined</code></td>
              <td>Callback ejecutado al hacer login</td>
            </tr>
            <tr>
              <td><code>onLogout</code></td>
              <td><code>() =&gt; void</code></td>
              <td><code>undefined</code></td>
              <td>Callback ejecutado al hacer logout</td>
            </tr>
            <tr>
              <td><code>onSessionInvalid</code></td>
              <td><code>() =&gt; void</code></td>
              <td><code>undefined</code></td>
              <td>Callback ejecutado cuando la sesión expira o es inválida</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className={styles.propsSubtitle}>AppAuthContextValue</h3>
      <p className={styles.propsDescription}>Valores expuestos por useAppAuth().</p>

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
              <td><code>isAuthenticated</code></td>
              <td><code>boolean</code></td>
              <td>Estado actual de autenticación</td>
            </tr>
            <tr>
              <td><code>sessionData</code></td>
              <td><code>unknown | null</code></td>
              <td>Datos genéricos de sesión guardados con login(data). null si no hay sesión</td>
            </tr>
            <tr>
              <td><code>login</code></td>
              <td><code>(data?: unknown) =&gt; void</code></td>
              <td>Inicia sesión. Opcionalmente recibe datos genéricos para guardar en localStorage</td>
            </tr>
            <tr>
              <td><code>logout</code></td>
              <td><code>() =&gt; void</code></td>
              <td>Cierra sesión y borra todos los datos (sesión + sessionData)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className={styles.propsSubtitle}>ProtectedRoute Props</h3>
      <p className={styles.propsDescription}>Wrapper que solo renderiza sus children si el usuario está autenticado. Si no lo está, llama onUnauthorized y muestra el fallback.</p>

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
              <td><strong>Required</strong></td>
              <td>Contenido a renderizar si está autenticado</td>
            </tr>
            <tr>
              <td><code>onUnauthorized</code></td>
              <td><code>() =&gt; void</code></td>
              <td><strong>Required</strong></td>
              <td>Callback cuando el usuario NO está autenticado. El consumidor decide qué hacer (redirigir, mostrar modal, etc.)</td>
            </tr>
            <tr>
              <td><code>fallback</code></td>
              <td><code>ReactNode</code></td>
              <td><code>undefined</code></td>
              <td>Componente a mostrar cuando no está autenticado (mientras se ejecuta el callback)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className={styles.propsSubtitle}>PublicRoute Props</h3>
      <p className={styles.propsDescription}>Wrapper que solo renderiza sus children si el usuario NO está autenticado. No valida rutas ni redirige — simplemente oculta el contenido cuando hay sesión activa.</p>

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
              <td><strong>Required</strong></td>
              <td>Contenido a renderizar si NO está autenticado. Si hay sesión activa, retorna null</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
