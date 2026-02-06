import { useState } from "react";
import { LayoutColumn, useLayoutColumn } from "@/lib/ui-library/components/LayoutColumn";
import { Button } from "@/components/ui/button";
import styles from "../css/LayoutColumnDemo.module.scss";

const HeaderComponent = () => (
  <div className={`${styles.demoItem} ${styles['demoItem--purple']}`}>
    <span className={styles.slotBadge}>0</span> Header
  </div>
);

const ContentComponent = () => (
  <div className={`${styles.demoItem} ${styles['demoItem--success']}`} style={{ padding: '1.5rem' }}>
    <span className={styles.slotBadge}>1</span> Contenido Principal
    <p style={{ fontSize: '0.75rem', marginTop: '0.5rem', opacity: 0.8 }}>
      Este es el contenido original del slot 1
    </p>
  </div>
);

const FooterComponent = () => (
  <div className={`${styles.demoItem} ${styles['demoItem--secondary']}`}>
    <span className={styles.slotBadge}>2</span> Footer
  </div>
);

const SettingsPanel = () => (
  <div style={{
    padding: '1.5rem',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    borderRadius: '0.25rem',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  }}>
    <strong style={{ fontSize: '1rem' }}>Panel de Configuración</strong>
    <p style={{ fontSize: '0.8rem', opacity: 0.9 }}>
      Este contenido reemplaza al contenido original del slot 1 usando setSlotContent()
    </p>
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      <span style={{ background: 'rgba(255,255,255,0.2)', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.75rem' }}>Opción A</span>
      <span style={{ background: 'rgba(255,255,255,0.2)', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.75rem' }}>Opción B</span>
      <span style={{ background: 'rgba(255,255,255,0.2)', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.75rem' }}>Opción C</span>
    </div>
  </div>
);

const ProfilePanel = () => (
  <div style={{
    padding: '1.5rem',
    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    color: 'white',
    borderRadius: '0.25rem',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  }}>
    <strong style={{ fontSize: '1rem' }}>Perfil de Usuario</strong>
    <p style={{ fontSize: '0.8rem', opacity: 0.9 }}>Override en slot 1 con otro componente distinto</p>
  </div>
);

const initialComponents = [
  { id: 'header', component: <HeaderComponent />, align: 'top' as const, slot: 0 },
  { id: 'content', component: <ContentComponent />, align: 'top' as const, slot: 1, sizeMode: 'full' as const },
  { id: 'footer', component: <FooterComponent />, align: 'bottom' as const, slot: 2 },
];

export function ControllerDemo() {
  const controller = useLayoutColumn({ components: initialComponents, slots: 3 });
  const [activeOverride, setActiveOverride] = useState<string | null>(null);

  const handleSetSettings = () => {
    controller.setSlotContent(1, <SettingsPanel />);
    setActiveOverride('settings');
  };

  const handleSetProfile = () => {
    controller.setSlotContent(1, <ProfilePanel />);
    setActiveOverride('profile');
  };

  const handleClearOverride = () => {
    controller.clearSlotContent(1);
    setActiveOverride(null);
  };

  const handleReset = () => {
    controller.resetVisibility();
    controller.clearSlotContent(1);
    setActiveOverride(null);
  };

  return (
    <section className={styles.section}>
      <div className={styles.componentName}>9-ControllerDemo.tsx</div>
      <h2 className={styles.section__title}>Controller (prop controller)</h2>
      <p className={styles.section__description}>
        Controla visibilidad de slots y reemplaza contenido dinámicamente desde fuera del componente.
        El controller se pasa como prop opcional — sin él, LayoutColumn funciona igual que siempre.
      </p>

      <div className={styles.controlsRow}>
        <span className={styles.controlLabel}>Visibilidad Slots:</span>
        {[0, 1, 2].map((slot) => (
          <Button
            key={slot}
            size="sm"
            variant={controller.isSlotVisible(slot) ? "default" : "outline"}
            onClick={() => controller.toggleSlot(slot)}
            data-testid={`button-ctrl-slot-${slot}`}
          >
            Slot {slot}
          </Button>
        ))}
      </div>

      <div className={styles.controlsRow}>
        <span className={styles.controlLabel}>Override Slot 1:</span>
        <Button
          size="sm"
          variant={activeOverride === 'settings' ? "default" : "outline"}
          onClick={handleSetSettings}
          data-testid="button-ctrl-settings"
        >
          Settings
        </Button>
        <Button
          size="sm"
          variant={activeOverride === 'profile' ? "default" : "outline"}
          onClick={handleSetProfile}
          data-testid="button-ctrl-profile"
        >
          Profile
        </Button>
        <Button
          size="sm"
          variant={activeOverride === null ? "default" : "outline"}
          onClick={handleClearOverride}
          data-testid="button-ctrl-clear"
        >
          Original
        </Button>
      </div>

      <div className={styles.controlsRow}>
        <Button size="sm" variant="secondary" onClick={handleReset} data-testid="button-ctrl-reset">
          Reset Todo
        </Button>
        <span className={styles.statusText}>
          Slots visibles: {controller.visibleSlots} | Override activo: {activeOverride || 'ninguno'} | Override en slot oculto: {!controller.isSlotVisible(1) && activeOverride ? 'sí (se renderiza igual)' : 'no'}
        </span>
      </div>

      <div className={styles.demoBox} style={{ height: 350 }} data-testid="demo-controller">
        <LayoutColumn
          slots={3}
          widthMode="full"
          heightMode="full"
          slotDivider="sm-dark"
          paddingX="md"
          paddingY="md"
          componentGap="sm"
          controller={controller}
          components={controller.visibleComponents}
        />
      </div>

      <p className={styles.section__description} style={{ marginTop: '0.5rem' }}>
        <strong>Prueba:</strong> Oculta el Slot 1 y luego pulsa "Settings" — el override se renderiza aunque el slot esté oculto.
      </p>
    </section>
  );
}
