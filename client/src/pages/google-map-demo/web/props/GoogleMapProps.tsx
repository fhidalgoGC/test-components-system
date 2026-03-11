import styles from '../css/GoogleMapDemo.module.css';

export function GoogleMapPropsTab() {
  return (
    <div className={styles.propsContainer} data-testid="googlemap-props-tab">
      <h2 className={styles.propsTitle}>GoogleMapProps</h2>
      <p className={styles.propsDescription}>Props principales del componente GoogleMap.</p>
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
              <td><code>apiKey</code></td>
              <td><code>string</code></td>
              <td>Desde environment</td>
              <td>API Key de Google Maps. Opcional: se resuelve desde ConfigProvider o VITE_GOOGLE_MAPS_API_KEY</td>
            </tr>
            <tr>
              <td><code>center</code></td>
              <td><code>MapCenter</code></td>
              <td>-</td>
              <td>Centro del mapa (requerido). Objeto con lat y lng</td>
            </tr>
            <tr>
              <td><code>zoom</code></td>
              <td><code>number</code></td>
              <td><code>12</code></td>
              <td>Nivel de zoom (1-20)</td>
            </tr>
            <tr>
              <td><code>data</code></td>
              <td><code>MapDataItem[]</code></td>
              <td><code>undefined</code></td>
              <td>Array declarativo con coordenadas, labelI18n y metadata. Si está definido, ignora markers</td>
            </tr>
            <tr>
              <td><code>markers</code></td>
              <td><code>MapMarker[]</code></td>
              <td><code>[]</code></td>
              <td>Array de marcadores manuales. Ignorado si data está definido</td>
            </tr>
            <tr>
              <td><code>width</code></td>
              <td><code>number | string</code></td>
              <td><code>'100%'</code></td>
              <td>Ancho del mapa (px o string CSS)</td>
            </tr>
            <tr>
              <td><code>height</code></td>
              <td><code>number | string</code></td>
              <td><code>'400px'</code></td>
              <td>Altura del mapa (px o string CSS)</td>
            </tr>
            <tr>
              <td><code>showZoomControl</code></td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
              <td>Mostrar control de zoom (+/-)</td>
            </tr>
            <tr>
              <td><code>showStreetViewControl</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>Mostrar control de Street View</td>
            </tr>
            <tr>
              <td><code>showMapTypeControl</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>Mostrar selector de tipo de mapa</td>
            </tr>
            <tr>
              <td><code>showFullscreenControl</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>Mostrar botón de pantalla completa</td>
            </tr>
            <tr>
              <td><code>onMapClick</code></td>
              <td><code>(position: MapCenter) =&gt; void</code></td>
              <td>-</td>
              <td>Callback al hacer clic en el mapa</td>
            </tr>
            <tr>
              <td><code>onMarkerClick</code></td>
              <td><code>(marker: MapMarker) =&gt; void</code></td>
              <td>-</td>
              <td>Callback al hacer clic en un marcador</td>
            </tr>
            <tr>
              <td><code>onDataItemClick</code></td>
              <td><code>(item: MapDataItem) =&gt; void</code></td>
              <td>-</td>
              <td>Callback al hacer clic en un item de data (devuelve el item completo con metadata)</td>
            </tr>
            <tr>
              <td><code>onMarkerDragEnd</code></td>
              <td><code>(marker: MapMarker, newPosition: MapCenter) =&gt; void</code></td>
              <td>-</td>
              <td>Callback al soltar un marcador arrastrado</td>
            </tr>
            <tr>
              <td><code>mapId</code></td>
              <td><code>string</code></td>
              <td><code>'DEFAULT_MAP_ID'</code></td>
              <td>ID del mapa de Google Cloud (requerido para AdvancedMarker)</td>
            </tr>
            <tr>
              <td><code>className</code></td>
              <td><code>string</code></td>
              <td>-</td>
              <td>Clase CSS adicional</td>
            </tr>
            <tr>
              <td><code>langOverride</code></td>
              <td><code>string</code></td>
              <td>-</td>
              <td>Idioma forzado ('en', 'es')</td>
            </tr>
            <tr>
              <td><code>i18nOrder</code></td>
              <td><code>'global-first' | 'local-first'</code></td>
              <td>-</td>
              <td>Prioridad de traducciones</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className={styles.propsSubtitle}>MapDataItem</h3>
      <p className={styles.propsDescription}>Cada elemento del array data.</p>
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
              <td>Identificador único del item (requerido)</td>
            </tr>
            <tr>
              <td><code>position</code></td>
              <td><code>{'{'}lat: number, lng: number{'}'}</code></td>
              <td>-</td>
              <td>Coordenadas del marcador (requerido)</td>
            </tr>
            <tr>
              <td><code>labelI18n</code></td>
              <td><code>MultiLanguageLabel</code></td>
              <td><code>undefined</code></td>
              <td>Etiqueta multiidioma. Se resuelve automáticamente según el idioma activo</td>
            </tr>
            <tr>
              <td><code>metadata</code></td>
              <td><code>MapMarkerMetadata</code></td>
              <td><code>undefined</code></td>
              <td>Datos adicionales: color, icon, draggable y cualquier campo personalizado</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className={styles.propsSubtitle}>MapMarkerMetadata</h3>
      <p className={styles.propsDescription}>Metadatos opcionales por cada coordenada.</p>
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
              <td>Color asociado al marcador (para uso en UI)</td>
            </tr>
            <tr>
              <td><code>icon</code></td>
              <td><code>string</code></td>
              <td><code>undefined</code></td>
              <td>URL de icono personalizado para el marcador</td>
            </tr>
            <tr>
              <td><code>draggable</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>Si el marcador se puede arrastrar</td>
            </tr>
            <tr>
              <td><code>[key: string]</code></td>
              <td><code>unknown</code></td>
              <td>-</td>
              <td>Cualquier campo personalizado adicional</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className={styles.propsSubtitle}>MapMarker</h3>
      <p className={styles.propsDescription}>Marcador manual (cuando se usa la prop markers en vez de data).</p>
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
              <td>Identificador único del marcador</td>
            </tr>
            <tr>
              <td><code>position</code></td>
              <td><code>{'{'}lat: number, lng: number{'}'}</code></td>
              <td>-</td>
              <td>Coordenadas del marcador</td>
            </tr>
            <tr>
              <td><code>title</code></td>
              <td><code>string</code></td>
              <td><code>undefined</code></td>
              <td>Tooltip del marcador</td>
            </tr>
            <tr>
              <td><code>icon</code></td>
              <td><code>string</code></td>
              <td><code>undefined</code></td>
              <td>URL de icono personalizado</td>
            </tr>
            <tr>
              <td><code>draggable</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>Permite arrastrar el marcador</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className={styles.propsSubtitle}>MapCenter</h3>
      <p className={styles.propsDescription}>Coordenadas geográficas.</p>
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
              <td><code>lat</code></td>
              <td><code>number</code></td>
              <td>-</td>
              <td>Latitud</td>
            </tr>
            <tr>
              <td><code>lng</code></td>
              <td><code>number</code></td>
              <td>-</td>
              <td>Longitud</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className={styles.propsSubtitle}>Cadena de resolución apiKey</h3>
      <p className={styles.propsDescription}>La API key se resuelve en este orden de prioridad:</p>
      <div className={styles.propsTableWrapper}>
        <table className={styles.propsTable}>
          <thead>
            <tr>
              <th>Prioridad</th>
              <th>Fuente</th>
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td><code>apiKey</code> prop</td>
              <td>Prop directa al componente</td>
            </tr>
            <tr>
              <td>2</td>
              <td><code>ConfigProvider</code></td>
              <td>environment.GOOGLE_MAP_CONFIG.GOOGLE_MAPS_API_KEY</td>
            </tr>
            <tr>
              <td>3</td>
              <td><code>VITE_GOOGLE_MAPS_API_KEY</code></td>
              <td>Variable de entorno del archivo .env</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
