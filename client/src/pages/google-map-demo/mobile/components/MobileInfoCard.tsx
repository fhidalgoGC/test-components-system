import styles from '../css/GoogleMapDemo.mobile.module.css';

export function MobileInfoCard() {
  return (
    <div className={`${styles.infoBox} ${styles.infoBoxBlue}`} data-testid="mobile-info-card">
      <strong>Variante Mobile</strong>
      <p style={{ marginTop: 4 }}>
        En pantallas menores a 768px, GoogleMap automáticamente:
      </p>
      <ul style={{ marginTop: 4, paddingLeft: 16 }}>
        <li>Fuerza ancho 100% (ignora <code>widthMode</code>)</li>
        <li>Usa <code>gestureHandling: greedy</code> para scroll directo</li>
        <li>Oculta controles de Street View y tipo de mapa</li>
      </ul>
    </div>
  );
}
