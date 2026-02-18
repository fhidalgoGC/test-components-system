import styles from '../css/MultiControlDataDemo.module.css';

export function MultiControlDataPropsTab() {
  return (
    <div className={styles.propsContainer}>
      <h2>MultiControlDataProvider Props</h2>
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
            <td><code>sources</code></td>
            <td><code>SourcesMap</code></td>
            <td><code>-</code></td>
            <td>Objeto con las configuraciones de cada source. Las keys son los nombres de los sources.</td>
          </tr>
          <tr>
            <td><code>children</code></td>
            <td><code>ReactNode</code></td>
            <td><code>-</code></td>
            <td>Componentes hijos que tendran acceso a los sources via hooks.</td>
          </tr>
        </tbody>
      </table>

      <h3>SourceConfig</h3>
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
            <td><code>fetchFn</code></td>
            <td><code>{'(params: TParams) => Promise<TResponse>'}</code></td>
            <td><code>-</code></td>
            <td>Funcion que realiza la llamada al servicio.</td>
          </tr>
          <tr>
            <td><code>mapParams</code></td>
            <td><code>{'(state: ControlDataState) => TParams'}</code></td>
            <td><code>-</code></td>
            <td>Adaptador que transforma el state interno en los parametros del servicio.</td>
          </tr>
          <tr>
            <td><code>defaultState</code></td>
            <td><code>{'Partial<ControlDataState>'}</code></td>
            <td><code>{'{}'}</code></td>
            <td>Estado inicial del source.</td>
          </tr>
          <tr>
            <td><code>debounceMs</code></td>
            <td><code>number</code></td>
            <td><code>400</code></td>
            <td>Milisegundos de debounce antes de ejecutar fetchFn.</td>
          </tr>
        </tbody>
      </table>

      <h3>useMultiControlData(sourceKey)</h3>
      <p>Hook para acceder a un source especifico. Retorna el mismo tipo que <code>useControlDataContext</code>:</p>
      <table className={styles.propsTable}>
        <thead>
          <tr>
            <th>Propiedad</th>
            <th>Tipo</th>
            <th>Descripcion</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>data</code></td>
            <td><code>TData | null</code></td>
            <td>Datos retornados por fetchFn de este source.</td>
          </tr>
          <tr>
            <td><code>loading</code></td>
            <td><code>boolean</code></td>
            <td>Indica si este source esta cargando.</td>
          </tr>
          <tr>
            <td><code>error</code></td>
            <td><code>Error | null</code></td>
            <td>Error del ultimo fetch de este source.</td>
          </tr>
          <tr>
            <td><code>state</code></td>
            <td><code>ControlDataState</code></td>
            <td>Estado interno de este source (independiente de otros sources).</td>
          </tr>
          <tr>
            <td><code>applyToState</code></td>
            <td><code>{'(key, transformer, value) => void'}</code></td>
            <td>Modifica una propiedad del state de este source.</td>
          </tr>
          <tr>
            <td><code>resetState</code></td>
            <td><code>{'() => void'}</code></td>
            <td>Resetea el state de este source al defaultState.</td>
          </tr>
          <tr>
            <td><code>clearState</code></td>
            <td><code>{'() => void'}</code></td>
            <td>Limpia el state de este source completamente.</td>
          </tr>
          <tr>
            <td><code>reload</code></td>
            <td><code>{'() => void'}</code></td>
            <td>Fuerza una recarga del fetch de este source.</td>
          </tr>
        </tbody>
      </table>

      <h3>useMultiControlDataSources()</h3>
      <p>Hook que retorna un array con los nombres de todos los sources configurados.</p>
      <table className={styles.propsTable}>
        <thead>
          <tr>
            <th>Retorno</th>
            <th>Tipo</th>
            <th>Descripcion</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>sources</code></td>
            <td><code>string[]</code></td>
            <td>Lista de nombres de sources (ej: ['files', 'users']).</td>
          </tr>
        </tbody>
      </table>

      <h3>Restricciones</h3>
      <table className={styles.propsTable}>
        <thead>
          <tr>
            <th>Restriccion</th>
            <th>Descripcion</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>Keys inmutables</code></td>
            <td>Las keys del objeto sources no pueden cambiar despues del montaje. Si necesitas sources diferentes, desmonta y remonta el provider con un key diferente en React.</td>
          </tr>
          <tr>
            <td><code>Aislamiento total</code></td>
            <td>Cada source tiene state, data, loading y error completamente independientes.</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
