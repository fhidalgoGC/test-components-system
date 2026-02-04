import styles from '../css/AccordionDemo.module.css';

export const AccordionDemoMobileView = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Accordion Component</h1>
      <p className={styles.description}>
        Mobile view - Componente agnóstico y controlable.
      </p>
      
      <div className={styles.infoCard}>
        <p>Vista móvil simplificada del componente Accordion.</p>
        <p className={styles.hint}>Para ver todos los ejemplos, usa la versión de escritorio.</p>
      </div>
    </div>
  );
};
